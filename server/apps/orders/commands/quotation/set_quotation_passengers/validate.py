from datetime import date
from typing import List, Optional

from dateutil.relativedelta import relativedelta

from server.apps.orders.exceptions import (
    MissingPassengersDataError,
    OccupancyNotMatchingError,
    PassengerAgeValidationError,
)
from server.apps.orders.models import QuotationRoom
from server.apps.orders.tests.utils.fake_models import FakePassenger


def validate_room_occupancy(
    room_quotation: QuotationRoom, room_passengers: List[FakePassenger]
):
    if room_quotation.tot_adults != len(room_passengers):
        raise OccupancyNotMatchingError(
            f"{room_quotation.tot_adults} inside the room quotation but {len(room_passengers)} were provided"
        )


def validate_passenger_parameters(passenger: FakePassenger):
    if not passenger.name:
        raise MissingPassengersDataError("Missing passenger name")
    if not passenger.surname:
        raise MissingPassengersDataError("Missing passenger surname")
    if not passenger.gender:
        raise MissingPassengersDataError("Missing passenger gender")
    if not passenger.birthday:
        raise MissingPassengersDataError("Missing passenger birthday")


def validate_birthday(
    birthday: date, min_age: Optional[int], max_age: Optional[int], ref_date: date
):
    age = relativedelta(ref_date, birthday).years
    if min_age and age < min_age:
        raise PassengerAgeValidationError(
            f"Invalid age. Minimum age expected is {min_age}"
        )

    if max_age and age >= max_age + 1:
        raise PassengerAgeValidationError(
            f"Invalid age. Maximum age expected is {max_age}"
        )
