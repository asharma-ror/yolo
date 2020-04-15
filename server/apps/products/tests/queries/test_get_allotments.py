from datetime import date

import pytest

from server.apps.products.models import DepartureOptionType
from server.apps.products.queries.allotment import get_backward_allotments
from server.apps.products.tests.utils.product_inizializer import (
    mock_allotment,
    mock_product,
)


@pytest.fixture()
def product_1():
    return mock_product("product-1")


@pytest.fixture()
def product_2():
    return mock_product("product-2")


@pytest.fixture()
def allotment_factory():
    def _factory(product, **kwargs):
        defaults = {
            "max_places": 10,
            "occupancy_code": "2U30",
            "departure_type": DepartureOptionType.AIRPORT,
            "departure_value": "MXP",
            "max_contiguous_allotment_nights": 14,
        }
        defaults.update(kwargs)
        return mock_allotment(product=product, **defaults)

    return _factory


@pytest.fixture()
def allotments_creator(allotment_factory):
    def _factory(product, dates):
        return [
            allotment_factory(product=product, start_date_from=dep_date)
            for dep_date in dates
        ]

    return _factory


@pytest.mark.usefixtures(
    "db", "mock_signal_update_avail_records",
)
class TestCalendarAvailability:
    @pytest.mark.parametrize(
        "dates, allotment_index, expected",
        [
            (
                (
                    date(2020, 1, 1),
                    date(2020, 1, 7),
                    date(2020, 1, 14),
                    date(2020, 1, 21),
                    date(2020, 1, 28),
                ),
                3,
                [date(2020, 1, 7), date(2020, 1, 14)],
            ),
        ],
    )
    def test_get_backward_allotments(
        self, allotments_creator, product_1, product_2, dates, allotment_index, expected
    ):
        prod1_allotments = allotments_creator(product=product_1, dates=dates)
        allotments_creator(product=product_2, dates=dates)

        allotments = get_backward_allotments(prod1_allotments[allotment_index])
        allotments_dates = [allotment.start_date_from for allotment in allotments]
        assert allotments_dates == expected
