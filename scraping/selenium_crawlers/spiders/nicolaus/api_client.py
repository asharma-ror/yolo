from datetime import date

import requests


class NicolausApiClient:
    def get_all_structures(self):
        response = requests.get(
            "https://booking.nicolaus.it/api?structs=true&MTS=true",
        )
        return response.json()

    def get_hotel_checkin_availability(self, hotel_code):
        response = requests.get(
            f"https://booking.nicolaus.it/api?days=in&hc={hotel_code}",
        )
        return response.json()

    def get_hotel_only_prices(
        self, hotel_id, extended_hotel_id, checkin_date: date, checkout_date: date
    ):
        url = "https://booking.nicolaus.it/api?prices=1&codiceAdv=00001&datain={}&dataout={}&hotelCode={}&hc={}&cam01adu=2&f1=03-14&f2=&f3=&f4=".format(
            self.__to_ugly_date(checkin_date),
            self.__to_ugly_date(checkout_date),
            extended_hotel_id,
            hotel_id,
        )
        response = requests.get(url)
        return response.json()

    def get_vacation_package_prices(
        self,
        hotel_id,
        extended_hotel_id,
        checkin_date: date,
        checkout_date: date,
        departure_airport: str,
    ):
        url = "https://booking.nicolaus.it/api?prices=1&codiceAdv=00001&datain={}&dataout={}&hotelCode={}&hc={}&cam01adu=2&f1=03-14&f2=&f3=&f4=&aptPartenza1={}".format(
            self.__to_ugly_date(checkin_date),
            self.__to_ugly_date(checkout_date),
            extended_hotel_id,
            hotel_id,
            departure_airport,
        )
        response = requests.get(url)
        return response.json()

    def __to_ugly_date(self, d: date):
        parsed = d.strftime("%d%m%Y")
        return parsed[:4] + parsed[6:]
