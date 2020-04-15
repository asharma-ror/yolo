from django.db import transaction

from server.apps.orders.models import Quotation
from server.apps.orders.queries.quotation import get_quotation

from ..common import update_quotation_price
from .add_to_room_quotation import add_ancillary_service_to_room_quotation


def add_ancillary_service_to_quotation(quotation_id: str, service_id: str) -> Quotation:

    quotation = get_quotation(quotation_id)

    with transaction.atomic():

        _add_service_to_quotation_rooms(quotation, service_id)

        update_quotation_price(quotation)

        quotation.save()

        return quotation


def _add_service_to_quotation_rooms(quotation: Quotation, service_id: str):
    [  # noqa
        add_ancillary_service_to_room_quotation(room, service_id)
        for room in quotation.get_rooms()
    ]
