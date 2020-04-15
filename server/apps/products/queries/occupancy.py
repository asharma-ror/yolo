from server.apps.products.models import Occupancy


def get_occupancy(code):
    return Occupancy.objects.get(occupancy_code=code)
