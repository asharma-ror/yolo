import shortuuid

_QUOTATION_NUMBER_LENGTH = 10


def gen_shortuid(length: int) -> str:
    return shortuuid.ShortUUID().random(length=length).upper()


def generate_random_quotation_number() -> str:
    return gen_shortuid(_QUOTATION_NUMBER_LENGTH)
