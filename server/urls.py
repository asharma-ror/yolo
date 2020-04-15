# -*- coding: utf-8 -*-

"""
Main URL mapping configuration file.

Include other URLConfs from external apps using method `include()`.

It is also a good practice to keep a single URL to the root index page.

This examples uses Django's default media
files serving technique in development.
"""

from django.conf import settings
from django.contrib import admin
from django.contrib.admindocs import urls as admindocs_urls
from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView
from graphene_django.views import GraphQLView
from health_check import urls as health_urls

from server.apps.main import urls as main_urls

admin.autodiscover()

urlpatterns = [
    # Apps:
    path("", include(main_urls, namespace="main")),
    # Health checks:
    path("health/", include(health_urls)),  # noqa: DJ05
    # django-admin:
    path("admin/doc/", include(admindocs_urls)),  # noqa: DJ05
    path("admin/", admin.site.urls),
    # user authentication
    path("accounts/", include("django.contrib.auth.urls")),
    # Text and xml static files:
    path(
        "robots.txt",
        TemplateView.as_view(template_name="txt/robots.txt", content_type="text/plain"),
    ),
    path(
        "humans.txt",
        TemplateView.as_view(template_name="txt/humans.txt", content_type="text/plain"),
    ),
    path("graphql/", csrf_exempt(GraphQLView.as_view(graphiql=True))),
]

if settings.DEBUG:  # pragma: no cover
    import debug_toolbar  # noqa: Z435, WPS433
    from django.conf.urls.static import static  # noqa: Z435, WPS433

    urlpatterns = (
        [
            # URLs specific only to django-debug-toolbar:
            path("__debug__/", include(debug_toolbar.urls))  # noqa: DJ05
        ]
        + urlpatterns
        + static(
            # Serving media files in development only:
            settings.MEDIA_URL,
            document_root=settings.MEDIA_ROOT,
        )
    )
