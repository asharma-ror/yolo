# 1. Import the PayPal SDK client created in `Set up Server-Side SDK` section.
from datetime import datetime

from paypalcheckoutsdk.orders import OrdersCaptureRequest

from server.apps.orders.types.payments import TransactionResult

from ..client import PayPalClient


class CaptureOrder(PayPalClient):

    # 2. Set up your server to receive a call from the client
    """this sample function performs payment capture on the order. Approved order ID should be passed as an argument to this function"""

    def capture_order(self, order_id: str) -> TransactionResult:
        """Method to capture order using order_id"""
        request = OrdersCaptureRequest(order_id)
        # 3. Call PayPal to capture an order
        response = self.client.execute(request)
        # 4. Save the capture ID to your database. Implement logic to save capture to your database for future reference.
        capture = response.result.payments.captures[0]
        return TransactionResult(
            transaction_confirmed=response.result.status == "COMPLETED",
            transaction_time=datetime.fromisoformat(capture.create_time),
            payment_id=response.result.id,
            amount=float(capture.amount.value),
            data=response.result,
        )
