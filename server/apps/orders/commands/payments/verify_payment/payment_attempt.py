from server.apps.orders.models import PaymentAttempt, PaymentStatus
from server.apps.orders.types.payments import TransactionResult
from server.apps.orders.utils.transaction_utils import serialize_transaction_data


def update_payment_attempt_success(
    payment_attempt: PaymentAttempt, transaction_data: TransactionResult
):
    _update_payment_attempt(payment_attempt, transaction_data, PaymentStatus.SUCCEEDED)


def update_payment_attempt_declined(
    payment_attempt: PaymentAttempt, transaction_data: TransactionResult
):
    _update_payment_attempt(payment_attempt, transaction_data, PaymentStatus.DECLINED)


def update_payment_attempt_error(
    payment_attempt: PaymentAttempt, transaction_data: TransactionResult, error
):
    _update_payment_attempt(
        payment_attempt, transaction_data, PaymentStatus.ERROR, error
    )


def _update_payment_attempt(
    payment_attempt: PaymentAttempt,
    transaction_data: TransactionResult,
    status: PaymentStatus,
    error=None,
) -> None:
    payment_attempt.status = status
    payment_attempt.transaction_end_time = transaction_data.transaction_time
    payment_attempt.transaction_id = transaction_data.payment_id
    payment_attempt.transaction_verification_output = serialize_transaction_data(
        transaction_data.data
    )
    payment_attempt.payment_error = serialize_transaction_data(error)
    payment_attempt.save()
