import uuid
from datetime import date
from unittest.mock import patch

from mixer.backend.django import mixer

from server.apps.orders.commands.quotation.common.update_quotation_price import (
    DEFAULT_DEPOSIT_PERCENTAGE,
)
from server.apps.products.models import ProductAllotment

from ... import models
from ...utils import quotation_services_util, quotations_util


def mock_reservation_from_allotment(allotment: ProductAllotment):
    with patch(
        "server.apps.orders.signals._send_reservation_confirmation_email_handler"
    ):
        mixer.blend(
            models.Reservation,
            quotation=mock_quotation(
                rooms_count=1,
                adults_per_room=allotment.occupancies.first().tot_adults,
                status=models.QuotationStatus.CONFIRMED,
                allotment_id=allotment.allotment_id,
            ),
        )


def mock_customer(quotation, name, surname, email):
    return mixer.blend(
        models.Customer, quotation=quotation, name=name, surname=surname, email=email
    )


def mock_discount(
    code: str, amount: float, reservation_id: str = None
) -> models.DiscountTicket:
    return mixer.blend(
        models.DiscountTicket, code=code, amount=amount, reservation_id=reservation_id
    )


DEFAULT_QUOT = quotations_util.generate_random_quotation_number()


def mock_quotation(  # noqa
    quotation_id=DEFAULT_QUOT,
    rooms_count=2,
    room_price=399,
    adults_per_room=2,
    status=models.QuotationStatus.DRAFT,
    customer_email=None,
    allotment_id=None,
    discount_amount=None,
    discount_code=None,
) -> models.Quotation:
    quotation = mixer.blend(
        models.Quotation,
        quotation_id=quotation_id,
        status=status,
        total_price=_calculate_total_amount(room_price, rooms_count),
        total_discount=0,
        deposit_price=_calculate_deposit_amount(room_price, rooms_count),
    )
    for room_index in range(0, rooms_count):
        mock_quotation_room(
            quotation,
            room_index,
            room_price,
            adults_per_room,
            allotment_id if allotment_id else str(uuid.uuid4()),
            status
            in {models.QuotationStatus.OPTIONED, models.QuotationStatus.CONFIRMED},
        )

    if customer_email:
        mixer.blend(models.Customer, quotation=quotation, email=customer_email)

    if discount_amount:
        mock_quotation_discount(quotation, discount_amount, discount_code)

    return quotation


def mock_quotation_room(
    quotation=None,
    room_index=0,
    room_price=300,
    tot_adults=2,
    allotment_id=None,
    optioned=False,
) -> models.QuotationRoom:
    if not allotment_id:
        allotment_id = _generate_random_allotment_id()

    if not quotation:
        quotation = mixer.blend(models.Quotation, total_price=room_price)

    quotation_room = mixer.blend(
        models.QuotationRoom,
        quotation=quotation,
        master_allotment_id=allotment_id,
        tot_allotments=1,
        allotments_id=[allotment_id],
        room_index=room_index,
        room_price=room_price,
        room_discount=0,
        tot_adults=tot_adults,
        optioned=optioned,
    )
    for pax_index in range(0, tot_adults):
        mixer.blend(
            models.Passenger,
            room=quotation_room,
            passenger_index=pax_index,
            min_age=18,
            max_age=29,
        )
    mock_base_price_service(quotation_room, room_price)
    return quotation_room


def mock_quotation_discount(quotation: models.Quotation, amount: float, code: str):
    quotation.total_discount += amount
    quotation.total_price -= amount
    quotation.save()

    room = quotation.get_room(0)
    room.room_price -= amount
    room.room_discount += amount

    mock_discount(amount=amount, code=code, reservation_id=None)
    mock_discount_service(room=room, discount_amount=amount, discount_code=code)


def mock_base_price_service(room, base_price, service_id="") -> models.QuotationService:
    return mixer.blend(
        models.QuotationService,
        room=room,
        price_type=models.PriceType.TOTAL,
        price=base_price,
        priority=0,
        quantity=1,
        quantity_type=models.QuantityType.PER_ROOM,
        service_type=quotation_services_util.get_base_price_quotation_service_type(),
        service_id=service_id,
    )


def mock_discount_service(
    room, discount_amount, discount_code=""
) -> models.QuotationService:
    return mixer.blend(
        models.QuotationService,
        room=room,
        price_type=models.PriceType.TOTAL,
        price=-discount_amount,
        priority=0,
        quantity=1,
        quantity_type=models.QuantityType.PER_ROOM,
        service_type=quotation_services_util.get_discount_quotation_service_type(),
        service_id=discount_code,
    )


def mock_quotation_ancillary_service(
    room,
    service_id,
    price,
    price_type,
    quantity_type,
    selection_type=models.SelectionType.OPTIONAL,
) -> models.QuotationService:
    return mixer.blend(
        models.QuotationService,
        room=room,
        price_type=price_type,
        price=price,
        priority=200,
        quantity=1,
        quantity_type=quantity_type,
        selection_type=selection_type,
        service_type=quotation_services_util.get_ancillary_quotation_service_type(),
        service_id=service_id,
    )


def mock_ancillary_service(
    room, price, price_type, service_id, quantity_type
) -> models.QuotationAdditionalService:
    return mixer.blend(
        models.QuotationAdditionalService,
        room=room,
        service_id=service_id,
        price_type=price_type,
        price=price,
        quantity_type=quantity_type,
        priority=200,
    )


def mock_quotation_customer(
    quotation, name, surname, phone, email, birthday, gender
) -> models.Customer:
    return mixer.blend(
        models.Customer,
        quotation=quotation,
        name=name,
        surname=surname,
        phone=phone,
        email=email,
        gender=gender,
        birthday=birthday,
    )


def set_room_passenger(
    room, passenger_index, name, surname, birthday, gender
) -> models.Passenger:
    passenger = room.get_passenger(passenger_index)
    passenger.name = name
    passenger.surname = surname
    passenger.gender = gender
    passenger.birthday = birthday
    passenger.save()
    return passenger


def birthday(age: int, today: date = date.today()) -> date:  # noqa
    return today.replace(year=today.year - age)


def _calculate_deposit_amount(price_per_room, rooms_count):
    return (
        _calculate_total_amount(price_per_room, rooms_count)
        * DEFAULT_DEPOSIT_PERCENTAGE
        / 100.0
    )


def _calculate_total_amount(price_per_room, rooms_count):
    return price_per_room * rooms_count


def _generate_random_allotment_id() -> str:
    return str(uuid.uuid4())
