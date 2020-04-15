from django.db import transaction

from server.apps.orders.exceptions import InvalidQuotationStatusError
from server.apps.orders.models import Quotation, QuotationRoom, QuotationStatus
from server.apps.orders.queries.quotation.quotation_queries import get_quotation


def set_quotation_expired(quotation_id: str) -> Quotation:
    with transaction.atomic():
        quotation = get_quotation(quotation_id)

        _validate_quotation_status(quotation)

        [_remove_room_option(room) for room in quotation.get_rooms()]  # noqa
        _set_expired_status(quotation)

        return quotation


def _validate_quotation_status(quotation: Quotation):
    if quotation.status not in {QuotationStatus.DRAFT, QuotationStatus.OPTIONED}:
        raise InvalidQuotationStatusError(
            f"Cannot set as expired quotation with {quotation.status} status"
        )


def _set_expired_status(quotation: Quotation):
    quotation.status = QuotationStatus.EXPIRED
    quotation.save()


def _remove_room_option(room: QuotationRoom):
    room.optioned = False
    room.save()
