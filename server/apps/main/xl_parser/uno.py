import contextlib
from typing import Iterator, Tuple

from server.conf import CONFIG

from .base import MONTHS


def _open_book(file_path):
    import pyoo

    desktop = pyoo.Desktop(CONFIG.SOFFICE_HOST, 8002)
    return desktop.open_spreadsheet(file_path)


@contextlib.contextmanager
def open_book(file_path):
    doc = _open_book(file_path)  # type: ignore
    try:
        yield doc
    finally:
        doc.close()


def iter_rows(sheet) -> Iterator[Tuple[int, list]]:  # type: ignore
    sheet.cursor._target.gotoEndOfUsedArea(True)
    rows_count = sheet.cursor._target.Rows.Count
    cols_count = sheet.cursor._target.Columns.Count
    for num in range(rows_count + 1):  # noqa
        yield (num, [sheet[num, col].value for col in range(cols_count + 1)])


def get_monthly_sheets(fname) -> Iterator:  # type: ignore
    with open_book(fname) as book:
        for sheet in book.sheets:
            if sheet.name and sheet.name.strip().lower() in MONTHS:
                yield sheet
