import db
from common.hotel.hotel_data import HotelRoomOccupancy, HotelRoomsOccupancy
from common.utils import extract_numbers
from selenium_crawlers.common.utils.logging_utils import app_logger

from ..base import BaseCrawler
from .api_client import NicolausApiClient
from .builder import get_hotels_list, get_search_dates, relativedelta


class NicolausCrawler(BaseCrawler):
    name = "nicolaus"
    _api = NicolausApiClient()
    # __departure_airports = ['MXP', 'FCO', 'BGO', 'VRN', 'BGY']
    __departure_airports = ["MXP", "FCO", "VRN"]

    def start(self):
        app_logger.info(f"{self.name} crawler started")
        hotels = get_hotels_list()
        [self.process_hotel_group(hotel_group) for hotel_group in hotels]
        app_logger.info(f"{self.name} crawler completed")

    def process_hotel_group(self, hotel_group):
        app_logger.info(f'Processing hotel group {hotel_group["destination"]["id"]}',)
        [
            self.process_hotel(hotel_group["destination"], hotel)
            for hotel in hotel_group["hotels"]
        ]

    def process_hotel(self, destination, hotel_definition):
        app_logger.info(f'Processing hotel {hotel_definition["id"]}')
        dates = get_search_dates()
        [self.process_hotel_date(destination, hotel_definition, date) for date in dates]

    def process_hotel_date(self, destination, hotel_definition, checkin_date):
        checkout_date = checkin_date + relativedelta(days=+7)

        self.__process_hotel_only(
            destination, hotel_definition, checkin_date, checkout_date,
        )
        [
            self._process_airport(
                destination, hotel_definition, checkin_date, checkout_date, airport
            )
            for airport in self.__departure_airports
        ]

    def _process_airport(
        self,
        destination,
        hotel_definition,
        checkin_date,
        checkout_date,
        departure_airport,
    ):
        app_logger.info(
            f"Processing {self.__get_hotel_name(hotel_definition)} - {checkin_date} - {departure_airport}",
        )
        prices = self._api.get_vacation_package_prices(
            self._get_hotel_code(hotel_definition),
            self._get_extended_hotel_code(hotel_definition),
            checkin_date,
            checkout_date,
            departure_airport,
        )

        if self._is_error_pices_response(prices):
            app_logger.warn(
                f"No availability found for {self.__get_hotel_name(hotel_definition)} - {checkin_date} - {departure_airport}",
            )
            return

        data = [
            self._extract_hotel_price_data(
                destination, hotel_definition, checkin_date, checkout_date, price_item
            )
            for price_item in prices["1"]["room"]
        ]
        if data:
            db.HotelListing.objects.insert(data)

    def __process_hotel_only(
        self, destination, hotel_definition, checkin_date, checkout_date
    ):
        app_logger.info(
            f"Processing {self.__get_hotel_name(hotel_definition)} - {checkin_date} - HOTEL ONLY",
        )
        prices = self._api.get_hotel_only_prices(
            self._get_hotel_code(hotel_definition),
            self._get_extended_hotel_code(hotel_definition),
            checkin_date,
            checkout_date,
        )

        if self._is_error_pices_response(prices):
            app_logger.warning(
                f"No availability found for {self.__get_hotel_name(hotel_definition)} - {checkin_date} - HOTEL ONLY",
            )
            return

        data = [
            self._extract_hotel_price_data(
                destination, hotel_definition, checkin_date, checkout_date, price_item
            )
            for price_item in prices["1"]["room"]
        ]
        if data:
            db.HotelListing.objects.insert(data)

    def _extract_hotel_price_data(
        self, destination, hotel_definition, checkin_date, checkout_date, price_item
    ):
        occupancy = HotelRoomsOccupancy([HotelRoomOccupancy(adults=2)],)
        hotel_name = self.__get_hotel_name(hotel_definition)
        return db.HotelListing(
            source=self.name,
            occupancy=occupancy.to_db(),
            hotel_name=hotel_name,
            destination=db.Destination(
                dest_id=self.__get_destination_id(destination),
                name=self.__get_destination_name(destination),
            ),
            date_from=checkin_date.isoformat(),
            date_to=checkout_date.isoformat(),
            nights=(checkout_date - checkin_date).days,
            prices=[
                db.HotelPrice(price=extract_numbers(self.__get_price(price_item)),)
            ],
            accommodation=self.__get_accommodation(price_item),
            room_type=self.__get_room_type(price_item),
            departure_flight=db.Flight(
                airport=self.__get_departure_airport(price_item) or "",
                flight=self.__get_departure_flight(price_item) or "",
            ),
            return_flight=db.Flight(
                airport=self.__get_return_airport(price_item) or "",
                flight=self.__get_return_flight(price_item) or "",
            ),
            product_type=(
                "hotel" if price_item["a_sigla"] is None else "vacation-package"
            ),
        )

    def __get_destination_id(self, destination):
        return destination["id"]

    def __get_destination_name(self, destination):
        return destination["id"]

    def __get_price(self, price_item):
        return f'€ {price_item["price"]}'

    def __get_departure_airport(self, price_item):
        return price_item["aptFrom"]

    def __get_departure_flight(self, price_item):
        return price_item["a_sigla"]

    def __get_return_airport(self, price_item):
        return price_item["aptTo"]

    def __get_return_flight(self, price_item):
        return price_item["r_sigla"]

    def __get_accommodation(self, price_item):
        return price_item["treat"]

    def __get_room_type(self, price_item):
        return price_item["cod"]

    def _get_hotel_code(self, hotel_definition):
        return hotel_definition["id"][7:11]

    def _get_extended_hotel_code(self, hotel_definition):
        return hotel_definition["id"]

    def __get_hotel_name(self, hotel_definition):
        return hotel_definition["name"]

    def _is_error_pices_response(self, prices):
        return len(prices) == 0 or prices.get("error") is not None
