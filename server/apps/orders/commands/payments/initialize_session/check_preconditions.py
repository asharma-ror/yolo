from server.apps.orders.exceptions import InvalidQuotationStatusError
from server.apps.orders.models import QuotationStatus
from server.apps.orders.queries.quotation.quotation_queries import get_quotation_status
from server.apps.orders.types.payments import InitializePaymentSessionInputType


def check_quotation_preconditions(
    payment_input_data: InitializePaymentSessionInputType,
):
    _check_quotation_status(payment_input_data.quotation_id)


def _check_quotation_status(quotation_id: str):
    status = get_quotation_status(quotation_id)
    if status != QuotationStatus.OPTIONED:
        raise InvalidQuotationStatusError(
            f"Expecting {str(QuotationStatus.OPTIONED)} status but {str(status)} found"
        )
