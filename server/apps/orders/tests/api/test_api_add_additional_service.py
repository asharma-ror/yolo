import random
import string

import pytest

from server.apps.orders.models import PriceType, QuantityType, Quotation
from server.apps.orders.schema import AddAdditionalServiceMutation

from ..utils.quotation_initializer import mock_ancillary_service, mock_quotation


@pytest.fixture()
def quotation_id() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=6))


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestApiAddAdditionalService:
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

        result = AddAdditionalServiceMutation.mutate_and_get_payload(
            root=None, info=None, quotation_id=quotation_id, service_id="svc-1"
        )
        quotation: Quotation = result.quotation
        assert quotation.total_price == 499
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 124.75
        assert len(quotation.get_room(0).get_services()) == 2

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

        result = AddAdditionalServiceMutation.mutate_and_get_payload(
            root=None, info=None, quotation_id=quotation_id, service_id="svc-1"
        )
        quotation: Quotation = result.quotation
        assert quotation.total_price == 449
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 112.25
        assert len(quotation.get_room(0).get_services()) == 2

    def test_add_service_per_person_to_two_rooms(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id, rooms_count=2, room_price=399, adults_per_room=2
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[0],
            price=50,
            price_type=PriceType.TOTAL,
            service_id="svc-1",
            quantity_type=QuantityType.PER_PERSON,
        )
        mock_ancillary_service(
            room=quotation.get_rooms()[1],
            price=50,
            price_type=PriceType.TOTAL,
            service_id="svc-1",
            quantity_type=QuantityType.PER_PERSON,
        )

        result = AddAdditionalServiceMutation.mutate_and_get_payload(
            root=None, info=None, quotation_id=quotation_id, service_id="svc-1"
        )
        quotation: Quotation = result.quotation
        assert quotation.total_price == 998
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 249.5
        assert len(quotation.get_room(0).get_services()) == 2
        assert len(quotation.get_room(1).get_services()) == 2

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

        result = AddAdditionalServiceMutation.mutate_and_get_payload(
            root=None, info=None, quotation_id=quotation_id, service_id="svc-1"
        )
        quotation: Quotation = result.quotation
        assert quotation.total_price == 898
        assert quotation.total_discount == 0
        assert quotation.deposit_price == 224.5
        assert len(quotation.get_room(0).get_services()) == 2
        assert len(quotation.get_room(1).get_services()) == 2
