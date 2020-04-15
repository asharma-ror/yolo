import datetime
import random
import string
from collections import namedtuple
from typing import List

import pytest
from mixer.backend.django import mixer

from server.apps.orders.exceptions import RoomNotAvailableError
from server.apps.orders.models import Quotation, QuotationRoom, QuotationStatus
from server.apps.orders.schema import CreateQuotationMutation
from server.apps.products.models import (
    AncillaryService,
    DepartureOptionType,
    PriceType,
    ProductAllotment,
    ProductAvailability,
    QuantityType,
    ServiceSelectionType,
)
from server.apps.products.tests.utils.product_inizializer import mock_product


def _create_availability(
    availability_key,
    allotment_id,
    adults,
    quantity_available,
    quantity_total,
    product_id,
):
    return mixer.blend(
        ProductAvailability,
        availability_key=availability_key,
        master_allotment_id=allotment_id,
        allotments_id=[allotment_id],
        tot_allotments=1,
        product_id=product_id,
        nights=7,
        days=7,
        tot_adults=adults,
        adult_validators=[{"min_age": 18, "max_age": 29} for _ in range(0, adults)],
        occupancy_code=f"{adults}U30",
        start_date_from=datetime.date(2020, 1, 17),
        start_date_to=datetime.date(2020, 1, 20),
        departure_option_type=DepartureOptionType.AIRPORT,
        departure_option_value="MXP",
        quantity_available=quantity_available,
        quantity_total=quantity_total,
    )


def _validate_u30_passengers(passengers, tot_adults):
    assert len(passengers) == tot_adults
    for index, passenger in enumerate(passengers):
        assert passenger.passenger_index == index
        assert passenger.min_age == 18
        assert passenger.max_age == 29


def _create_allotment(
    allotment_id, price, product, ancillary_services=()
) -> ProductAllotment:
    return mixer.blend(
        ProductAllotment,
        allotment_id=allotment_id,
        product=product,
        price=price,
        ancillary_services=ancillary_services,
    )


def _create_ancillary_service(price, selection_type) -> AncillaryService:
    return mixer.blend(
        AncillaryService,
        quantity_type=QuantityType.PER_ROOM,
        price_type=PriceType.TOTAL,
        price=price,
        selection_type=selection_type,
        service_id=_generate_random_supplement_id(),
    )


def _generate_random_availability_key(size=10) -> str:
    return "".join(random.choices(string.ascii_lowercase, k=size))


def _generate_random_supplement_id() -> str:
    return _generate_random_availability_key(6)


@pytest.fixture
def product(db):
    return mock_product()


@pytest.fixture
def create_availability(product):
    def _factory(available: int, services=(), price=399, adults=2):
        allotment_id = _generate_random_availability_key()
        key = _generate_random_availability_key()
        _create_allotment(
            allotment_id=allotment_id,
            price=price,
            product=product,
            ancillary_services=services,
        )
        _create_availability(
            availability_key=key,
            product_id=product.product_id,
            allotment_id=allotment_id,
            adults=adults,
            quantity_available=available,
            quantity_total=10,
        )
        return key

    return _factory


@pytest.fixture
def run_mutation():
    def _fun(keys):
        # todo: one should use the django test client to run graphql mutation
        result = CreateQuotationMutation.mutate_and_get_payload(
            root=None, info=None, availability_keys=keys
        )
        return result.quotation

    return _fun


@pytest.fixture
def create_quote(create_availability, run_mutation, product):
    def _factory(available: int, services=(), num_keys=1):
        key = create_availability(available, services)
        return run_mutation([key] * num_keys)  # noqa

    return _factory


@pytest.fixture
def create_quotes_with_services(create_quote):
    def _factory(available: int, service_price: int, service_type):
        ancillary_services = [_create_ancillary_service(service_price, service_type)]
        return create_quote(available, services=ancillary_services)

    return _factory


