import datetime
import re
from collections import defaultdict
from typing import Any, Dict, List, Optional, Tuple, TypeVar, Union

from .. import models

MONTHS = {  # noqa
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre",
}

COL_NAMES_MAP = {}  # noqa
for fld in models.StageDB._meta.fields:
    COL_NAMES_MAP[fld.name] = fld.verbose_name


class FileParserError(Exception):
    """raised when the file is invalid"""


# ex. Portafoglio al 15/7
DATE_RE = re.compile(r"(.+) al \d+/\d+")
YEARS_VS_RE = re.compile(r"([/\d]+) vs. ([/\d]+)")

T = TypeVar("T")


def get_valid_data(idx: int, row: List[T]) -> Optional[T]:
    while idx:
        if idx < len(row) and row[idx]:
            return row[idx]
        idx -= 1
    return None


def _parse_subheader(  # noqa
    header_row: List[str], title_row
) -> List[Union[str, object]]:
    last_valid = None
    sub_header = []
    estate_counter = 0
    al_counter = 0
    neos_counter = 0
    mix_sales_last = False
    for idx, sub in enumerate(header_row):
        if idx > 0 and sub:
            sub = str(sub).strip()
            title = str(get_valid_data(idx, title_row)).lower()
            if DATE_RE.match(sub):  # noqa
                al_counter += 1
                last_valid = f"{sub[:4]}-{al_counter}"
            elif YEARS_VS_RE.match(sub):
                last_valid = "delta"
            elif (sub.startswith("Estate") or sub.startswith("Inverno")) and (
                title.startswith("incremento settimanale")
            ):
                estate_counter += 1
                last_valid = f"estate-{estate_counter}"
            elif sub.startswith("Di cui NEOS"):
                neos_counter += 1
                last_valid = f"neos-{neos_counter}"
            elif title == "budget":
                last_valid = "budget"
            elif title.startswith("mix vendite"):
                if mix_sales_last:
                    last_valid = "curr-sales"
                else:
                    mix_sales_last = True
                    last_valid = "last-sales"
            else:
                last_valid = sub

        sub_header.append(last_valid)
    return sub_header  # type: ignore


def _remove_dups(pre_header) -> List[str]:
    # make sure we don't have any duplicates
    header = []
    dups: Dict[object, int] = defaultdict(int)
    for key in pre_header:
        dups[key] += 1
        key = f"{key}"
        col = (f"{key}-{dups[key]}" if dups[key] > 1 else str(key)).strip()
        col = " ".join(col.split())
        header.append(col)
    return header


def _get_table_headers(headers, row: List[object]) -> List[str]:
    sub_header = _parse_subheader(headers[-1], headers[-2])

    year_name_counter: Dict[Any, int] = defaultdict(int)
    pre_header = []
    for i, sub in enumerate(sub_header):
        if i < len(row):
            if (
                isinstance(row[i], datetime.date)
                and isinstance(sub, str)
                and (sub.startswith("estate") or sub.startswith("neos"))
            ):
                year_name_counter[sub] += 1
                number_of_weeks = 5
                val = f"{sub} : {number_of_weeks - year_name_counter[sub]}"
            else:
                vals = []
                if sub:
                    vals.append(str(sub))
                if row[i]:
                    vals.append(str(row[i]))
                val = " : ".join(vals)
        else:
            val = str(sub)
        pre_header.append(val)

    return _remove_dups(pre_header)


def get_table_headers(sheet) -> Tuple[int, List[str]]:
    headers: List[List[object]] = []
    table_header: List[str] = []

    for row_num, row in sheet:  # type: int, List[object]
        if not any(row):
            # skip empty rows
            continue

        if not table_header:
            if "Week" in row:
                return row_num, _get_table_headers(headers, row)
            else:
                headers.append(row)
    raise Exception("Not Found header")
