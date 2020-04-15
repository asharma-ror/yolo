from django.db.models.signals import post_save
from django.dispatch import receiver

from server.apps.orders.models import Reservation
from server.apps.travels.commands.reservations import create_travel_reservation


@receiver(post_save, sender=Reservation)
def save_travel_reservation(sender, instance, created, **kwargs):
    if created:
        _create_travel_reservation(instance)


def _create_travel_reservation(reservation: Reservation) -> None:
    create_travel_reservation(reservation)
