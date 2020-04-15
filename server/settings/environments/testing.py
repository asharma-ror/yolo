# -*- coding: utf-8 -*-

"""
This file contains all the settings that is used when tests run
"""
import logging

from huey import MemoryHuey

DEBUG = False  # tests should be run in this mode

# for convenience
LANGUAGE_CODE = "en"
TEMPLATE_DEBUG = False

TESTING = True

STATICFILES_STORAGE = (
    "django.contrib.staticfiles.storage.StaticFilesStorage"  # without manifest
)

# turn off logger for faster test execution
logging.disable(logging.CRITICAL)

# # speedup integrations tests by removing unneeded middlewares
# for md in (
#     "django.middleware.security.SecurityMiddleware",
#     "whitenoise.middleware.WhiteNoiseMiddleware",
#     "django.middleware.common.CommonMiddleware",
#     "django.middleware.clickjacking.XFrameOptionsMiddleware",
#     "django.contrib.admindocs.middleware.XViewMiddleware",
#     "django.middleware.http.ConditionalGetMiddleware",
# ):
#     MIDDLEWARE.remove(md)

EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

HUEY = MemoryHuey(immediate=True)
