import uuid

from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy
from django_enumfield import enum
from django_extensions.db.models import TimeStampedModel
from social_django.fields import JSONField


class TravelTemplate(TimeStampedModel):
    """ A travel template for a product """

    product_id = models.CharField(max_length=50, unique=True, db_index=True)
    template_id = models.CharField(
        max_length=50, default=uuid.uuid4, db_index=True, unique=True, editable=False
    )
    reservation_date_from = models.DateField(null=True, blank=True)
    reservation_date_to = models.DateField(null=True, blank=True)
    departure_date_from = models.DateField(null=True, blank=True)
    departure_date_to = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.product_id} | {self.template_id}"


class ItineraryDestination(TimeStampedModel):
    """ Destination information for a particular Itinerary """

    code = models.CharField(max_length=20, db_index=True, unique=True)
    name = models.CharField(max_length=200, db_index=True)

    def __str__(self):
        return f"{self.name}"


class Itinerary(TimeStampedModel):
    """ A vacation itinerary template. It is composed by one or more itinerary steps """

    name = models.CharField(max_length=200, db_index=True)
    alias = models.CharField(max_length=36, unique=True, db_index=True)
    template = models.ForeignKey(TravelTemplate, on_delete=models.CASCADE)
    destination = models.ForeignKey(ItineraryDestination, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}"


class ItineraryStepType(TimeStampedModel):
    """ The typology of an itinerary step """

    type = models.CharField(max_length=200, db_index=True)

    def __str__(self):
        return f"{self.type}"


class AssignationType(enum.Enum):
    FIXED = 1
    SELECTABLE_BY_USER = 2
    SELECTABLE_BY_SUPPLIER = 3

    __labels__ = {
        FIXED: gettext_lazy("Fixed"),
        SELECTABLE_BY_USER: gettext_lazy("Selectable By User"),
        SELECTABLE_BY_SUPPLIER: gettext_lazy("Selectable By Supplier"),
    }


class ItineraryStep(TimeStampedModel):
    """ A single step for an itinerary """

    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, null=False)
    name = models.CharField(max_length=200)
    order = models.IntegerField()
    day_from = models.CharField(max_length=50)
    day_to = models.CharField(max_length=50)
    step_type = models.ForeignKey(
        ItineraryStepType, on_delete=models.SET_NULL, null=True, blank=True
    )
    assignation_type = enum.EnumField(AssignationType, default=AssignationType.FIXED)  # type: ignore
    assignation_precedence = models.IntegerField(null=True, blank=True)

    def get_itinerary_alias(self) -> str:
        return self.itinerary.alias

    def __str__(self):
        return f"{self.get_itinerary_alias()} | {self.order} | {self.name}"

    class Meta:
        unique_together = ("itinerary", "order")


class ItineraryStepOption(TimeStampedModel):
    """ A single option for an itinerary step """

    name = models.CharField(max_length=200)
    step = models.ForeignKey(ItineraryStep, on_delete=models.CASCADE)
    data = JSONField(null=True, blank=True)

    class Meta:
        unique_together = ("name", "step")

    def __str__(self):
        return f"{self.step.itinerary.alias} | {self.step.order} | {self.name}"


class ItinerarySchedule(TimeStampedModel):
    """ A possible scheduled departure date reference for an Itinerary """

    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE)
    departure_day_offset = models.IntegerField()
    valid_from = models.DateField(null=True, blank=True)
    valid_to = models.DateField(null=True, blank=True)
    data = JSONField(null=True, blank=True)

    class Meta:
        unique_together = ("itinerary", "departure_day_offset", "valid_from")

    def __str__(self):
        return f"{self.itinerary.alias} | {self.departure_day_offset}"


class TravelStatus(enum.Enum):
    UNASSIGNED = 1
    ASSIGNED = 3
    CANCELED = 2

    __labels__ = {
        UNASSIGNED: gettext_lazy("Unassigned"),
        ASSIGNED: gettext_lazy("Assigned"),
        CANCELED: gettext_lazy("Canceled"),
    }


class TravelReservation(TimeStampedModel):
    reservation_id = models.CharField(
        max_length=20, null=False, db_index=True, unique=True
    )
    reservation_date = models.DateField(db_index=True)
    product_id = models.CharField(max_length=200, db_index=True)
    start_date_from = models.DateField(db_index=True)
    start_date_to = models.DateField(db_index=True)
    departure_option_type = models.CharField(max_length=50)
    departure_option_value = models.CharField(max_length=50, null=True, blank=True)
    status = enum.EnumField(  # type: ignore
        TravelStatus, default=TravelStatus.UNASSIGNED, db_index=True
    )


class TravelReservationRoom(TimeStampedModel):
    reservation = models.ForeignKey(TravelReservation, on_delete=models.CASCADE)
    tot_adults = models.IntegerField(validators=[MinValueValidator(1)])
    occupancy_code = models.CharField(max_length=50, db_index=True)


class TravelInstance(TimeStampedModel):
    reservation = models.OneToOneField(
        TravelReservation, on_delete=models.CASCADE, related_name="instance"
    )
    departure_date = models.DateField()
