import logging

from funcy import log_calls, log_errors

from server.apps.products.models import ProductAllotment, ProductAvailability


@log_calls(logging.info, errors=False)
@log_errors(logging.exception)
def delete_availability_records(allotment_record: ProductAllotment):
    logging.info(
        f"Deleting availabilities for allotment {allotment_record.allotment_id}"
    )
    _delete_availabilities_from_deleted_allotment(allotment_record)

    logging.info(f"Availability {allotment_record.allotment_id} deleted")


def _delete_availabilities_from_deleted_allotment(allotment_record: ProductAllotment):
    ProductAvailability.objects.filter(
        allotments_id__contains=[allotment_record.allotment_id]
    ).delete()
