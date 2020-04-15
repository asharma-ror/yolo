import pytest

from server.apps.orders.commands.quotation import (
    add_ancillary_service_to_room_quotation,
)
from server.apps.orders.exceptions import (
    AncillaryServiceNotFoundError,
    QuotationServiceAlreadyAdded,
)
from server.apps.orders.models import PriceType, QuantityType

from ...utils.quotations_util import generate_random_quotation_number
from ..utils.quotation_initializer import (
    mock_ancillary_service,
    mock_quotation,
    mock_quotation_ancillary_service,
)


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestAddAncillaryServiceToRoomQuotation:
    def test_add_invalid_ancillary_service_raise_error(self, quotation_id):
        with pytest.raises(AncillaryServiceNotFoundError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )

            add_ancillary_service_to_room_quotation(
                room_quotation=quotation.get_room(0), service_id="invalid-service"
            )

    def test_add_service_already_present_raise_error(self, quotation_id):
        with pytest.raises(QuotationServiceAlreadyAdded):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )
            mock_ancillary_service(
                room=quotation.get_rooms()[0],
                price=50,
                price_type=PriceType.TOTAL,
                service_id="svc-1",
                quantity_type=QuantityType.PER_ROOM,
            )
            mock_quotation_ancillary_service(
                room=quotation.get_rooms()[0],
                price=50,
                price_type=PriceType.TOTAL,
                service_id="svc-1",
                quantity_type=QuantityType.PER_ROOM,
            )

            room_quotation = quotation.get_room(0)

            add_ancillary_service_to_room_quotation(
                room_quotation=room_quotation, service_id="svc-1"
            )

    def test_add_ancillary_service_per_room_with_total_price(self, quotation_id):
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

        room_quotation = quotation.get_room(0)

        add_ancillary_service_to_room_quotation(
            room_quotation=room_quotation, service_id="svc-1"
        )

        assert len(room_quotation.get_services()) == 2
        assert room_quotation.room_price == 449
        assert room_quotation.room_discount == 0

    def test_add_ancillary_service_per_pax_with_total_price(self, quotation_id):
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

        room_quotation = quotation.get_room(0)

        add_ancillary_service_to_room_quotation(
            room_quotation=room_quotation, service_id="svc-1"
        )

        assert len(room_quotation.get_services()) == 2
        assert room_quotation.room_price == 499
        assert room_quotation.room_discount == 0

    def test_add_ancillary_service_per_room_with_percentage_price(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[0],
            price=5,
            price_type=PriceType.PERCENT,
            service_id="svc-1",
            quantity_type=QuantityType.PER_ROOM,
        )

        room_quotation = quotation.get_room(0)

        add_ancillary_service_to_room_quotation(
            room_quotation=room_quotation, service_id="svc-1"
        )

        assert len(room_quotation.get_services()) == 2
        assert room_quotation.room_price == 418.95
        assert room_quotation.room_discount == 0
