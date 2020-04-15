from django.db import transaction
from django.db.models import Q

from server.apps.orders.commands.quotation.common import (
    update_quotation_price,
    update_room_price,
)
from server.apps.orders.exceptions import DiscountTicketNotFoundError
from server.apps.orders.models import Quotation, QuotationRoom, QuotationService
from server.apps.orders.queries.quotation import get_quotation
from server.apps.orders.utils.quotation_services_util import (
    get_discount_quotation_service_type,
)


def remove_discount_ticket_from_quotation(
    quotation_id: str, discount_code: str
) -> Quotation:
    quotation = get_quotation(quotation_id)

    with transaction.atomic():

        room = quotation.get_room(0)

        discount = _get_discount_service(room, discount_code)

        discount.delete()

        update_room_price(room)

        room.save()

        update_quotation_price(quotation)

        quotation.save()

        return quotation


def _get_discount_service(room: QuotationRoom, discount_code: str) -> QuotationService:
    service = _get_discount_service_from_room(room, discount_code)
    if not service:
        raise DiscountTicketNotFoundError()

    return service


def _get_discount_service_from_room(
    room: QuotationRoom, discount_code: str
) -> QuotationService:
    return QuotationService.objects.filter(
        Q(room=room)
        & Q(service_type=get_discount_quotation_service_type())
        & Q(service_id__iexact=discount_code)
    ).first()
