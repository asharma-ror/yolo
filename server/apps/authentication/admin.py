from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User

UserAdmin.list_display += ("birthday",)  # type: ignore
UserAdmin.list_filter += ("birthday",)  # type: ignore

admin.site.register(User, UserAdmin)
