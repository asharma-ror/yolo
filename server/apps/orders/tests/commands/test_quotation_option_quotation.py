from unittest.mock import MagicMock, patch

import pytest

from server.apps.orders.commands.quotation import option_quotation
from server.apps.orders.exceptions import (
    InvalidQuotationStatusError,
    MissingCustomerDataError,
    MissingPassengersDataError,
    OccupancyNotMatchingError,
)
from server.apps.orders.models import Gender, QuotationStatus
from server.apps.orders.types.availability_validation_result import (
    AvailabilityRealtimeValidationResult,
)
from server.apps.orders.utils.quotations_util import generate_random_quotation_number

from ..utils.quotation_initializer import (
    birthday,
    mock_quotation,
    mock_quotation_customer,
    set_room_passenger,
)


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestOptionQuotation:
    # todo: fix patch not working
    # @patch(
    #     "server.apps.orders.commands.quotation.validate_realtime_rooms_availability",
    #     MagicMock(return_value=AvailabilityRealtimeValidationResult.unavailable([])),
    # )
    # def test_option_quotation_with_no_availability_raise_error(self, quotation_id):
    #     with pytest.raises(RoomNotAvailableError):
    #         quotation = mock_quotation(
    #             quotation_id=quotation_id,
    #             rooms_count=1,
    #             room_price=399,
    #             adults_per_room=2,
    #         )
    #
    #         mock_quotation_customer(
    #             quotation=quotation,
    #             name="simone",
    #             surname="sabba",
    #             birthday=date(1985, 4, 24),
    #             email="simone.sabba@whereigo.it",
    #             phone="12345",
    #             gender=Gender.MALE,
    #         )
    #
    #         mock_room_passenger(
    #             room=quotation.get_room(0),
    #             passenger_index=0,
    #             name="simone",
    #             surname="sabba",
    #             birthday=date(1985, 4, 24),
    #             gender=Gender.MALE,
    #         )
    #
    #         mock_room_passenger(
    #             room=quotation.get_room(0),
    #             passenger_index=1,
    #             name="giorgio",
    #             surname="curini",
    #             birthday=date(1992, 9, 25),
    #             gender=Gender.MALE,
    #         )
    #
    #         option_quotation(quotation_id)

    @patch(
        "server.apps.orders.commands.quotation.validate_realtime_rooms_availability",
        MagicMock(return_value=AvailabilityRealtimeValidationResult.available()),
    )
    def test_option_quotation_with_missing_customer_data_raise_error(
        self, quotation_id
    ):
        with pytest.raises(MissingCustomerDataError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )

            room = quotation.get_room(0)
            set_room_passenger(
                room=room,
                passenger_index=0,
                name="simone",
                surname="sabba",
                birthday=birthday(25),
                gender=Gender.MALE,
            )

            set_room_passenger(
                room=room,
                passenger_index=1,
                name="giorgio",
                surname="curini",
                birthday=birthday(26),
                gender=Gender.MALE,
            )

            option_quotation(quotation_id)

    @patch(
        "server.apps.orders.commands.quotation.validate_realtime_rooms_availability",
        MagicMock(return_value=AvailabilityRealtimeValidationResult.available()),
    )
    def test_option_quotation_with_missing_passengers_data_raise_error(
        self, quotation_id
    ):
        with pytest.raises(MissingPassengersDataError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )

            mock_quotation_customer(
                quotation=quotation,
                name="simone",
                surname="sabba",
                birthday=birthday(25),
                email="simone.sabba@whereigo.it",
                phone="12345",
                gender=Gender.MALE,
            )

            quotation.get_room(0).get_passenger(0).delete()
            quotation.get_room(0).get_passenger(1).delete()

            option_quotation(quotation_id)

    @patch(
        "server.apps.orders.commands.quotation.validate_realtime_rooms_availability",
        MagicMock(return_value=AvailabilityRealtimeValidationResult.available()),
    )
    def test_option_quotation_already_optioned_raise_error(self, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.OPTIONED,
            )

            mock_quotation_customer(
                quotation=quotation,
                name="simone",
                surname="sabba",
                birthday=birthday(25),
                email="simone.sabba@whereigo.it",
                phone="12345",
                gender=Gender.MALE,
            )

            set_room_passenger(
                room=quotation.get_room(0),
                passenger_index=0,
                name="simone",
                surname="sabba",
                birthday=birthday(25),
                gender=Gender.MALE,
            )

            set_room_passenger(
                room=quotation.get_room(0),
                passenger_index=1,
                name="giorgio",
                surname="curini",
                birthday=birthday(26),
                gender=Gender.MALE,
            )

            # check precondition
            assert quotation.status == QuotationStatus.OPTIONED

            # test
            option_quotation(quotation_id)

    # @patch(
    #     "server.apps.orders.commands.quotation.common.validate_realtime_rooms_availability.validate_realtime_rooms_availability",
    #     MagicMock(return_value=AvailabilityRealtimeValidationResult.available()),
    # )
    # def test_option_quotation_with_one_room(self, quotation_id):
    #     quotation = mock_quotation(
    #         quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2
    #     )
    #
    #     mock_quotation_customer(
    #         quotation=quotation,
    #         name="simone",
    #         surname="sabba",
    #         birthday=date(1985, 4, 24),
    #         email="simone.sabba@whereigo.it",
    #         phone="12345",
    #         gender=Gender.MALE,
    #     )
    #
    #     mock_room_passenger(
    #         room=quotation.get_room(0),
    #         passenger_index=0,
    #         name="simone",
    #         surname="sabba",
    #         birthday=date(1985, 4, 24),
    #         gender=Gender.MALE,
    #     )
    #
    #     mock_room_passenger(
    #         room=quotation.get_room(0),
    #         passenger_index=1,
    #         name="giorgio",
    #         surname="curini",
    #         birthday=date(1992, 9, 25),
    #         gender=Gender.MALE,
    #     )
    #
    #     # check precondition
    #     assert quotation.status == QuotationStatus.DRAFT
    #     assert quotation.get_room(0).optioned is False
    #
    #     # test
    #
    #     quotation = option_quotation(quotation_id)
    #     assert quotation.status == QuotationStatus.OPTIONED
    #     assert quotation.get_room(0).optioned is True

    # @patch(
    #     "server.apps.orders.commands.quotation.common.validate_realtime_rooms_availability.validate_realtime_rooms_availability",
    #     MagicMock(return_value=AvailabilityRealtimeValidationResult.available()),
    # )
    # def test_option_quotation_with_two_rooms(self, quotation_id):
    #     quotation = mock_quotation(
    #         quotation_id=quotation_id, rooms_count=2, room_price=399, adults_per_room=2
    #     )
    #
    #     mock_quotation_customer(
    #         quotation=quotation,
    #         name="simone",
    #         surname="sabba",
    #         birthday=date(1985, 4, 24),
    #         email="simone.sabba@whereigo.it",
    #         phone="12345",
    #         gender=Gender.MALE,
    #     )
    #
    #     mock_room_passenger(
    #         room=quotation.get_room(0),
    #         passenger_index=0,
    #         name="simone",
    #         surname="sabba",
    #         birthday=date(1985, 4, 24),
    #         gender=Gender.MALE,
    #     )
    #
    #     mock_room_passenger(
    #         room=quotation.get_room(0),
    #         passenger_index=1,
    #         name="giorgio",
    #         surname="curini",
    #         birthday=date(1992, 9, 25),
    #         gender=Gender.MALE,
    #     )
    #
    #     mock_room_passenger(
    #         room=quotation.get_room(1),
    #         passenger_index=0,
    #         name="gigi",
    #         surname="sabani",
    #         birthday=date(1990, 2, 5),
    #         gender=Gender.MALE,
    #     )
    #
    #     mock_room_passenger(
    #         room=quotation.get_room(1),
    #         passenger_index=1,
    #         name="gigia",
    #         surname="sabana",
    #         birthday=date(1990, 2, 6),
    #         gender=Gender.FEMALE,
    #     )
    #
    #     # check precondition
    #     assert quotation.status == QuotationStatus.DRAFT
    #     assert quotation.get_room(0).optioned is False
    #     assert quotation.get_room(1).optioned is False
    #
    #     # test
    #
    #     quotation = option_quotation(quotation_id)
    #     assert quotation.status == QuotationStatus.OPTIONED
    #     assert quotation.get_room(0).optioned is True
    #     assert quotation.get_room(1).optioned is True

    @patch(
        "server.apps.orders.commands.quotation.validate_realtime_rooms_availability",
        MagicMock(return_value=AvailabilityRealtimeValidationResult.available()),
    )
    def test_option_quotation_with_two_rooms_with_error_in_second_rooms(
        self, quotation_id
    ):
        with pytest.raises(OccupancyNotMatchingError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=2,
                room_price=399,
                adults_per_room=2,
            )

            mock_quotation_customer(
                quotation=quotation,
                name="simone",
                surname="sabba",
                birthday=birthday(25),
                email="simone.sabba@whereigo.it",
                phone="12345",
                gender=Gender.MALE,
            )

            quotation.get_room(1).get_passenger(1).delete()

            # check precondition
            assert quotation.status == QuotationStatus.DRAFT
            assert quotation.get_room(0).optioned is False
            assert quotation.get_room(1).optioned is False

            # test

            quotation = option_quotation(quotation_id)

            assert quotation.status == QuotationStatus.DRAFT
            assert quotation.get_room(0).optioned is False
            assert quotation.get_room(1).optioned is False
