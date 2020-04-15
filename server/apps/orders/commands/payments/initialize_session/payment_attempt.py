import json

from django.utils import timezone

from server.apps.orders.exceptions import InvalidPaymentAttemptStateError
from server.apps.orders.models import PaymentAttempt, PaymentStatus, PaymentType
from server.apps.orders.types.payments import (
    InitializePaymentSessionOutputType,
    PaymentContextData,
    PaymentInitInputData,
)


def initialize_payment_attempt(
    context: PaymentContextData, provider_id: str, data: PaymentInitInputData
):
    PaymentAttempt.objects.create(
        status=PaymentStatus.INITIALIZING,
        quotation_id=context.quotation_id,
        user_session_id=context.user_session_id,
        payment_session_id=context.payment_session_id,
        payment_method=data.method,
        payment_type=PaymentType.parse(data.type),
        payment_amount=data.amount,
        transaction_provider=provider_id,
        transaction_start_time=timezone.now(),
        # transaction_initialization_input=serialize_transaction_data(data),
    )


def set_payment_attempt_initialized(
    payment_session_id: str, data: InitializePaymentSessionOutputType
):
    attempt = PaymentAttempt.objects.get(payment_session_id=payment_session_id)
    if attempt.status != PaymentStatus.INITIALIZING:
        raise InvalidPaymentAttemptStateError(
            f"Expecting {str(PaymentStatus.INITIALIZING)} status but {str(attempt.status)} was found"
        )
    attempt.status = PaymentStatus.PENDING
    attempt.transaction_id = data.transaction_id
    attempt.transaction_initialization_output = json.dumps(
        {
            "provider_id": data.provider_id,
            "payment_session_id": data.payment_session_id,
            "payment_payload": data.payment_payload,
        }
    )
    attempt.save()


def set_payment_attempt_initiation_error(payment_session_id: str):
    attempt = PaymentAttempt.objects.get(payment_session_id=payment_session_id)
    attempt.status = PaymentStatus.ERROR
    attempt.save()
