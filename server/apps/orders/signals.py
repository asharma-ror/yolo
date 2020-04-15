from django.db.models.signals import post_save
from django.dispatch import receiver

from server.apps.orders.commands.reservations import send_confirmation_email
from server.apps.orders.models import Reservation


@receiver(post_save, sender=Reservation)
def send_reservation_confirmation_email(sender, instance, created, **kwargs):
    if created:
        _send_reservation_confirmation_email_handler(instance)


def _send_reservation_confirmation_email_handler(reservation: Reservation) -> None:
    send_confirmation_email(reservation)
