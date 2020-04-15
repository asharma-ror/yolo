from datetime import datetime

import pytest
from mixer.backend.django import mixer
from pytz import utc

from server.apps.orders.exceptions import (
    InvalidPaymentAttemptStateError,
    InvalidQuotationStatusError,
)
from server.apps.orders.models import (
    PaymentAttempt,
    PaymentStatus,
    PaymentType,
    QuotationStatus,
)

from ...commands.reservations import confirm_reservation
from ...queries.promo import get_discount_ticket
from ...utils.payment_utils import generate_payment_session_id
from ...utils.quotations_util import generate_random_quotation_number
from ..utils.mocks import mock_send_confirmation_email
from ..utils.quotation_initializer import mock_quotation


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.fixture()
def payment_session_id() -> str:
    return generate_payment_session_id()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestConfirmReservation:
    def test_confirm_reservation_with_draft_status_raise_error(
        self, quotation_id, payment_session_id
    ):
        with pytest.raises(InvalidQuotationStatusError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.DRAFT,
            )
            mixer.blend(
                PaymentAttempt,
                quotation_id=quotation_id,
                payment_session_id=payment_session_id,
                status=PaymentStatus.SUCCEEDED,
            )

            confirm_reservation(quotation_id, payment_session_id)

    def test_confirm_reservation_with_declined_payment_raise_error(
        self, quotation_id, payment_session_id
    ):
        with pytest.raises(InvalidPaymentAttemptStateError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.OPTIONED,
            )
            mixer.blend(
                PaymentAttempt,
                quotation_id=quotation_id,
                payment_session_id=payment_session_id,
                status=PaymentStatus.DECLINED,
            )

            confirm_reservation(quotation_id, payment_session_id)

    def test_confirm_reservation_with_deposit_payment(
        self, quotation_id, payment_session_id
    ):
        mock_quotation(
            quotation_id=quotation_id,
            rooms_count=1,
            room_price=399,
            adults_per_room=2,
            status=QuotationStatus.OPTIONED,
            customer_email="simone.sabba@whereigo.it",
        )

        mixer.blend(
            PaymentAttempt,
            quotation_id=quotation_id,
            user_session_id="xxx",
            payment_session_id=payment_session_id,
            payment_method="card",
            payment_type=PaymentType.DEPOSIT,
            payment_amount=100,
            transaction_provider="stripe",
            transaction_id="abc-123",
            transaction_end_time=datetime(
                year=2020, month=2, day=16, hour=10, minute=5, second=6, tzinfo=utc
            ),
            status=PaymentStatus.SUCCEEDED,
        )
        reservation = confirm_reservation(quotation_id, payment_session_id)

        assert reservation.quotation.status == QuotationStatus.CONFIRMED
        assert len(reservation.get_payments()) == 1
        assert reservation.get_payments()[0].user_session_id == "xxx"  # noqa
        assert reservation.get_payments()[0].payment_session_id == payment_session_id
        assert reservation.get_payments()[0].payment_method == "card"
        assert reservation.get_payments()[0].payment_type == PaymentType.DEPOSIT
        assert reservation.get_payments()[0].transaction_provider == "stripe"
        assert reservation.get_payments()[0].transaction_id == "abc-123"
        assert reservation.get_payments()[0].transaction_time == datetime(
            year=2020, month=2, day=16, hour=10, minute=5, second=6, tzinfo=utc
        )

    def test_confirm_reservation_with_full_amount_payment(
        self, quotation_id, payment_session_id
    ):
        with mock_send_confirmation_email():
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.OPTIONED,
                customer_email="simone.sabba@whereigo.it",
            )

            mixer.blend(
                PaymentAttempt,
                quotation_id=quotation_id,
                user_session_id="xxx",
                payment_session_id=payment_session_id,
                payment_method="card",
                payment_type=PaymentType.FULL_AMOUNT,
                payment_amount=399,
                transaction_provider="stripe",
                transaction_id="abc-123",
                transaction_end_time=datetime(
                    year=2020, month=2, day=16, hour=10, minute=5, second=6, tzinfo=utc
                ),
                status=PaymentStatus.SUCCEEDED,
            )

            reservation = confirm_reservation(quotation_id, payment_session_id)

            assert reservation.quotation.status == QuotationStatus.CONFIRMED
            assert len(reservation.get_payments()) == 1
            assert reservation.get_payments()[0].user_session_id == "xxx"  # noqa
            assert (
                reservation.get_payments()[0].payment_session_id == payment_session_id
            )
            assert reservation.get_payments()[0].payment_method == "card"
            assert reservation.get_payments()[0].payment_type == PaymentType.FULL_AMOUNT
            assert reservation.get_payments()[0].payment_amount == 399
            assert reservation.get_payments()[0].transaction_provider == "stripe"
            assert reservation.get_payments()[0].transaction_id == "abc-123"
            assert reservation.get_payments()[0].transaction_time == datetime(
                year=2020, month=2, day=16, hour=10, minute=5, second=6, tzinfo=utc
            )

    def test_confirm_reservation_with_discount_ticket(
        self, quotation_id, payment_session_id
    ):
        with mock_send_confirmation_email():
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.OPTIONED,
                customer_email="simone.sabba@whereigo.it",
                discount_amount=100,
                discount_code="ABC456",
            )

            mixer.blend(
                PaymentAttempt,
                quotation_id=quotation_id,
                user_session_id="xxx",
                payment_session_id=payment_session_id,
                payment_method="card",
                payment_type=PaymentType.FULL_AMOUNT,
                payment_amount=299,
                transaction_provider="stripe",
                transaction_id="abc-123",
                transaction_end_time=datetime(
                    year=2020, month=2, day=16, hour=10, minute=5, second=6, tzinfo=utc
                ),
                status=PaymentStatus.SUCCEEDED,
            )

            reservation = confirm_reservation(quotation_id, payment_session_id)

            assert reservation.quotation.status == QuotationStatus.CONFIRMED
            assert len(reservation.get_payments()) == 1
            assert reservation.get_payments()[0].user_session_id == "xxx"  # noqa
            assert (
                reservation.get_payments()[0].payment_session_id == payment_session_id
            )
            assert reservation.get_payments()[0].payment_method == "card"
            assert reservation.get_payments()[0].payment_type == PaymentType.FULL_AMOUNT
            assert reservation.get_payments()[0].payment_amount == 299
            assert reservation.get_payments()[0].transaction_provider == "stripe"
            assert reservation.get_payments()[0].transaction_id == "abc-123"
            assert reservation.get_payments()[0].transaction_time == datetime(
                year=2020, month=2, day=16, hour=10, minute=5, second=6, tzinfo=utc
            )

            discount = get_discount_ticket("ABC456")
            assert discount.reservation_id == reservation.reservation_id
