import random
import string

import pytest
from django.utils import timezone
from mixer.backend.django import mixer

from server.apps.orders.commands.reservations import verify_reservation
from server.apps.orders.exceptions import (
    InvalidPaymentAttemptStateError,
    InvalidQuotationStatusError,
    PaymentTransactionDeclined,
)
from server.apps.orders.models import (
    Payment,
    PaymentAttempt,
    PaymentStatus,
    Quotation,
    QuotationStatus,
    Reservation,
)
from server.apps.orders.tests.utils.mocks import patched_gateway_payment_verify
from server.apps.orders.tests.utils.quotation_initializer import mock_quotation
from server.apps.orders.types.payments import TransactionResult
from server.apps.orders.utils.payment_utils import generate_payment_session_id
from server.apps.orders.utils.quotations_util import generate_random_quotation_number


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.fixture()
def payment_session_id() -> str:
    return generate_payment_session_id()


@pytest.fixture()
def transaction_id() -> str:
    return "".join(random.choices(string.ascii_lowercase, k=6))


def _transaction_success(transaction_id):
    return patched_gateway_payment_verify(
        TransactionResult(
            transaction_confirmed=True,
            transaction_time=timezone.now(),
            payment_id=transaction_id,
            amount=399,
            data={},
        )
    )


def _run_invalid_quotation_state_test(
    payment_session_id, quotation_id, quotation_status
):
    mixer.blend(
        PaymentAttempt,
        quotation_id=quotation_id,
        payment_session_id=payment_session_id,
        status=PaymentStatus.SUCCEEDED,
    )
    mixer.blend(Quotation, quotation_id=quotation_id, status=quotation_status)
    verify_reservation(payment_session_id)


@pytest.mark.usefixtures(  # noqa
    "db", "mock_signal_update_avail_records_from_quotation_room"
)
class TestReservationVerify:
    @pytest.mark.parametrize(
        "status",
        [
            PaymentStatus.INITIALIZING,
            PaymentStatus.DECLINED,
            PaymentStatus.ERROR,
            PaymentStatus.EXPIRED,
        ],
    )
    def test_initializing_payment_raise_error(self, payment_session_id, status):
        with pytest.raises(InvalidPaymentAttemptStateError):
            self._run_invalid_payment_state_test(payment_session_id, status)

    def _run_invalid_payment_state_test(self, payment_session_id, payment_status):
        mixer.blend(
            PaymentAttempt, payment_session_id=payment_session_id, status=payment_status
        )
        verify_reservation(payment_session_id)

    def test_draft_quotation_raise_error(self, payment_session_id, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            _run_invalid_quotation_state_test(
                payment_session_id, quotation_id, QuotationStatus.DRAFT
            )

    def test_optioned_quotation_raise_error(self, payment_session_id, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            _run_invalid_quotation_state_test(
                payment_session_id, quotation_id, QuotationStatus.OPTIONED
            )

    def test_canceled_quotation_raise_error(self, payment_session_id, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            _run_invalid_quotation_state_test(
                payment_session_id, quotation_id, QuotationStatus.CANCELED
            )

    def test_expired_quotation_raise_error(self, payment_session_id, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            _run_invalid_quotation_state_test(
                payment_session_id, quotation_id, QuotationStatus.EXPIRED
            )

    def test_verify_reservation_with_completed_payment(
        self, payment_session_id, quotation_id
    ):
        mixer.blend(
            PaymentAttempt,
            quotation_id=quotation_id,
            payment_session_id=payment_session_id,
            status=PaymentStatus.SUCCEEDED,
        )
        mixer.blend(
            Payment,
            reservation=mixer.blend(
                Reservation,
                quotation=mock_quotation(
                    quotation_id=quotation_id,
                    status=QuotationStatus.CONFIRMED,
                    customer_email="simone.sabba@whereigo.it",
                ),
            ),
            payment_session_id=payment_session_id,
        )

        verify_reservation(payment_session_id)

    def test_verify_reservation_with_pending_declined_payment_raise_error(
        self, payment_session_id, quotation_id, transaction_id
    ):
        with pytest.raises(PaymentTransactionDeclined), _transaction_declined(  # noqa
            transaction_id
        ):
            mixer.blend(
                PaymentAttempt,
                quotation_id=quotation_id,
                payment_session_id=payment_session_id,
                status=PaymentStatus.PENDING,
                transaction_id=transaction_id,
            )
            mixer.blend(
                Quotation, quotation_id=quotation_id, status=QuotationStatus.CONFIRMED,
            )
            verify_reservation(payment_session_id)

    def test_verify_reservation_with_pending_succeeded_payment(
        self, payment_session_id, quotation_id, transaction_id
    ):
        with _transaction_success(transaction_id):
            mixer.blend(
                PaymentAttempt,
                quotation_id=quotation_id,
                payment_session_id=payment_session_id,
                status=PaymentStatus.PENDING,
                transaction_id=transaction_id,
            )
            mock_quotation(
                quotation_id=quotation_id,
                status=QuotationStatus.OPTIONED,
                customer_email="simone.sabba@whereigo.it",
            )
            verify_reservation(payment_session_id)


def _transaction_declined(transaction_id):
    return patched_gateway_payment_verify(
        TransactionResult(
            transaction_confirmed=False,
            transaction_time=timezone.now(),
            payment_id=transaction_id,
            amount=399,
            data={},
        )
    )
