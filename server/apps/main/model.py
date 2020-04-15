numerical_columns = [
    "e_z",
    "gar_last_season_consumptive",
    "pax_last_season_consumptive",
    "perc_e_z",
    "gar_last_season_on_date",
    "pax_last_season_on_date",
    "perc_occ",
    "gar_current_season",
    "pax_current_season",
    "perc_occ_current_season",
    "delta_gar",
    "delta_pax",
    "last_season_week_four_of_last_four",
    "last_season_week_three_of_last_four",
    "last_season_week_two_of_last_four",
    "last_season_week_one_of_last_four",
    "current_season_week_four_of_last_four",
    "current_season_week_three_of_last_four",
    "current_season_week_two_of_last_four",
    "current_season_week_one_of_last_four",
    "y7_left",
    "adj_capacity",
    "avg_pick_up",
    "pax_py",
    "pax_CY",
    "Prev_Sat"
    # 'plus_or_minus',
]

categorical_columns = ["destination"]

target_variable = "precl_pax"

final_columns = categorical_columns + numerical_columns
final_columns.append(target_variable)


def predictive_model(records):
    """
    This function runs all the Sklearn pipeline to evaluate the given records.
    :param records: a df containing the records.
    :return:
    """
    # create an empty list
    evaluated_records = []

    # Store the key columns and delete them
    file_names = list(records["import_file"])
    sheet_names = list(records["sheet_name"])
    row_numbers = list(records["row_number"])
    plus_minus = list(records["TARGET"])

    records.drop("import_file", axis=1, inplace=True)
    records.drop("sheet_name", axis=1, inplace=True)
    records.drop("row_number", axis=1, inplace=True)

    l = len(row_numbers) + 1
    # run the pipeline
    results = list(range(1, l))

    # take the results, and put them into a Dictionary
    n = 0
    for i in results:
        d = {}

        d["file_name"] = file_names[n]
        d["sheet_name"] = sheet_names[n]
        d["row_number"] = row_numbers[n]
        d["value"] = plus_minus[n]
        d["predictable"] = True

        evaluated_records.append(d)
        n += 1

    return evaluated_records


def zero_model(records):
    """
    This function returns zero for each value in the dataframe.
    :param records: a list containing the records.
    :return:
    """
    # create an empty list
    evaluated_records = []

    for index, row in records.iterrows():
        d = {}

        d["file_name"] = row["import_file"]
        d["sheet_name"] = row["sheet_name"]
        d["row_number"] = row["row_number"]
        d["value"] = 0
        d["predictable"] = True

        evaluated_records.append(d)

    return evaluated_records


def non_predictable_model(records):
    """
    This function returns zero and False for each value in the dataframe.
    :param records: a list containing the records.
    :return:
    """
    # create an empty list
    evaluated_records = []

    for index, row in records.iterrows():
        d = {}

        d["file_name"] = row["import_file"]
        d["sheet_name"] = row["sheet_name"]
        d["row_number"] = row["row_number"]
        d["value"] = 0
        d["predictable"] = False

        evaluated_records.append(d)

    return evaluated_records
