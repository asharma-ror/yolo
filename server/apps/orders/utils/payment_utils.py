import urllib.parse as urlparse
import uuid
from urllib.parse import urlencode

PAYMENT_SESSION_ID_QUERY_PARAMETER = "s"


def build_success_url(base_url: str, payment_session_id: str) -> str:
    url = list(urlparse.urlparse(base_url))
    q = dict(urlparse.parse_qsl(url[4]))
    q.update({PAYMENT_SESSION_ID_QUERY_PARAMETER: payment_session_id})
    url[4] = urlencode(q)
    return urlparse.urlunparse(url)


def generate_payment_session_id() -> str:
    return str(uuid.uuid4())
