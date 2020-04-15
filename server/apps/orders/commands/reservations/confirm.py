import logging

from django.db import transaction
from django.db.models import Q

from server.apps.orders.commands.quotation import create_quotation_option
from server.apps.orders.exceptions import (
    InvalidPaymentAttemptStateError,
    InvalidQuotationStatusError,
)
from server.apps.orders.models import (
    DiscountTicket,
    Payment,
    PaymentAttempt,
    PaymentStatus,
    Quotation,
    QuotationService,
    QuotationStatus,
    Reservation,
)
from server.apps.orders.queries.payments.payment_queries import get_payment_attempt
from server.apps.orders.queries.quotation import get_quotation
from server.apps.orders.utils.quotation_services_util import (
    get_discount_quotation_service_type,
)
from server.apps.orders.utils.reservations_util import (
    generate_random_reservation_number,
)


def confirm_reservation(quotation_id: str, payment_session_id: str) -> Reservation:
    with transaction.atomic():
        logging.info(
            f"Confirming reservation {quotation_id} (Payment: {payment_session_id})"
        )

        quotation = get_quotation(quotation_id)
        payment_attempt = get_payment_attempt(payment_session_id)

        _check_payment_attempt_preconditions(payment_attempt)
        _ensure_quotation_preconditions(quotation)

        reservation = _create_reservation(quotation)
        _create_payment(reservation, payment_attempt)
        _associate_discount_ticket(reservation)
        _set_confirmed_status(quotation)

        logging.info(f"Reservation confirmed {quotation.quotation_id}")

        return reservation


def _associate_discount_ticket(reservation: Reservation):
    discount_service = QuotationService.objects.filter(
        Q(room=reservation.quotation.get_room(0))
        & Q(service_type=get_discount_quotation_service_type())
    ).first()

    if not discount_service:
        return

    DiscountTicket.objects.filter(code__iexact=discount_service.service_id).update(
        reservation_id=reservation.reservation_id
    )


def _create_reservation(quotation: Quotation) -> Reservation:
    return Reservation.objects.create(
        quotation=quotation, reservation_id=generate_random_reservation_number()
    )


def _create_payment(
    reservation: Reservation, payment_attempt: PaymentAttempt
) -> Payment:
    return Payment.objects.create(
        reservation=reservation,
        user_session_id=payment_attempt.user_session_id,
        payment_session_id=payment_attempt.payment_session_id,
        payment_method=payment_attempt.payment_method,
        payment_type=payment_attempt.payment_type,
        payment_amount=payment_attempt.payment_amount,
        transaction_provider=payment_attempt.transaction_provider,
        transaction_id=payment_attempt.transaction_id,
        transaction_time=payment_attempt.transaction_end_time,
    )


def _set_confirmed_status(quotation: Quotation):
    quotation.status = QuotationStatus.CONFIRMED
    quotation.save()


def _check_payment_attempt_preconditions(payment_attempt: PaymentAttempt):
    if payment_attempt.status != PaymentStatus.SUCCEEDED:
        raise InvalidPaymentAttemptStateError(
            f"Invalid payment attempt status {str(payment_attempt.status)}"
        )


def _ensure_quotation_preconditions(quotation: Quotation):
    if quotation.status == QuotationStatus.EXPIRED:
        create_quotation_option(quotation)

    if quotation.status != QuotationStatus.OPTIONED:
        raise InvalidQuotationStatusError(
            f"Invalid quotation status {str(quotation.status)}"
        )
