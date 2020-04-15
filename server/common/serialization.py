import dataclasses
import datetime
import decimal
import json


class DictJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)
        if isinstance(obj, datetime.datetime):
            return str(obj)
        if isinstance(obj, decimal.Decimal):
            return [str(obj)]
        if hasattr(obj, "__dict__"):
            return vars(obj)
        return super().default(obj)
