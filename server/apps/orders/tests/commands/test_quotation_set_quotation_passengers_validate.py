from datetime import date, timedelta

import pytest

from server.apps.orders.commands.quotation.set_quotation_passengers.validate import (
    validate_birthday,
)
from server.apps.orders.exceptions import PassengerAgeValidationError
from server.apps.orders.tests.utils.quotation_initializer import birthday


@pytest.fixture()
def today() -> date:
    return date.today()


class TestValidatePassengersAge:
    def test_invalid_min_age_raises_error(self, today):
        with pytest.raises(PassengerAgeValidationError):
            validate_birthday(
                birthday=birthday(17, today), min_age=18, max_age=29, ref_date=today
            )

    def test_edge_age_minus_one_day_raises_error(self, today):
        with pytest.raises(PassengerAgeValidationError):
            validate_birthday(
                birthday=birthday(18, today) + timedelta(days=1),
                min_age=18,
                max_age=29,
                ref_date=today,
            )

    def test_edge_min_age_does_not_raise_error(self, today):
        validate_birthday(
            birthday=birthday(18, today), min_age=18, max_age=29, ref_date=today
        )

    def test_strict_min_age_does_not_raise_error(self, today):
        validate_birthday(
            birthday=birthday(20, today), min_age=18, max_age=29, ref_date=today
        )

    def test_invalid_max_age_raises_error(self, today):
        with pytest.raises(PassengerAgeValidationError):
            validate_birthday(
                birthday=birthday(17, today), min_age=18, max_age=29, ref_date=today
            )

    def test_edge_max_age_does_not_raise_error(self, today):
        validate_birthday(
            birthday=birthday(30, today) + timedelta(days=1),
            min_age=18,
            max_age=29,
            ref_date=today,
        )

    def test_edge_max_age_plus_one_day_raises_error(self, today):
        with pytest.raises(PassengerAgeValidationError):
            validate_birthday(
                birthday=birthday(30, today), min_age=18, max_age=29, ref_date=today
            )

    def test_strict_max_age_does_not_raise_error(self, today):
        validate_birthday(
            birthday=birthday(25, today), min_age=18, max_age=29, ref_date=today
        )
