from typing import Sequence

from django.db.models import Q

from server.apps.products.models import AncillaryService, ServiceSelectionType


def get_ancillary_services(
    allotment_id: str, selection_types: Sequence[ServiceSelectionType] = ()
):
    filters = Q(productallotment__allotment_id=allotment_id)
    if selection_types:
        filters &= Q(selection_type__in=selection_types)

    return AncillaryService.objects.filter(filters).all()
