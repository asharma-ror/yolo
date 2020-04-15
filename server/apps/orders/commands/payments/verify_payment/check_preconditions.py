from server.apps.orders.exceptions import InvalidPaymentAttemptStateError
from server.apps.orders.models import PaymentAttempt, PaymentStatus


def check_payment_attempt_preconditions(payment_attempt: PaymentAttempt):
    if payment_attempt.status != PaymentStatus.PENDING:
        raise InvalidPaymentAttemptStateError(
            f"Expecting {str(PaymentStatus.PENDING)} status but {str(payment_attempt.status)} was found"
        )
