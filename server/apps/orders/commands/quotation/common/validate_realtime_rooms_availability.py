from typing import List

from server.apps.orders.exceptions import InconsistentAvailabilityStateError
from server.apps.orders.models import QuotationRoom
from server.apps.orders.types.availability_validation_result import (
    AvailabilityRealtimeValidationResult,
)
from server.apps.products.models import ProductAllotment


def validate_realtime_rooms_availability(
    rooms_allotment_id: List[str],
) -> AvailabilityRealtimeValidationResult:
    distinct_allotments_id = list(set(rooms_allotment_id))

    for allotment_id in distinct_allotments_id:
        tot_rooms_of_this_type = rooms_allotment_id.count(allotment_id)
        if not _is_room_available(allotment_id, tot_rooms_of_this_type):
            return AvailabilityRealtimeValidationResult.unavailable([])

    return AvailabilityRealtimeValidationResult.available()


def _is_room_available(allotment_id: str, rooms_of_this_type: int) -> bool:
    allotment = ProductAllotment.objects.filter(allotment_id=allotment_id).get()
    tot_optioned_rooms_of_this_type = QuotationRoom.objects.filter(
        allotments_id__contains=[allotment_id]
    ).count()
    tot_available_rooms_of_this_type = (
        allotment.quantity - tot_optioned_rooms_of_this_type
    )
    if tot_available_rooms_of_this_type < 0:
        raise InconsistentAvailabilityStateError()
    return tot_available_rooms_of_this_type >= rooms_of_this_type
