from datetime import date

import pytest

from server.apps.products.queries import get_calendar_products_availability
from server.apps.products.tests.utils.product_inizializer import mock_availability


@pytest.fixture()
def avail_checker():
    def _avail_check(current, expected):
        assert current["start_date_from"] == expected["start_date_from"]
        assert current["nights"] == expected["nights"]
        assert current["min_price"] == expected["min_price"]

    def _checker(all_current, all_expected):
        assert len(all_current) == len(all_expected)
        for current, expected in zip(all_current, all_expected):
            _avail_check(current, expected)

    return _checker


@pytest.fixture()
def avail_factory():
    def _create_avail(records, **kwargs):
        [
            mock_availability(
                tot_adults=tot_adults,
                quantity=quantity,
                price=price,
                nights=nights,
                **kwargs,
            )
            for tot_adults, quantity, price, nights in records
        ]

    def _factory(product):
        product_id, dates = product
        [
            _create_avail(
                product_id=product_id,
                departure_date=dep_date,
                records=records,
                destination_codes=[f"dest_{product_id}"],
            )
            for dep_date, records in dates
        ]

    return _factory


@pytest.mark.usefixtures(
    "db", "mock_signal_update_avail_records",
)
class TestCalendarAvailability:
    @pytest.mark.parametrize(
        "product1, product2, expected",
        [
            (
                (
                    "product-1A",
                    [
                        (
                            date(2020, 1, 1),
                            [(2, 0, 50, 7), (1, 10, 50, 7), (2, 10, 100, 7)],
                        ),
                        (
                            date(2020, 1, 7),
                            [(2, 10, 400, 7), (2, 10, 300, 7), (2, 10, 700, 14)],
                        ),
                    ],
                ),
                (
                    "product-1B",
                    [
                        (date(2020, 1, 1), [(2, 10, 150, 7), (2, 10, 250, 7)]),
                        (date(2020, 1, 7), [(2, 10, 150, 7), (3, 10, 200, 15)]),
                    ],
                ),
                [
                    (
                        {
                            "start_date_from": date(2020, 1, 1),
                            "nights": 7,
                            "min_price": 100,
                        },
                        {
                            "start_date_from": date(2020, 1, 7),
                            "nights": 7,
                            "min_price": 150,
                        },
                        {
                            "start_date_from": date(2020, 1, 7),
                            "nights": 14,
                            "min_price": 700,
                        },
                    ),
                    (
                        {
                            "start_date_from": date(2020, 1, 1),
                            "nights": 7,
                            "min_price": 100,
                        },
                        {
                            "start_date_from": date(2020, 1, 7),
                            "nights": 7,
                            "min_price": 300,
                        },
                        {
                            "start_date_from": date(2020, 1, 7),
                            "nights": 14,
                            "min_price": 700,
                        },
                    ),
                ],
            )
        ],
    )
    def test_get_calendar_product_availability(
        self, avail_factory, avail_checker, product1, product2, expected
    ):
        avail_factory(product1)
        avail_factory(product2)

        all_expected, product1_expected = expected

        all_products_avail = get_calendar_products_availability(tot_adults=2)
        avail_checker(all_products_avail, all_expected)

        product1_avail = get_calendar_products_availability(
            tot_adults=2, product_id=product1[0]
        )
        avail_checker(product1_avail, product1_expected)

        dest1_avail = get_calendar_products_availability(
            tot_adults=2, destination_id=f"dest_{product1[0]}"
        )
        avail_checker(dest1_avail, product1_expected)
