import logging

import stripe
from django.conf import settings
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from stripe.error import SignatureVerificationError

from server.apps.orders.commands.reservations import process_reservation_payment
from server.apps.orders.components.payment_gateways.stripe.payment_verify.verify import (
    verify_stripe_payment,
)


@csrf_exempt
def stripe_webhook_view(request):
    logging.info("stripe payment webhook triggered")

    payload = request.body
    sig_header = request.META["HTTP_STRIPE_SIGNATURE"]
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_ENDPOINT_SECRET
        )
    except ValueError as e:
        logging.error("Invalid stripe payload", e)
        return HttpResponse(status=400)
    except SignatureVerificationError as e:
        logging.error("Invalid stripe signature", e)
        return HttpResponse(status=400)

    if event["type"] == "checkout.session.completed":
        _handle_checkout_completed_event(event["data"]["object"])
        logging.info("stripe payment webhook completed")
        return HttpResponse(status=200)

    logging.info(f"Unhandled stripe webhook call {event['type']}")
    return HttpResponse(status=200)


def _handle_checkout_completed_event(session) -> None:
    transaction_result = verify_stripe_payment(session.payment_intent)
    process_reservation_payment(
        session.metadata["paymentSessionId"], transaction_result,
    )
