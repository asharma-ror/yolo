from server.apps.orders.exceptions import InvalidPaymentGatewayError

from ..payment_gateways.base import PaymentGateway
from ..payment_gateways.paypal.gateway import PayPalPaymentGateway
from ..payment_gateways.stripe.gateway import StripePaymentGateway

STRIPE_PROVIDER_ID = "stripe"
PAY_PAL_PROVIDER_ID = "pay_pal"

_gateways = {
    STRIPE_PROVIDER_ID: lambda _: StripePaymentGateway(),
    PAY_PAL_PROVIDER_ID: lambda _: PayPalPaymentGateway(),
}


class PaymentGatewayFactory:
    def get(self, provider_id: str) -> PaymentGateway:
        gw_initializer = _gateways.get(provider_id.lower())
        if not gw_initializer:
            raise InvalidPaymentGatewayError(
                f"Cannot find {provider_id} payment gateway"
            )

        return gw_initializer(None)  # type: ignore


payment_gateway = PaymentGatewayFactory()
