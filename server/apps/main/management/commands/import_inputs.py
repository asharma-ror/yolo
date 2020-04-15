import glob
import logging
import os
from typing import List

from django.core.management.base import BaseCommand
from tqdm import tqdm

from ... import resources, xl_parser, xl_reader

LOGGER = logging.getLogger(__file__)


def start_import(files: List[str], path: str) -> None:
    failed = []
    for file in tqdm(files, desc=f"Importing files from {path}"):  # type: str
        try:
            if "offer" in file.lower() or "salesupdate" in file.lower():
                resources.import_from_file(file)
            else:
                xl_reader.parse_file(file)
        except Exception as ex:
            failed.append(file)
            LOGGER.error(
                f"Failed to import {file} - {ex}",
                exc_info=(not isinstance(ex, xl_parser.FileParserError)),
            )

    if failed:
        print(f"Failed to import Following \n {files}")


class Command(BaseCommand):
    help = "Process Excel files in inputs folder and create StageDB records"

    def add_arguments(self, parser):
        parser.add_argument(
            "path",
            help="Path to the file/folder to import",
            default="inputs",
            nargs="?",
        )

    def handle(self, *args, **options):
        """loop through all the files and check whether they are new"""
        path = options["path"]
        if os.path.isdir(path):
            files = glob.glob(os.path.join(path, "*.xls*"))
        else:
            files = [path]
        start_import(files, path)
