from server.apps.orders.commands.reservations import process_reservation_payment
from server.apps.orders.components import payment_gateway
from server.apps.orders.exceptions import (
    InvalidPaymentAttemptStateError,
    InvalidQuotationStatusError,
)
from server.apps.orders.models import PaymentStatus, QuotationStatus, Reservation
from server.apps.orders.queries.payments import (
    get_payment_attempt,
    get_payment_attempt_quotation_id,
    get_payment_attempt_status,
)
from server.apps.orders.queries.quotation import get_quotation_status
from server.apps.orders.queries.reservations import get_reservation_from_payment


def verify_reservation(payment_session_id: str) -> Reservation:
    _ensure_success_payment(payment_session_id)
    _verify_quotation_status(payment_session_id)
    return get_reservation_from_payment(payment_session_id)


def _verify_quotation_status(payment_session_id: str):
    quotation_id = get_payment_attempt_quotation_id(payment_session_id)
    status = get_quotation_status(quotation_id)
    if status != QuotationStatus.CONFIRMED:
        raise InvalidQuotationStatusError(f"Invalid quotation status -> {str(status)}")


def _ensure_success_payment(payment_session_id: str):
    status = get_payment_attempt_status(payment_session_id)
    if status == PaymentStatus.SUCCEEDED:
        return

    if status == PaymentStatus.PENDING:
        _verify_pending_payment(payment_session_id)
        return

    raise InvalidPaymentAttemptStateError(
        f"Invalid payment attempt state {str(status)}"
    )


def _verify_pending_payment(payment_session_id: str):
    payment_session = get_payment_attempt(payment_session_id)
    if not payment_session.transaction_id:
        raise Exception(
            f"Payment doesn't have a transaction associated {payment_session}"
        )
    transaction_data = payment_gateway.get(
        payment_session.transaction_provider
    ).verify_payment(payment_session.transaction_id)
    process_reservation_payment(payment_session_id, transaction_data)
