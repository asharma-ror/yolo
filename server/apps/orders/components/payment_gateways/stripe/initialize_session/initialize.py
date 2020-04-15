import stripe
from django.conf import settings

from server.apps.orders.exceptions import MissingRequiredParameter
from server.apps.orders.types.payments import (
    PaymentInitInputData,
    PaymentInitOutputData,
)

_STRIPE_PAYMENT_METHOD_TYPES = ["card"]  # noqa

# "automatic": Stripe automatically captures funds when the customer authorizes the payment
# "manual": Place a hold on the funds when the customer authorizes but they have to be captured later manually
_STRIPE_DEFAULT_CAPTURE_METHOD = "automatic"


def initialize_stripe_session(payment: PaymentInitInputData) -> PaymentInitOutputData:
    session = _create_stripe_session(payment)
    return PaymentInitOutputData(
        payload=session.to_dict(), payment_id=session.payment_intent
    )


def _create_stripe_session(payment: PaymentInitInputData):
    _check_required_parameters(payment)
    return stripe.checkout.Session.create(
        customer_email=payment.customer_email,
        payment_method_types=_STRIPE_PAYMENT_METHOD_TYPES,
        line_items=[
            {
                "name": payment.payload.get("productName"),
                "description": payment.payload.get("productDescription"),
                "images": payment.payload.get("productImages"),
                "amount": int(payment.amount * 100),
                "currency": payment.currency,
                "quantity": 1,
            }
        ],
        payment_intent_data={"capture_method": _STRIPE_DEFAULT_CAPTURE_METHOD},
        success_url=payment.success_url,
        cancel_url=payment.cancel_url,
        metadata={
            "paymentSessionId": payment.payment_session_id,
            "publicKey": settings.STRIPE_PUBLIC_KEY,
        },
    )


def _check_required_parameters(payment: PaymentInitInputData):
    _check_required_parameter(payment.payload, "productName")


def _check_required_parameter(payload: dict, parameter: str):  # type: ignore
    if parameter not in payload:
        raise MissingRequiredParameter(f"Missing payload parameter {parameter}")
