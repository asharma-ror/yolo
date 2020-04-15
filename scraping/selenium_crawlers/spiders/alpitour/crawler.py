import datetime
import time

import db
import log
from common.utils import extract_numbers
from selenium_crawlers.common.driver import get_browser, scroll_down, wait_css_element

from ..base import BaseCrawler
from .alpitour_url_builder import AlpitourUrlBuilder
from .combinations_builder import get_hotel_combinations


class AlpitourCrawler(BaseCrawler):
    name = "alpitour"
    _url_builder = AlpitourUrlBuilder()

    def start(
        self,
        paths=(
            {"path": "italia/puglia", "id": "PUGLIA",},
            {"path": "italia/calabria", "id": "CALABRIA",},
            {"path": "italia/sardegna", "id": "SARDEGNA",},
            {"path": "italia/sicilia", "id": "SICILIA",},
        ),
        start_date=datetime.datetime(2020, 5, 31, 0, 0),
        end_date=datetime.datetime(2020, 9, 20, 0, 0),
        duration=7,
        adults=2,
    ):
        self._browser = get_browser(proxy_ip=None)
        combinations = get_hotel_combinations(
            paths, start_date, end_date, duration, adults
        )
        for combination in combinations:
            self.process_combination(combination)
        self._browser.quit()

    def process_combination(self, combination):
        try:
            log.info(f"Processing combination {combination}")
            self._load_all_page_results(combination)
            time.sleep(5)

            objects = []
            for hotel in self._get_hotel_elements():
                hotel_name, price, accomodation, room_type = self._extract_hotel_data(
                    hotel
                )
                price = db.HotelPrice(company=hotel_name, price=price)
                objects.append(
                    self.prepare_data(
                        combination,
                        hotel_name=hotel_name,
                        prices=[price],
                        accommodation=accomodation,
                        room_type=room_type,
                    )
                )
            if objects:
                db.HotelListing.objects.insert(objects)
        except Exception as e:
            log.error(
                f"Error processing combination {combination} \nError -> {type(e)}: {e}"
            )
            return None

    def _load_all_page_results(self, combination):
        url = self._url_builder.get_hotels_search_url(combination)
        self._browser.get(url)
        wait_css_element(
            ".main.results-waiting.ng-hide", self._browser, self._page_render_timeout,
        )
        while self._has_more_results():
            scroll_down(self._browser)
            time.sleep(1)

    def _has_more_results(self):
        return len(self._get_hotel_elements()) < self._get_max_results()

    def _get_max_results(self):
        results_label = self._browser.find_elements_by_css_selector(
            ".main.listato > section.top .title strong",
        )[1].text
        return int(results_label.split()[0])

    def _get_hotel_elements(self):
        return self._browser.find_elements_by_css_selector(
            ".main.listato section.listato-risultati li.card-box"
        )

    def _extract_hotel_data(self, hotel):
        return (
            self._extract_hotel_name(hotel),
            self._extract_hotel_price(hotel),
            self._extract_accommodation_type(hotel),
            self._extract_room_type(hotel),
        )

    def _extract_hotel_name(self, hotel):
        return hotel.find_element_by_css_selector(".title-h1 a").text

    def _extract_hotel_price(self, hotel) -> str:
        return extract_numbers(
            hotel.find_element_by_css_selector(".prezzo.hotel .scontato span").text
        )

    def _extract_accommodation_type(self, hotel):
        return hotel.find_element_by_css_selector(".trattamento span").text

    def _extract_room_type(self, hotel):
        return hotel.find_elements_by_css_selector(".trattamento span")[1].text
