from typing import List

from server.apps.orders.models import Reservation


def get_reservation_from_payment(payment_session_id: str) -> Reservation:
    return Reservation.objects.get(payment__payment_session_id=payment_session_id)


def get_reservation_from_quotation_id(quotation_id: str) -> Reservation:
    return Reservation.objects.get(quotation__quotation_id=quotation_id)


def get_reservation_from_products(products_id: List[str]) -> List[Reservation]:
    return Reservation.objects.get(quotation__product_id__in=products_id)
