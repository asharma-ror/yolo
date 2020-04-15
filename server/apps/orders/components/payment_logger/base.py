from abc import abstractmethod

from server.apps.orders.models import PaymentLogType
from server.apps.orders.types.payments import PaymentContextData


class PaymentLoggerProvider:
    def name(self) -> str:
        return self.__class__.__name__

    @abstractmethod
    def log_operation(
        self,
        level: PaymentLogType,
        operation_name: str,
        context: PaymentContextData,
        data,
        error,
    ):
        """todo: doc this"""
