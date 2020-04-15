import datetime
import itertools
from typing import Dict, Iterable, List

from common.hotel.hotel_data import (
    HotelRoomOccupancy,
    HotelRoomsOccupancy,
    HotelSearchCombination,
)


def get_dates_combinations(
    destinations: Iterable[dict],
    start_date: datetime.datetime,
    end_date: datetime.datetime,
    duration: int,
    adults: int,
):
    delta = end_date - start_date
    dates = list(
        map(
            lambda i: start_date + datetime.timedelta(days=i),
            range(0, delta.days, duration),
        ),
    )

    combination_parameters = {
        "destinations": destinations,
        "dates": dates,
        "durations": [duration],
        "occupancies": [HotelRoomsOccupancy([HotelRoomOccupancy(adults=adults)]),],
    }

    return list(
        itertools.product(
            combination_parameters["destinations"],
            combination_parameters["dates"],
            combination_parameters["durations"],
            combination_parameters["occupancies"],
        ),
    )


def get_hotel_combinations(
    paths: List[Dict[str, str]], start_date, end_date, duration, adults,
) -> List[HotelSearchCombination]:
    combinations = get_dates_combinations(paths, start_date, end_date, duration, adults)
    return list(
        map(
            lambda x: HotelSearchCombination(
                destination=x[0], date_from=x[1], duration=x[2], occupancy=x[3],
            ),
            combinations,
        ),
    )
