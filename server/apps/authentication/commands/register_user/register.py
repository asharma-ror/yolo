from datetime import date

from django.template.loader import render_to_string

from server.apps.authentication.exceptions import (
    InvalidUserAgeError,
    UserAlreadyRegisteredError,
)
from server.apps.authentication.helpers.email_helper import create_email_activation_url
from server.apps.authentication.queries.user import get_user

from ...helpers.date_helper import calculate_age
from ...models import User

MIN_USER_AGE = 18


def register_user(
    first_name, last_name, birthday, password, email, email_validation_base_url
) -> "User":

    _verify_user_age(birthday)
    _check_can_create_user(email)

    user = _ensure_user(email)
    user.first_name = first_name
    user.last_name = last_name
    user.birthday = birthday
    user.set_password(password)
    user.save()

    _send_activation_email(user, email_validation_base_url)

    return user


def _verify_user_age(birthday: date):
    if calculate_age(birthday) < MIN_USER_AGE:
        raise InvalidUserAgeError()


def _ensure_user(username: str) -> User:
    user = get_user(username)
    return user if user else User.objects.create_user(username=username, email=username)


def _check_can_create_user(username: str) -> None:
    user = get_user(username)
    if not user:
        return

    if user.email_confirmed:
        raise UserAlreadyRegisteredError()


def _send_activation_email(user, email_validation_base_url: str) -> None:
    subject = "Completa la registrazione"
    message = render_to_string(
        "account_activation_email.html",
        {
            "user": user,
            "activation_url": create_email_activation_url(
                user, email_validation_base_url
            ),
        },
    )
    user.email_user(subject, message)
