from datetime import timedelta

import pytest

from server.apps.orders.commands.quotation import set_quotation_passengers
from server.apps.orders.exceptions import (
    OccupancyNotMatchingError,
    PassengerAgeValidationError,
)
from server.apps.orders.models import Gender
from server.apps.orders.utils.quotations_util import generate_random_quotation_number

from ..utils.fake_models import FakeCustomer, FakePassenger, FakeRoomPassengers
from ..utils.quotation_initializer import (
    birthday,
    mock_quotation,
    mock_quotation_customer,
    set_room_passenger,
)


@pytest.fixture
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.fixture
def quotation_factory(quotation_id):
    def _factory(**kwargs):
        mock_quotation(quotation_id=quotation_id, **kwargs)
        return quotation_id

    return _factory


@pytest.fixture
def customer_factory():
    def _factory(**kwargs):
        defaults = {"birthday": birthday(25), "gender": "male"}
        defaults.update(kwargs)
        return FakeCustomer(**defaults)

    return _factory


@pytest.fixture
def passenger_factory():
    def _factory(**kwargs):
        defaults = {"birthday": birthday(25), "gender": "male"}
        defaults.update(kwargs)
        return FakePassenger(**defaults)

    return _factory


@pytest.fixture
def customer_simone(customer_factory):
    return customer_factory(
        name="simone",
        surname="sabba",
        email="simone.sabba@whereigo.it",
        phone="+391234567",
    )


@pytest.fixture
def passenger_simone(passenger_factory):
    return passenger_factory(name="simone", surname="sabba")


