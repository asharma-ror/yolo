from server.apps.orders.components.payment_logger.base import PaymentLoggerProvider
from server.apps.orders.models import PaymentLog, PaymentLogType
from server.apps.orders.types.payments import PaymentContextData
from server.apps.orders.utils.transaction_utils import serialize_transaction_data


class DjangoPaymentLoggerProvider(PaymentLoggerProvider):
    def log_operation(
        self,
        level: PaymentLogType,
        operation_name: str,
        context: PaymentContextData,
        data,
        error,
    ) -> None:
        PaymentLog.objects.create(
            log_type=level,
            operation_name=operation_name,
            quotation_id=context.quotation_id,
            user_session_id=context.user_session_id,
            payment_session_id=context.payment_session_id,
            # data=serialize_transaction_data(data) if data else None,
            error=serialize_transaction_data(error) if error else None,
        )
