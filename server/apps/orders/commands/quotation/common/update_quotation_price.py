from server.apps.orders.models import Quotation
from server.apps.orders.types.price import Price

from .calculate_quotation_price import calculate_quotation_price

DEFAULT_DEPOSIT_PERCENTAGE = 25.0


def update_quotation_price(quotation: Quotation):
    quotation_price = calculate_quotation_price(quotation.get_rooms())
    quotation.total_price = quotation_price.get_total_amount()
    quotation.total_discount = quotation_price.get_discount_amount()
    quotation.deposit_price = _calculate_deposit_amount(quotation_price)


def _calculate_deposit_amount(full_price: Price) -> float:
    return full_price.get_total_amount() * DEFAULT_DEPOSIT_PERCENTAGE / 100.0
