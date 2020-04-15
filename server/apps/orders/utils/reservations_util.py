from .quotations_util import gen_shortuid

_RESERVATION_NUMBER_LENGTH = 8


def generate_random_reservation_number() -> str:
    return gen_shortuid(_RESERVATION_NUMBER_LENGTH)
