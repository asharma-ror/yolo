from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.SupplierType)
class SupplierTypeAdmin(ImportExportModelAdmin):
    list_display = ["type"]


@admin.register(models.Supplier)
class SupplierAdmin(ImportExportModelAdmin):
    list_display = ["name", "type"]


@admin.register(models.ProductDestination)
class ProductDestinationAdmin(ImportExportModelAdmin):
    list_display = ["code", "name"]


@admin.register(models.ProductType)
class ProductTypeAdmin(ImportExportModelAdmin):
    list_display = ["type"]


@admin.register(models.Product)
class ProductAdmin(ImportExportModelAdmin):
    list_display = ["name", "product_id"]


@admin.register(models.Occupancy)
class OccupancyAdmin(ImportExportModelAdmin):
    list_display = ["occupancy_code"]


@admin.register(models.DepartureOption)
class DepartureOptionAdmin(ImportExportModelAdmin):
    list_display = ["type", "value"]


@admin.register(models.ProductAllotment)
class ProductAllotmentAdmin(ImportExportModelAdmin):
    list_display = [
        "allotment_id",
        "allotment_occupancies",
        "allotment_departure_options",
    ]
    search_fields = ["allotment_id"]

    def allotment_occupancies(self, obj):
        return "|".join([o.occupancy_code for o in obj.occupancies.all()])

    def allotment_departure_options(self, obj):
        return "|".join([str(o) for o in obj.departure_options.all()])


@admin.register(models.AncillaryServiceType)
class AncillaryServiceTypeAdmin(ImportExportModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(models.AncillaryService)
class AncillaryServiceAdmin(ImportExportModelAdmin):
    list_display = ["name", "service_id"]
    search_fields = ["name", "service_id"]


@admin.register(models.ProductAvailability)
class ProductAvailabilityAdmin(ImportExportModelAdmin):
    list_display = [
        "product_id",
        "master_allotment_id",
        "occupancy_code",
        "quantity_available",
        "quantity_total",
        "start_date_from",
        "start_date_to",
        "nights",
    ]
    search_fields = [
        "product_id",
        "master_allotment_id",
        "occupancy_code",
        "quantity_available",
        "quantity_total",
        "start_date_from",
        "start_date_to",
        "nights",
    ]
