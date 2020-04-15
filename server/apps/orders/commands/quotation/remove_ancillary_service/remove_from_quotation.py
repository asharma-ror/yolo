from django.db import transaction

from server.apps.orders.models import Quotation
from server.apps.orders.queries.quotation.quotation_queries import get_quotation

from ..common.update_quotation_price import update_quotation_price
from ..remove_ancillary_service.remove_from_room_quotation import (
    remove_ancillary_service_from_room_quotation,
)


def remove_ancillary_service_from_quotation(
    quotation_id: str, service_id: str
) -> Quotation:

    quotation = get_quotation(quotation_id)

    with transaction.atomic():

        _remove_service_from_quotation_rooms(quotation, service_id)

        update_quotation_price(quotation)

        quotation.save()

        return quotation


def _remove_service_from_quotation_rooms(quotation: Quotation, service_id: str):
    [  # noqa
        remove_ancillary_service_from_room_quotation(room, service_id)
        for room in quotation.get_rooms()
    ]
