import pytest

from server.apps.orders.commands.quotation import (
    add_ancillary_service_to_quotation,
    remove_ancillary_service_from_room_quotation,
)
from server.apps.orders.exceptions import (
    QuotationServiceNotFoundError,
    QuotationServiceNotRemovableError,
)
from server.apps.orders.models import PriceType, QuantityType, SelectionType

from ...utils.quotations_util import generate_random_quotation_number
from ..utils.quotation_initializer import (
    mock_ancillary_service,
    mock_base_price_service,
    mock_discount_service,
    mock_quotation,
    mock_quotation_ancillary_service,
)


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestRemoveAncillaryServiceFromRoomQuotation:
    def test_remove_non_existing_ancillary_service_raise_error(self, quotation_id):
        with pytest.raises(QuotationServiceNotFoundError):
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

            remove_ancillary_service_from_room_quotation(
                room_quotation=quotation.get_room(0), service_id="not-existing-service"
            )

    def test_remove_base_price_service_raise_error(self, quotation_id):
        with pytest.raises(QuotationServiceNotRemovableError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )
            mock_base_price_service(
                room=quotation.get_rooms()[0],
                base_price=50,
                service_id="base-price-svc",
            )

            remove_ancillary_service_from_room_quotation(
                room_quotation=quotation.get_room(0), service_id="base-price-svc"
            )

    def test_remove_discount_service_raise_error(self, quotation_id):
        with pytest.raises(QuotationServiceNotRemovableError):
            quotation = mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )
            mock_discount_service(
                room=quotation.get_rooms()[0],
                discount_amount=50,
                discount_code="discount-svc",
            )

            remove_ancillary_service_from_room_quotation(
                room_quotation=quotation.get_room(0), service_id="discount-svc"
            )

    def test_remove_automatic_service_raise_error(self, quotation_id):
        with pytest.raises(QuotationServiceNotRemovableError):
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
                selection_type=SelectionType.AUTOMATIC,
            )

            remove_ancillary_service_from_room_quotation(
                room_quotation=quotation.get_room(0), service_id="svc-1"
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

        assert room_quotation.room_price == 449
        assert len(room_quotation.get_services()) == 2

        # test

        remove_ancillary_service_from_room_quotation(
            room_quotation=room_quotation, service_id="svc-1"
        )

        assert room_quotation.room_price == 399
        assert len(room_quotation.get_services()) == 1
