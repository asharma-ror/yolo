import pandas as pd

from .model import non_predictable_model, predictive_model, zero_model
from .model_preprocessing import prepare_records


def evaluate_records(records, full_dataframe):
    """
    This function is used to run all the records from an Excel Workbook
    and evaluate them through the predictive model.
    :param records: a pandas DataFrame containing the records to evaluate.
    :param full_dataframe: a pandas DataFrame containing the query from StageDB.objects.all()
    :return: a pandas DataFrame containing:
    * "file_name", "sheet_name", "row_number", which are used to work on the Excel file
    * "value", which is the output of the model
    * "predictable", a Boolean value which indicates if the model has been able to process it.
    If "predictable" == False, the row on the Excel file needs to be highlighted.
    """

    # Transform the data creating new columns and queries
    data_frame = prepare_records(records, full_dataframe)  # type: ignore

    # split the dataframe based on "RECORD_TYPE"

    ### ZERO ###
    zero_list = zero_model(data_frame.loc[data_frame["RECORD_TYPE"] == "Zero"])  # type: ignore

    ### NON PREDICTABLE ###
    non_predictable_list = non_predictable_model(  # type: ignore
        data_frame.loc[data_frame["RECORD_TYPE"] == "Non Predictable"]
    )

    ### PREDICTABLE ###
    predictable_df = data_frame.loc[data_frame["RECORD_TYPE"] == "Predictable"]
    predictable_list = predictive_model(predictable_df)  # type: ignore

    total_list = zero_list + non_predictable_list + predictable_list

    return pd.DataFrame(total_list)
