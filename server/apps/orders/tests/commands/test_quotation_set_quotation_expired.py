import pytest

from server.apps.orders.commands.quotation import set_quotation_expired
from server.apps.orders.exceptions import InvalidQuotationStatusError
from server.apps.orders.models import QuotationStatus

from ...utils.quotations_util import generate_random_quotation_number
from ..utils.quotation_initializer import mock_quotation


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestSetQuotationExpired:
    def test_set_quotation_expired_confirmed_quotation_raises_error(self, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.CONFIRMED,
            )

            set_quotation_expired(quotation_id)

    def test_set_quotation_expired_canceled_quotation_raises_error(self, quotation_id):
        with pytest.raises(InvalidQuotationStatusError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
                status=QuotationStatus.CANCELED,
            )

            set_quotation_expired(quotation_id)

    def test_set_quotation_expired_draft_quotation(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id,
            rooms_count=1,
            room_price=399,
            adults_per_room=2,
            status=QuotationStatus.DRAFT,
        )

        # check precondition

        assert quotation.status == QuotationStatus.DRAFT
        assert quotation.get_room(0).optioned is False

        # test

        quotation = set_quotation_expired(quotation_id)
        assert quotation.status == QuotationStatus.EXPIRED
        assert quotation.get_room(0).optioned is False

    def test_set_quotation_expired_optioned_quotation(self, quotation_id):
        quotation = mock_quotation(
            quotation_id=quotation_id,
            rooms_count=1,
            room_price=399,
            adults_per_room=2,
            status=QuotationStatus.OPTIONED,
        )

        # check precondition

        assert quotation.status == QuotationStatus.OPTIONED
        assert quotation.get_room(0).optioned is True

        # test

        quotation = set_quotation_expired(quotation_id)
        assert quotation.status == QuotationStatus.EXPIRED
        assert quotation.get_room(0).optioned is False
