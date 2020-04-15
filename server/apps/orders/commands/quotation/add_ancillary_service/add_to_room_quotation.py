from server.apps.orders.exceptions import QuotationServiceAlreadyAdded
from server.apps.orders.models import (
    QuantityType,
    QuotationAdditionalService,
    QuotationRoom,
    QuotationService,
    SelectionType,
)
from server.apps.orders.queries.quotation import get_ancillary_service
from server.apps.orders.utils.quotation_services_util import (
    get_ancillary_quotation_service_type,
)

from ..common import update_room_price


def add_ancillary_service_to_room_quotation(
    room_quotation: QuotationRoom, service_id: str
):
    _check_if_service_already_present(room_quotation, service_id)

    service = get_ancillary_service(room_quotation, service_id)
    _create_quotation_ancillary_service(room_quotation, service)

    update_room_price(room_quotation)
    room_quotation.save()


def _check_if_service_already_present(room_quotation: QuotationRoom, service_id: str):
    if room_quotation.contains_service(service_id):
        raise QuotationServiceAlreadyAdded


def _create_quotation_ancillary_service(
    room_quotation: QuotationRoom, service: QuotationAdditionalService
):
    return QuotationService.objects.create(
        name=service.name,
        room=room_quotation,
        price_type=service.price_type,
        price=service.price,
        priority=service.priority,
        quantity_type=service.quantity_type,
        quantity=room_quotation.tot_adults
        if service.quantity_type == QuantityType.PER_PERSON
        else 1,
        selection_type=SelectionType.OPTIONAL,
        service_type=get_ancillary_quotation_service_type(),
        service_id=service.service_id,
    )
