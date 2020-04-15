from typing import List

from server.apps.orders.models import Reservation
from server.apps.orders.queries.reservations import get_reservation_from_products
from server.apps.products.queries import get_company_products_id


def get_company_reservations(company_id: str) -> List[Reservation]:
    company_products = get_company_products_id(company_id)
    return get_reservation_from_products(company_products)
