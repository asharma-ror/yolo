"""
it is replacement for .env.template file. It forces any new variables to be added to the class.

Create .env file using

dynamic-conf server/conf.py ENV=development DJANGO_SECRET_KEY=<secret>')
"""

from dynamic_conf import REQUIRED, Config


class CONFIG(Config):
    _file_name = ".env"
    _dump = True
    # === General ===
    DOMAIN_NAME = "yolo.g1.dvlab.in"
    TLS_EMAIL = "webmaster@myapp.com"

    # === Django ===
    # Generate yours with:
    # python3 -c 'import secrets; print(secrets.token_hex(50))'
    DJANGO_SECRET_KEY: str = REQUIRED
    DJANGO_ENV = "development"

    # === Database ===

    # These variables are special, since they are consumed
    # by both django and postgres docker image.
    # Cannot be renamed if you use postgres in docker.
    # See: https://hub.docker.com/_/postgres

    POSTGRES_DB = "yolo"
    POSTGRES_USER = "yolo"
    POSTGRES_PASSWORD = ""

    # Used only by django:
    DJANGO_DATABASE_HOST = "localhost"
    DJANGO_DATABASE_PORT: int = 5432
    CONN_MAX_AGE: int = 60

    # used when interacting with aws services
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""

    # === Email ===
    EMAIL_USE_TLS: bool = True
    EMAIL_HOST = "localhost"
    EMAIL_HOST_USER: str = "email-user"
    EMAIL_HOST_PASSWORD: str = ""
    EMAIL_PORT: int = 25
    EMAIL_NOTIFICATIONS_SENDER = "noreply@whereigo.it"
    USE_CONSOLE_EMAIL_BACKEND: bool = False

    # === Stripe ===
    STRIPE_SECRET_KEY: str = ""
    STRIPE_PUBLIC_KEY: str = ""
    STRIPE_ENDPOINT_SECRET: str = ""

    # === PayPal ===
    PAYPAL_CLIENT_ID: str = ""
    PAYPAL_CLIENT_SECRET: str = ""

    # === Redis - Job queue integration===
    REDIS_HOST = "localhost"
    REDIS_PORT = 6379

    # ==== open-office ===
    SOFFICE_HOST = "localhost"

    # mongodb - admin
    ME_CONFIG_BASICAUTH_USERNAME = "admin"
    ME_CONFIG_BASICAUTH_PASSWORD: str

    # sentry
    SENTRY_DSN: str = ""

    # google
    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = ""
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = ""

    # facebook
    SOCIAL_AUTH_FACEBOOK_KEY = ""
    SOCIAL_AUTH_FACEBOOK_SECRET = ""
