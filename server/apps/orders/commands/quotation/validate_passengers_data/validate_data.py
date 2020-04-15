from server.apps.orders.models import Quotation

from ..validate_passengers_data.validate_room_data import validate_room_passengers_data


def validate_passengers_data(quotation: Quotation):
    [validate_room_passengers_data(room) for room in quotation.get_rooms()]  # noqa
