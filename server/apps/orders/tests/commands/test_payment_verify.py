import pytest
from django.utils import timezone
from mixer.backend.django import mixer

from server.apps.orders.commands.payments import verify_payment
from server.apps.orders.exceptions import (
    PaymentTransactionDeclined,
    PaymentTransactionError,
)
from server.apps.orders.models import PaymentAttempt, PaymentStatus
from server.apps.orders.queries.payments.payment_queries import get_payment_attempt
from server.apps.orders.types.payments import TransactionResult
from server.apps.orders.utils.payment_utils import generate_payment_session_id


@pytest.fixture()
def payment_session_id() -> str:
    return generate_payment_session_id()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestPaymentInitializeSession:
    def test_payment_attempt_inconsistent_state_raise_error(self, payment_session_id):
        with pytest.raises(PaymentTransactionError):
            mixer.blend(
                PaymentAttempt,
                payment_session_id=payment_session_id,
                status=PaymentStatus.INITIALIZING,
            )
            verify_payment(
                payment_session_id=payment_session_id,
                transaction_data=TransactionResult(
                    transaction_confirmed=True,
                    transaction_time=timezone.now(),
                    payment_id="transaction-1",
                    amount=399,
                    data={},
                ),
            )

        payment_attempt = get_payment_attempt(payment_session_id)
        assert payment_attempt.status == PaymentStatus.ERROR
        assert payment_attempt.transaction_id == "transaction-1"

    def test_payment_declined(self, payment_session_id):
        with pytest.raises(PaymentTransactionDeclined):
            mixer.blend(
                PaymentAttempt,
                payment_session_id=payment_session_id,
                status=PaymentStatus.PENDING,
            )
            verify_payment(
                payment_session_id=payment_session_id,
                transaction_data=TransactionResult(
                    transaction_confirmed=False,
                    transaction_time=timezone.now(),
                    payment_id="transaction-2",
                    amount=399,
                    data={},
                ),
            )

        payment_attempt = get_payment_attempt(payment_session_id)
        assert payment_attempt.status == PaymentStatus.DECLINED
        assert payment_attempt.transaction_id == "transaction-2"

    def test_payment_accepted(self, payment_session_id):
        mixer.blend(
            PaymentAttempt,
            payment_session_id=payment_session_id,
            status=PaymentStatus.PENDING,
        )
        verify_payment(
            payment_session_id=payment_session_id,
            transaction_data=TransactionResult(
                transaction_confirmed=True,
                transaction_time=timezone.now(),
                payment_id="transaction-3",
                amount=399,
                data={},
            ),
        )

        payment_attempt = get_payment_attempt(payment_session_id)
        assert payment_attempt.status == PaymentStatus.SUCCEEDED
        assert payment_attempt.transaction_id == "transaction-3"
