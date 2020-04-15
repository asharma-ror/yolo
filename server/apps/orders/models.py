from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import Q
from django.db.models.query import QuerySet
from django.utils.translation import gettext_lazy
from django_enumfield import enum
from django_extensions.db.fields.json import JSONField
from django_extensions.db.models import TimeStampedModel

from server.apps.orders.types.payments import PaymentContextData


class QuotationServiceTypes:
    DISCOUNT = "coupon"
    BASE_PRICE = "base_price"
    ANCILLARY_SERVICE = "ancillary_service"


class Gender(enum.Enum):
    MALE = 1
    FEMALE = 2

    __labels__ = {MALE: gettext_lazy("Male"), FEMALE: gettext_lazy("Female")}


class QuotationStatus(enum.Enum):
    """ The status of a quotation """

    DRAFT = 1
    OPTIONED = 2
    CONFIRMED = 3
    CANCELED = 4
    EXPIRED = 5

    __labels__ = {
        DRAFT: gettext_lazy("Draft"),
        OPTIONED: gettext_lazy("Optioned"),
        CONFIRMED: gettext_lazy("Confirmed"),
        CANCELED: gettext_lazy("Canceled"),
        EXPIRED: gettext_lazy("Expired"),
    }


class Quotation(TimeStampedModel):
    """ It is a quotation made by the user for a particular product """

    quotation_id = models.CharField(max_length=200, db_index=True, unique=True)
    product_id = models.CharField(max_length=200, db_index=True)
    status = enum.EnumField(  # type: ignore
        QuotationStatus, default=QuotationStatus.DRAFT, db_index=True
    )
    start_date_from = models.DateField(db_index=True)
    start_date_to = models.DateField(db_index=True)
    nights = models.IntegerField()
    days = models.IntegerField()
    departure_option_type = models.CharField(max_length=50)
    departure_option_value = models.CharField(max_length=50, null=True, blank=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_discount = models.DecimalField(max_digits=10, decimal_places=2)
    deposit_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )

    def __str__(self) -> str:
        return f"{self.quotation_id}"

    def get_rooms(self) -> "QuerySet[QuotationRoom]":
        return QuotationRoom.objects.filter(quotation=self).order_by("room_index").all()

    def get_room(self, room_index: int) -> "QuotationRoom":
        return QuotationRoom.objects.filter(
            Q(quotation=self) & Q(room_index=room_index)
        ).get()

    def get_customer(self) -> "Customer":
        return Customer.objects.filter(quotation=self).get()


class QuotationRoom(TimeStampedModel):
    """ It is a room for the current quotation """

    room_index = models.IntegerField(validators=[MinValueValidator(0)])
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE)
    master_allotment_id = models.CharField(max_length=200, db_index=True)
    allotments_id = ArrayField(models.CharField(max_length=200), default=list)
    tot_allotments = models.IntegerField()
    availability_key = models.CharField(max_length=600, db_index=True)
    optioned = models.BooleanField(null=False, db_index=True)
    room_price = models.DecimalField(max_digits=10, decimal_places=2)
    room_discount = models.DecimalField(max_digits=10, decimal_places=2)
    occupancy_code = models.CharField(max_length=50, db_index=True)
    tot_adults = models.IntegerField(validators=[MinValueValidator(1)])

    def __str__(self) -> str:
        return f"{self.quotation.quotation_id} -> room {self.room_index}"

    def get_services(self) -> "QuerySet[QuotationService]":
        return QuotationService.objects.filter(room=self).order_by("service_id").all()

    def get_service(self, service_id: str) -> "QuotationService":
        return QuotationService.objects.filter(
            Q(room=self) & Q(service_id=service_id)
        ).get()

    def contains_service(self, service_id: str) -> bool:
        return (
            QuotationService.objects.filter(
                Q(room=self) & Q(service_id=service_id)
            ).count()
            > 0
        )

    def get_additional_services(self) -> "QuerySet[QuotationAdditionalService]":
        return (
            QuotationAdditionalService.objects.filter(room=self)
            .order_by("service_id")
            .all()
        )

    def get_additional_service(self, service_id: str) -> "QuotationAdditionalService":
        return QuotationAdditionalService.objects.filter(
            Q(room=self) & Q(service_id=service_id)
        ).get()

    def get_passengers(self) -> "QuerySet[Passenger]":
        return Passenger.objects.filter(room=self).order_by("passenger_index").all()

    def get_passenger(self, passenger_index: int) -> "Passenger":
        return Passenger.objects.filter(
            Q(room=self) & Q(passenger_index=passenger_index)
        ).get()


class QuotationServiceType(TimeStampedModel):
    """ The typology of a quotation service """

    name = models.CharField(max_length=200, null=False)
    code = models.CharField(max_length=20, null=False, db_index=True)

    def __str__(self):
        return f"{self.name}"

    def is_discount(self) -> bool:
        return self.code == QuotationServiceTypes.DISCOUNT

    def is_ancillary_service(self) -> bool:
        return self.code == QuotationServiceTypes.ANCILLARY_SERVICE


