from dataclasses import dataclass
from datetime import date, datetime
from typing import List


@dataclass
class FakeCustomer:
    name: str = ""
    surname: str = ""
    email: str = ""
    user_id: str = ""
    birthday: date = None
    gender: str = ""
    tax_code: str = ""
    phone: str = ""
    country: str = ""
    state: str = ""
    city: str = ""
    address: str = ""
    zip_code: str = ""
    birth_country: str = ""
    birth_state: str = ""
    birth_city: str = ""


@dataclass
class FakePassenger:
    name: str = ""
    surname: str = ""
    birthday: date = None
    gender: str = ""


@dataclass
class FakeRoomPassengers:
    passengers: List[FakePassenger]


@dataclass
class FakePayment:
    user_session_id: str
    payment_request_id: str
    payment_method: str
    payment_type: str
    payment_amount: float
    transaction_provider: str
    transaction_id: str
    transaction_time: datetime
