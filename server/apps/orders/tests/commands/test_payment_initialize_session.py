import random
import string
from unittest.mock import MagicMock, patch

import pytest

from server.apps.orders.components import payment_gateway
from server.apps.orders.exceptions import InvalidQuotationStatusError
from server.apps.orders.models import (
    PaymentAttempt,
    PaymentStatus,
    PaymentType,
    Quotation,
    QuotationStatus,
)

from ...commands.payments import initialize_payment_session
from ...utils.quotations_util import generate_random_quotation_number
from ..utils.quotation_initializer import mock_customer, mock_quotation


@pytest.fixture()
def payment_gateway_id() -> str:
    return "fake_payment_gateway"


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.fixture()
def payment_id() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=6))


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestPaymentInitializeSession:
    def test_non_existing_quotation_raise_not_found_error(
        self, quotation_id, payment_gateway_id
    ):
        with pytest.raises(Quotation.DoesNotExist):
            initialize_payment_session(
                MagicMock(
                    quotation_id=quotation_id,
                    provider_id=payment_gateway_id,
                    payment=MagicMock(method="card", type="full_amount", payload="{}"),
                    payment_success_base_url="http://test/confirm",
                    payment_cancel_base_url="http://test/cancel",
                )
            )

    def test_non_optioned_quotation_raise_draft_state_error(
        self, quotation_id, payment_gateway_id
    ):
        with pytest.raises(InvalidQuotationStatusError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.DRAFT,
            )

            initialize_payment_session(
                MagicMock(
                    quotation_id=quotation_id,
                    provider_id=payment_gateway_id,
                    payment=MagicMock(method="card", type="full_amount", payload="{}"),
                    payment_success_base_url="http://test/confirm",
                    payment_cancel_base_url="http://test/cancel",
                )
            )

    @patch("server.apps.orders.components.payment_logger", MagicMock())
    def test_initialize_quotation_full_amount_payment(
        self, quotation_id, payment_gateway_id, payment_id
    ):
        with self._gateway_result(payment_id, {"payment_session_id": "xxxx"}):
            mock_customer(
                quotation=mock_quotation(
                    quotation_id=quotation_id,
                    rooms_count=1,
                    room_price=399,
                    adults_per_room=2,
                    status=QuotationStatus.OPTIONED,
                ),
                name="Simone",
                surname="Sabba",
                email="simone.sabba@whereigo.it",
            )

            session = initialize_payment_session(
                MagicMock(
                    quotation_id=quotation_id,
                    provider_id=payment_gateway_id,
                    payment=MagicMock(method="card", type="full_amount", payload="{}"),
                    payment_success_base_url="http://test/confirm",
                    payment_cancel_base_url="http://test/cancel",
                )
            )

            assert session.payment_amount == 399
            assert session.provider_id == payment_gateway_id

            payment_attempt = PaymentAttempt.objects.get(
                payment_session_id=session.payment_session_id
            )
            assert payment_attempt.status == PaymentStatus.PENDING
            assert payment_attempt.quotation_id == quotation_id
            assert payment_attempt.payment_method == "card"
            assert payment_attempt.payment_type == PaymentType.FULL_AMOUNT
            assert payment_attempt.payment_amount == 399
            assert payment_attempt.transaction_provider == payment_gateway_id
            assert payment_attempt.transaction_id == payment_id

    def test_initialize_quotation_deposit_amount_payment(
        self, quotation_id, payment_gateway_id, payment_id
    ):
        with self._gateway_result(payment_id, {"payment_session_id": "xxxx"}):
            mock_customer(
                quotation=mock_quotation(
                    quotation_id=quotation_id,
                    rooms_count=1,
                    room_price=399,
                    adults_per_room=2,
                    status=QuotationStatus.OPTIONED,
                ),
                name="Simone",
                surname="Sabba",
                email="simone.sabba@whereigo.it",
            )

            session = initialize_payment_session(
                MagicMock(
                    quotation_id=quotation_id,
                    provider_id=payment_gateway_id,
                    payment=MagicMock(method="card", type="deposit", payload="{}"),
                    payment_success_base_url="http://test/confirm",
                    payment_cancel_base_url="http://test/cancel",
                )
            )

            assert session.payment_amount == 99.75
            assert session.provider_id == payment_gateway_id

            payment_attempt = PaymentAttempt.objects.get(
                payment_session_id=session.payment_session_id
            )
            assert payment_attempt.status == PaymentStatus.PENDING
            assert payment_attempt.quotation_id == quotation_id
            assert payment_attempt.payment_method == "card"
            assert payment_attempt.payment_type == PaymentType.DEPOSIT
            assert payment_attempt.payment_amount == 99.75
            assert payment_attempt.transaction_provider == payment_gateway_id
            assert payment_attempt.transaction_id == payment_id

    def _gateway_result(self, payment_id, payload):
        return patch.object(
            payment_gateway,
            "get",
            return_value=MagicMock(
                initialize_session=MagicMock(
                    return_value=MagicMock(payment_id=payment_id, payload=payload)
                )
            ),
        )
