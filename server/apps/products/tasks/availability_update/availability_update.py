import itertools
import json
import logging
from typing import List

from django.db.models import Q
from funcy import log_calls, log_errors

from server.apps.orders.models import QuotationRoom
from server.apps.products.models import (
    DepartureOption,
    Occupancy,
    Product,
    ProductAllotment,
    ProductAvailability,
    ProductDestination,
)
from server.apps.products.queries.allotment import (
    get_allotments_from_id_list,
    get_backward_allotments,
    get_contiguous_allotments,
)
from server.apps.products.tasks.availability_update.utils.availability_indexing_util import (
    create_availability_str_key,
)


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def update_avail_records_from_quotation_room(room: QuotationRoom):
    logging.info(f"Updating availability from quotation room {room.id}")
    allotment_records = get_allotments_from_id_list(room.allotments_id)
    for allotment_record in allotment_records:
        update_availability_records(allotment_record)


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def update_availability_records(allotment_record: ProductAllotment):
    update_allotment_availability_records(allotment_record)
    secondary_allotments = get_backward_allotments(allotment_record)
    for allotment in secondary_allotments:
        update_allotment_availability_records(allotment)


def update_allotment_availability_records(allotment_record: ProductAllotment):
    logging.info(f"Updating availability {allotment_record.id}")
    new_availability_records = calculate_new_availability(allotment_record)

    # update or insert the newly calculated records
    _upsert_valid_availability_records(new_availability_records)
    _delete_invalid_availability_records(allotment_record, new_availability_records)


def calculate_new_availability(
    allotment_record: ProductAllotment,
) -> List[ProductAvailability]:
    return _calculate_availability_combinations(allotment_record)


def _delete_invalid_availability_records(
    allotment_record: ProductAllotment, availability_records: List[ProductAvailability]
):
    valid_availability_keys = list(
        map(lambda x: x.availability_key, availability_records)
    )
    ProductAvailability.objects.filter(
        master_allotment_id=allotment_record.allotment_id
    ).filter(~Q(availability_key__in=valid_availability_keys)).delete()


def _upsert_valid_availability_records(
    availability_records: List[ProductAvailability],
):
    [_upsert_availability_record(record) for record in availability_records]  # noqa


def _upsert_availability_record(item: ProductAvailability):
    availability, created = ProductAvailability.objects.get_or_create(
        availability_key=item.availability_key,
        defaults={
            "availability_key": item.availability_key,
            "master_allotment_id": item.master_allotment_id,
            "allotments_id": item.allotments_id,
            "tot_allotments": item.tot_allotments,
            "product_id": item.product_id,
            "start_date_from": item.start_date_from.isoformat(),
            "start_date_to": item.start_date_to.isoformat(),
            "nights": item.nights,
            "days": item.days,
            "tot_adults": item.tot_adults,
            "adult_validators": item.adult_validators,
            "occupancy_code": item.occupancy_code,
            "price": item.price,
            "quantity_available": item.quantity_available,
            "quantity_total": item.quantity_total,
            "departure_option_type": item.departure_option_type,
            "departure_option_value": item.departure_option_value,
            "departure_option_display_name": item.departure_option_display_name,
            "destination_codes": item.destination_codes,
            "destinations_data": item.destinations_data,
        },
    )

    if created:
        logging.info(f"Availability {item.availability_key} created")
        return

    availability.product_id = item.product_id
    availability.start_date_from = item.start_date_from
    availability.start_date_to = item.start_date_to
    availability.nights = item.nights
    availability.days = item.days
    availability.tot_adults = item.tot_adults
    availability.adult_validators = item.adult_validators
    availability.quantity_total = item.quantity_total
    availability.quantity_available = item.quantity_available
    availability.price = item.price
    availability.departure_option_type = item.departure_option_type
    availability.departure_option_value = item.departure_option_value
    availability.departure_option_display_name = item.departure_option_display_name
    availability.destination_codes = item.destination_codes
    availability.destinations_data = item.destinations_data
    availability.save()
    logging.info(f"Availability {item.availability_key} updated")