class QuantityType(enum.Enum):
    PER_PERSON = 1
    PER_ROOM = 2
    PER_RESERVATION = 3

    __labels__ = {
        PER_PERSON: gettext_lazy("Per Person"),
        PER_ROOM: gettext_lazy("Per Room"),
        PER_RESERVATION: gettext_lazy("Per Reservation"),
    }


class PriceType(enum.Enum):
    TOTAL = 1
    PERCENT = 2

    __labels__ = {TOTAL: gettext_lazy("Total"), PERCENT: gettext_lazy("Percent")}


class SelectionType(enum.Enum):
    OPTIONAL = 1
    AUTOMATIC = 2

    __labels__ = {
        OPTIONAL: gettext_lazy("Optional"),
        AUTOMATIC: gettext_lazy("Automatic"),
    }


class QuotationService(TimeStampedModel):
    """ It is a quotation component. All the quotation services composes quotation price """

    name = models.CharField(max_length=200)
    room = models.ForeignKey(QuotationRoom, on_delete=models.CASCADE)
    price_type = enum.EnumField(PriceType, default=PriceType.TOTAL)  # type: ignore
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    priority = models.IntegerField(null=False)
    quantity_type = enum.EnumField(  # type: ignore
        QuantityType, default=QuantityType.PER_PERSON, null=False
    )
    selection_type = enum.EnumField(  # type: ignore
        SelectionType, default=SelectionType.OPTIONAL, null=False, db_index=True
    )
    quantity = models.IntegerField(null=False)
    service_type = models.ForeignKey(
        QuotationServiceType, on_delete=models.SET_NULL, null=True, blank=True
    )
    service_id = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.name}"


class QuotationAdditionalService(TimeStampedModel):
    """ It is a quotation optional additional service """

    name = models.CharField(max_length=200)
    room = models.ForeignKey(QuotationRoom, on_delete=models.CASCADE)
    price_type = enum.EnumField(PriceType, default=PriceType.TOTAL)  # type: ignore
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    priority = models.IntegerField(null=False)
    quantity_type = enum.EnumField(  # type: ignore
        QuantityType, default=QuantityType.PER_PERSON, null=False
    )
    service_id = models.CharField(max_length=50)


class Passenger(models.Model):
    """ A single reservation traveler """

    room = models.ForeignKey(QuotationRoom, on_delete=models.CASCADE, null=False)
    passenger_index = models.IntegerField(validators=[MinValueValidator(0)], null=False)
    name = models.CharField(max_length=200, null=True)
    surname = models.CharField(max_length=200, null=True)
    birthday = models.DateField(null=True)
    min_age = models.IntegerField(null=True, blank=True)
    max_age = models.IntegerField(null=True, blank=True)
    gender = enum.EnumField(Gender, null=True)  # type: ignore

    class Meta:
        unique_together = ("room", "passenger_index")

    def __str__(self):
        return f"{self.name} {self.surname}"


class Customer(TimeStampedModel):
    """ An eCommerce customer """

    quotation = models.OneToOneField(
        Quotation, on_delete=models.CASCADE, primary_key=True
    )
    name = models.CharField(max_length=200, null=False)
    surname = models.CharField(max_length=200, null=False)
    email = models.CharField(max_length=200, null=False)
    user_id = models.CharField(max_length=200, null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    gender = enum.EnumField(Gender, null=True, blank=True)  # type: ignore
    tax_code = models.CharField(max_length=20, null=True, blank=True)
    phone = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=100, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=True)
    address = models.CharField(max_length=500, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    birth_country = models.CharField(max_length=200, null=True, blank=True)
    birth_state = models.CharField(max_length=200, null=True, blank=True)
    birth_city = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.surname}"


class Reservation(TimeStampedModel):
    """ A completed reservation """

    quotation = models.OneToOneField(Quotation, on_delete=models.CASCADE)
    reservation_id = models.CharField(
        max_length=20, null=False, db_index=True, unique=True
    )

    def get_payments(self) -> "QuerySet[Payment]":
        return Payment.objects.filter(reservation=self).all()


class PaymentType(enum.Enum):
    FULL_AMOUNT = 1
    DEPOSIT = 2
    BALANCE = 3

    __labels__ = {
        FULL_AMOUNT: gettext_lazy("Full Amount"),
        DEPOSIT: gettext_lazy("Deposit"),
        BALANCE: gettext_lazy("Balance"),
    }

    @staticmethod
    def parse(value: str) -> "PaymentType":
        return PaymentType[value.upper()]


