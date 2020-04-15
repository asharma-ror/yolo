from django.core.exceptions import ObjectDoesNotExist

from server.apps.orders.exceptions import (
    AncillaryServiceNotFoundError,
    QuotationServiceNotFoundError,
)
from server.apps.orders.models import (
    QuotationAdditionalService,
    QuotationRoom,
    QuotationService,
)


def get_ancillary_service(
    room_quotation: QuotationRoom, service_id: str
) -> QuotationAdditionalService:
    try:
        return room_quotation.get_additional_service(service_id)
    except ObjectDoesNotExist as e:
        raise AncillaryServiceNotFoundError(f"Service {service_id} not found") from e


def get_room_quotation_service(
    room_quotation: QuotationRoom, service_id: str
) -> QuotationService:
    try:
        return room_quotation.get_service(service_id)
    except ObjectDoesNotExist as e:
        raise QuotationServiceNotFoundError(f"Service {service_id} not found") from e