@pytest.fixture
def passenger_giorgi(passenger_factory):
    return passenger_factory(name="giorgio", surname="curini", birthday=birthday(24))


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestSetQuotationPassengers:
    def test_insert_passengers_into_with_mismatching_pax_number(
        self, quotation_factory, customer_simone, passenger_simone
    ):
        with pytest.raises(OccupancyNotMatchingError):
            quotation_id = quotation_factory(rooms_count=1)
            rooms_passengers = [FakeRoomPassengers(passengers=[passenger_simone])]

            set_quotation_passengers(
                quotation_id=quotation_id,
                customer=customer_simone,
                rooms_passengers=rooms_passengers,
            )

    def test_insert_passengers_into_with_mismatching_rooms_number(
        self, quotation_factory, customer_simone, passenger_simone, passenger_giorgi
    ):
        with pytest.raises(OccupancyNotMatchingError):
            quotation_id = quotation_factory(rooms_count=2)

            rooms_passengers = [
                FakeRoomPassengers(passengers=[passenger_simone, passenger_giorgi])
            ]

            set_quotation_passengers(
                quotation_id=quotation_id,
                customer=customer_simone,
                rooms_passengers=rooms_passengers,
            )

    @pytest.mark.parametrize(
        "age1, age2",
        [
            (birthday(18) + timedelta(days=1), birthday(24)),
            (birthday(30), birthday(24)),
            (birthday(25), birthday(18) + timedelta(days=1)),
            (birthday(25), birthday(30)),
        ],
    )
    def test_insert_pax1_with_invalid_min_age(
        self, quotation_factory, customer_factory, passenger_factory, age1, age2
    ):
        with pytest.raises(PassengerAgeValidationError):
            quotation_id = quotation_factory(rooms_count=1)

            customer = customer_factory(name="simone", surname="sabba", birthday=age1)
            rooms_passengers = [
                FakeRoomPassengers(
                    passengers=[
                        passenger_factory(
                            name="simone", surname="sabba", birthday=age1,
                        ),
                        passenger_factory(
                            name="giorgio", surname="curini", birthday=age2,
                        ),
                    ]
                )
            ]

            set_quotation_passengers(
                quotation_id=quotation_id,
                customer=customer,
                rooms_passengers=rooms_passengers,
            )

    def test_insert_passengers_into_empty_quotation_with_two_adults_and_single_room(
        self, quotation_factory, customer_simone, passenger_simone, passenger_giorgi
    ):
        quotation_id = quotation_factory(rooms_count=1)

        rooms_passengers = [
            FakeRoomPassengers(passengers=[passenger_simone, passenger_giorgi])
        ]

        quotation = set_quotation_passengers(
            quotation_id=quotation_id,
            customer=customer_simone,
            rooms_passengers=rooms_passengers,
        )

        customer = quotation.get_customer()
        assert customer.name == "simone"
        assert customer.surname == "sabba"
        assert customer.birthday == customer_simone.birthday
        assert customer.gender == Gender.MALE
        assert customer.email == "simone.sabba@whereigo.it"
        assert customer.phone == "+391234567"

        room = quotation.get_room(0)
        pass1 = room.get_passenger(0)
        assert pass1.name == "simone"
        assert pass1.surname == "sabba"
        assert pass1.min_age == 18
        assert pass1.max_age == 29

        pass2 = room.get_passenger(1)
        assert pass2.name == "giorgio"
        assert pass2.surname == "curini"
        assert pass2.min_age == 18
        assert pass2.max_age == 29

    def test_insert_passengers_into_empty_quotation_with_two_adults_and_two_rooms(
        self, quotation_factory, customer_simone, passenger_simone, passenger_giorgi
    ):
        quotation_id = quotation_factory(rooms_count=2)

        rooms_passengers = [
            FakeRoomPassengers(passengers=[passenger_simone, passenger_giorgi]),
            FakeRoomPassengers(
                passengers=[
                    FakePassenger(
                        name="fiorella",
                        surname="mannoia",
                        birthday=birthday(23),
                        gender="female",
                    ),
                    FakePassenger(
                        name="orietta",
                        surname="berti",
                        birthday=birthday(22),
                        gender="female",
                    ),
                ]
            ),
        ]

        quotation = set_quotation_passengers(
            quotation_id=quotation_id,
            customer=customer_simone,
            rooms_passengers=rooms_passengers,
        )

        customer = quotation.get_customer()
        assert customer.name == "simone"
        assert customer.surname == "sabba"
        assert customer.birthday == customer_simone.birthday
        assert customer.gender == Gender.MALE
        assert customer.email == "simone.sabba@whereigo.it"
        assert customer.phone == "+391234567"

        room1 = quotation.get_room(0)
        pass1 = room1.get_passenger(0)
        assert pass1.name == "simone"
        assert pass1.surname == "sabba"
        assert pass1.gender == Gender.MALE
        assert pass1.birthday == rooms_passengers[0].passengers[0].birthday
        assert pass1.min_age == 18
        assert pass1.max_age == 29

        pass2 = room1.get_passenger(1)
        assert pass2.name == "giorgio"
        assert pass2.surname == "curini"
        assert pass2.gender == Gender.MALE
        assert pass2.birthday == rooms_passengers[0].passengers[1].birthday
        assert pass2.min_age == 18
        assert pass2.max_age == 29

        room2 = quotation.get_room(1)
        pass3 = room2.get_passenger(0)
        assert pass3.name == "fiorella"
        assert pass3.surname == "mannoia"
        assert pass3.gender == Gender.FEMALE
        assert pass3.birthday == rooms_passengers[1].passengers[0].birthday
        assert pass3.min_age == 18
        assert pass3.max_age == 29

        pass4 = room2.get_passenger(1)
        assert pass4.name == "orietta"
        assert pass4.surname == "berti"
        assert pass4.gender == Gender.FEMALE
        assert pass4.birthday == rooms_passengers[1].passengers[1].birthday
        assert pass4.min_age == 18
        assert pass4.max_age == 29

    def test_update_passengers_into_quotation_with_existing_passengers_with_two_adults_and_single_room(
        self, quotation_id
    ):
        quotation = mock_quotation(
            quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2
        )

        customer = mock_quotation_customer(
            quotation=quotation,
            name="gigi",
            surname="sabani",
            birthday=birthday(25),
            email="gigi@gigi.it",
            phone="12345",
            gender=Gender.MALE,
        )

        room1 = quotation.get_room(0)
        pax_1 = set_room_passenger(
            room=room1,
            passenger_index=0,
            name="gigi",
            surname="sabani",
            birthday=birthday(25),
            gender=Gender.MALE,
        )
        pax_2 = set_room_passenger(
            room=room1,
            passenger_index=1,
            name="gigia",
            surname="sabana",
            birthday=birthday(24),
            gender=Gender.FEMALE,
        )

        # check precondition
        cust = quotation.get_customer()
        assert cust.name == "gigi"
        assert cust.surname == "sabani"
        assert cust.birthday == customer.birthday
        assert cust.gender == Gender.MALE
        assert cust.email == "gigi@gigi.it"
        assert cust.phone == "12345"

        pass1 = room1.get_passenger(0)
        assert pass1.name == "gigi"
        assert pass1.surname == "sabani"
        assert pass1.gender == Gender.MALE
        assert pass1.birthday == pax_1.birthday
        assert pass1.min_age == 18
        assert pass1.max_age == 29

        pass2 = room1.get_passenger(1)
        assert pass2.name == "gigia"
        assert pass2.surname == "sabana"
        assert pass2.gender == Gender.FEMALE
        assert pass2.birthday == pax_2.birthday
        assert pass2.min_age == 18
        assert pass2.max_age == 29

        # test

        customer = FakeCustomer(
            name="simone",
            surname="sabba",
            birthday=birthday(27),
            gender="male",
            email="simone.sabba@whereigo.it",
            phone="+391234567",
        )
        rooms_passengers = [
            FakeRoomPassengers(
                passengers=[
                    FakePassenger(
                        name="simone",
                        surname="sabba",
                        birthday=birthday(27),
                        gender="male",
                    ),
                    FakePassenger(
                        name="giorgio",
                        surname="curini",
                        birthday=birthday(28),
                        gender="male",
                    ),
                ]
            )
        ]

        quot_updated = set_quotation_passengers(
            quotation_id=quotation_id,
            customer=customer,
            rooms_passengers=rooms_passengers,
        )

        qcust = quot_updated.get_customer()
        assert qcust.name == "simone"
        assert qcust.surname == "sabba"
        assert qcust.birthday == customer.birthday
        assert qcust.gender == Gender.MALE
        assert qcust.email == "simone.sabba@whereigo.it"
        assert qcust.phone == "+391234567"

        room = quot_updated.get_room(0)
        passenger1 = room.get_passenger(0)
        assert passenger1.name == "simone"
        assert passenger1.surname == "sabba"
        assert passenger1.gender == Gender.MALE
        assert passenger1.birthday == rooms_passengers[0].passengers[0].birthday
        assert passenger1.min_age == 18
        assert passenger1.max_age == 29

        passenger2 = room.get_passenger(1)
        assert passenger2.name == "giorgio"
        assert passenger2.surname == "curini"
        assert passenger2.gender == Gender.MALE
        assert passenger2.birthday == rooms_passengers[0].passengers[1].birthday
        assert passenger2.min_age == 18
        assert passenger2.max_age == 29
