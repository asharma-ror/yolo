import json
from typing import List, Optional

from server.apps.orders.exceptions import InvalidRoomsCombinationError
from server.apps.orders.types.availability_validation_result import (
    AvailabilityCachedValidationResult,
)
from server.apps.products.models import ProductAvailability


def validate_cached_rooms_availability(
    availability_keys: List[str],
) -> AvailabilityCachedValidationResult:
    availability_items = _get_availability_items(availability_keys)

    _validate_rooms_combination(availability_items, availability_keys)

    for room in availability_items:
        if not _is_room_available(room, availability_items):
            return AvailabilityCachedValidationResult.unavailable(
                availability_items, []
            )

    return AvailabilityCachedValidationResult.available(availability_items)


def _validate_rooms_combination(
    availability_items: List[ProductAvailability], availability_keys: List[str]
):
    if len(availability_items) != len(availability_keys):
        raise InvalidRoomsCombinationError("Availability not found")

    distinct_travel_id = set(map(_generate_travel_id, availability_items))
    if len(distinct_travel_id) > 1:
        raise InvalidRoomsCombinationError(
            "All availability items should have the same travel parameters"
        )


def _generate_travel_id(availability_item: ProductAvailability) -> str:
    return json.dumps(
        {
            "product_id": availability_item.product_id,
            "nights": availability_item.nights,
            "days": availability_item.days,
            "start_date_from": availability_item.start_date_from.isoformat(),
            "start_date_to": availability_item.start_date_to.isoformat(),
            "departure_option_type": availability_item.departure_option_type,
            "departure_option_value": availability_item.departure_option_value,
        }
    )


def _is_room_available(room: ProductAvailability, all_rooms: List[ProductAvailability]):
    tot_room_of_this_type = len(
        [r for r in all_rooms if r.allotments_id == room.allotments_id]
    )
    return tot_room_of_this_type and room.quantity_available >= tot_room_of_this_type


def _get_availability_items(availability_keys: List[str]):
    availability_items = list(map(_get_availability_item, availability_keys))
    return [x for x in availability_items if x is not None]


def _get_availability_item(availability_key) -> Optional[ProductAvailability]:
    # todo: make sure that it is necessary to run query each time
    return ProductAvailability.objects.filter(availability_key=availability_key).first()
