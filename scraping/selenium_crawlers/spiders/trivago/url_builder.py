from urllib.parse import urlencode

from common.hotel.hotel_data import HotelSearchCombination


class TrivagoUrlBuilder:
    base_url = "https://www.trivago.it/"

    def get_search_url(self, combination: HotelSearchCombination, page_index):
        queries = {
            "aDateRange[arr]": combination.date_from.isoformat(),
            "aDateRange[dep]": combination.date_to.isoformat(),
            "aPriceRange[from]": "0",
            "aPriceRange[to]": "0",
            "iRoomType": "7",
            "aRooms[0][adults]": combination.occupancy.rooms,
            "cpt2": combination.destination["id"],
            "iViewType": "0",
            "bIsSeoPage": "0",
            "sortingId": "1",
            "iGeoDistanceLimit": "20000",
            "offset": page_index,
        }
        return f"{self.base_url}?{urlencode(queries)}"
