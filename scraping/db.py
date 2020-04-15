import datetime
from typing import List

import mongoengine as me
from common.hotel.hotel_data import HotelSearchCombination
from config import CONFIG


def connect():
    me.connect(db=CONFIG.MONGO_DB_NAME, host=CONFIG.MONGO_DB_HOST)


connect()


class HotelPrice(me.EmbeddedDocument):
    company = me.StringField()
    price = me.DecimalField(required=True)


class HotelOccupancy(me.EmbeddedDocument):
    persons = me.StringField(required=True)
    number = me.IntField(required=True)


class Destination(me.EmbeddedDocument):
    dest_id = me.StringField(required=True)
    name = me.StringField()


class Flight(me.EmbeddedDocument):
    airport = me.StringField()
    flight = me.StringField()


class HotelListing(me.Document):
    source = me.StringField(required=True, max_length=200)
    created_utc = me.DateTimeField(default=datetime.datetime.utcnow)
    occupancy = me.ListField(me.EmbeddedDocumentField(HotelOccupancy))
    hotel_name = me.StringField(required=True)
    destination = me.EmbeddedDocumentField(Destination)

    # duration
    date_from = me.DateTimeField(required=True)
    date_to = me.DateTimeField()
    duration = me.DecimalField()
    nights = me.DecimalField()

    departure_flight = me.EmbeddedDocumentField(Flight)
    return_flight = me.EmbeddedDocumentField(Flight)

    accommodation = me.StringField()
    room_type = me.StringField()

    prices = me.ListField(me.EmbeddedDocumentField(HotelPrice))
    product_type = me.StringField(required=True, max_length=200)

    @classmethod
    def prepare(
        cls,
        source,
        combination: HotelSearchCombination,
        hotel_name: str,
        prices: List[HotelPrice],
        accommodation,
        room_type,
        nights,
        departure_flight,
        return_flight,
        product_type="hotel",
    ):
        return cls(
            source=source,
            occupancy=combination.occupancy.to_db(),
            hotel_name=hotel_name,
            destination=Destination(
                dest_id=combination.destination["id"],
                name=combination.destination["path"],
            ),
            # duration
            date_from=combination.date_from.isoformat(),
            date_to=combination.calc_date_to,
            duration=combination.duration,
            nights=nights,
            # flight-data if available
            departure_flight=departure_flight,
            return_flight=return_flight,
            # accomodation
            accommodation=accommodation,
            room_type=room_type,
            # rest
            prices=prices,
            product_type=product_type,
        )
