from datetime import timedelta
from typing import List

from django.db.models import ExpressionWrapper, F, Q, fields

from ..models import DepartureOption, Occupancy, ProductAllotment, ProductAvailability


def get_backward_allotments(
    allotment_record: ProductAllotment,
) -> List[ProductAllotment]:
    """ :returns allotments that may contain this allotment as a secondary linked allotment """
    return (
        ProductAllotment.objects.annotate(
            days_diff=ExpressionWrapper(
                allotment_record.start_date_from - F("start_date_from"),  # type: ignore
                output_field=fields.DurationField(),
            )
        )
        .filter(
            Q(product=allotment_record.product)
            & Q(occupancies__in=allotment_record.occupancies.all())
            & Q(departure_options__in=allotment_record.departure_options.all())
            & Q(days_diff__gt=0)
            & Q(days_diff__lte=F("max_contiguous_allotment_nights"))
        )
        .order_by("start_date_from")
        .all()
    )


def get_contiguous_allotments(
    allotment_record: ProductAllotment,
    occupancy: Occupancy,
    departure_option: DepartureOption,
    max_contiguous_allotment_nights: int,
) -> List[ProductAllotment]:
    """ :returns based on the allotment configuration all the contiguous allotments until the maximum  """
    if max_contiguous_allotment_nights == 0:
        return [allotment_record]

    max_allotments_end_date = allotment_record.start_date_from + timedelta(
        max_contiguous_allotment_nights - 1
    )

    return (
        ProductAllotment.objects.filter(
            Q(product=allotment_record.product)
            & Q(occupancies=occupancy.pk)
            & Q(departure_options=departure_option.pk)
            & Q(start_date_from__gte=allotment_record.start_date_from)
            & Q(start_date_from__lte=max_allotments_end_date)
        )
        .order_by("start_date_from")
        .all()
    )


def get_allotments_from_id_list(allotments_id: List[str]) -> List[ProductAllotment]:
    """ :returns all the allotment records that have an allotment_id contained inside the allotments_id list """
    return ProductAllotment.objects.filter(allotment_id__in=allotments_id)


def get_related_allotments_from_availability(
    allotment_id: str,
) -> List[ProductAllotment]:
    """ :returns all allotment records from existing ProductAvailability records built with the input allotment """
    availabilities = get_related_availabilities_id(allotment_id)
    return ProductAllotment.objects.filter(Q(allotment_id__in=availabilities))


def get_related_availabilities_id(allotment_id: str) -> List[str]:
    """ :returns all allotment_id from existing ProductAvailability records built with the input allotment """
    return (
        ProductAvailability.objects.filter(Q(allotments_id__contains=allotment_id))
        .values_list("master_allotment_id", flat=True)
        .all()
    )
