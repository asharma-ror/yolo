import time

from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait

PAGE_LOAD_POLLING_SECONDS = 1


def get_browser(
    proxy_ip="199.189.86.111:11000", user_agent=None, disable_images=True, headless=True
) -> WebDriver:
    chrome_options = webdriver.ChromeOptions()

    if proxy_ip:
        chrome_options.add_argument(f"--proxy-server={proxy_ip}",)

    if user_agent:
        chrome_options.add_argument("--user-agent=%s" % user_agent)

    if disable_images:
        chrome_prefs = {}
        chrome_options.experimental_options["prefs"] = chrome_prefs
        chrome_prefs["profile.default_content_settings"] = {"images": 2}
        chrome_prefs["profile.managed_default_content_settings"] = {"images": 2}

    chrome_options.add_argument("--window-size=1280x1696")
    chrome_options.add_argument("--no-sandbox")
    if headless:
        chrome_options.add_argument("--headless")

    return webdriver.Chrome(options=chrome_options)


def wait_css_element(css_selector, browser: WebDriver, timeout):
    return WebDriverWait(browser, timeout).until(
        EC.presence_of_element_located((By.CSS_SELECTOR, css_selector)),
    )


def wait_css_element_disappears(css_selector: str, browser: WebDriver, timeout):
    return WebDriverWait(browser, timeout).until_not(
        EC.presence_of_element_located((By.CSS_SELECTOR, css_selector)),
    )


def wait_css_elements_disappears(css_selector: str, browser: WebDriver, timeout):
    return WebDriverWait(browser, timeout).until_not(
        EC.presence_of_all_elements_located((By.CSS_SELECTOR, css_selector)),
    )


def wait_page_load_complete(browser: WebDriver):
    while __get_page_rady_state(browser) != "complete":
        time.sleep(PAGE_LOAD_POLLING_SECONDS)


def __get_page_rady_state(browser: WebDriver):
    return browser.execute_script("document.readyState")


def element_exists(css_selector, browser: WebDriver):
    try:
        browser.find_element(By.CSS_SELECTOR, css_selector)
        return True
    except:
        return False


def scroll_down(browser: WebDriver):
    return browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")


def has_reached_max_scroll_down(browser: WebDriver):
    return __get_max_scroll_y(browser) == __get_current_scroll_y(browser)


def __get_max_scroll_y(browser: WebDriver):
    return browser.execute_script("document.body.scrollHeight")


def __get_current_scroll_y(browser: WebDriver):
    return browser.execute_script("window.windowHeight + window.pageYOffset")
