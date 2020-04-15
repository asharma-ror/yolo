from django.template.loader import render_to_string

from server.apps.authentication.exceptions import UserNotFoundError
from server.apps.authentication.helpers.email_helper import create_password_reset_url
from server.apps.authentication.queries.user import get_user


def send_password_reset_email(username: str, password_reset_base_url: str):
    user = get_user(username)
    if not user:
        raise UserNotFoundError()

    subject = "Reset Password"
    message = render_to_string(
        "password_reset_email.html",
        {
            "user": user,
            "password_reset_url": create_password_reset_url(
                user, password_reset_base_url
            ),
        },
    )
    user.email_user(subject, message)
