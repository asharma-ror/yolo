import pytest

from server.apps.orders.commands.quotation import (
    add_ancillary_service_to_quotation,
    remove_ancillary_service_from_quotation,
)
from server.apps.orders.exceptions import AncillaryServiceNotFoundError
from server.apps.orders.models import PriceType, QuantityType

from ...utils.quotations_util import generate_random_quotation_number
from ..utils.quotation_initializer import mock_ancillary_service, mock_quotation


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestAddAncillaryServiceToQuotation:
    def test_add_invalid_ancillary_service_raise_error(self, quotation_id):
        with pytest.raises(AncillaryServiceNotFoundError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )

            add_ancillary_service_to_quotation(
                quotation_id=quotation_id, service_id="invalid-service"
            )

    def test_remove_optional_service_quotation(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[0],
            price=50,
            price_type=PriceType.TOTAL,
            service_id="svc-1",
            quantity_type=QuantityType.PER_ROOM,
        )

        # create precondition

        quotation = add_ancillary_service_to_quotation(quotation_id, "svc-1")
        room_quotation = quotation.get_room(0)

        assert quotation.total_price == 449
        assert quotation.deposit_price == 112.25
        assert room_quotation.room_price == 449
        assert len(room_quotation.get_services()) == 2

        # test

        quotation = remove_ancillary_service_from_quotation(
            quotation_id=quotation_id, service_id="svc-1"
        )

        room_quotation = quotation.get_room(0)

        assert quotation.total_price == 399
        assert quotation.deposit_price == 99.75
        assert room_quotation.room_price == 399
        assert len(room_quotation.get_services()) == 1

    def test_remove_optional_service_for_two_rooms_quotation(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id, rooms_count=2, room_price=399, adults_per_room=2
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[0],
            price=50,
            price_type=PriceType.TOTAL,
            service_id="svc-1",
            quantity_type=QuantityType.PER_ROOM,
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[1],
            price=50,
            price_type=PriceType.TOTAL,
            service_id="svc-1",
            quantity_type=QuantityType.PER_ROOM,
        )

        # create precondition

        quotation = add_ancillary_service_to_quotation(quotation_id, "svc-1")

        assert quotation.total_price == 898
        assert quotation.deposit_price == 224.5
        assert quotation.get_room(0).room_price == 449
        assert len(quotation.get_room(0).get_services()) == 2
        assert quotation.get_room(1).room_price == 449
        assert len(quotation.get_room(1).get_services()) == 2

        # test

        quotation = remove_ancillary_service_from_quotation(
            quotation_id=quotation_id, service_id="svc-1"
        )

        assert quotation.total_price == 798
        assert quotation.deposit_price == 199.5
        assert quotation.get_room(0).room_price == 399
        assert len(quotation.get_room(0).get_services()) == 1
        assert quotation.get_room(1).room_price == 399
        assert len(quotation.get_room(1).get_services()) == 1
