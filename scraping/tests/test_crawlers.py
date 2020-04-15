from datetime import datetime, timedelta

import pytest


@pytest.fixture
def crawler(mocker):
    mocker.patch("selenium_crawlers.common.driver.get_browser")

    def _get_crawler(name):
        from selenium_crawlers.spiders import (
            BaseCrawler,
        )  # noqa: import later. so that the patch will work

        return BaseCrawler.get(name)

    return _get_crawler


@pytest.fixture
def start_dt():
    return datetime.now() + timedelta(days=2)


DURATION = 7


@pytest.fixture
def end_dt(start_dt):
    return start_dt + timedelta(days=DURATION)


class TestCrawlers:
    def test_alpitour(self, mdb, crawler, start_dt, end_dt, mocker):
        Crawler = crawler("alpitour")

        mocker.patch.object(Crawler, "_load_all_page_results")
        mocker.patch.object(
            Crawler, "_get_hotel_elements", return_value=[mocker.MagicMock()]
        )
        mocker.patch.object(
            Crawler,
            "_extract_hotel_data",
            return_value=(
                "Voi Alimini Resort",
                "1024",
                "soft all inclusive",
                "smart room doppia",
            ),
        )

        Crawler.start(
            paths=({"path": "italia/puglia", "id": "PUGLIA",},),
            start_date=start_dt,
            end_date=end_dt,
            duration=DURATION,
            adults=2,
        )

        assert mdb.HotelListing.objects.count() == 1

    def test_nicolaus(self, mdb, crawler, start_dt, end_dt, mocker):
        crawler("nicolaus")
        raise NotImplementedError

    def test_trivago(self, mdb):
        raise NotImplementedError

    def test_valtur(self, mdb):
        raise NotImplementedError

    def test_veratour(self, mdb):
        raise NotImplementedError
