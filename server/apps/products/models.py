from django.contrib.postgres.fields import ArrayField
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy
from django_enumfield import enum
from django_extensions.db.models import TimeStampedModel
from social_django.fields import JSONField


class SupplierType(TimeStampedModel):
    type = models.CharField(max_length=200, db_index=True)

    def __str__(self):
        return f"{self.type}"


class Supplier(TimeStampedModel):
    """ A supplier for an external service """

    name = models.CharField(max_length=200, db_index=True)
    type = models.ForeignKey(
        SupplierType, on_delete=models.SET_NULL, null=True, blank=True
    )
    company_id = models.CharField(max_length=50, null=True, blank=True, db_index=True)

    def __str__(self):
        return f"{self.name}"


class ProductDestination(TimeStampedModel):
    """ A destination for a product """

    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True)
    code = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=200)
    searchable = models.BooleanField()

    def __str__(self):
        return f"{self.name}"


class ProductType(TimeStampedModel):
    """ A product category """

    type = models.CharField(max_length=200, db_index=True)

    def __str__(self):
        return f"{self.type}"


class ProductStatus(enum.Enum):
    EDITABLE = 1
    LOCKED = 2

    __labels__ = {EDITABLE: gettext_lazy("Editable"), LOCKED: gettext_lazy("Locked")}


class Product(TimeStampedModel):
    """ A product to be sell within the B2C eCommerce """

    name = models.CharField(max_length=200, db_index=True)
    product_id = models.CharField(max_length=36, unique=True, db_index=True)
    product_type = models.ForeignKey(
        ProductType, on_delete=models.SET_NULL, null=True, blank=True
    )
    alias = models.CharField(max_length=36, unique=True, db_index=True)
    supplier = models.ForeignKey(Supplier, on_delete=models.SET_NULL, null=True)
    destinations = models.ManyToManyField(ProductDestination, blank=True)

    def __str__(self):
        return f"{self.name}"


class Occupancy(models.Model):
    """ A mix of passengers """

    tot_adults = models.IntegerField()
    adult_validators = JSONField(null=True, blank=True)
    occupancy_code = models.CharField(max_length=50, unique=True, db_index=True)

    def __str__(self):
        return f"{self.occupancy_code}"


class AncillaryServiceType(TimeStampedModel):
    """ The type of an additional service """

    name = models.CharField(max_length=200, db_index=True)
    code = models.CharField(max_length=50, db_index=True, unique=True)

    def __str__(self):
        return f"{self.name}"


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


class ServiceSelectionType(enum.Enum):
    OPTIONAL = 1
    AUTOMATIC = 2

    __labels__ = {
        OPTIONAL: gettext_lazy("Optional"),
        AUTOMATIC: gettext_lazy("Automatic"),
    }


class AncillaryService(TimeStampedModel):
    """ An additional service """

    service_id = models.CharField(max_length=50, null=False, unique=True)
    name = models.CharField(max_length=200, db_index=True)
    type = models.ForeignKey(
        AncillaryServiceType, on_delete=models.SET_NULL, null=True, blank=True
    )
    quantity_type = enum.EnumField(  # type: ignore
        QuantityType, default=QuantityType.PER_PERSON, null=False
    )
    selection_type = enum.EnumField(  # type: ignore
        ServiceSelectionType,
        default=ServiceSelectionType.OPTIONAL,
        null=False,
        db_index=True,
    )
    price_type = enum.EnumField(PriceType, default=PriceType.TOTAL)  # type: ignore
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    priority = models.IntegerField(
        null=False, default=1, validators=[MinValueValidator(1)]
    )
    valid_from = models.DateField(null=True, blank=True)
    valid_to = models.DateField(null=True, blank=True)
    supplier = models.ForeignKey(
        Supplier, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name}"


class DepartureOptionType(enum.Enum):
    NONE = 1
    AIRPORT = 2
    FERRY = 3

    __labels__ = {
        NONE: gettext_lazy("None"),
        AIRPORT: gettext_lazy("Airport"),
        FERRY: gettext_lazy("Ferry"),
    }


class DepartureOption(models.Model):
    type = enum.EnumField(  # type: ignore
        DepartureOptionType, default=DepartureOptionType.NONE, null=False
    )
    value = models.CharField(max_length=50, null=False)
    display_name = models.CharField(max_length=200, null=True)

    class Meta:
        unique_together = ("type", "value")

    def __str__(self):
        return (
            "None"
            if self.type == DepartureOptionType.NONE
            else f"{DepartureOptionType.get_name(self.type)}|{self.value}"
        )


class ProductAllotment(TimeStampedModel):
    """ An allotment for a product """

    allotment_id = models.CharField(max_length=200, null=False, unique=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    occupancies = models.ManyToManyField(Occupancy)
    start_date_from = models.DateField(null=False)
    start_date_to = models.DateField(null=False)
    nights = models.IntegerField(null=False)
    days = models.IntegerField(null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    quantity = models.IntegerField(null=False)
    ancillary_services = models.ManyToManyField(AncillaryService, blank=True)
    departure_options = models.ManyToManyField(DepartureOption, blank=True)
    max_contiguous_allotment_nights = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.allotment_id}"


class ProductAvailability(TimeStampedModel):
    """ Is is used to create have a fast lookup on product availabilities """

    availability_key = models.CharField(max_length=600, db_index=True, unique=True)
    master_allotment_id = models.CharField(max_length=200, db_index=True)
    allotments_id = ArrayField(models.CharField(max_length=200))
    tot_allotments = models.IntegerField(default=1)
    product_id = models.CharField(max_length=200, db_index=True)
    start_date_from = models.DateField(db_index=True)
    start_date_to = models.DateField(db_index=True)
    nights = models.IntegerField(db_index=True)
    days = models.IntegerField(db_index=True)
    tot_adults = models.IntegerField(db_index=True)
    adult_validators = JSONField(null=True, blank=True)
    occupancy_code = models.CharField(max_length=50, null=False, db_index=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity_available = models.IntegerField()
    quantity_total = models.IntegerField()
    departure_option_type = enum.EnumField(  # type: ignore
        DepartureOptionType, default=DepartureOptionType.NONE
    )
    departure_option_value = models.CharField(max_length=50)
    departure_option_display_name = models.CharField(
        max_length=200, null=True, blank=True
    )
    destination_codes = ArrayField(models.CharField(max_length=50), default=list)
    destinations_data = JSONField(blank=True)
