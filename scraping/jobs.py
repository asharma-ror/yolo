import dramatiq
from config import CONFIG
from dramatiq.brokers.redis import RedisBroker
from periodiq import PeriodiqMiddleware, cron
from selenium_crawlers.spiders import BaseCrawler

broker = RedisBroker(host=CONFIG.REDIS_HOST, port=CONFIG.REDIS_PORT)
broker.add_middleware(PeriodiqMiddleware(skip_delay=30))

dramatiq.set_broker(broker)


@dramatiq.actor(max_retries=1, periodic=cron("0 8 * * *"))  # daily 8:00AM
def crawl_alpitour():
    BaseCrawler.run("alpitour")


@dramatiq.actor(max_retries=1, periodic=cron("15 8 * * *"))  # daily 8:15AM
def crawl_nicolaus():
    BaseCrawler.run("nicolaus")


@dramatiq.actor(max_retries=1, periodic=cron("0 2,8,14,20 * * *"))  # every six hours
def crawl_trivago():
    BaseCrawler.run("trivago")


@dramatiq.actor(max_retries=1, periodic=cron("30 8 * * *"))  # daily 8:30AM
def crawl_valtur():
    BaseCrawler.run("valtur")


@dramatiq.actor(max_retries=1, periodic=cron("45 8 * * *"))  # daily 8:45AM
def crawl_veratour():
    BaseCrawler.run("veratour")
