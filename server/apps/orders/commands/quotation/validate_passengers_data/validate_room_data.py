from server.apps.orders.exceptions import (
    InvalidPassengerDataError,
    MissingPassengersDataError,
    OccupancyNotMatchingError,
)
from server.apps.orders.models import Passenger, QuotationRoom


def validate_room_passengers_data(room_quotation: QuotationRoom):
    passengers = list(room_quotation.get_passengers())

    if not passengers:
        raise MissingPassengersDataError(
            f"Missing passengers for room {room_quotation.room_index}"
        )

    if len(passengers) != room_quotation.tot_adults:
        raise OccupancyNotMatchingError()

    [_validate_room_passenger(passenger) for passenger in passengers]  # noqa


def _validate_room_passenger(passenger: Passenger):
    if not passenger.name:
        raise InvalidPassengerDataError("Missing passenger name")
    if not passenger.surname:
        raise InvalidPassengerDataError("Missing passenger surname")
    if not passenger.birthday:
        raise InvalidPassengerDataError("Missing passenger birthday")
