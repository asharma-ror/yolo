# -*- coding: utf-8 -*-

"""
This file contains all the settings used in production.

This file is required and if development.py is present these
values are overridden.
"""

from server.conf import CONFIG

# Production flags:

DEBUG = False

ALLOWED_HOSTS = [CONFIG.DOMAIN_NAME, "localhost", "127.0.0.1", "web"]


# Staticfiles
# https://docs.djangoproject.com/en/2.2/ref/contrib/staticfiles/

# Adding STATIC_ROOT to collect static files via 'collectstatic'
STATIC_ROOT = "/var/www/django/static"

STATICFILES_STORAGE = (
    # This is a string, not a tuple,
    # but it does not fit into 80 characters rule.
    "django.contrib.staticfiles.storage.ManifestStaticFilesStorage"
)


# Mediafiles
MEDIA_ROOT = "/var/www/django/media"


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

_PASS = "django.contrib.auth.password_validation"  # noqa: S105
AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "{0}.UserAttributeSimilarityValidator".format(_PASS)},
    {"NAME": "{0}.MinimumLengthValidator".format(_PASS)},
    {"NAME": "{0}.CommonPasswordValidator".format(_PASS)},
    {"NAME": "{0}.NumericPasswordValidator".format(_PASS)},
]


# Security
# https://docs.djangoproject.com/en/2.2/topics/security/

SECURE_HSTS_SECONDS = 31536000  # the same as Caddy has
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# with the current config behind caddy, the ssl redicrect is unnecessary.
SECURE_SSL_REDIRECT = False
SILENCED_SYSTEM_CHECKS = ["security.W008"]

SECURE_REFERRER_POLICY = "origin"

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CORS_ORIGIN_WHITELIST = [
    f"https://b2c.{CONFIG.DOMAIN_NAME}",
    f"http://b2b.{CONFIG.DOMAIN_NAME}",
]
