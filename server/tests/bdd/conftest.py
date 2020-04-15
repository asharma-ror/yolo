import pytest
from pytest_bdd import given

from server.apps.orders.tests.utils.quotation_initializer import (
    mock_reservation_from_allotment,
)
from server.apps.products.models import DepartureOptionType
from server.apps.products.tests.utils.product_inizializer import (
    mock_allotment,
    mock_product,
)
from server.tests.bdd.step_defs.clients import OrdersClient, ProductsClient


def pytest_bdd_apply_tag(tag, function):
    if tag == "django_db":
        marker = pytest.mark.django_db()
        marker(function)
        return True
    # Fall back to pytest-bdd's default behavior
    return None


@pytest.fixture
def products_client():
    return ProductsClient()


@pytest.fixture
def orders_client():
    return OrdersClient()


@pytest.fixture
def a_product():
    return mock_product()


@given(
    "a product with <max_places> places for <occupancy_code> occupancy from airport <airport_code>"
)
def a_product_allotment(a_product, max_places, occupancy_code, airport_code):
    return mock_allotment(
        product=a_product,
        max_places=max_places,
        occupancy_code=occupancy_code,
        departure_type=DepartureOptionType.NONE
        if airport_code == "None"
        else DepartureOptionType.AIRPORT,
        departure_value="_" if airport_code == "None" else airport_code,
    )


@given("a base price of <room_price> €")
def a_base_price(a_product_allotment, room_price):
    a_product_allotment.price = float(room_price)
    a_product_allotment.save()


@given("<tot_reservations> confirmed reservations for that product")
def some_confirmed_reservations(a_product_allotment, tot_reservations):
    return [
        mock_reservation_from_allotment(a_product_allotment)
        for i in range(0, int(tot_reservations))
    ]
