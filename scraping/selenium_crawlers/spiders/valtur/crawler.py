import datetime
from typing import List

import db
from common.hotel.hotel_data import HotelRoomOccupancy, HotelRoomsOccupancy
from common.utils import extract_numbers
from selenium_crawlers.common.utils.logging_utils import app_logger

from ..base import BaseCrawler
from .api_client import ValturApiClient


class ValturCrawler(BaseCrawler):
    name = "valtur"
    __api = ValturApiClient()
    __accommodations_id_mapping = {
        "3074": "4",
        "51": "11",
        "4345": "15",
        "4353": "16",
        "3098": "13",
        "3986": "6",
        "4088": "7",
        "4032": "5",
        "4349": "14",
        "4087": "8",
        "4068": "9",
        "4288": "12",
    }
    __departure_airports = ["MXP", "FCO", "BGO", "TRN", "VRN", "BGY", "VCE"]

    def start(self):
        app_logger.info(f"{self.name} crawler started")
        structures = self.__api.get_all_structures()
        [self.__process_structure(structures[key]) for key in structures]
        app_logger.info(f"{self.name} crawler completed")

    def __process_structure(self, structure):
        availability = self.__api.get_hotel_checkin_availability(structure["mtsCode"],)
        if availability.get("inDays") is None:
            return

        [
            self.__process_hotel_checkin_date(
                structure, datetime.datetime.strptime(d, "%Y-%m-%d").date()
            )
            for d in availability["inDays"]
        ]

    def __process_hotel_checkin_date(self, structure, checkin_date: datetime.date):

        checkout_date = self.__get_hotel_checkout_date(structure, checkin_date)
        if checkout_date is None:
            return

        self.__process_hotel_only(structure, checkin_date, checkout_date)
        [
            self.__process_airport(structure, checkin_date, checkout_date, airport)
            for airport in self.__departure_airports
        ]

    def __get_hotel_checkout_date(self, structure, checkin_date: datetime.date):
        accommodation_id = self.__get_accommodation_id(structure)
        if not accommodation_id:
            app_logger.error(
                "Accommodation id not found for hotel {} - {}".format(
                    self.__get_hotel_code(structure), self.__get_hotel_name(structure),
                ),
            )
            return None

        checkout_dates = self.__api.get_hotel_checkout_availability(
            accommodation_id, checkin_date,
        )
        parsed_dates = list(map(lambda d: self.__parse_ugly_date(d), checkout_dates),)
        return self.__get_preferred_checkout_date(checkin_date, parsed_dates)

    def __process_airport(
        self,
        structure,
        checkin_date: datetime.date,
        checkout_date: datetime.date,
        departure_airport: str,
    ):
        app_logger.info(
            f"Processing {self.__get_hotel_name(structure)} - {checkin_date} - {departure_airport}",
        )
        prices = self.__api.get_vacation_package_prices(
            self.__get_hotel_code(structure),
            self.__get_extended_hotel_code(structure),
            checkin_date,
            checkout_date,
            departure_airport,
        )

        if self.__is_error_pices_response(prices):
            app_logger.warn(
                f"No availability found for {self.__get_hotel_name(structure)} - {checkin_date} - {departure_airport}",
            )
            return

        data = [
            self.__extract_hotel_price_data(
                structure, checkin_date, checkout_date, price_item,
            )
            for price_item in prices["1"]["room"]
        ]
        if data:
            db.HotelListing.objects.insert(data)

    def __process_hotel_only(
        self, structure, checkin_date: datetime.date, checkout_date: datetime.date
    ):
        app_logger.info(
            f"Processing {self.__get_hotel_name(structure)} - {checkin_date} - HOTEL ONLY",
        )
        prices = self.__api.get_hotel_only_prices(
            self.__get_hotel_code(structure),
            self.__get_extended_hotel_code(structure),
            checkin_date,
            checkout_date,
        )

        if self.__is_error_pices_response(prices):
            app_logger.warn(
                f"No availability found for {self.__get_hotel_name(structure)} - {checkin_date} - HOTEL ONLY",
            )
            return

        data = [
            self.__extract_hotel_price_data(
                structure, checkin_date, checkout_date, price_item,
            )
            for price_item in prices["1"]["room"]
        ]
        if data:
            db.HotelListing.objects.insert(data)

    def __extract_hotel_price_data(
        self, structure, checkin_date, checkout_date, price_item
    ):
        occupancy = HotelRoomsOccupancy([HotelRoomOccupancy(adults=2)],)
        hotel_name = (self.__get_hotel_name(structure),)

        return db.HotelListing(
            source=self.name,
            occupancy=occupancy.to_db(),
            hotel_name=hotel_name,
            destination=db.Destination(
                dest_id=self.__get_destination_id(structure),
                name=self.__get_destination_name(structure),
            ),
            date_from=checkin_date,
            date_to=checkout_date,
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

    def __get_preferred_checkout_date(
        self, checkin_date: datetime.date, checkout_dates: List[datetime.date]
    ):
        sorted_dates = sorted(
            checkout_dates, key=lambda d: abs((d - checkin_date).days - 7,),
        )
        return sorted_dates[0] if len(sorted_dates) > 0 else None

    def __parse_ugly_date(self, date_str: str):
        return datetime.datetime.strptime(
            date_str[:4] + "20" + date_str[4:], "%d%m%Y"
        ).date()

    def __get_accommodation_id(self, structure):
        return self.__accommodations_id_mapping.get(self.__get_hotel_code(structure))

    def __get_extended_hotel_code(self, structure):
        return f"001VX00{self.__get_hotel_code(structure)}H"
        # return next(code['codice'] for code in structure['externalCodes'] if code['tipo'] == 'TPEXTCODE_LONG_MTS')

    def __get_hotel_code(self, structure):
        return structure["mtsCode"]

    def __get_hotel_name(self, structure):
        return structure["nome"]

    def __get_destination_id(self, structure):
        return structure["destinazione"]["id"]

    def __get_destination_name(self, structure):
        return structure["destinazione"]["nome"]

    def __is_error_pices_response(self, prices):
        return len(prices) == 0 or prices.get("error") is not None
