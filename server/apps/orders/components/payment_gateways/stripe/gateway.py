import stripe
from django.conf import settings

from server.apps.orders.types.payments import (
    PaymentInitInputData,
    PaymentInitOutputData,
    TransactionResult,
)

from ...payment_gateways.base import PaymentGateway
from .initialize_session.initialize import initialize_stripe_session
from .payment_verify.verify import verify_stripe_payment

stripe.api_key = settings.STRIPE_SECRET_KEY


class StripePaymentGateway(PaymentGateway):
    def initialize_session(
        self, payment_data: PaymentInitInputData
    ) -> PaymentInitOutputData:
        return initialize_stripe_session(payment_data)

    def verify_payment(self, payment_id: str) -> TransactionResult:
        return verify_stripe_payment(payment_id)
