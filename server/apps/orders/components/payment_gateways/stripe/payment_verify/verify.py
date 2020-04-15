from datetime import datetime

import stripe

from server.apps.orders.exceptions import PaymentNotFoundError
from server.apps.orders.types.payments import TransactionResult


def verify_stripe_payment(payment_id: str) -> TransactionResult:
    payment_intent = stripe.PaymentIntent.retrieve(payment_id)
    if not payment_intent:
        raise PaymentNotFoundError(f"Stripe Payment {payment_id} not found")

    return TransactionResult(
        transaction_confirmed=payment_intent.status == "succeeded",
        payment_id=payment_intent.id,
        transaction_time=datetime.utcfromtimestamp(payment_intent.created),
        amount=payment_intent.amount * 100,
        data=payment_intent,
    )
