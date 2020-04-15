from django.core.exceptions import ObjectDoesNotExist

from server.apps.orders.exceptions import (
    InvalidCustomerDataError,
    MissingCustomerDataError,
)
from server.apps.orders.models import Customer, Quotation


def validate_customer_data(quotation: Quotation):
    customer = _get_customer(quotation)

    if not customer.name:
        raise InvalidCustomerDataError("Missing customer name")
    if not customer.surname:
        raise InvalidCustomerDataError("Missing customer surname")
    if not customer.birthday:
        raise InvalidCustomerDataError("Missing customer birthday")


def _get_customer(quotation: Quotation) -> Customer:
    try:
        return quotation.get_customer()
    except ObjectDoesNotExist as e:
        raise MissingCustomerDataError() from e
