from unittest.mock import MagicMock, patch

import pytest
from mixer.backend.django import mixer

from server.apps.orders.models import Reservation
from server.apps.travels.commands.reservations import create_travel_reservation
from server.apps.travels.models import TravelStatus


@patch(
    "server.apps.travels.signals._create_travel_reservation", MagicMock(),
)
@patch(
    "server.apps.orders.signals._send_reservation_confirmation_email_handler",
    MagicMock(),
)
@pytest.mark.django_db
class TestCreateTravelReservation:
    def test_create_reservation(self):
        reservation = mixer.blend(Reservation)
        travel_reservation = create_travel_reservation(reservation)

        assert travel_reservation.status == TravelStatus.UNASSIGNED
        assert reservation.reservation_id == travel_reservation.reservation_id
        assert reservation.created.date() == travel_reservation.reservation_date
        assert reservation.quotation.product_id == travel_reservation.product_id
        assert (
            reservation.quotation.departure_option_type
            == travel_reservation.departure_option_type
        )
        assert (
            reservation.quotation.departure_option_value
            == travel_reservation.departure_option_value
        )
        assert (
            reservation.quotation.start_date_from == travel_reservation.start_date_from
        )
        assert reservation.quotation.start_date_to == travel_reservation.start_date_to
