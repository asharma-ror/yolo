from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.template.loader import render_to_string

from server.apps.orders.exceptions import ConfirmationEmailAlreadySentError
from server.apps.orders.models import PurchaseEmail, Reservation


def send_confirmation_email(reservation: Reservation):
    with transaction.atomic():
        _check_email_not_sent(reservation)
        email_data = _create_purchase_email(reservation)

    _send_purchase_email(email_data)


def _send_purchase_email(email_data: PurchaseEmail):
    send_mail(
        from_email=settings.EMAIL_NOTIFICATIONS_SENDER,
        recipient_list=[email_data.to],
        subject=email_data.subject,
        message=email_data.body,
    )


def _create_purchase_email(reservation: Reservation):
    return PurchaseEmail.objects.create(
        reservation=reservation,
        to=reservation.quotation.customer.email,
        subject="Acquisto completato",
        body=render_to_string(
            "purchase_completed_email.html",
            {
                "customerName": reservation.quotation.customer.name,
                "customerSurname": reservation.quotation.customer.surname,
                "reservation_id": reservation.reservation_id,
            },
        ),
    )


def _check_email_not_sent(reservation: Reservation):
    if PurchaseEmail.objects.filter(reservation=reservation).count() > 0:
        raise ConfirmationEmailAlreadySentError()