def test_single_room_with_availability_quotation(create_quote):
    quotation = create_quote(available=2)
    assert quotation.total_price == 399
    assert quotation.deposit_price == 99.75
    assert quotation.nights == 7
    assert quotation.status == QuotationStatus.DRAFT
    rooms: List[QuotationRoom] = quotation.get_rooms()
    assert len(rooms) == 1
    room = rooms[0]
    assert room.tot_adults == 2
    assert room.room_index == 0
    assert room.room_price == 399
    assert room.room_discount == 0
    assert room.occupancy_code == "2U30"
    assert room.tot_adults == 2
    _validate_u30_passengers(room.get_passengers(), 2)


def test_single_room_without_availability_quotation(create_quote):
    with pytest.raises(RoomNotAvailableError):
        create_quote(0)


Expected = namedtuple("Expected", "price, deposit")


@pytest.mark.parametrize(
    "service_price,service_type,expected",
    [
        (100, ServiceSelectionType.AUTOMATIC, Expected(499, 124.75)),
        (-100, ServiceSelectionType.AUTOMATIC, Expected(299, 74.75)),
        (100, ServiceSelectionType.OPTIONAL, Expected(399, 99.75)),
    ],
)
def test_availability_and_service_quotation(
    create_quotes_with_services, service_price, service_type, expected
):
    quotation = create_quotes_with_services(
        2, service_price=service_price, service_type=service_type
    )
    assert quotation.total_price == expected.price
    assert quotation.deposit_price == expected.deposit
    assert quotation.nights == 7
    assert quotation.status == QuotationStatus.DRAFT
    rooms: List[QuotationRoom] = quotation.get_rooms()
    assert len(rooms) == 1
    room = rooms[0]
    assert room.tot_adults == 2
    assert room.room_index == 0
    assert room.room_price == expected.price
    assert room.room_discount == 0
    assert room.occupancy_code == "2U30"
    _validate_u30_passengers(room.get_passengers(), 2)

    if service_type == ServiceSelectionType.OPTIONAL:
        first_room_optional_services = rooms[0].get_additional_services()
        assert len(first_room_optional_services) == 1
        assert first_room_optional_services[0].price == 100


def test_two_rooms_with_same_occupancy_and_availability_quotation(create_quote):
    quotation = create_quote(2, num_keys=2)

    assert quotation.total_price == 798
    assert quotation.deposit_price == 199.5
    assert quotation.nights == 7
    assert quotation.status == QuotationStatus.DRAFT
    rooms: List[QuotationRoom] = quotation.get_rooms()
    assert len(rooms) == 2
    for idx, room in enumerate(rooms):
        assert room.tot_adults == 2
        assert room.room_index == idx
        assert room.room_price == 399
        assert room.room_discount == 0
        assert room.occupancy_code == "2U30"
        _validate_u30_passengers(room.get_passengers(), 2)


@pytest.mark.parametrize("available", [0, 1])
def test_two_rooms_with_less_availability_quotation(create_quote, available):
    with pytest.raises(RoomNotAvailableError):
        create_quote(available, num_keys=2)


def test_two_rooms_with_different_occupancy_and_availability_quotation(
    db, create_availability, run_mutation
):
    avail1 = create_availability(1)
    avail2 = create_availability(1, price=499, adults=3)

    result = CreateQuotationMutation.mutate_and_get_payload(
        root=None, info=None, availability_keys=[avail1, avail2],
    )
    quotation: Quotation = result.quotation
    assert quotation.total_price == 898
    assert quotation.deposit_price == 224.5
    assert quotation.nights == 7
    assert quotation.status == QuotationStatus.DRAFT
    rooms: List[QuotationRoom] = quotation.get_rooms()
    assert len(rooms) == 2
    room1 = rooms[0]
    assert room1.tot_adults == 2
    assert room1.room_index == 0
    assert room1.room_price == 399
    assert room1.room_discount == 0
    assert room1.occupancy_code == "2U30"
    _validate_u30_passengers(room1.get_passengers(), 2)
    room2 = rooms[1]
    assert room2.tot_adults == 3
    assert room2.room_index == 1
    assert room2.room_price == 499
    assert room2.room_discount == 0
    assert room2.occupancy_code == "3U30"
    _validate_u30_passengers(room2.get_passengers(), 3)
