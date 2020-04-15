import json
from dataclasses import dataclass
from datetime import date, timedelta
from typing import List

import db


class HotelRoomOccupancy:
    adults: int

    def __init__(self, adults):
        self.adults = adults


class HotelRoomsOccupancy:
    rooms: List[HotelRoomOccupancy]

    def __init__(self, rooms: List[HotelRoomOccupancy]):
        self.rooms = rooms

    def serialize(self):
        rooms = []
        for room in self.rooms:
            rooms.append(
                {"adults": room.adults,}
            )
        return json.dumps(rooms)

    def get_tot_rooms(self):
        return len(self.rooms)

    def get_room(self, index):
        return self.rooms[index] if len(self.rooms) > index else None

    def to_db(self):
        return [
            db.HotelOccupancy(persons="adults", number=rm.adults) for rm in self.rooms
        ]


@dataclass
class HotelSearchCombination:
    date_from: date = None
    date_to: date = None
    duration: int = None
    occupancy: HotelRoomsOccupancy = None
    destination: dict = None

    def __str__(self):
        return f'{self.destination["id"] if self.destination else ""}|{self.date_from.isoformat()}|{self.duration}'

    @property
    def calc_date_to(self):
        return self.date_to or self.date_from + timedelta(days=self.duration)
