# 1. Import the PayPal SDK client that was created in `Set up Server-Side SDK`.
from paypalcheckoutsdk.orders import OrdersCreateRequest

from server.apps.orders.types.payments import (
    PaymentInitInputData,
    PaymentInitOutputData,
)

from ..client import PayPalClient


class CreateOrder(PayPalClient):

    # 2. Set up your server to receive a call from the client
    """ This is the sample function to create an order. It uses the
    JSON body returned by buildRequestBody() to create a new order."""

    def create_order(self, payment_data: PaymentInitInputData) -> PaymentInitOutputData:
        request = OrdersCreateRequest()
        request.prefer("return=representation")
        # 3. Call PayPal to set up a transaction
        request.request_body(self.build_request_body(payment_data))
        response = self.client.execute(request)
        return PaymentInitOutputData(
            payment_id=response.result.id, payload=response.result.dict(),
        )

    @staticmethod
    def build_request_body(payment_data: PaymentInitInputData):
        """Method to create body with CAPTURE intent"""
        # """Setting up the JSON request body for creating the order.
        # Set the intent in the request body to "CAPTURE" for capture intent flow."""
        return {
            "intent": "CAPTURE",
            "application_context": {
                "return_url": payment_data.success_url,
                "cancel_url": payment_data.cancel_url,
                "brand_name": "Where I Go S.r.l",
                "locale": "it-IT",
                "shipping_preference": "NO_SHIPPING",
                "client_configuration": {
                    "integration_artifact": "PAYPAL_JS_SDK",
                    "experience": {
                        "user_experience_flow": "FULL_PAGE_REDIRECT",
                        "entry_point": "PAY_WITH_PAYPAL",
                        "channel": "WEB",
                        "product_flow": "HERMES",
                    },
                },
            },
            "purchase_units": [
                {
                    "reference_id": payment_data.payment_session_id,
                    "description": payment_data.payload.get("productDescription"),
                    "amount": {
                        "currency_code": "EUR",
                        "value": str(payment_data.amount),
                    },
                }
            ],
        }
