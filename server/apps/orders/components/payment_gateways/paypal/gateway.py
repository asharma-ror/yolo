from server.apps.orders.components.payment_gateways.base import PaymentGateway
from server.apps.orders.components.payment_gateways.paypal.capture_order.capture import (
    CaptureOrder,
)
from server.apps.orders.components.payment_gateways.paypal.create_order.create import (
    CreateOrder,
)
from server.apps.orders.types.payments import (
    PaymentInitInputData,
    PaymentInitOutputData,
    TransactionResult,
)


class PayPalPaymentGateway(PaymentGateway):
    def initialize_session(
        self, payment_data: PaymentInitInputData
    ) -> PaymentInitOutputData:
        return CreateOrder().create_order(payment_data)  # type: ignore

    def verify_payment(self, payment_id: str) -> TransactionResult:
        return CaptureOrder().capture_order(payment_id)  # type: ignore
