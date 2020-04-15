import datetime
from decimal import Decimal

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


# Get a DataFrame filtering for destination and week
def get_filtered_dataframe(destination, week, df):
    df = df.loc[df["destination"] == destination]
    df = df.loc[df["week"] == week]
    df = df.sort_values(by=["date"], ascending=True)
    return df


def get_delta_days(row):
    """
    Get number of days from date to week
    :param row:
    :return:
    """
    week = row["week"]
    ds = week.split(": ")[1].split("-")
    w_day = int(ds[2])
    w_month = int(ds[1])
    w_year = int(ds[0])

    final_date = datetime.date(w_year, w_month, w_day)

    date = row["date"]

    ds = date.split("-")
    day = int(ds[2])
    month = int(ds[1])
    year = int(ds[0])
    new_date = datetime.date(year, month, day)

    return (final_date - new_date).days


# def get_final_prediction(row):
#     '''
#     This function calculates the final prediction for a given record, assuming this is available.
#     If it's not available, the dataset will not be used for training.
#     :param row:
#     :return:
#     '''


def add_zero_type(row):
    """
    This function defines if the result must be zero or not.
    :param row:
    :return:
    """
    if str(int(row["pax_CY"])) == "0":
        return True
    else:
        return False


def add_record_type(row):
    """
    This function adds the column "RECORD_TYPE" to the record dataset
    :param row: row of the dataset
    :return: the value for the column
    """

    if str(int(row["pax_CY"])) == "0":
        return "Zero"
    else:
        if row["Count"] < 3:
            return "Non Predictable"
        else:
            return "Predictable"


# Used to calculate previous values for the dataset
def semi_exponential_moving_average(df, column_name):
    n = 1
    tot = 0
    den = 0
    values = list(df[column_name])
    # values = [47, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 100, 100]
    # print(values)

    for value in values:
        total = n * value
        tot += total
        den += n
        n += 1

    # print(tot)
    # print(den)
    if den != 0:
        return int(tot / den)
    else:
        return 0


def exponential_moving_average(train_data):
    ema_avg_predictions = []

    EMA = Decimal("0.0")
    ema_avg_predictions.append(EMA)

    gamma = Decimal("0.5")
    N = len(train_data)

    for i in range(1, N):
        EMA = EMA * gamma + (Decimal("1.0") - gamma) * train_data[i - 1]
        ema_avg_predictions.append(EMA)

    N = len(ema_avg_predictions) - 1
    return ema_avg_predictions[N]


def get_target_variable(row):
    ema = row["EMA"]

    pax = row["pax_current_season"]

    total_capacity = row["new_capacity"]

    if (pax + ema) > total_capacity:
        ema = total_capacity - (pax + 1)

    if row["pax_CY"] == 0:
        ema = 0

    return int(Decimal(str(ema)) - Decimal(str(row["pax_CY"])))


def prepare_records(records, full_dataframe):
    """
    This function transforms the dataframe containing the records,
    applying the data preprocessing
    :param records:
    :param full_dataframe
    :return: the transformed records dataframe
    """

    # filter the full dataframe with zero == False
    full_dataframe["Zero"] = full_dataframe.apply(add_zero_type, axis=1)

    # get the filtered full dataframe, only using non-zero instances
    new_full_dataframe = full_dataframe.loc[full_dataframe["Zero"] == False]

    # New Columns Created

    # Create a list to include the number of records for this combination
    dataset_count = []
    previous_saturation = []
    ema = []

    for index, row in records.iterrows():
        temp_df = get_filtered_dataframe(  # type: ignore
            row["destination"], row["week"], new_full_dataframe
        )
        dataset_count.append(len(temp_df.index))
        previous_saturation.append(
            semi_exponential_moving_average(temp_df, "precl_pax")  # type: ignore
        )
        precls = list(temp_df["precl_pax"])
        ema.append(exponential_moving_average(precls))  # type: ignore

    records["Count"] = dataset_count
    records["Prev_Sat"] = previous_saturation
    records["EMA"] = ema

    # RECORD_TYPE
    # This columns describes the three possible records types:
    # 1. Zero: this record, since it's full of zeros, has a value of zero
    # 2. Predictable: this records will be evaluated by the model
    # 3. Non Predictable
    records["TARGET"] = records.apply(get_target_variable, axis=1)
    records["RECORD_TYPE"] = records.apply(add_record_type, axis=1)

    return records


def prepare_records_for_testing(records, numerical_columns, target_variable):
    """
    This function takes the records and the columns to preprocess correctly data
    :param records:
    :param numerical_columns:
    :param categorical_columns:
    :param target_variable:
    :return:
    """

    # use only selected columns in the dataset
    final_columns = numerical_columns
    final_columns.append(target_variable)

    records = records[final_columns]

    X_test = records.drop(target_variable, axis=1)
    y_test = records[target_variable].copy()

    num_pipeline = Pipeline(
        [
            ("imputer", SimpleImputer(strategy="constant", fill_value=0)),
            ("std_scaler", StandardScaler()),
        ]
    )

    full_pipeline = ColumnTransformer([("num", num_pipeline, numerical_columns)])

    if target_variable in numerical_columns:
        numerical_columns.remove(target_variable)
    return full_pipeline.fit_transform(X_test), y_test
