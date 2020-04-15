import logging
from datetime import timedelta
from decimal import Decimal
from typing import Any

from django.db.models import Q, QuerySet
from django.utils import timezone
from funcy import log_calls, log_errors

from server.apps.orders.models import Customer, Quotation, QuotationStatus

# constants
DRAFT_QUOTE_AGE = timedelta(hours=2)
OPTIONED_QUOTE_AGE = timedelta(minutes=30)


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def get_quotation(quotation_id: str) -> Quotation:
    return Quotation.objects.get(quotation_id__iexact=quotation_id)


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def get_quotation_from_payment(payment_session_id: str) -> Quotation:
    return Quotation.objects.get(
        reservation__payment__payment_session_id=payment_session_id
    )


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def get_quotation_status(quotation_id: str) -> QuotationStatus:
    return _get_quotation_scalar_value(quotation_id=quotation_id, column_name="status")


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def get_quotation_total_price(quotation_id: str) -> Decimal:
    return _get_quotation_scalar_value(
        quotation_id=quotation_id, column_name="total_price"
    )


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def get_quotation_deposit_price(quotation_id: str) -> Decimal:
    return _get_quotation_scalar_value(
        quotation_id=quotation_id, column_name="deposit_price"
    )


def _get_quotation_scalar_value(quotation_id: str, column_name: str) -> Any:
    return (
        Quotation.objects.filter(quotation_id__iexact=quotation_id)
        .values_list(column_name, flat=True)
        .get()
    )


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def get_quotation_customer_email(quotation_id: str) -> str:
    return (
        Customer.objects.filter(quotation__quotation_id__exact=quotation_id)
        .values_list("email", flat=True)
        .get()
    )


def get_expired() -> "QuerySet[Quotation]":
    return Quotation.objects.filter(
        Q(modified__lt=timezone.now() - DRAFT_QUOTE_AGE, status=QuotationStatus.DRAFT)
        | Q(
            modified__lt=timezone.now() - OPTIONED_QUOTE_AGE,
            status=QuotationStatus.OPTIONED,
        )
    )
