from typing import List

from django.db import transaction

from server.apps.orders.commands.quotation.common.validate_cached_rooms_availability import (
    validate_cached_rooms_availability,
)
from server.apps.orders.exceptions import RoomNotAvailableError
from server.apps.orders.models import Quotation, QuotationRoom, QuotationStatus
from server.apps.orders.utils.quotations_util import generate_random_quotation_number
from server.apps.products.models import ProductAvailability

from ..common.update_quotation_price import update_quotation_price
from ..create_quotation.create_room import create_room_quotation


def create_quotation(availability_keys: List[str]) -> Quotation:

    validation_result = validate_cached_rooms_availability(availability_keys)
    if not validation_result.is_available:
        raise RoomNotAvailableError()

    availability_items = validation_result.availability_items
    avai_item = availability_items[0]

    with transaction.atomic():
        quotation = Quotation.objects.create(
            quotation_id=generate_random_quotation_number(),
            product_id=avai_item.product_id,
            status=QuotationStatus.DRAFT,
            start_date_from=avai_item.start_date_from,
            start_date_to=avai_item.start_date_to,
            nights=avai_item.nights,
            days=avai_item.days,
            departure_option_type=str(avai_item.departure_option_type),
            departure_option_value=avai_item.departure_option_value,
            total_price=0,
            total_discount=0,
        )

        room_quotations = _create_room_quotations(
            quotation=quotation, availability_items=availability_items
        )

        update_quotation_price(quotation)

        for room_quotation in room_quotations:
            room_quotation.quotation = quotation

        quotation.save()

    return quotation


def _create_room_quotations(
    quotation: Quotation, availability_items: List[ProductAvailability]
) -> List[QuotationRoom]:
    room_quotations = []
    for index, availability_item in enumerate(availability_items):
        room_quotations.append(
            create_room_quotation(quotation, availability_item, index)
        )
    return room_quotations
