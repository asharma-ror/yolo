import pytest

from server.apps.orders.commands.quotation import calculate_quotation_price
from server.apps.orders.models import QuotationRoom


@pytest.fixture
def rooms_factory(mixer):
    def _factory(prices):
        return [
            mixer.blend(QuotationRoom, room_price=price, room_discount=discount)
            for price, discount in prices
        ]

    return _factory


@pytest.mark.parametrize(
    "prices,total,discount",
    [
        ([(1000, 0)], 1000, 0),
        ([(1000, 10)] * 10, 10000, 100),  # noqa
        ([(900, 100)], 900, 100),
        ([(1000, 0), (1000, 0)], 2000, 0),
        ([(1000, 0), (1200, 0)], 2200, 0),
    ],
)
def test_quotation_price_calculation(
    rooms_factory,
    prices,
    total,
    discount,
    mock_signal_update_avail_records_from_quotation_room,
):
    rooms = rooms_factory(prices)

    # no need to overcomplicate small functions whereas complex functions require thorough testing.
    quotation_price = calculate_quotation_price(rooms)
    assert quotation_price.get_total_amount() == total
    assert quotation_price.get_discount_amount() == discount
