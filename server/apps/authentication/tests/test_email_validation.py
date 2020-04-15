import pytest
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from mixer.backend.django import mixer

from ..commands import validate_user_email
from ..exceptions import InvalidTokenError, UserNotFoundError
from ..helpers.user_helper import encode_user_pk
from ..models import User
from ..tokens import user_token_generator


@pytest.mark.django_db
class TestEmailValidation:
    def test_validate_invalid_user_id_raise_error(self):
        with pytest.raises(UserNotFoundError):
            user = mixer.blend(
                User,
                username="u1_validate@test.it",
                email="u1_validate@test.it",
                password="pwd",
            )
            token = user_token_generator.make_token(user)

            validate_user_email(urlsafe_base64_encode(force_bytes(100000)), token)

    def test_validate_invalid_token_raise_error(self):
        with pytest.raises(InvalidTokenError):
            user = mixer.blend(
                User,
                username="u2_validate@test.it",
                email="u2_validate@test.it",
                password="pwd",
            )
            encoded_uid = encode_user_pk(user)
            token = user_token_generator.make_token(user)

            validate_user_email(encoded_uid, token + "xxx")  # noqa

    def test_validate_email_address(self):
        user = mixer.blend(
            User,
            username="user_to_validate@test.it",
            email="user_to_validate@test.it",
            password="pwd",
        )
        encoded_uid = encode_user_pk(user)
        token = user_token_generator.make_token(user)

        assert user.email_confirmed is False

        user = validate_user_email(encoded_uid, token)

        assert user.email_confirmed
