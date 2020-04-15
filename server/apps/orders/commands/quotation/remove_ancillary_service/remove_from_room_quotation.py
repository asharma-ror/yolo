from server.apps.orders.exceptions import QuotationServiceNotRemovableError
from server.apps.orders.models import QuotationRoom, QuotationService, SelectionType
from server.apps.orders.queries.quotation.quotation_room_queries import (
    get_room_quotation_service,
)

from ..common.update_room_price import update_room_price


def remove_ancillary_service_from_room_quotation(
    room_quotation: QuotationRoom, service_id: str
):
    service = get_room_quotation_service(room_quotation, service_id)

    if not is_valid_service_for_removal(service):
        raise QuotationServiceNotRemovableError(f"Service {service_id} not removable")

    service.delete()

    update_room_price(room_quotation)
    room_quotation.save()


def is_valid_service_for_removal(service: QuotationService) -> bool:
    return bool(
        service.service_type
        and service.service_type.is_ancillary_service()
        and service.selection_type == SelectionType.OPTIONAL
    )
