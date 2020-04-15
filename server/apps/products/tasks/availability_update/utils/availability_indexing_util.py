import json

from server.apps.products.models import DepartureOptionType, ProductAvailability


def create_availability_str_key(item: ProductAvailability) -> str:
    key_components = [
        "$".join(item.allotments_id).lower(),
        item.occupancy_code.lower(),
        str(item.departure_option_type).lower(),
        ""
        if item.departure_option_type == DepartureOptionType.NONE
        else item.departure_option_value.lower(),
    ]
    return "_".join(key_components)


def create_availability_json_key(item: ProductAvailability) -> str:
    return json.dumps(
        {
            "a": item.allotments_id,
            "o": item.occupancy_code.lower(),
            "t": str(item.departure_option_type).lower(),
            "v": ""
            if item.departure_option_type == DepartureOptionType.NONE
            else item.departure_option_value.lower(),
        },
        separators=(",", ":"),
    )