class Payment(TimeStampedModel):
    """ A payment instance associated to a reservation """

    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    user_session_id = models.CharField(max_length=200, null=False, db_index=True)
    payment_session_id = models.CharField(
        max_length=200, null=False, db_index=True, unique=True
    )
    payment_method = models.CharField(max_length=50, null=False, db_index=True)
    payment_type = enum.EnumField(PaymentType, null=False, db_index=True)  # type: ignore
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    transaction_provider = models.CharField(max_length=50, null=False, db_index=True)
    transaction_id = models.CharField(max_length=100, null=False, db_index=True)
    transaction_time = models.DateTimeField(null=False, db_index=True)

    def __str__(self):
        return f"{self.transaction_id}"


class PurchaseEmail(TimeStampedModel):
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE)
    to = models.CharField(max_length=200, null=False, db_index=True)
    subject = models.CharField(max_length=200, null=False)
    body = models.TextField(null=False)

    def __str__(self):
        return f"{self.to} | {self.subject}"


class PaymentStatus(enum.Enum):
    INITIALIZING = 1
    PENDING = 2
    SUCCEEDED = 3
    DECLINED = 4
    ERROR = 5
    EXPIRED = 6

    __labels__ = {
        INITIALIZING: gettext_lazy("Initializing"),
        PENDING: gettext_lazy("Pending"),
        SUCCEEDED: gettext_lazy("Succeeded"),
        DECLINED: gettext_lazy("Declined"),
        ERROR: gettext_lazy("Error"),
        EXPIRED: gettext_lazy("Expired"),
    }


class PaymentAttempt(TimeStampedModel):
    """ It is a payment attempt made by a user """

    quotation_id = models.CharField(max_length=200, null=False, db_index=True)
    user_session_id = models.CharField(max_length=200, null=False, db_index=True)
    status = enum.EnumField(  # type: ignore
        PaymentStatus, default=PaymentStatus.INITIALIZING, null=False, db_index=True
    )
    payment_session_id = models.CharField(
        max_length=200, null=False, db_index=True, unique=True
    )
    payment_method = models.CharField(max_length=50, null=False, db_index=True)
    payment_type = enum.EnumField(PaymentType, null=False, db_index=True)  # type: ignore
    payment_amount = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    payment_error = JSONField(null=True)
    transaction_provider = models.CharField(max_length=50, null=False, db_index=True)
    transaction_start_time = models.DateTimeField(null=True, db_index=True)
    transaction_end_time = models.DateTimeField(null=True, db_index=True)
    transaction_id = models.CharField(max_length=100, null=True, db_index=True)
    transaction_initialization_input = JSONField(null=True)
    transaction_initialization_output = JSONField(null=True)
    transaction_verification_input = JSONField(null=True)
    transaction_verification_output = JSONField(null=True)

    def get_context_data(self) -> PaymentContextData:
        return PaymentContextData(
            quotation_id=self.quotation_id,
            user_session_id=self.user_session_id,
            payment_session_id=self.payment_session_id,
        )


class PaymentLogType(enum.Enum):
    INFO = 1
    ERROR = 2
    DECLINED = 3

    __labels__ = {
        INFO: gettext_lazy("Info"),
        ERROR: gettext_lazy("Error"),
        DECLINED: gettext_lazy("Declined"),
    }


class PaymentLog(TimeStampedModel):
    log_type = enum.EnumField(PaymentLogType, null=False, db_index=True)  # type: ignore
    quotation_id = models.CharField(max_length=200, null=False, db_index=True)
    user_session_id = models.CharField(max_length=200, null=False, db_index=True)
    payment_session_id = models.CharField(max_length=200, null=False, db_index=True)
    operation_name = models.CharField(max_length=50, null=False, db_index=True)
    data = JSONField(null=True)
    error = JSONField(null=True)


class DiscountTicket(TimeStampedModel):
    code = models.CharField(max_length=50, db_index=True, unique=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    amount_type = enum.EnumField(PriceType, default=PriceType.TOTAL)  # type: ignore
    priority = models.IntegerField(default=0)
    reservation_date_from = models.DateField(null=True, blank=True)
    reservation_date_to = models.DateField(null=True, blank=True)
    departure_date_from = models.DateField(null=True, blank=True)
    departure_date_to = models.DateField(null=True, blank=True)
    email = models.EmailField(max_length=265, null=True, blank=True)
    reservation_id = models.CharField(
        max_length=50, db_index=True, null=True, blank=True
    )

    def __str__(self):
        return self.code


class PromoCode(TimeStampedModel):
    code = models.CharField(max_length=50, db_index=True, unique=True)

    def __str__(self):
        return self.code


class PromoRule(TimeStampedModel):
    promo = models.ForeignKey(PromoCode, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    amount_type = enum.EnumField(PriceType, default=PriceType.TOTAL)  # type: ignore
    reservation_date_from = models.DateField(null=True, blank=True)
    reservation_date_to = models.DateField(null=True, blank=True)
    departure_date_from = models.DateField(null=True, blank=True)
    departure_date_to = models.DateField(null=True, blank=True)
