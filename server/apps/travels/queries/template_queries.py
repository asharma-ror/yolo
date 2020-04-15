from datetime import date

from django.db.models import Q

from server.apps.travels.models import TravelTemplate


def get_travel_template(
    product_id: str, reservation_date: date, departure_date: date
) -> TravelTemplate:
    return TravelTemplate.objects.get(
        Q(product_id=product_id)
        & (
            Q(reservation_date_from__isnull=True)
            | Q(reservation_date_from__lte=reservation_date)
        )
        & (
            Q(reservation_date_to__isnull=True)
            | Q(reservation_date_to__lte=reservation_date)
        )
        & (
            Q(departure_date_from__isnull=True)
            | Q(departure_date_from__lte=departure_date)
        )
        & (Q(departure_date_to__isnull=True) | Q(departure_date_to__lte=departure_date))
    )
