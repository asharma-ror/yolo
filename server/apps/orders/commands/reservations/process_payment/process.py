from server.apps.orders.commands.payments import verify_payment
from server.apps.orders.commands.reservations import confirm_reservation
from server.apps.orders.types.payments import TransactionResult


def process_reservation_payment(
    payment_session_id: str, transaction_data: TransactionResult
):
    payment_attempt = verify_payment(payment_session_id, transaction_data)
    confirm_reservation(payment_attempt.quotation_id, payment_session_id)
