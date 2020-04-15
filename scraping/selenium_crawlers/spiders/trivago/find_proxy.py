import json
import os
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import PurePath
from subprocess import check_output

import log
import requests

PROXY_PATH = str(
    PurePath(__file__).parent.parent.parent.parent.joinpath("data", "proxies.list.txt")
)


def fetch_url(proxy_ip: str):
    url = "https://httpbin.org/ip"
    # Get a proxy from the pool
    try:
        resp = requests.get(url, proxies={"http": f"http://{proxy_ip}"}, timeout=10)
        if resp.status_code == 200:
            return proxy_ip
    except Exception as ex:
        # Most free proxies will often get connection errors. You will have retry the entire request using
        # another proxy to work.
        # We will just skip retries as its beyond the scope of this tutorial and we are only downloading a single url
        log.error(f"Skipping {proxy_ip}: {ex}")


def _fetch_proxies(limit):
    output = check_output(
        [
            "proxybroker",
            "find",
            "--types",
            "HTTP",
            "--lvl",
            "High",
            "--strict",
            "-l",
            f"{limit}",
            "--format",
            "json",
        ]
    )
    proxies = json.loads(output)
    return [f"{item['host']}:{item['port']}" for item in proxies]


def _get_valid_proxies(limit):
    proxies = _fetch_proxies(limit * 2)
    valids = []
    with ThreadPoolExecutor(max_workers=10) as pool:
        future_to_url = {pool.submit(fetch_url, url): url for url in proxies}
        for future in as_completed(future_to_url):
            proxy = future.result()
            if proxy:
                valids.append(proxy)
    return valids


def _get_valid_proxy_retry(limit):
    cnt = 1
    while True:
        proxies = _get_valid_proxies(limit)
        log.info(f"Try {cnt}: getting set of fresh proxies")
        if proxies:
            log.info(f"Proxies ({len(proxies)}): {proxies}")
            return proxies
        cnt += 1


def _get_stored_proxies():
    if os.path.exists(PROXY_PATH):
        with open(PROXY_PATH) as fr:
            lines = fr.read().split()
            timestamp = lines.pop()
            if (time.time() - float(timestamp)) < (30 * 60):
                # if the proxies are fetched within 30mins, then return
                log.info(f"Returning proxies stored at {PROXY_PATH}")
                return lines


def _store_proxies(proxies: list):
    with open(PROXY_PATH, "w") as fw:
        fw.write("\n".join(proxies + [str(time.time())]))


def get_proxies(limit=10):
    proxies = _get_stored_proxies()
    if not proxies:
        proxies = _get_valid_proxy_retry(limit)
        _store_proxies(proxies)
    return proxies


if __name__ == "__main__":
    print(get_proxies(30))
