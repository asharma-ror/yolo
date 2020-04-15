"""[huey](https://huey.readthedocs.io/en/latest/contrib.html) jobs"""

from huey import crontab
from huey.contrib.djhuey import db_periodic_task

from .commands.quotation import set_quotation_expired
from .queries import quotation


@db_periodic_task(crontab(minute="*/5"))
def mark_expired_quotations():
    records = quotation.get_expired()
    count = records.count()
    for pk in records.values_list("quotation_id", flat=True).iterator():
        set_quotation_expired(pk)
    return f"Marked {count} quotes as expired "
