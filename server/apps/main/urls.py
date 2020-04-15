# -*- coding: utf-8 -*-

from django.urls import path

from server.apps.main import views

# Place your URLs here:

app_name = "main"

urlpatterns = [
    path("", views.index, name="index"),
    path("sns", views.S3SNSsubView.as_view(), name="sns"),
    path("upload", views.AjaxUploadView.as_view(), name="upload"),
]
