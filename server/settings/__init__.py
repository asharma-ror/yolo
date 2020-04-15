# -*- coding: utf-8 -*-

"""
This is a django-split-settings main file.

For more information read this:
https://github.com/sobolevn/django-split-settings

To change settings file:
`DJANGO_ENV=production python manage.py runserver`
"""


from split_settings.tools import include, optional

from server.conf import CONFIG

base_settings = [
    "components/common.py",
    "components/logging.py",
    "components/caches.py",
    "components/huey.py",
    # You can even use glob:
    # 'components/*.py'
    # Select the right env:
    "environments/{0}.py".format(CONFIG.DJANGO_ENV),
    # Optionally override some settings:
    optional("environments/local.py"),
]

# Include settings:
include(*base_settings)
