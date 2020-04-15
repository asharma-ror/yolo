from typing import List, Optional

from django.db.models import Q
from django.db.models.aggregates import Min

from server.apps.products.models import ProductAvailability


def get_master_allotment_availabilities(allotment_id: str) -> List[ProductAvailability]:
    return ProductAvailability.objects.filter(master_allotment_id=allotment_id).all()


def get_all_product_availabilities() -> List[ProductAvailability]:
    return ProductAvailability.objects.filter(quantity_available__gte=1)


def get_calendar_products_availability(
    tot_adults: int,
    product_id: Optional[str] = None,
    destination_id: Optional[str] = None,
):
    query = Q(tot_adults=tot_adults) & Q(quantity_available__gte=1)
    if product_id is not None:
        query &= Q(product_id=product_id)
    if destination_id is not None:
        query &= Q(destination_codes__contains=[destination_id])
    return (
        ProductAvailability.objects.order_by("nights", "start_date_from")
        .filter(query)
        .values("nights", "start_date_from")
        .annotate(min_price=Min("price"))
    )
