import fire
from selenium_crawlers.common.utils.logging_utils import app_logger
from selenium_crawlers.spiders import BaseCrawler


def run_crawler(crawler_name: str):
    if not crawler_name:
        app_logger.fatal("Missing crawler name parameter")
        return

    app_logger.info(f"Crawler {crawler_name} -> STARTED")
    BaseCrawler.run(crawler_name)
    app_logger.info(f"Crawler {crawler_name} -> COMPLETED")


if __name__ == "__main__":
    fire.Fire(run_crawler)
