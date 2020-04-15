from unittest.mock import MagicMock, patch

import pytest
from mixer.backend.django import mixer

from server.apps.orders.commands.reservations import send_confirmation_email
from server.apps.orders.exceptions import ConfirmationEmailAlreadySentError
from server.apps.orders.models import Customer, PurchaseEmail, Quotation, Reservation


@patch(
    "server.apps.orders.signals._send_reservation_confirmation_email_handler",
    MagicMock(),
)
@pytest.mark.django_db
class TestSendReservationConfirmationEmail:
    def test_purchase_email_already_sent_raise_error(self, mailoutbox):
        with pytest.raises(ConfirmationEmailAlreadySentError):
            reservation = mixer.blend(Reservation)
            mixer.blend(PurchaseEmail, reservation=reservation)
            send_confirmation_email(reservation)

        assert not len(mailoutbox)

    def test_send_mail(self, mailoutbox):
        reservation = mixer.blend(Reservation, quotation=mixer.blend(Quotation))
        mixer.blend(
            Customer,
            quotation=reservation.quotation,
            name="simone",
            surname="sabba",
            email="simone.sabba@whereigo.it",
        )
        send_confirmation_email(reservation)

        assert len(mailoutbox) == 1
        assert list(mailoutbox[0].to) == ["simone.sabba@whereigo.it"]
