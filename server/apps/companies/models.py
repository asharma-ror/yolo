from django.conf import settings
from django.db import models
from django_extensions.db.models import TimeStampedModel


class Company(TimeStampedModel):
    """ A company represents a tour operator that is a customer for the B2B prediction software """

    name = models.CharField(max_length=250)
    company_id = models.CharField(max_length=50, unique=True, db_index=True)

    def __str__(self):
        return f"{self.name}"


class CompanyUser(TimeStampedModel):
    """ Link between company and a User record """

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.company} {self.user}"


class CompanyDestination(TimeStampedModel):
    """ A destination for which a company has a hotel to sell """

    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    parent = models.ForeignKey("self", on_delete=models.SET_NULL, null=True, blank=True)
    code = models.CharField(max_length=100)
    name = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.name}"


class CompanyHotel(TimeStampedModel):
    """ A hotel sold by a company """

    name = models.CharField(max_length=200, db_index=True)
    code = models.CharField(max_length=50, db_index=True)
    location = models.ForeignKey(
        CompanyDestination, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name}"


class RoomCategory(TimeStampedModel):
    """ A category of rooms used to group rooms into cluster of the same type """

    name = models.CharField(max_length=200)
    code = models.CharField(max_length=20, db_index=True)

    def __str__(self):
        return f"{self.name}"


class CompanyRoomType(TimeStampedModel):
    """ A room type for a company hotel """

    name = models.CharField(max_length=200, db_index=True)
    code = models.CharField(max_length=20, db_index=True)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    category = models.ForeignKey(
        RoomCategory, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name}"


class CompanyAirport(TimeStampedModel):
    """ An airport for which a company is selling flights """

    name = models.CharField(max_length=200, db_index=True)
    code = models.CharField(max_length=50, db_index=True)
    location = models.ForeignKey(
        CompanyDestination, on_delete=models.SET_NULL, null=True, blank=True
    )

    def __str__(self):
        return f"{self.name}"
