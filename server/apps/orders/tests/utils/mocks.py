from random import randrange
from unittest.mock import MagicMock, patch

from mixer.backend.django import mixer

from server.apps.orders.components import payment_gateway
from server.apps.orders.models import Customer, Passenger
from server.apps.orders.tests.utils.quotation_initializer import birthday
from server.apps.orders.types.payments import PaymentInitOutputData, TransactionResult


def mock_send_confirmation_email():
    return patch("server.apps.orders.commands.reservations.send_confirmation_email")


def random_under_30_birthday():
    return birthday(randrange(20, 30))  # noqa


def random_customer():
    with mixer.ctx(commit=False):
        return mixer.blend(
            Customer, birthday=random_under_30_birthday(), gender=mixer.RANDOM
        )


def random_passengers(tot_passengers):
    with mixer.ctx(commit=False):
        return mixer.cycle(tot_passengers).blend(
            Passenger, birthday=random_under_30_birthday(), gender=mixer.RANDOM
        )


def patched_gateway_payment_init(result: PaymentInitOutputData):
    return patch.object(
        payment_gateway,
        "get",
        return_value=MagicMock(initialize_session=MagicMock(return_value=result)),
    )


def patched_gateway_payment_verify(result: TransactionResult):
    return patch.object(
        payment_gateway,
        "get",
        return_value=MagicMock(verify_payment=MagicMock(return_value=result)),
    )