def _calculate_availability_combinations(
    allotment_record: ProductAllotment,
) -> List[ProductAvailability]:
    combination_variables = [
        allotment_record.occupancies.all(),
        allotment_record.departure_options.all(),
    ]
    combinations = list(itertools.product(*combination_variables))  # type: ignore
    items = [
        _create_availability_items(allotment_record, combination[0], combination[1])
        for combination in combinations
    ]
    return list(itertools.chain(*items))


def _create_availability_items(
    allotment_record: ProductAllotment,
    occupancy: Occupancy,
    departure_option: DepartureOption,
) -> List[ProductAvailability]:
    allotments = get_contiguous_allotments(
        allotment_record,
        occupancy,
        departure_option,
        allotment_record.max_contiguous_allotment_nights,
    )
    allotment_combinations = [allotments[:x] for x in range(1, len(allotments) + 1)]
    return [
        _create_availability_item(
            allotment_record.product, allotments, occupancy, departure_option
        )
        for allotments in allotment_combinations
    ]


def _create_availability_item(
    product: Product,
    allotments: List[ProductAllotment],
    occupancy: Occupancy,
    departure_option: DepartureOption,
) -> ProductAvailability:
    allotment_master_record = allotments[0]
    logging.info(
        f"Elaborating availability record {allotment_master_record.allotment_id} | {str(occupancy)} | {str(departure_option)}"
    )
    item = ProductAvailability(
        master_allotment_id=allotment_master_record.allotment_id,
        allotments_id=_create_allotments_id(allotments),
        tot_allotments=len(allotments),
        product_id=allotment_master_record.product.product_id,
        start_date_from=allotment_master_record.start_date_from,
        start_date_to=allotment_master_record.start_date_to,
        nights=_get_tot_nights(allotments),
        days=_get_tot_days(allotments),
        tot_adults=occupancy.tot_adults,
        adult_validators=occupancy.adult_validators,
        occupancy_code=occupancy.occupancy_code,
        price=_get_tot_price(allotments),
        quantity_available=_calculate_availability_quantity_available(allotments),
        quantity_total=_calculate_availability_quantity_total(allotments),
        departure_option_type=departure_option.type,
        departure_option_value=departure_option.value,
        departure_option_display_name=departure_option.display_name,
        destination_codes=list(product.destinations.values_list("code", flat=True)),
        destinations_data=_serialize_destinations(list(product.destinations.all())),
    )
    item.availability_key = create_availability_str_key(item)
    return item


def _serialize_destinations(destinations: List[ProductDestination]) -> str:
    return json.dumps(
        [
            {"code": destination.code, "name": destination.name}
            for destination in destinations
        ]
    )


def _min_quantity_available(allotments: List[ProductAllotment]):
    availabilities = [
        _calculate_allotment_quantity_available(allotment) for allotment in allotments
    ]
    return min(availabilities)


def _calculate_availability_quantity_total(allotments: List[ProductAllotment]):
    return min(allotment.quantity for allotment in allotments)


def _calculate_availability_quantity_available(allotments: List[ProductAllotment]):
    available_quantities = [
        _calculate_allotment_quantity_available(allotment) for allotment in allotments
    ]
    return min(available_quantities)


def _calculate_allotment_quantity_available(allotment_record: ProductAllotment) -> int:
    # TODO: remove cross app dependency
    tot_optioned = (
        QuotationRoom.objects.filter(
            allotments_id__contains=[allotment_record.allotment_id]
        )
        .filter(optioned=True)
        .count()
    )
    return allotment_record.quantity - tot_optioned


def _create_allotments_id(allotments: List[ProductAllotment]):
    return [allotment.allotment_id for allotment in allotments]


def _get_tot_price(allotments: List[ProductAllotment]):
    return sum(allotment.price for allotment in allotments)


def _get_tot_nights(allotments: List[ProductAllotment]):
    return sum(allotment.nights for allotment in allotments)


def _get_tot_days(allotments: List[ProductAllotment]):
    return sum(allotment.days for allotment in allotments)
