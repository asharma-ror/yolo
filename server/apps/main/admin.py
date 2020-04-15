# -*- coding: utf-8 -*-

from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.Week)
class WeekAdmin(admin.ModelAdmin):
    search_fields = ["name", "start", "end"]


@admin.register(models.ImportFile)
class ImportFileAdmin(admin.ModelAdmin):
    list_display = ["name"]
    list_filter = ["created"]
    search_fields = ["name"]


@admin.register(models.Destination)
class DestinationAdmin(admin.ModelAdmin):
    list_display = ["name"]
    search_fields = list_display


@admin.register(models.StageDB)
class StageDBAdmin(admin.ModelAdmin):
    list_filter = ["destination", "week"]
    autocomplete_fields = ["destination", "week", "import_file"]


@admin.register(models.ProdOffer)
class ProdOfferAdmin(ImportExportModelAdmin):
    list_display = [
        "catalog_id",
        "catalog_id22",
        "departure_flight_code",
        "departure_flight_company",
        "hotel_name",
    ]
    search_fields = [
        "catalog_id",
        "catalog_id22",
        "departure_flight_code",
        "departure_flight_company",
        "hotel_name",
    ]
    list_filter = [
        "return_date",
        "departure_date",
        "hotel_checkout_date",
        "hotel_checking_date",
    ]


@admin.register(models.Country)
class CountryAdmin(ImportExportModelAdmin):
    list_display = ["code", "name"]
    search_fields = ["code", "name"]


@admin.register(models.Zone)
class ZoneAdmin(ImportExportModelAdmin):
    list_display = ["code", "name"]
    search_fields = ["code", "name"]


@admin.register(models.SalesUpdate)
class SalesUpdateAdmin(ImportExportModelAdmin):
    list_display = ["code_catalog", "cod_IATA_aer_arr", "id_flight"]
    search_fields = ["code_catalog", "cod_IATA_aer_arr", "id_flight"]
    list_filter = ["departure_date", "booking_date"]
    autocomplete_fields = ["dest_zone", "dest_country"]
