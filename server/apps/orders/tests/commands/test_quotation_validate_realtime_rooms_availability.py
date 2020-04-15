import random
import string

import pytest
from mixer.backend.django import mixer

from server.apps.orders.commands.quotation import validate_realtime_rooms_availability
from server.apps.orders.models import QuotationRoom
from server.apps.products.models import ProductAllotment


@pytest.mark.usefixtures(
    "db",
    "mock_signal_update_avail_records_from_quotation_room",
    "mock_signal_update_avail_records",
)
class TestValidateRealtimeRoomsAvailability:
    def test_single_room_with_full_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=10)

        result = validate_realtime_rooms_availability([allotment_id])  # noqa

        assert result.is_available

    def test_single_room_with_exact_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=10)
        mixer.cycle(9).blend(
            QuotationRoom, allotments_id=[allotment_id], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id])

        assert result.is_available

    def test_single_room_with_no_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=10)
        mixer.cycle(10).blend(
            QuotationRoom, allotments_id=[allotment_id], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id])

        assert result.is_available is False

    def test_single_room_with_closed_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=0)

        result = validate_realtime_rooms_availability([allotment_id])

        assert result.is_available is False

    def test_two_rooms_with_same_allotment_and_full_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=10)

        result = validate_realtime_rooms_availability([allotment_id, allotment_id])

        assert result.is_available

    def test_two_rooms_with_different_allotments_and_full_availability(self):
        allotment_id_1 = generate_random_allotment_id()
        allotment_id_2 = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id_1, quantity=10)
        mixer.blend(ProductAllotment, allotment_id=allotment_id_2, quantity=10)

        result = validate_realtime_rooms_availability([allotment_id_1, allotment_id_2])

        assert result.is_available

    def test_two_rooms_with_same_allotment_and_exact_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=10)

        result = validate_realtime_rooms_availability([allotment_id, allotment_id])
        mixer.cycle(8).blend(
            QuotationRoom, allotments_id=[allotment_id], tot_allotments=1
        )

        assert result.is_available

    def test_two_rooms_with_same_allotment_and_less_availability(self):
        allotment_id = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id, quantity=9)
        mixer.cycle(8).blend(
            QuotationRoom, allotments_id=[allotment_id], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id, allotment_id])

        assert result.is_available is False

    def test_two_rooms_with_different_allotments_and_exact_availability(self):
        allotment_id_1 = generate_random_allotment_id()
        allotment_id_2 = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id_1, quantity=10)
        mixer.blend(ProductAllotment, allotment_id=allotment_id_2, quantity=10)
        mixer.cycle(9).blend(
            QuotationRoom, allotments_id=[allotment_id_1], tot_allotments=1
        )
        mixer.cycle(9).blend(
            QuotationRoom, allotments_id=[allotment_id_2], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id_1, allotment_id_2])

        assert result.is_available

    def test_two_rooms_with_different_allotments_and_no_availability_for_room1(self):
        allotment_id_1 = generate_random_allotment_id()
        allotment_id_2 = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id_1, quantity=10)
        mixer.blend(ProductAllotment, allotment_id=allotment_id_2, quantity=10)
        mixer.cycle(10).blend(
            QuotationRoom, allotments_id=[allotment_id_1], tot_allotments=1
        )
        mixer.cycle(9).blend(
            QuotationRoom, allotments_id=[allotment_id_2], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id_1, allotment_id_2])

        assert result.is_available is False

    def test_two_rooms_with_different_allotments_and_no_availability_for_room2(self):
        allotment_id_1 = generate_random_allotment_id()
        allotment_id_2 = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id_1, quantity=10)
        mixer.blend(ProductAllotment, allotment_id=allotment_id_2, quantity=10)
        mixer.cycle(9).blend(
            QuotationRoom, allotments_id=[allotment_id_1], tot_allotments=1
        )
        mixer.cycle(10).blend(
            QuotationRoom, allotments_id=[allotment_id_2], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id_1, allotment_id_2])

        assert result.is_available is False

    def test_two_rooms_with_different_allotments_and_no_availability_for_both_rooms(
        self,
    ):
        allotment_id_1 = generate_random_allotment_id()
        allotment_id_2 = generate_random_allotment_id()
        mixer.blend(ProductAllotment, allotment_id=allotment_id_1, quantity=10)
        mixer.blend(ProductAllotment, allotment_id=allotment_id_2, quantity=10)
        mixer.cycle(10).blend(
            QuotationRoom, allotments_id=[allotment_id_1], tot_allotments=1
        )
        mixer.cycle(10).blend(
            QuotationRoom, allotments_id=[allotment_id_2], tot_allotments=1
        )

        result = validate_realtime_rooms_availability([allotment_id_1, allotment_id_2])

        assert result.is_available is False


def generate_random_allotment_id() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=10))
