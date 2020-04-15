import datetime
import os
import re
from decimal import Decimal
from typing import Any, Dict, Iterable, List, Tuple

from dateutil import parser
from django.core.files import File
from django.db import transaction
from django.db.models import DecimalField, IntegerField

from . import models
from .xl_parser import (
    COL_NAMES_MAP,
    FileParserError,
    get_monthly_sheets,
    get_table_headers,
    uno,
)

FILE_DATE_RE = re.compile(r".+(\s|-|_)(\d+_\d+_\d+).+")


def parse_file(fname: str, fname_to_parse=""):
    """parse a single file and process all sheets with name of months"""
    with transaction.atomic():
        file_date, import_file, _ = check_file_imported(fname, fname_to_parse)

        with uno.open_book(fname) as book:
            # because the last time the file is opened in software that corrupted the formula values.
            # Open it now in libreoffice and save to get correct value set.
            book.save()

        for name, sheet in get_monthly_sheets(fname):
            process_sheet(file_date, import_file, sheet, name)

    return "Imported"


def parse_file_date(date_str: str) -> datetime.datetime:
    file_date = date_str.replace("_", "-")
    return parser.parse(file_date)


def check_file_imported(
    fname: str, fname_to_parse=""
) -> Tuple[datetime.datetime, models.ImportFile, bool]:
    fname_to_parse = fname_to_parse or fname
    _, fname_to_parse = os.path.split(fname_to_parse)
    file_date = FILE_DATE_RE.findall(fname_to_parse)

    if not file_date:
        raise FileParserError(
            "File name should contain date in the format `yyyy_mm_dd`"
        )

    import_file, created = models.ImportFile.objects.get_or_create(name=fname_to_parse)
    with open(fname, "rb") as f:
        import_file.file.save(fname_to_parse, File(f))

    return parse_file_date(file_date[0][1]), import_file, (not created)


def _get_valid_data(fld, val) -> Any:
    if isinstance(fld, (DecimalField, IntegerField)):
        if val in {"-", "", "#N/A", "n/a", "#DIV/0!", "#REF!", "#VALUE!"} or (not val):
            val = 0

        if val:
            if isinstance(fld, IntegerField):
                val = round(Decimal(str(val)))

    return val


def create_stage_db(row, uniq_kwargs) -> None:
    pre_data = {}
    for fld, row_key in COL_NAMES_MAP.items():
        keys = {
            row_key,
            str(row_key).replace("\n", " "),
            " ".join(str(row_key).split()),
        }
        keys = keys.intersection(row)
        if not keys:
            continue

        model_fld = models.StageDB._meta.get_field(fld)
        pre_data[fld] = _get_valid_data(fld=model_fld, val=row[list(keys)[0]])

    models.StageDB.objects.update_or_create(defaults=pre_data, **uniq_kwargs)


def create_for_destination(
    file_date: datetime.date,
    import_file: models.ImportFile,
    destination: str,
    destination_data: List[Dict[str, Any]],
):
    dest, _ = models.Destination.objects.get_or_create(name=destination)

    for row in destination_data:
        week, _ = models.Week.objects.get_or_create(
            name=row["Week"], start=row["dal"], end=row["al"]
        )
        create_stage_db(
            row,
            uniq_kwargs={
                "import_file": import_file,
                "date": file_date,
                "week": week,
                "destination": dest,
                "sheet_name": row["sheet_name"],
                "row_number": row["row_number"],
            },
        )


def process_sheet(  # noqa
    file_date, import_file: models.ImportFile, sheet: Iterable, sheet_name  # type: ignore
):
    """process a single month and create record for each of the valid rows"""
    header_row_num, table_header = get_table_headers(sheet)
    destination_data: List[Dict[str, Any]] = []

    for row_num, row in sheet:
        if not any(row):
            continue

        if row[0] == "Totale":
            # end of processing a sheet
            break

        # check table for destination has started
        data = {
            key: (row[i] if i < len(row) else None)
            for i, key in enumerate(table_header)
        }
        data["sheet_name"] = sheet_name
        data["row_number"] = row_num + 1
        # accumulate weeks for a destination
        if data["Week"]:
            if data["Week"] == "-":
                continue  # skip rows with no valid week number

            if isinstance(data["Week"], str):
                create_for_destination(
                    file_date,
                    import_file,
                    destination=data["Week"],
                    destination_data=list(destination_data),  # make a copy
                )
                destination_data.clear()
            else:
                destination_data.append(data)
