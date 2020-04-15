import contextlib
import datetime
import time
from itertools import cycle
from typing import List

import db
from common.hotel.hotel_data import HotelSearchCombination
from selenium_crawlers.common import driver

from ...common.utils.logging_utils import app_logger
from ..alpitour.combinations_builder import get_dates_combinations
from ..base import BaseCrawler
from .find_proxy import get_proxies
from .url_builder import TrivagoUrlBuilder


def get_hotel_combinations(
    destinations: list,
    start_date: datetime.datetime,
    end_date: datetime.datetime,
    duration: int,
    adults: int,
) -> List[HotelSearchCombination]:
    combinations = get_dates_combinations(
        destinations, start_date, end_date, duration, adults
    )
    return list(
        map(
            lambda x: HotelSearchCombination(
                destination=x[0],
                date_from=x[1],
                duration=x[2],
                occupancy=x[3],
                date_to=x[1] + datetime.timedelta(days=x[2]),
            ),
            combinations,
        ),
    )


@contextlib.contextmanager
def get_browser(**kwargs):
    browser = driver.get_browser(**kwargs)
    try:
        yield browser
    finally:
        browser.quit()


def _extract_hotel_prices(hotel):
    price = hotel.find_element_by_css_selector(
        "[class|=accommodation-list__price]"
    ).text
    partner = hotel.find_element_by_css_selector(
        "[class|=accommodation-list__partner]"
    ).text
    prices = [db.HotelPrice(company=partner, price=int(price.replace("€", "")))]
    # todo: extract other prices
    return prices


def _extract_hotel_name(hotel):
    return hotel.find_element_by_css_selector("h2").text


def _get_max_page_index(browser):
    pagination_buttons = browser.find_elements_by_css_selector(
        ".pagination__pages .btn--pagination"
    )
    last_index = pagination_buttons[-1].get_attribute("data-action")
    return int(last_index) if last_index and last_index.isdigit() else -1


class TrivagoCrawler(BaseCrawler):
    name = "trivago"
    _url_builder = TrivagoUrlBuilder()

    def start(
        self,
        destinations=(
            {"path": "italia/puglia", "id": "25066/200",},
            {"path": "italia/calabria", "id": "25070/200",},
            {"path": "italia/sardegna", "id": "25078/200",},
            {"path": "italia/sicilia", "id": "25079/200",},
        ),
        start_date=datetime.datetime(2020, 5, 31, 0, 0),
        end_date=datetime.datetime(2020, 9, 20, 0, 0),
        duration=7,
        adults=2,
    ):
        proxies = cycle(get_proxies(limit=50))
        for combination in get_hotel_combinations(
            destinations, start_date, end_date, duration, adults
        ):
            proxy_ip = next(proxies)
            with get_browser(proxy_ip=proxy_ip) as browser:
                self._process_combination(browser, combination)

    def _process_combination(self, browser, combination):
        has_more_pages = True
        page_index = 0
        while has_more_pages:
            result = self._process_hotels(browser, combination, page_index)
            if result is None:
                break
            has_more_pages = result["hasMorePages"]
            page_index += 1

    def _process_hotels(self, browser, combination, page_index):
        try:
            url = self._url_builder.get_search_url(combination, page_index)
            browser.get(url)
            driver.wait_css_element(".hotel-item", browser, self._page_render_timeout)
            hotels = browser.find_elements_by_css_selector(".hotel-item")

            data = [self._extract_hotel_data(hotel, combination) for hotel in hotels]
            if data:
                db.HotelListing.objects.insert(data)

            max_page_index = _get_max_page_index(browser)
            has_more_pages = page_index < max_page_index
            time.sleep(10)
            return {"data": data, "hasMorePages": has_more_pages}
        except Exception as e:
            app_logger.error(
                f"Error processing combination {combination} \nError -> {e}",
                exc_info=True,
            )

    def _extract_hotel_data(self, hotel, combination):
        prices = _extract_hotel_prices(hotel)
        return self.prepare_data(
            combination, hotel_name=_extract_hotel_name(hotel), prices=prices,
        )
