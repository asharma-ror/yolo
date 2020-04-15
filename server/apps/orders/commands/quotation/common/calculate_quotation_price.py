from typing import Iterable

from server.apps.orders.models import QuotationRoom
from server.apps.orders.types.price import Price


def calculate_quotation_price(room_quotations: Iterable[QuotationRoom]) -> Price:
    room_prices = map(lambda r: Price(r.room_price, r.room_discount), room_quotations)
    return sum(room_prices, Price.zero())
