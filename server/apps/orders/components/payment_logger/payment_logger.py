import logging
from typing import List

from server.apps.orders.components.payment_logger.base import PaymentLoggerProvider
from server.apps.orders.components.payment_logger.djngo_payment_logger.provider import (
    DjangoPaymentLoggerProvider,
)
from server.apps.orders.models import PaymentLogType
from server.apps.orders.types.payments import (
    PaymentContextData,
    PaymentInitInputData,
    PaymentInitOutputData,
)

PAYMENT_INIT_START_OPERATION_NAME = "payment_init_start"
PAYMENT_INIT_END_OPERATION_NAME = "payment_init_end"
PAYMENT_TRANSACTION_COMPLETED_OPERATION_NAME = "payment_transaction_completed"
PAYMENT_TRANSACTION_DECLINED_OPERATION_NAME = "payment_transaction_declined"
PAYMENT_TRANSACTION_ERROR_OPERATION_NAME = "payment_transaction_error"


class PaymentLogger:
    def __init__(self, providers: List[PaymentLoggerProvider]):
        self._providers = providers

    def log_initialization_start(
        self, context: PaymentContextData, data: PaymentInitInputData
    ):
        self._log_payment_operation_to_providers(
            level=PaymentLogType.INFO,
            operation_name=PAYMENT_INIT_START_OPERATION_NAME,
            context=context,
            data=data,
        )

    def log_initialization_completed(
        self, context: PaymentContextData, data: PaymentInitOutputData
    ):
        self._log_payment_operation_to_providers(
            level=PaymentLogType.INFO,
            operation_name=PAYMENT_INIT_END_OPERATION_NAME,
            context=context,
            data=data,
        )

    def log_initialization_error(self, context: PaymentContextData, error):
        self._log_payment_operation_to_providers(
            level=PaymentLogType.ERROR,
            operation_name=PAYMENT_INIT_END_OPERATION_NAME,
            context=context,
            error=error,
        )

    def log_transaction_completed(self, context: PaymentContextData, data):
        self._log_payment_operation_to_providers(
            level=PaymentLogType.INFO,
            operation_name=PAYMENT_TRANSACTION_COMPLETED_OPERATION_NAME,
            context=context,
            data=data,
        )

    def log_transaction_declined(self, context: PaymentContextData, data):
        self._log_payment_operation_to_providers(
            level=PaymentLogType.DECLINED,
            operation_name=PAYMENT_TRANSACTION_DECLINED_OPERATION_NAME,
            context=context,
            data=data,
        )

    def log_transaction_error(self, context: PaymentContextData, data, error):
        self._log_payment_operation_to_providers(
            level=PaymentLogType.ERROR,
            operation_name=PAYMENT_TRANSACTION_ERROR_OPERATION_NAME,
            context=context,
            data=data,
            error=error,
        )

    def _log_payment_operation_to_providers(
        self,
        level: PaymentLogType,
        operation_name: str,
        context: PaymentContextData,
        data=None,
        error=None,
    ):
        [  # noqa
            self._log_payment_operation(
                level=level,
                provider=provider,
                operation_name=operation_name,
                context=context,
                data=data,
                error=error,
            )
            for provider in self._providers
        ]

    def _log_payment_operation(
        self,
        level: PaymentLogType,
        provider: PaymentLoggerProvider,
        operation_name: str,
        context: PaymentContextData,
        data,
        error,
    ):
        try:
            provider.log_operation(
                level=level,
                operation_name=operation_name,
                context=context,
                data=data,
                error=error,
            )
        except Exception as e:
            logging.error(
                f"Error logging {operation_name} operation to provider {provider.name()} - PaymentSessionId: {context.payment_session_id}",
                e,
            )


payment_logger = PaymentLogger([DjangoPaymentLoggerProvider()])
