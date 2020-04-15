import random
import string
from datetime import date
from typing import List

from mixer.backend.django import mixer

from server.apps.products.models import (
    DepartureOption,
    Product,
    ProductAllotment,
    ProductAvailability,
    ProductDestination,
)
from server.apps.products.queries import get_occupancy


def _generate_random_product_id() -> str:
    return "".join(random.choices(string.ascii_uppercase, k=10))


def mock_allotment(
    product, max_places, occupancy_code, departure_type, departure_value, **kwargs,
):
    defaults = {
        "nights": 7,
        "days": 7,
        "price": 399,
        "start_date_from": date(2020, 1, 1),
        "max_contiguous_allotment_nights": 0,
    }
    defaults.update(kwargs)
    return mixer.blend(
        ProductAllotment,
        product=product,
        quantity=max_places,
        occupancies=[get_occupancy(occupancy_code)],
        departure_options=[
            _get_or_create_departure_option(departure_type, departure_value)
        ],
        **defaults,
    )


def _get_or_create_departure_option(dep_type, dep_value):
    opt = DepartureOption.objects.filter(type=dep_type, value=dep_value).first()
    return opt if opt else mixer.blend(DepartureOption, type=dep_type, value=dep_value)


def mock_product(product_id=_generate_random_product_id()):  # noqa
    product = mixer.blend(Product, product_id=product_id)
    mock_product_destination(
        product, f"dest_{product_id}_cod", f"dest_{product_id}_name"
    )
    return product


def mock_product_destination(product, destination_code, destination_name):
    destination = mixer.blend(
        ProductDestination,
        code=destination_code,
        name=destination_name,
        searchable=True,
    )
    product.destinations.add(destination)
    return destination


def mock_availability(
    product_id: string,
    tot_adults: int,
    quantity: int,
    departure_date: date,
    nights: int,
    price: float,
    destination_codes: List[str] = list,
):
    return mixer.blend(
        ProductAvailability,
        product_id=product_id,
        tot_adults=tot_adults,
        occupancy_code=f"{tot_adults}U30",
        quantity_available=quantity,
        quantity_total=quantity,
        start_date_from=departure_date,
        start_date_to=departure_date,
        nights=nights,
        days=nights,
        price=price,
        allotments_id=[],
        destination_codes=destination_codes,
    )
