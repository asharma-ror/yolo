import os

from django.core.files import File
from django_pandas.io import read_frame
from pandas import DataFrame

from . import evaluate, models, utils, xl_parser


def get_col_number_to_write(sheet) -> int:
    _, header = xl_parser.get_table_headers(sheet)
    for idx, col in enumerate(header):
        if col.startswith("+/-"):
            return idx
    raise Exception("Not found +/-")


def run_predications(import_file: models.ImportFile) -> DataFrame:
    return evaluate.evaluate_records(  # type: ignore
        records=read_frame(import_file.stagedb_set.all()),
        full_dataframe=read_frame(models.StageDB.objects.filter()),
    )


def update_sheet(sheet, sheet_data) -> None:
    output_col_num = get_col_number_to_write(xl_parser.uno.iter_rows(sheet))
    for _, srow in sheet_data.iterrows():
        sheet[srow.row_number - 1, output_col_num].value = srow.value
        if not srow.predictable:
            sheet[srow.row_number - 1].background_color = 0xFFFF00


def export_file(import_file: models.ImportFile):
    tmp_copy = utils.create_temporary_copy(import_file.file.file)

    with xl_parser.uno.open_book(tmp_copy.name) as book:
        sheet_names = {sh.name for sh in book.sheets}
        for sheet_name, sheet_data in run_predications(import_file).groupby(
            by="sheet_name"
        ):
            if sheet_name in sheet_names:
                update_sheet(sheet=book.sheets[sheet_name], sheet_data=sheet_data)

        book.save()

    # write to output field
    with open(tmp_copy.name, "rb") as tmp_file:
        import_file.output_file.save(import_file.name, File(tmp_file))

    os.remove(tmp_copy.name)
