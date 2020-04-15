import logging

from server.apps.orders.components import payment_logger
from server.apps.orders.exceptions import (
    PaymentTransactionDeclined,
    PaymentTransactionError,
)
from server.apps.orders.models import PaymentAttempt
from server.apps.orders.queries.payments.payment_queries import get_payment_attempt
from server.apps.orders.types.payments import TransactionResult
from server.apps.orders.utils.transaction_utils import serialize_transaction_data

from .check_preconditions import check_payment_attempt_preconditions
from .payment_attempt import (
    update_payment_attempt_declined,
    update_payment_attempt_error,
    update_payment_attempt_success,
)


def verify_payment(
    payment_session_id: str, transaction_data: TransactionResult
) -> PaymentAttempt:
    logging.info(f"Confirming payment session {payment_session_id}")

    payment_attempt = get_payment_attempt(payment_session_id)

    try:  # noqa
        check_payment_attempt_preconditions(payment_attempt)

        if transaction_data.transaction_confirmed:
            return _confirm_payment(payment_attempt, transaction_data)

        _decline_payment(payment_attempt, transaction_data)
        raise PaymentTransactionDeclined(
            f"Payment declined -> {serialize_transaction_data(transaction_data)}"
        )
    except PaymentTransactionDeclined:  # noqa
        raise
    except Exception as e:
        _handle_payment_error(payment_attempt, transaction_data, e)
        raise PaymentTransactionError from e


def _handle_payment_error(
    payment_attempt: PaymentAttempt,
    transaction_data: TransactionResult,
    error: Exception,
) -> None:
    logging.error(
        f"Payment confirmation error {payment_attempt.payment_session_id}", error
    )
    update_payment_attempt_error(payment_attempt, transaction_data, error)
    payment_logger.log_transaction_error(
        payment_attempt.get_context_data(), transaction_data, error
    )


def _decline_payment(
    payment_attempt: PaymentAttempt, transaction_data: TransactionResult
) -> PaymentAttempt:
    update_payment_attempt_declined(payment_attempt, transaction_data)
    payment_logger.log_transaction_declined(
        payment_attempt.get_context_data(), transaction_data
    )
    logging.info(f"Payment session declined {payment_attempt.payment_session_id}")
    return payment_attempt


def _confirm_payment(
    payment_attempt: PaymentAttempt, transaction_data: TransactionResult
) -> PaymentAttempt:
    update_payment_attempt_success(payment_attempt, transaction_data)
    payment_logger.log_transaction_completed(
        payment_attempt.get_context_data(), transaction_data
    )
    logging.info(f"Payment session confirmed {payment_attempt.payment_session_id}")
    return payment_attempt
