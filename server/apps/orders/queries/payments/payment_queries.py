from server.apps.orders.models import PaymentAttempt, PaymentStatus


def get_payment_attempt(payment_session_id: str) -> PaymentAttempt:
    return PaymentAttempt.objects.get(payment_session_id=payment_session_id)


def get_payment_attempt_status(payment_session_id: str) -> PaymentStatus:
    return (
        PaymentAttempt.objects.filter(payment_session_id=payment_session_id)
        .values_list("status", flat=True)
        .get()
    )


def get_payment_attempt_quotation_id(payment_session_id: str) -> str:
    return (
        PaymentAttempt.objects.filter(payment_session_id=payment_session_id)
        .values_list("quotation_id", flat=True)
        .get()
    )
