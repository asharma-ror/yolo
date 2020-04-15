from typing import List

import db
from common.hotel.hotel_data import HotelSearchCombination


class BaseCrawler:
    name = None
    _browser = None
    _url_builder = None
    _page_render_timeout = 20
    _registry = {}

    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        cls._registry[cls.name] = cls

    def start(self, **_):
        raise NotImplementedError

    def prepare_data(
        self,
        combination: HotelSearchCombination,
        hotel_name: str,
        prices: List[db.HotelPrice],
        accommodation=None,
        room_type=None,
        nights=None,
        departure_flight=None,
        return_flight=None,
        product_type="hotel",
    ):
        return db.HotelListing.prepare(
            source=self.name,
            combination=combination,
            hotel_name=hotel_name,
            nights=nights,
            # flight-data if available
            departure_flight=departure_flight,
            return_flight=return_flight,
            # accomodation
            accommodation=accommodation,
            room_type=room_type,
            # rest
            prices=prices,
            product_type=product_type,
        )

    @classmethod
    def get(cls, name):
        try:
            return cls._registry[name]()
        except KeyError:
            raise KeyError(f"No crawler: {name}. Avilable: {cls._registry.keys()}")

    @classmethod
    def run(cls, crawler_name, **kwargs):
        crawler = cls.get(crawler_name)
        crawler.start(**kwargs)
