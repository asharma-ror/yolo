from django.db import transaction

from server.apps.orders.commands.quotation.common import (
    update_quotation_price,
    update_room_price,
)
from server.apps.orders.exceptions import (
    DiscountTicketAlreadyAddedError,
    DiscountTicketAlreadyUsedError,
    DiscountTicketNotFoundError,
)
from server.apps.orders.models import (
    DiscountTicket,
    QuantityType,
    Quotation,
    QuotationRoom,
    QuotationService,
    SelectionType,
)
from server.apps.orders.queries.promo import get_discount_ticket
from server.apps.orders.queries.quotation import get_quotation
from server.apps.orders.utils.quotation_services_util import (
    get_discount_quotation_service_type,
)


def add_discount_ticket_to_quotation(
    quotation_id: str, discount_code: str
) -> Quotation:
    quotation = get_quotation(quotation_id)

    with transaction.atomic():
        _validate_quotation(quotation)

        discount = _validate_discount(discount_code)

        room = quotation.get_room(0)

        _add_discount_to_room(discount, room)

        update_room_price(room)

        room.save()

        update_quotation_price(quotation)

        quotation.save()

        return quotation


def _add_discount_to_room(discount: DiscountTicket, room: QuotationRoom):
    return QuotationService.objects.create(
        name="Discount code",
        room=room,
        price_type=discount.amount_type,
        price=-discount.amount,
        priority=discount.priority,
        quantity_type=QuantityType.PER_RESERVATION,
        quantity=1,
        selection_type=SelectionType.OPTIONAL,
        service_type=get_discount_quotation_service_type(),
        service_id=discount.code,
    )


def _validate_quotation(quotation: Quotation):
    if quotation.total_discount > 0:
        raise DiscountTicketAlreadyAddedError()


def _validate_discount(discount_code: str) -> DiscountTicket:
    discount = get_discount_ticket(discount_code)
    if not discount:
        raise DiscountTicketNotFoundError()

    if discount.reservation_id:
        raise DiscountTicketAlreadyUsedError()

    return discount
