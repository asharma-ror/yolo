from typing import List

from django.db import transaction

from server.apps.orders.exceptions import (
    InvalidQuotationStatusError,
    RoomNotAvailableError,
)
from server.apps.orders.models import Quotation, QuotationRoom, QuotationStatus
from server.apps.orders.queries.quotation.quotation_queries import get_quotation

from ..common.validate_realtime_rooms_availability import (
    validate_realtime_rooms_availability,
)
from ..validate_customer_data.validate_data import validate_customer_data
from ..validate_passengers_data.validate_data import validate_passengers_data


def option_quotation(quotation_id: str) -> Quotation:
    with transaction.atomic():
        quotation = get_quotation(quotation_id)
        return create_quotation_option(quotation)


def create_quotation_option(quotation: Quotation) -> Quotation:
    _validate_quotation_status(quotation)

    validate_customer_data(quotation)
    validate_passengers_data(quotation)
    _validate_realtime_availability(quotation)

    [_option_room(room) for room in quotation.get_rooms()]  # noqa
    _set_optioned_status(quotation)

    return quotation


def _validate_realtime_availability(quotation: Quotation):
    rooms = list(quotation.get_rooms())
    allotment_indexes = list(range(0, rooms[0].tot_allotments))
    for allotment_index in allotment_indexes:
        _validate_realtime_room_availability(rooms, allotment_index)


def _validate_realtime_room_availability(
    rooms: List[QuotationRoom], allotment_index: int
):
    rooms_allotment_id = list(
        map(lambda room: room.allotments_id[allotment_index], rooms)
    )
    if not validate_realtime_rooms_availability(rooms_allotment_id):
        raise RoomNotAvailableError()


def _validate_quotation_status(quotation: Quotation):
    if quotation.status not in {QuotationStatus.DRAFT, QuotationStatus.EXPIRED}:
        raise InvalidQuotationStatusError(
            f"Cannot option quotation with {QuotationStatus.get_name(quotation.status)} status"
        )


def _set_optioned_status(quotation: Quotation):
    quotation.status = QuotationStatus.OPTIONED
    quotation.save()


def _option_room(room: QuotationRoom):
    room.optioned = True
    room.save()
