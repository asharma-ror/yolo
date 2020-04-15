from typing import List


def flat_list(list_instance) -> List:
    return list([item for sublist in list_instance for item in sublist])
