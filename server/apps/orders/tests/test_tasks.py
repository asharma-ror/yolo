from datetime import timedelta

import pytest
from django.utils import timezone

from server.apps.orders.models import Quotation, QuotationRoom, QuotationStatus

from ..tasks import mark_expired_quotations


@pytest.fixture
def quotes_factory(db, mixer):
    def _factory(status: QuotationStatus, older: timedelta, count: int):
        objs = mixer.cycle(count).blend(QuotationRoom, quotation__status=status)
        dt = timezone.now() - older

        QuotationRoom.objects.filter(pk__in=[obj.pk for obj in objs]).update(
            created=dt, modified=dt
        )
        Quotation.objects.filter(pk__in=[obj.quotation_id for obj in objs]).update(
            created=dt, modified=dt
        )
        return objs

    return _factory


@pytest.mark.parametrize(
    "status, older", [(QuotationStatus.DRAFT, 125), (QuotationStatus.OPTIONED, 40)]
)
def test_quotations_expire(
    status, older, quotes_factory, mock_signal_update_avail_records_from_quotation_room
):
    cnt = 3
    quotes_factory(status, older=timedelta(minutes=older), count=cnt)

    # call the task.
    mark_expired_quotations()

    # test that optioned are expired
    assert Quotation.objects.filter(status=QuotationStatus.EXPIRED).count() == cnt
    assert QuotationRoom.objects.filter(optioned=False).count() == cnt
