import csv
import datetime
from typing import Dict, List, Type, Union

from babel.numbers import parse_decimal
from django.db.models import DateTimeField, DecimalField, Model
from django.utils import timezone

from . import models


def _csv_get_header(first_line) -> List[str]:
    header = []
    dup_set: Dict[str, int] = {}
    for col_name in first_line:
        dup_set[col_name] = dup_set.get(col_name, 0) + 1
        counter = f"{dup_set[col_name]}" if dup_set[col_name] > 1 else ""

        header.append(f"{col_name}{counter}")
    return header


def csv_dict_reader(path: str, header=None):
    """
        return each row as dict. duplicate column names will be handled and named <original name>-1, etc,
    """
    with open(path) as file:
        data = csv.reader(file, delimiter=";")
        if not (header and isinstance(header, list)):
            header = _csv_get_header(next(data))

        for line in data:  # noqa
            yield dict(zip(header, line))


def bulk_create_helper(objs: List[Model], force=False):
    if objs:
        cls = type(objs[0])
        if force or len(objs) > 100:
            cls.objects.bulk_create(objs)
            objs.clear()


PROD_OFFER_HEADER_MAP = {  # noqa
    "prod_id": "product_id",
    "catalog_id": "catalog_id",
    "catalog_id22": "catalog_id",
    "commission_percent": "commissionPercent",
    "departure_date": "departure_date",
    "departure_flight_airport": "departureFlightAirport",
    "departure_flight_available_seats": "departureFlightAvailableSeats",
    "departure_flight_code": "departureFlightCode",
    "departure_flight_company": "departureFlightCompany",
    "hotel_category": "hotelCategory",
    "hotel_checking_date": "hotelCheckinDate",
    "hotel_checkout_date": "hotelCheckoutDate",
    "hotel_code": "hotelCode",
    "hotel_name": "hotelName",
    "offer_type": "type",
    "return_date": "return_date",
    "return_flight_airport": "returnFlightAirport",
    "return_flight_available_seats": "returnFlightAvailableSeats",
    "return_flight_code": "returnFlightCode",
    "return_flight_company": "returnFlightCompany",
    "room_code": "roomCode",
    "total_price": "totalPrice",
    "tot_adult": "totAdult",
    "tot_children": "totChildren",
    "tot_infants": "totInfants",
    "oftype": "type2",
}


def _create_obj(cls, line, mapper) -> Model:
    data = {}
    tz = timezone.get_current_timezone()
    for fld in cls._meta.fields:
        if fld.auto_created or fld.name in {"created", "modified"}:
            continue

        value = line.get(fld.name, line[mapper[fld.name]])

        # data validation
        if isinstance(fld, DateTimeField):
            dt_format = "%Y-%m-%d" if "-" in value else "%d/%m/%y"
            value = tz.localize(datetime.datetime.strptime(value, dt_format))
        elif isinstance(fld, DecimalField) and value:
            value = parse_decimal(value, locale="it")
        data[fld.name] = value

    return cls.new_from(**data)


def _import_file(
    path: str, cls: Type[models.NewFromModelBase], mapper: Union[dict, list]  # type: ignore
):
    objects = []
    for line in csv_dict_reader(path, mapper):
        objects.append(_create_obj(cls, line, mapper))

        # to keep the memory usage on check. bulk-create objects ASAP.
        bulk_create_helper(objects)

    # any remaining objects in the list
    bulk_create_helper(objects, force=True)


def import_prod_offer(path: str):
    _import_file(path, models.ProdOffer, PROD_OFFER_HEADER_MAP)


SALES_UPDATE_HEADER_MAP = [  # noqa
    "n_booking",
    "booking_date",
    "departure_date",
    "reservation_status",
    "stay_duration",
    "traveler_type",
    "total_booking",
    "code_catalog",
    "n_adults",
    "n_children",
    "n_infant",
    "dest_country",
    "dest_zone",
    "cod_IATA_aer_part",
    "cod_IATA_aer_arr",
    "product_description",
    "cod_room",
    "meal_plan",
    "id_prod",
    "id_flight",
]


def import_sales_update(path: str):
    _import_file(path, models.SalesUpdate, SALES_UPDATE_HEADER_MAP)


def import_from_file(file: str):
    if "offer" in file.lower():
        import_prod_offer(file)
    elif "salesupdate" in file.lower():
        import_sales_update(file)
