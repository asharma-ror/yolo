import pytest

from server.apps.orders.commands.quotation import (
    add_discount_ticket_to_quotation,
    remove_discount_ticket_from_quotation,
)
from server.apps.orders.exceptions import DiscountTicketNotFoundError
from server.apps.orders.tests.utils.quotation_initializer import (
    mock_discount,
    mock_quotation,
)
from server.apps.orders.utils.quotations_util import generate_random_quotation_number


@pytest.fixture()
def quotation_id() -> str:
    return generate_random_quotation_number()


@pytest.mark.usefixtures("db", "mock_signal_update_avail_records_from_quotation_room")
class TestRemoveDiscountTickerToQuotation:
    def test_remove_non_existing_discount_ticket(self, quotation_id):
        with pytest.raises(DiscountTicketNotFoundError):
            mock_quotation(
                quotation_id=quotation_id,
                rooms_count=1,
                room_price=399,
                adults_per_room=2,
            )
            remove_discount_ticket_from_quotation(quotation_id, "XXX")

    def test_remove_discount_from_single_room_quotation(self, quotation_id):
        mock_quotation(
            quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2,
        )

        mock_discount(code="ACB002", amount=100)

        quotation = add_discount_ticket_to_quotation(quotation_id, "ACB002")

        assert quotation.total_price == 299
        assert quotation.total_discount == 100

        quotation = remove_discount_ticket_from_quotation(quotation_id, "ACB002")

        assert quotation.total_price == 399
        assert quotation.total_discount == 0

    def test_remove_discount_from_two_rooms_quotation(self, quotation_id):
        mock_quotation(
            quotation_id=quotation_id, rooms_count=2, room_price=399, adults_per_room=2,
        )

        mock_discount(code="ACB003", amount=100)

        quotation = add_discount_ticket_to_quotation(quotation_id, "ACB003")

        assert quotation.total_price == 698
        assert quotation.total_discount == 100

        quotation = remove_discount_ticket_from_quotation(quotation_id, "ACB003")

        assert quotation.total_price == 798
        assert quotation.total_discount == 0

    def test_remove_discount_case_insensitive(self, quotation_id):
        mock_quotation(
            quotation_id=quotation_id, rooms_count=1, room_price=399, adults_per_room=2,
        )

        mock_discount(code="ACB004", amount=100)

        quotation = add_discount_ticket_to_quotation(quotation_id, "ACB004")

        assert quotation.total_price == 299
        assert quotation.total_discount == 100

        quotation = remove_discount_ticket_from_quotation(quotation_id, "acb004")

        assert quotation.total_price == 399
        assert quotation.total_discount == 0
