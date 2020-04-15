from typing import List

from django.utils.translation import gettext_lazy

from server.apps.orders.exceptions import AllotmentsNotFoundError
from server.apps.orders.models import (
    PriceType,
    QuantityType,
    Quotation,
    QuotationAdditionalService,
    QuotationRoom,
    QuotationService,
    SelectionType,
)
from server.apps.orders.utils.quotation_services_util import (
    get_ancillary_quotation_service_type,
    get_base_price_quotation_service_type,
)
from server.apps.products.models import (
    AncillaryService,
    ProductAllotment,
    ProductAvailability,
    ServiceSelectionType,
)
from server.apps.products.queries.ancillary_services import get_ancillary_services

from ..common.calculate_room_price import calculate_room_price
from .create_passengers import create_room_passengers


def create_room_quotation(
    quotation: Quotation, availability_item: ProductAvailability, room_index: int
) -> QuotationRoom:
    room_quotation = QuotationRoom.objects.create(
        quotation=quotation,
        room_index=room_index,
        room_price=0,
        room_discount=0,
        master_allotment_id=availability_item.master_allotment_id,
        allotments_id=availability_item.allotments_id,
        tot_allotments=availability_item.tot_allotments,
        availability_key=availability_item.availability_key,
        tot_adults=availability_item.tot_adults,
        occupancy_code=availability_item.occupancy_code,
        optioned=False,
    )

    create_room_passengers(room_quotation, availability_item)

    _create_optional_services(room=room_quotation)

    quotation_services = _get_quotation_services(
        room=room_quotation, availability_item=availability_item
    )
    price = calculate_room_price(quotation_services, availability_item.tot_adults)

    room_quotation.room_price = price.get_total_amount()
    room_quotation.room_discount = price.get_discount_amount()
    room_quotation.save()

    return room_quotation


def _create_optional_services(room: QuotationRoom) -> List[QuotationAdditionalService]:
    services = get_ancillary_services(
        allotment_id=room.master_allotment_id,
        selection_types=[ServiceSelectionType.OPTIONAL],
    )
    return [_create_quotation_optional_service(room, service) for service in services]


def _create_quotation_optional_service(
    room: QuotationRoom, ancillary_service: AncillaryService
):
    return QuotationAdditionalService.objects.create(
        name=ancillary_service.name,
        room=room,
        price_type=PriceType.get(ancillary_service.price_type),
        price=ancillary_service.price,
        priority=ancillary_service.priority,
        quantity_type=QuantityType.get(ancillary_service.quantity_type),
        service_id=ancillary_service.service_id,
    )


def _get_quotation_services(
    room: QuotationRoom, availability_item: ProductAvailability
) -> List[QuotationService]:
    return [
        _create_base_price_service(room=room, availability_item=availability_item),
        *_get_automatic_services(room=room),
    ]


def _get_automatic_services(room: QuotationRoom) -> List[QuotationService]:
    services = get_ancillary_services(
        allotment_id=room.master_allotment_id,
        selection_types=[ServiceSelectionType.AUTOMATIC],
    )
    return [
        _create_ancillary_quotation_service(room=room, ancillary_service=service)
        for service in services
    ]


def _create_ancillary_quotation_service(
    room: QuotationRoom, ancillary_service: AncillaryService
):
    return QuotationService.objects.create(
        name=ancillary_service.name,
        room=room,
        price_type=PriceType.get(ancillary_service.price_type),
        price=ancillary_service.price,
        priority=ancillary_service.priority,
        quantity_type=QuantityType.get(ancillary_service.quantity_type),
        quantity=room.tot_adults
        if ancillary_service.quantity_type == QuantityType.PER_PERSON
        else 1,
        service_id=ancillary_service.service_id,
        service_type=get_ancillary_quotation_service_type(),
    )


def _create_base_price_service(
    room: QuotationRoom, availability_item: ProductAvailability
) -> QuotationService:
    allotments = _get_allotments(availability_item)
    return QuotationService.objects.create(
        name=gettext_lazy("base_price"),
        room=room,
        price_type=PriceType.TOTAL,
        price=sum(allotment.price for allotment in allotments),
        priority=0,
        quantity_type=QuantityType.PER_ROOM,
        quantity=1,
        service_type=get_base_price_quotation_service_type(),
        selection_type=SelectionType.AUTOMATIC,
        service_id="",
    )


def _get_allotments(availability_item: ProductAvailability) -> List[ProductAllotment]:
    allotments = ProductAllotment.objects.filter(
        allotment_id__in=availability_item.allotments_id
    ).all()
    if len(availability_item.allotments_id) != len(allotments):
        raise AllotmentsNotFoundError(
            f"Allotments not found for allotments {', '.join(availability_item.allotments_id)}"
        )
    return allotments
