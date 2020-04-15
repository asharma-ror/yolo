from datetime import date

import requests


class ValturApiClient:
    def get_all_structures(self):
        response = requests.get("https://booking.valtur.com/api?structs=true&MTS=true",)
        return response.json()

    def get_hotel_checkin_availability(self, hotel_code):
        response = requests.get(
            f"https://booking.valtur.com/api?days=in&hc={hotel_code}",
        )
        return response.json()

    def get_hotel_checkout_availability(
        self, accommodation_id: str, checkin_date: date
    ):
        url = "https://www.valtur.com/calendar/checkout?accommodation_id={}&check_in={}".format(
            accommodation_id, checkin_date.strftime("%Y%m%d"),
        )
        response = requests.get(url)
        return response.json()

    def get_hotel_only_prices(
        self, hotel_id, extended_hotel_id, checkin_date: date, checkout_date: date
    ):
        url = "https://booking.valtur.com/api?prices=1&codiceAdv=00001&datain={}&dataout={}&hotelCode={}&hc={}&cam01adu=2&f1=02-05&f2=06-11&f3=&f4=".format(
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
        url = "https://booking.valtur.com/api?prices=1&codiceAdv=00001&datain={}&dataout={}&hotelCode={}&hc={}&cam01adu=2&f1=02-05&f2=06-11&f3=&f4=&aptPartenza1={}".format(
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
