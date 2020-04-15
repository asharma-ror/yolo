from django.contrib import admin
from django_admin_listfilter_dropdown.filters import RelatedDropdownFilter
from import_export.admin import ImportExportModelAdmin

from server.apps.travels import models


@admin.register(models.TravelTemplate)
class TravelTemplateAdmin(ImportExportModelAdmin):
    list_display = [
        "product_id",
        "template_id",
        "reservation_date_from",
        "reservation_date_to",
        "departure_date_from",
        "departure_date_to",
    ]


@admin.register(models.Itinerary)
class ItineraryAdmin(ImportExportModelAdmin):
    list_display = ["name", "alias", "destination"]


@admin.register(models.ItineraryDestination)
class ItineraryDestinationAdmin(ImportExportModelAdmin):
    list_display = ["name", "code"]


@admin.register(models.ItineraryStep)
class ItineraryStepAdmin(ImportExportModelAdmin):
    list_display = [
        "__str__",
        "get_itinerary_alias",
        "name",
        "order",
        "step_type",
        "assignation_type",
    ]
    list_filter = (
        ("itinerary", RelatedDropdownFilter),
        ("itinerary__template", RelatedDropdownFilter),
    )


@admin.register(models.ItineraryStepOption)
class ItineraryStepOptionAdmin(ImportExportModelAdmin):
    list_display = ["__str__", "name"]
    list_filter = (
        ("step", RelatedDropdownFilter),
        ("step__itinerary", RelatedDropdownFilter),
        ("step__itinerary__template", RelatedDropdownFilter),
    )


@admin.register(models.ItinerarySchedule)
class ItineraryScheduleAdmin(ImportExportModelAdmin):
    list_display = ["__str__", "departure_day_offset", "valid_from", "valid_to"]
    list_filter = (
        ("itinerary", RelatedDropdownFilter),
        ("itinerary__template", RelatedDropdownFilter),
    )


@admin.register(models.ItineraryStepType)
class ItineraryStepTypeAdmin(ImportExportModelAdmin):
    list_display = ["type"]
