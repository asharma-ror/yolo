from abc import abstractmethod

from server.apps.orders.types.payments import (
    PaymentInitInputData,
    PaymentInitOutputData,
    TransactionResult,
)


class PaymentGateway:
    @abstractmethod
    def initialize_session(
        self, payment_data: PaymentInitInputData
    ) -> PaymentInitOutputData:
        """pass"""

    @abstractmethod
    def verify_payment(self, payment_id: str) -> TransactionResult:
        """pass"""
