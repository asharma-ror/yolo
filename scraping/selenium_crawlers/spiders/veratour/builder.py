import datetime
import itertools
from typing import List

from common.hotel.hotel_data import (
    HotelRoomOccupancy,
    HotelRoomsOccupancy,
    HotelSearchCombination,
)
from dateutil.relativedelta import *


def get_search_combinations() -> List[HotelSearchCombination]:

    start_date = datetime.date.today()
    start_date.replace(day=1)
    months = 12
    dates = list(
        map(lambda i: start_date + relativedelta(months=+i), range(0, months),),
    )

    combination_parameters = {
        "dates": dates,
        "occupancies": [HotelRoomsOccupancy([HotelRoomOccupancy(adults=2)]),],
    }

    combinations = list(
        itertools.product(
            combination_parameters["dates"], combination_parameters["occupancies"],
        ),
    )

    return list(
        map(
            lambda x: HotelSearchCombination(
                destination=None, date_from=x[0], duration=None, occupancy=x[1],
            ),
            combinations,
        ),
    )
