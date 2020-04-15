import pytest
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from mixer.backend.django import mixer

from ..commands import reset_password
from ..exceptions import InvalidTokenError, UserNotFoundError
from ..helpers.user_helper import encode_user_pk
from ..models import User
from ..tokens import user_token_generator


@pytest.mark.django_db
class TestPasswordReset:
    def test_reset_pwd_invalid_user_id_raise_error(self):
        with pytest.raises(UserNotFoundError):
            user = mixer.blend(
                User,
                username="u1_pwd_reset@test.it",
                email="u1_pwd_reset@test.it",
                password="pwd",
            )
            token = user_token_generator.make_token(user)

            reset_password(urlsafe_base64_encode(force_bytes(100000)), token, "newpwd")

    def test_reset_pwd_invalid_token_raise_error(self):
        with pytest.raises(InvalidTokenError):
            user = mixer.blend(
                User,
                username="u2_pwd_reset@test.it",
                email="u2_pwd_reset@test.it",
                password="pwd",
            )
            encoded_uid = encode_user_pk(user)
            token = user_token_generator.make_token(user)

            reset_password(encoded_uid, token + "xxx", "newpwd")  # noqa

    def test_reset_pwd(self):
        user = mixer.blend(
            User,
            username="u3_pwd_reset@test.it",
            email="u3_pwd_reset@test.it",
            password="pwd",
        )
        encoded_uid = encode_user_pk(user)
        token = user_token_generator.make_token(user)

        previous_pwd_hash = user.password

        user = reset_password(encoded_uid, token, "newpwd")

        assert user.password != previous_pwd_hash
