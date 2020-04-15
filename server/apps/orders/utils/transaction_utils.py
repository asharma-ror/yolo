import json
from typing import Optional

from server.common.serialization import DictJSONEncoder


def serialize_transaction_data(data) -> Optional[str]:
    return json.dumps(data, cls=DictJSONEncoder) if data else None
