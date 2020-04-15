import json
import logging
from decimal import Decimal

from server.apps.orders.components import payment_logger
from server.apps.orders.components.payment_gateways import payment_gateway
from server.apps.orders.exceptions import PaymentInitializationError
from server.apps.orders.models import PaymentType
from server.apps.orders.queries.quotation.quotation_queries import (
    get_quotation_customer_email,
    get_quotation_deposit_price,
    get_quotation_total_price,
)
from server.apps.orders.types.payments import (
    InitializePaymentSessionInputType,
    InitializePaymentSessionOutputType,
    PaymentContextData,
    PaymentInitInputData,
    PaymentInitOutputData,
)
from server.apps.orders.utils.payment_utils import (
    build_success_url,
    generate_payment_session_id,
)

from .check_preconditions import check_quotation_preconditions
from .payment_attempt import (
    initialize_payment_attempt,
    set_payment_attempt_initialized,
    set_payment_attempt_initiation_error,
)


def initialize_payment_session(
    payment_input_data: InitializePaymentSessionInputType,
) -> InitializePaymentSessionOutputType:
    check_quotation_preconditions(payment_input_data)

    context = _generate_context_data(payment_input_data)
    logging.info(f"Initializing payment session {context.payment_session_id}")

    payment_init_input = _to_payment_init_input_data(context, payment_input_data)
    payment_logger.log_initialization_start(context, payment_init_input)

    try:  # noqa : longer try block
        initialize_payment_attempt(
            context=context,
            provider_id=payment_input_data.provider_id,
            data=payment_init_input,
        )

        gw_output = _initialize_gateway_session(
            payment_input_data.provider_id, payment_init_input
        )
        payment_init_result = _to_payment_init_output_data(
            context=context,
            payment_input_data=payment_input_data,
            gateway_input_data=payment_init_input,
            gateway_output_data=gw_output,
        )

        payment_logger.log_initialization_completed(context, payment_init_result)
        set_payment_attempt_initialized(
            payment_session_id=context.payment_session_id, data=payment_init_result
        )

        return payment_init_result
    except Exception as e:
        logging.error(
            f"Error initializing payment session {context.payment_session_id}", e
        )
        payment_logger.log_initialization_error(context, e)
        set_payment_attempt_initiation_error(context.payment_session_id)
        raise PaymentInitializationError from e


def _initialize_gateway_session(
    provider_id: str, payment_data: PaymentInitInputData
) -> PaymentInitOutputData:
    gateway = payment_gateway.get(provider_id)
    return gateway.initialize_session(payment_data)


def _to_payment_init_output_data(
    context: PaymentContextData,
    payment_input_data: InitializePaymentSessionInputType,
    gateway_input_data: PaymentInitInputData,
    gateway_output_data: PaymentInitOutputData,
) -> InitializePaymentSessionOutputType:
    return InitializePaymentSessionOutputType(
        provider_id=payment_input_data.provider_id,
        payment_payload=json.dumps(gateway_output_data.payload),
        payment_session_id=context.payment_session_id,
        payment_amount=gateway_input_data.amount,
        payment_success_url=gateway_input_data.success_url,
        payment_cancel_url=gateway_input_data.cancel_url,
        transaction_id=gateway_output_data.payment_id,
    )


def _to_payment_init_input_data(
    context: PaymentContextData, payment_input_data: InitializePaymentSessionInputType
) -> PaymentInitInputData:
    return PaymentInitInputData(
        customer_email=get_quotation_customer_email(payment_input_data.quotation_id),
        amount=_get_payment_amount(
            context.quotation_id, payment_input_data.payment.type
        ),
        currency="eur",
        payload=json.loads(str(payment_input_data.payment.payload)),
        payment_session_id=context.payment_session_id,
        type=str(payment_input_data.payment.type),
        method=str(payment_input_data.payment.method),
        success_url=build_success_url(
            payment_input_data.payment_success_base_url, context.payment_session_id
        ),
        cancel_url=payment_input_data.payment_cancel_base_url,
    )


def _get_payment_amount(quotation_id: str, payment_type: str) -> Decimal:
    if PaymentType.parse(payment_type) == PaymentType.FULL_AMOUNT:
        return get_quotation_total_price(quotation_id)

    if PaymentType.parse(payment_type) == PaymentType.DEPOSIT:
        return get_quotation_deposit_price(quotation_id)

    raise NotImplementedError(f"Payment type {payment_type} not implemented")


def _generate_context_data(
    payment_input_data: InitializePaymentSessionInputType,
) -> PaymentContextData:
    return PaymentContextData(
        quotation_id=str(payment_input_data.quotation_id),
        user_session_id="",
        payment_session_id=generate_payment_session_id(),
    )
