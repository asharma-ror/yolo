import logging
import time
from typing import List

import dateutil
import db
from common.hotel.hotel_data import HotelSearchCombination
from common.utils import extract_numbers
from selenium.webdriver.remote.webelement import WebElement
from selenium_crawlers.common.driver import get_browser
from selenium_crawlers.spiders.base import BaseCrawler
from selenium_crawlers.spiders.veratour.builder import get_search_combinations
from tqdm import tqdm


class VeratourUrlBuilder:
    _url_template = "https://www.veratour.it/booking/booking.cfm?tick=699&search_prp_1=33%2C650%2C12%2C2303%2C641%2C434%2C666%2C6324%2C5438%2C197%2C253%2C254%2C453%2C651%2C2304%2C212%2C433%2C653%2C778%2C7219%2C7936%2C7935%2C6323%2C261%2C5608%2C761%2C640%2C148%2C6%2C7%2C647%2C5205%2C5966%2C6879%2C1746%2C2637&search_prp_4=&search_destinazione=Tutti+i+prodotti&search_codrisorsa=FORROCABELLA%2CIBZVERAIBIZA%2CMAHVERAMENOR%2CMAHVERASACAL%2CFUEVERATINDA%2CPMIAMERICA%2CTCIGALA%2CACELAGERIA%2CMAHLORDNELSO%2CANUVERAANTIG%2CSDQVERACANOA%2CVRAVERALASMO%2CCYOVERALINDA%2CJAMVERANEGRI%2CAKUVERATULUM%2CRMFVERAEMERA%2CMUHVERAJAZ%2CSSHVERAREEF%2CRMFVERAUTOPI%2CSSHSENTIDO%2CSSHSUNRISE%2CHKTTHAVORNPA%2CRHOVERAKOLYM%2CAOKVERAKONST%2CKOSVERALAKIT%2CNAXVERANAXOS%2CJMKVERAPENEP%2CHERALDEMARRO%2CJTRIMPERIAL%2CPUGVERABARON%2CSARVERAREY%2CSARVERAEOS%2CSICVERAMODIC%2CSARVERAPISTA%2CCALVERASCOGL%2CSARVERASUNEV%2CMLEVERAAAAVE%2CKENVERACRYST%2CNOSVERAPALM%2CZNZVERASUNSE%2CZNZVERAZANZI%2CMRULAGOONATT%2CSLLVERASALAL%2CMDAVERAELMEH%2CDJEVERAILIAD%2CKELVERAKELIB&search_vendibile=true&search_tipoprodotto=PACKAGE%2COVER18%2CSLAND%2CSL18%2CPACKAGE5&search_qtafigli=12&search_tipologiecms=&search_pknodidestcms=1&search_pknodocms=1&search_startdate={}&search_enddate=&search_durata=&search_listapax={}&search_numcamere=1&search_eta="

    def get_search_url(self, combination: HotelSearchCombination):
        room1_adults = combination.occupancy.get_room(0).adults
        room2_adults = (
            combination.occupancy.get_room(1,)
            if combination.occupancy.get_tot_rooms() > 1
            else 0
        )
        room3_adults = (
            combination.occupancy.get_room(2,)
            if combination.occupancy.get_tot_rooms() > 2
            else 0
        )
        return self._url_template.format(
            combination.date_from.strftime("%Y%m"),
            f"{room1_adults}_{room2_adults}_{room3_adults}",
        )


class VeratourCrawler(BaseCrawler):
    name = "veratour"
    _browser = None
    _url_builder = VeratourUrlBuilder()
    _page_render_timeout = 10

    def start(self):
        try:
            self._browser = get_browser(proxy_ip=None)
            combinations = get_search_combinations()
            for combination in tqdm(combinations, desc="Searches"):
                self._process_combination(combination)
        finally:  # make sure that resource cleared
            self._browser.quit()

    def _process_combination(self, combination):
        logging.info(f"Processing combination {combination}")
        self._load_all_page_results(combination)
        hotels = self._get_hotel_elements()
        for hotel in hotels:
            self._extract_hotel_data(hotel, combination)

    def _extract_hotel_data(self, hotel, combination) -> List:
        prices = self._get_hotel_price_combinations(hotel)
        return list(
            map(
                lambda price: self._extract_hotel_price_data(price, hotel, combination),
                prices,
            )
        )

    def _extract_hotel_price_data(self, price_combination, hotel, combination):
        return db.HotelListing(
            source=self.name,
            occupancy=combination.occupancy.to_db(),
            hotel_name=self._extract_hotel_name(hotel),
            destination=db.Destination(dest_id=self._extract_hotel_destination(hotel),),
            date_from=dateutil.parser.parse(
                self._extract_hotel_date_from(price_combination)
            ),
            duration=extract_numbers(self._extract_hotel_duration(price_combination)),
            nights=extract_numbers(self._extract_hotel_nights(price_combination)),
            prices=[
                db.HotelPrice(
                    price=extract_numbers(self._extract_hotel_price(price_combination)),
                )
            ],
            accommodation=self._extract_hotel_accommodation_type(price_combination),
            room_type=self._extract_hotel_room_type(price_combination),
            departure_flight=db.Flight(
                airport=self._extract_departure_airport(price_combination),
            ),
            product_type="hotel",
        )

    def _get_hotel_price_combinations(self, hotel):
        return hotel.find_elements_by_css_selector(".gridRow.gridItemRow .gridItemTd a")

    def _load_all_page_results(self, combination):
        url = self._url_builder.get_search_url(combination)
        self._browser.get(url)
        time.sleep(20)

    def _get_hotel_elements(self):
        return self._browser.find_elements_by_css_selector(
            "#BoxConPrezzo .NT-struttura.risBox"
        )

    def _extract_hotel_name(self, hotel: WebElement):
        return hotel.find_element_by_css_selector(".info .infoInner .nome").text

    def _extract_hotel_destination(self, hotel: WebElement):
        return hotel.find_element_by_css_selector(".info .infoLoc .label").text

    def _extract_hotel_price(self, price_combination: WebElement):
        return "€" + price_combination.get_attribute("data-prezzocat")[2:]

    def _extract_hotel_date_from(self, price_combination: WebElement):
        date_str = price_combination.get_attribute("data-datapartenza")
        return date_str[:4] + "-" + date_str[4:6] + "-" + date_str[6:]

    def _extract_hotel_duration(self, price_combination: WebElement):
        return price_combination.get_attribute("data-giorni")

    def _extract_hotel_nights(self, price_combination: WebElement):
        return price_combination.get_attribute("data-notti")

    def _extract_hotel_accommodation_type(self, price_combination: WebElement):
        return price_combination.get_attribute("data-trattamento")

    def _extract_hotel_room_type(self, price_combination: WebElement):
        return price_combination.get_attribute("data-sistemazione")

    def _extract_departure_airport(self, price_combination: WebElement):
        return price_combination.get_attribute("data-apt")
