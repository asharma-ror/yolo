import json
from datetime import date

import pytest
from django.utils import timezone
from pytest_bdd import scenario, then, when

from server.apps.orders.models import QuotationStatus
from server.apps.orders.queries.quotation import get_quotation
from server.apps.orders.queries.reservations import get_reservation_from_quotation_id
from server.apps.orders.tests.utils.mocks import (
    patched_gateway_payment_init,
    patched_gateway_payment_verify,
    random_customer,
    random_passengers,
)
from server.apps.orders.types.payments import PaymentInitOutputData, TransactionResult
from server.apps.products.models import ProductAllotment
from server.apps.products.queries import (
    get_master_allotment_availabilities,
    get_occupancy,
)
from server.tests.bdd import get_feature

checkout_feature = get_feature("b2c", "purchase", "checkout.feature")


@pytest.fixture
def checkout_data():
    return {}


@scenario(
    checkout_feature, "Purchase a product",
)
def test_b2c_product_purchase():
    """scenario"""


@when("the user goes to product checkout")
def the_user_starts_the_checkout(
    a_product_allotment: ProductAllotment, checkout_data, orders_client
):
    availabilities = get_master_allotment_availabilities(
        a_product_allotment.allotment_id
    )
    assert len(availabilities) == 1
    availability = availabilities[0]
    occupancy = get_occupancy(availability.occupancy_code)
    result = orders_client.create_quotation([availability.availability_key])
    assert not result.get("errors")
    quotation = result["data"]["createQuotation"]["quotation"]
    rooms = quotation["quotationroomSet"]
    assert len(rooms) == 1
    assert rooms[0]["totAdults"] == availability.tot_adults
    assert len(rooms[0]["passengerSet"]) == availability.tot_adults
    for pax_index in range(0, availability.tot_adults):
        assert (
            rooms[0]["passengerSet"][pax_index]["minAge"]
            == occupancy.adult_validators[pax_index]["min_age"]
        )
        assert (
            rooms[0]["passengerSet"][pax_index]["maxAge"]
            == occupancy.adult_validators[pax_index]["max_age"]
        )
    assert quotation["totalPrice"] == a_product_allotment.price
    checkout_data["quotation_id"] = quotation["quotationId"]
    checkout_data["tot_passengers"] = availability.tot_adults
    checkout_data["total_price"] = quotation["totalPrice"]
    checkout_data["deposit_price"] = quotation["depositPrice"]


@when("the user inserts passengers data")
def the_user_inserts_passengers(checkout_data, orders_client):
    customer = random_customer()
    passengers = random_passengers(checkout_data["tot_passengers"])
    result = orders_client.set_passengers(
        checkout_data["quotation_id"], customer, passengers
    )
    assert not result.get("errors")
    quotation = result["data"]["setQuotationPassengers"]["quotation"]
    quot_cust = quotation["customer"]
    assert quot_cust["name"] == customer.name
    assert quot_cust["surname"] == customer.surname
    assert quot_cust["email"] == customer.email
    assert date.fromisoformat(quot_cust["birthday"]) == customer.birthday
    assert quot_cust["gender"] == str(customer.gender).lower()
    assert quot_cust["phone"] == customer.phone


@when("the user select to pay <payment_type> with provider <provider_type>")
def the_user_goes_to_payment(checkout_data, orders_client, payment_type, provider_type):
    with patched_gateway_payment_init(
        PaymentInitOutputData(payment_id="xxxxxx", payload={})
    ):
        result = orders_client.initialize_payment(
            quotation_id=checkout_data["quotation_id"],
            provider_id=provider_type,
            payment_method="card",
            payment_type=payment_type,
            payload=json.dumps(
                {
                    "productName": "Bundle Test",
                    "productDescription": "Description Bundle Test",
                }
            ),
            success_url="http://tests.local/success",
            cancel_url="http://tests.local/cancel",
        )
        assert not result.get("errors")
        checkout_data["payment_data"] = result["data"]["initializePayment"][
            "paymentData"
        ]


@when("the user pays <payment_amount> €")
def the_user_pays(checkout_data, orders_client, payment_amount):
    with patched_gateway_payment_verify(
        TransactionResult(
            transaction_confirmed=True,
            transaction_time=timezone.now(),
            payment_id="xxxx",
            amount=float(payment_amount),
            data={},
        )
    ):
        result = orders_client.verify_reservation(
            checkout_data["payment_data"]["paymentSessionId"]
        )
        assert not result.get("errors")


@then("the reservation is completed")
def the_reservation(checkout_data):
    quotation = get_quotation(checkout_data["quotation_id"])
    assert quotation.status == QuotationStatus.CONFIRMED
    assert quotation.reservation


@then("the user received a confirmation email")
def the_user_received_a_confirmation_email(checkout_data, mailoutbox):
    reservation = get_reservation_from_quotation_id(checkout_data["quotation_id"])
    assert len(mailoutbox) == 1
    assert list(mailoutbox[0].to) == [reservation.quotation.get_customer().email]
