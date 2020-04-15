from django.db.models.signals import m2m_changed, post_delete, post_save
from django.dispatch import receiver

from server.apps.orders.models import QuotationRoom
from server.apps.products.models import ProductAllotment
from server.apps.products.tasks.availability_update.availability_delete import (
    delete_availability_records,
)
from server.apps.products.tasks.availability_update.availability_update import (
    update_avail_records_from_quotation_room,
    update_availability_records,
)


@receiver(post_save, sender=ProductAllotment)
def update_availabilities(sender, instance, **kwargs):
    _do_update_availability_records(instance)


@receiver(m2m_changed, sender=ProductAllotment.occupancies.through)
def update_availabilities_from_occupancy(sender, instance, **kwargs):
    _do_update_availability_records(instance)


@receiver(m2m_changed, sender=ProductAllotment.departure_options.through)
def update_availabilities_from_dept_option(sender, instance, **kwargs):
    _do_update_availability_records(instance)


@receiver(post_delete, sender=ProductAllotment)
def delete_availabilities(sender, instance, **kwargs):
    _do_delete_availability_records(instance)


@receiver(post_save, sender=QuotationRoom)
def update_availabilities_from_quotation(sender, instance, **kwargs):
    _update_avail_records_from_quotation_room(instance)


def _do_update_availability_records(allotment: ProductAllotment):
    update_availability_records(allotment)


def _do_delete_availability_records(allotment: ProductAllotment):
    delete_availability_records(allotment)


def _update_avail_records_from_quotation_room(room_quotation: QuotationRoom):
    update_avail_records_from_quotation_room(room_quotation)
