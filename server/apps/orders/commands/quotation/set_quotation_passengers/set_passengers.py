from datetime import date
from typing import List

from django.db import transaction
from django.db.models import Q

from server.apps.orders.commands.quotation.set_quotation_passengers.validate import (
    validate_birthday,
    validate_passenger_parameters,
    validate_room_occupancy,
)
from server.apps.orders.exceptions import OccupancyNotMatchingError
from server.apps.orders.models import (
    Customer,
    Gender,
    Passenger,
    Quotation,
    QuotationRoom,
)
from server.apps.orders.queries.quotation.quotation_queries import get_quotation
from server.apps.orders.tests.utils.fake_models import (
    FakeCustomer,
    FakePassenger,
    FakeRoomPassengers,
)


def set_quotation_passengers(
    quotation_id: str,
    customer: FakeCustomer,
    rooms_passengers: List[FakeRoomPassengers],
) -> Quotation:

    quotation = get_quotation(quotation_id)

    with transaction.atomic():

        _create_customer(quotation, customer)

        room_quotations = quotation.get_rooms()

        if len(room_quotations) != len(rooms_passengers):
            raise OccupancyNotMatchingError(
                "Room quotations and room passengers sizes not matching"
            )

        for room_index, room_passengers in enumerate(rooms_passengers):
            _set_room_passengers(
                room_quotations[room_index], room_passengers.passengers
            )

        return quotation


def _set_room_passengers(
    room_quotation: QuotationRoom, room_passengers: List[FakePassenger]
) -> None:
    validate_room_occupancy(room_quotation, room_passengers)

    for passenger_index, passenger in enumerate(room_passengers):
        _insert_passenger(room_quotation, passenger, passenger_index)


def _insert_passenger(
    room_quotation: QuotationRoom, passenger: FakePassenger, passenger_index: int
) -> None:
    validate_passenger_parameters(passenger)

    _update_passenger(
        room_quotation=room_quotation,
        passenger=passenger,
        passenger_index=passenger_index,
    )


def _update_passenger(
    room_quotation: QuotationRoom, passenger: FakePassenger, passenger_index: int
) -> Passenger:
    quotation_passenger = Passenger.objects.get(
        Q(room=room_quotation) & Q(passenger_index=passenger_index)
    )

    validate_birthday(
        birthday=passenger.birthday,
        min_age=quotation_passenger.min_age,
        max_age=quotation_passenger.max_age,
        ref_date=date.today(),
    )

    quotation_passenger.name = passenger.name
    quotation_passenger.surname = passenger.surname
    quotation_passenger.birthday = passenger.birthday
    quotation_passenger.gender = (
        Gender.get(passenger.gender.upper()) if passenger.gender else None
    )

    quotation_passenger.save()

    return quotation_passenger


def _create_customer(quotation: Quotation, customer: FakeCustomer) -> Customer:

    existing_customer = Customer.objects.filter(quotation=quotation).first()
    if existing_customer:
        existing_customer.delete()

    return Customer.objects.create(
        quotation=quotation,
        name=customer.name,
        surname=customer.surname,
        email=customer.email,
        user_id=customer.user_id,
        birthday=customer.birthday,
        gender=Gender.get(customer.gender.upper()) if customer.gender else None,
        tax_code=customer.tax_code,
        phone=customer.phone,
        country=customer.country,
        state=customer.state,
        city=customer.city,
        address=customer.address,
        zip_code=customer.zip_code,
        birth_country=customer.birth_country,
        birth_state=customer.birth_state,
        birth_city=customer.birth_city,
    )
