import random
import string

import pytest

from server.apps.orders.commands.quotation import add_ancillary_service_to_quotation
from server.apps.orders.models import PriceType, QuantityType, Quotation
from server.apps.orders.schema import RemoveAdditionalServiceMutation

from ..utils.quotation_initializer import mock_ancillary_service, mock_quotation


@pytest.fixture
def quotation_id() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=6))


@pytest.fixture
def quotation_factory(db, quotation_id):
    def _factory(rooms_count, quantity_type, **kwargs):
        quotation = mock_quotation(quotation_id, rooms_count=rooms_count, **kwargs)
        for room in quotation.get_rooms():
            mock_ancillary_service(
                room=room,
                price=50,
                price_type=PriceType.TOTAL,
                service_id="svc-1",
                quantity_type=quantity_type,
            )
        return add_ancillary_service_to_quotation(quotation.quotation_id, "svc-1")

    return _factory


@pytest.mark.parametrize(
    "rooms_count, quantity_type",
    [
        (1, QuantityType.PER_PERSON),
        (1, QuantityType.PER_ROOM),
        (2, QuantityType.PER_PERSON),
        (2, QuantityType.PER_ROOM),
    ],
)
def test_remove_service(
    quotation_factory,
    mock_signal_update_avail_records_from_quotation_room,
    rooms_count,
    quantity_type,
):
    quotation: Quotation = quotation_factory(rooms_count, quantity_type)

    # todo: use the generic Django's test client to test the functionality as whole
    #  see: server.tests.fixtures.client fixture and tests using it
    RemoveAdditionalServiceMutation.mutate_and_get_payload(
        root=None, info=None, quotation_id=quotation.quotation_id, service_id="svc-1"
    )
    quotation.refresh_from_db()

    assert quotation.total_price == 399 * rooms_count
    assert quotation.total_discount == 0
    assert quotation.deposit_price == 99.75 * rooms_count
    for room in quotation.get_rooms():
        assert room.room_price == 399
        assert room.room_discount == 0
        assert len(room.get_services()) == 1
