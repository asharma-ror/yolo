import datetime
import random
import string

import pytest

from server.apps.orders.commands.quotation import validate_cached_rooms_availability
from server.apps.orders.exceptions import InvalidRoomsCombinationError
from server.apps.products.models import DepartureOptionType, ProductAvailability


@pytest.fixture
def prod_avail_factory(mixer):
    def _factory(**kwargs):
        key = generate_random_availability_key()
        defaults = {
            "product_id": "product-1",
            "master_allotment_id": "allotment-1",
            "allotments_id": ["allotment-1"],
            "tot_allotments": 1,
            "nights": 7,
            "days": 7,
            "start_date_from": datetime.date.fromisoformat("2020-01-17"),
            "start_date_to": datetime.date.fromisoformat("2020-01-20"),
            "departure_option_type": DepartureOptionType.AIRPORT,
            "departure_option_value": "MXP",
            "quantity_available": 0,
            "quantity_total": 10,
        }
        defaults.update(kwargs)
        mixer.blend(ProductAvailability, availability_key=key, **defaults)
        return key

    return _factory


@pytest.mark.django_db
class TestValidateCachedRoomsAvailability:
    def test_single_room_with_missing_availability_item(self):
        availability_key = generate_random_availability_key()

        with pytest.raises(InvalidRoomsCombinationError):
            validate_cached_rooms_availability([availability_key])

    def test_two_rooms_with_different_travel_parameters(self, prod_avail_factory):
        availability_key_room1 = prod_avail_factory()
        availability_key_room2 = prod_avail_factory(
            product_id="product-2",
            master_allotment_id="allotment-2",
            allotments_id=["allotment-2"],
        )

        with pytest.raises(InvalidRoomsCombinationError):
            validate_cached_rooms_availability(
                [availability_key_room1, availability_key_room2]
            )

    @pytest.mark.parametrize("avail, expected", [(0, False), (1, True), (2, True)])
    def test_single_room_with_availability(self, prod_avail_factory, avail, expected):
        availability_key = prod_avail_factory(quantity_available=avail)

        result = validate_cached_rooms_availability([availability_key])

        assert result.is_available is expected
        assert len(result.availability_items) == 1
        assert availability_key == result.availability_items[0].availability_key

    @pytest.mark.parametrize(
        "avail, expected", [(0, False), (1, False), (2, True), (3, True)]
    )
    def test_two_rooms_with_same_occupancy(self, prod_avail_factory, avail, expected):
        availability_key = prod_avail_factory(quantity_available=avail)

        result = validate_cached_rooms_availability(
            [availability_key, availability_key]
        )

        assert result.is_available is expected
        assert len(result.availability_items) == 2
        assert availability_key == result.availability_items[0].availability_key
        assert availability_key == result.availability_items[1].availability_key

    @pytest.mark.parametrize(
        "avail1, avail2, allot2, expected",
        [
            # different allotment
            (1, 1, "allotment-2", True),
            (2, 2, "allotment-2", True),
            (0, 1, "allotment-2", False),
            (1, 0, "allotment-2", False),
            (0, 0, "allotment-2", False),
            # same allotment
            (2, 2, "allotment-1", True),
            (1, 1, "allotment-1", False),
        ],
    )
    def test_two_rooms_with_different_occupancy(
        self, prod_avail_factory, avail1, avail2, allot2, expected
    ):
        availability_key_room1 = prod_avail_factory(quantity_available=avail1)
        availability_key_room2 = prod_avail_factory(
            quantity_available=avail2,
            master_allotment_id=allot2,
            allotments_id=[allot2],
        )

        result = validate_cached_rooms_availability(
            [availability_key_room1, availability_key_room2]
        )

        assert result.is_available is expected
        assert len(result.availability_items) == 2
        assert availability_key_room1 == result.availability_items[0].availability_key
        assert availability_key_room2 == result.availability_items[1].availability_key


def generate_random_availability_key() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=10))
