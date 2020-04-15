from server.apps.authentication.exceptions import InvalidTokenError, UserNotFoundError
from server.apps.authentication.helpers.user_helper import (
    decode_user_pk,
    verify_user_token,
)

from ...models import User


def reset_password(uidb64: str, token: str, new_password: str) -> User:
    uid = decode_user_pk(uidb64)
    user = User.objects.filter(pk=uid).first()
    if not user:
        raise UserNotFoundError()

    if not verify_user_token(user, token):
        raise InvalidTokenError()

    user.set_password(new_password)
    user.save()

    return user
