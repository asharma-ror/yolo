from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.Company)
class CompanyAdmin(ImportExportModelAdmin):
    list_display = ["name"]
    search_fields = ["name"]


@admin.register(models.CompanyDestination)
class DestinationAdmin(ImportExportModelAdmin):
    list_display = ["name"]
    list_filter = ["created", "modified"]
    search_fields = ["name"]
    autocomplete_fields = ["company"]
