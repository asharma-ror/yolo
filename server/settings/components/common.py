# -*- coding: utf-8 -*-

"""
Django settings for server project.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their config, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""


from typing import Dict, List, Tuple, Union

import sentry_sdk
from django.utils.translation import gettext_lazy as _
from sentry_sdk.integrations.django import DjangoIntegration

from server.conf import CONFIG
from server.settings.components import BASE_DIR

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

SECRET_KEY = CONFIG.DJANGO_SECRET_KEY

# Application definition:

INSTALLED_APPS: Tuple[str, ...] = (
    # Default django apps:
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # django-admin:
    "django.contrib.admin",
    "django.contrib.admindocs",
    # Security:
    "axes",
    # Health checks:
    # You may want to enable other checks as well,
    # see: https://github.com/KristianOellegaard/django-health-check
    "health_check",
    "health_check.db",
    "health_check.cache",
    "health_check.storage",
    "django_extensions",  # django extension commands
    "django_admin_listfilter_dropdown",
    "bulma",  # to provide account templates and base-css
    "import_export",  # for import-export admin integration
    "graphene_django",
    "corsheaders",
    "huey.contrib.djhuey",  # job-queue
    # Your apps go here:
    "server.apps.authentication.apps.AuthenticationConfig",
    "server.apps.main",
    "server.apps.b2business.apps.B2BusinessConfig",
    "server.apps.b2consumer.apps.B2ConsumerConfig",
    "server.apps.companies.apps.CompaniesConfig",
    "server.apps.products.apps.ProductsConfig",
    "server.apps.orders.apps.OrdersConfig",
    "server.apps.travels.apps.TravelsConfig",
    "social_django",  # django social auth
)

MIDDLEWARE: Tuple[str, ...] = (
    # Django:
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django_feature_policy.FeaturePolicyMiddleware",  # django-feature-policy
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # Axes:
    "axes.middleware.AxesMiddleware",
)
GRAPHENE = {
    "SCHEMA": "server.schema.schema",
    "SCHEMA_OUTPUT": "schemas/backend_graphql_schema.json",
    "SCHEMA_INDENT": 2,
    "MIDDLEWARE": ["graphql_jwt.middleware.JSONWebTokenMiddleware"],
}
ROOT_URLCONF = "server.urls"

WSGI_APPLICATION = "server.wsgi.application"

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql_psycopg2",
        "NAME": CONFIG.POSTGRES_DB,
        "USER": CONFIG.POSTGRES_USER,
        "PASSWORD": CONFIG.POSTGRES_PASSWORD,
        "HOST": CONFIG.DJANGO_DATABASE_HOST,
        "PORT": CONFIG.DJANGO_DATABASE_PORT,
        "CONN_MAX_AGE": CONFIG.CONN_MAX_AGE,
        "OPTIONS": {"connect_timeout": 10},
    }
}

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

USE_I18N = True
USE_L10N = True

LANGUAGES = (("en", _("English")), ("it", _("Italian")))
LOCALE_PATHS = ("locale/",)

USE_TZ = True
TIME_ZONE = "UTC"

# localization
LANGUAGE_CODE = "it"
USE_THOUSAND_SEPARATOR = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"

STATICFILES_FINDERS = (
    "django.contrib.staticfiles.finders.FileSystemFinder",
    "django.contrib.staticfiles.finders.AppDirectoriesFinder",
)

# Templates
# https://docs.djangoproject.com/en/2.2/ref/templates/api

TEMPLATES = [
    {
        "APP_DIRS": True,
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [
            # Contains plain text templates, like `robots.txt`:
            BASE_DIR.joinpath("server", "templates")
        ],
        "OPTIONS": {
            "context_processors": [
                # Default template context processors:
                "django.contrib.auth.context_processors.auth",
                "django.template.context_processors.debug",
                "django.template.context_processors.i18n",
                "django.template.context_processors.media",
                "django.contrib.messages.context_processors.messages",
                "django.template.context_processors.request",
            ]
        },
    }
]

# Media files
# Media-root is commonly changed in production
# (see development.py and production.py).

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR.joinpath("media")

# Django authentication system
# https://docs.djangoproject.com/en/2.2/topics/auth/
AUTH_USER_MODEL = "authentication.User"
AUTHENTICATION_BACKENDS = (
    "social_core.backends.google.GoogleOAuth2",
    "social_core.backends.facebook.FacebookOAuth2",
    "axes.backends.AxesBackend",
    "graphql_jwt.backends.JSONWebTokenBackend",
    "django.contrib.auth.backends.ModelBackend",
)

SOCIAL_AUTH_PIPELINE = [
    # Get the information we can about the user and return it in a simple
    # format to create the user instance later. On some cases the details are
    # already part of the auth response from the provider, but sometimes this
    # could hit a provider API.
    "social_core.pipeline.social_auth.social_details",
    # Get the social uid from whichever service we're authing thru. The uid is
    # the unique identifier of the given user in the provider.
    "social_core.pipeline.social_auth.social_uid",
    # Verifies that the current auth process is valid within the current
    # project, this is where emails and domains whitelists are applied (if
    # defined).
    "social_core.pipeline.social_auth.auth_allowed",
    # Checks if the current social-account is already associated in the site.
    "social_core.pipeline.social_auth.social_user",
    # Make up a username for this person, appends a random string at the end if
    # there's any collision.
    "social_core.pipeline.user.get_username",
    # Send a validation email to the user to verify its email address.
    # Disabled by default.
    # 'social_core.pipeline.mail.mail_validation',
    # Associates the current social details with another user account with
    # a similar email address. Disabled by default.
    # 'social_core.pipeline.social_auth.associate_by_email',
    # Create a user account if we haven't found one yet.
    "social_core.pipeline.user.create_user",
    # Create the record that associates the social account with the user.
    "social_core.pipeline.social_auth.associate_user",
    # Populate the extra_data field in the social record with the values
    # specified by settings (and the default ones like access_token, etc).
    "social_core.pipeline.social_auth.load_extra_data",
    # Update the user record with any changed info from the auth service.
    "social_core.pipeline.user.user_details",
]

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = CONFIG.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = CONFIG.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET
SOCIAL_AUTH_FACEBOOK_KEY = CONFIG.SOCIAL_AUTH_FACEBOOK_KEY
SOCIAL_AUTH_FACEBOOK_SECRET = CONFIG.SOCIAL_AUTH_FACEBOOK_SECRET

PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
    "django.contrib.auth.hashers.BCryptPasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.Argon2PasswordHasher",
]
PASSWORD_RESET_TIMEOUT = 3600

# Security
# https://docs.djangoproject.com/en/2.2/topics/security/

SESSION_COOKIE_HTTPONLY = True
CSRF_COOKIE_HTTPONLY = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_BROWSER_XSS_FILTER = True

X_FRAME_OPTIONS = "DENY"

# https://github.com/adamchainz/django-feature-policy#setting
FEATURE_POLICY: Dict[str, Union[str, List[str]]] = {}  # noqa: TAE002, WPS234

# Email settings
EMAIL_USE_TLS = CONFIG.EMAIL_USE_TLS
EMAIL_HOST = CONFIG.EMAIL_HOST
EMAIL_HOST_USER = CONFIG.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = CONFIG.EMAIL_HOST_PASSWORD
EMAIL_PORT = CONFIG.EMAIL_PORT
EMAIL_TIMEOUT = 5
EMAIL_NOTIFICATIONS_SENDER = CONFIG.EMAIL_NOTIFICATIONS_SENDER

# CORS
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST: List[str] = []

# Stripe settings
STRIPE_SECRET_KEY = CONFIG.STRIPE_SECRET_KEY
STRIPE_PUBLIC_KEY = CONFIG.STRIPE_PUBLIC_KEY
STRIPE_ENDPOINT_SECRET = CONFIG.STRIPE_ENDPOINT_SECRET

PAYPAL_CLIENT_ID = CONFIG.PAYPAL_CLIENT_ID
PAYPAL_CLIENT_SECRET = CONFIG.PAYPAL_CLIENT_SECRET

LOGIN_REDIRECT_URL = "main:index"
LOGOUT_REDIRECT_URL = "main:index"

TESTING = False

# Sentry integration
if CONFIG.SENTRY_DSN:
    sentry_sdk.init(
        dsn=CONFIG.SENTRY_DSN,
        integrations=[DjangoIntegration()],
        # If you wish to associate users to errors (assuming you are using
        # django.contrib.auth) you may enable sending PII data.
        send_default_pii=True,
        environment=CONFIG.DJANGO_ENV,
    )
