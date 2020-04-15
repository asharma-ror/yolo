from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

from . import models


@admin.register(models.Quotation)
class QuotationAdmin(ImportExportModelAdmin):
    list_display = ["quotation_id", "status", "created", "modified"]
    search_fields = ["quotation_id", "status", "created", "modified"]


@admin.register(models.QuotationRoom)
class QuotationRoomAdmin(ImportExportModelAdmin):
    list_display = ["quotation", "optioned", "room_index", "created", "modified"]
    search_fields = ["quotation", "optioned", "room_index", "created", "modified"]


@admin.register(models.QuotationService)
class QuotationServiceAdmin(ImportExportModelAdmin):
    list_display = ["room", "name", "created", "modified"]
    search_fields = ["room", "name", "created", "modified"]


@admin.register(models.Payment)
class PaymentAdmin(ImportExportModelAdmin):
    list_display = ["payment_session_id", "created", "modified"]
    search_fields = ["payment_session_id", "created", "modified"]


@admin.register(models.PaymentAttempt)
class PaymentAttemptAdmin(ImportExportModelAdmin):
    list_display = ["payment_session_id", "quotation_id", "created", "modified"]
    search_fields = ["payment_session_id", "quotation_id", "created", "modified"]


@admin.register(models.Reservation)
class ReservationAdmin(ImportExportModelAdmin):
    list_display = ["reservation_id", "quotation", "created", "modified"]
    search_fields = ["reservation_id", "quotation", "created", "modified"]


@admin.register(models.Customer)
class CustomerAdmin(ImportExportModelAdmin):
    list_display = ["email", "name", "surname", "created", "modified"]
    search_fields = ["email", "name", "surname", "created", "modified"]


@admin.register(models.DiscountTicket)
class DiscountTicketAdmin(ImportExportModelAdmin):
    list_display = ["code", "amount", "reservation_id", "created", "modified"]
    search_fields = ["code", "amount", "reservation_id", "created", "modified"]
