from typing import List

from server.apps.orders.models import Passenger, QuotationRoom
from server.apps.products.models import ProductAvailability


def create_room_passengers(
    room: QuotationRoom, availability_item: ProductAvailability
) -> List[Passenger]:
    validators = availability_item.adult_validators
    return [
        _create_passenger(room=room, index=pax_index, validator=validators[pax_index])
        for pax_index in range(0, availability_item.tot_adults)
    ]


def _create_passenger(room: QuotationRoom, index: int, validator) -> Passenger:
    return Passenger.objects.create(
        room=room,
        passenger_index=index,
        min_age=validator["min_age"],
        max_age=validator["max_age"],
    )
