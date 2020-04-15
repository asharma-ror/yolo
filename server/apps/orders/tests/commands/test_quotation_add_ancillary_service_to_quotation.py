import pytest

from server.apps.orders.commands.quotation import add_ancillary_service_to_quotation
from server.apps.orders.models import PriceType, QuantityType

from ...utils.quotations_util import generate_random_quotation_number
from ..utils.quotation_initializer import mock_ancillary_service, mock_quotation


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestAddAncillaryServiceToQuotation:
    def test_add_service_per_person_to_single_room(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[0],
            price=50,
            price_type=PriceType.TOTAL,
            service_id="svc-1",
            quantity_type=QuantityType.PER_PERSON,
        )

        quotation = add_ancillary_service_to_quotation(
            quotation_id=quotation_id, service_id="svc-1"
        )

        assert quotation.total_price == 499
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 124.75

    def test_add_service_per_room_to_single_room(self, quotation_id):
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

        quotation = add_ancillary_service_to_quotation(
            quotation_id=quotation_id, service_id="svc-1"
        )

        assert quotation.total_price == 449
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 112.25

    def test_add_service_per_room_to_two_rooms(self, quotation_id):
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

        quotation = add_ancillary_service_to_quotation(
            quotation_id=quotation_id, service_id="svc-1"
        )

        assert quotation.total_price == 898
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 224.5
