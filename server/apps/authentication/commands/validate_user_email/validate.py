from server.apps.authentication.exceptions import InvalidTokenError, UserNotFoundError
from server.apps.authentication.helpers.user_helper import (
    decode_user_pk,
    verify_user_token,
)

from ...models import User


def validate_user_email(uidb64: str, token: str) -> User:
    uid = decode_user_pk(uidb64)
    user = User.objects.filter(pk=uid).first()
    if not user:
        raise UserNotFoundError()

    if not verify_user_token(user, token):
        raise InvalidTokenError()

    user.is_active = True
    user.email_confirmed = True
    user.save()
    return user
