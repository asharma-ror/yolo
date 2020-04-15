import pytest
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from mixer.backend.django import mixer

from ..commands import send_password_reset_email
from ..exceptions import UserNotFoundError
from ..models import User
from ..tokens import user_token_generator


@pytest.mark.django_db
class TestSendPasswordResetEmail:
    def test_send_password_reset_to_non_existing_user_raise_error(self, mailoutbox):
        with pytest.raises(UserNotFoundError):
            user = mixer.blend(
                User,
                username="u1_A_pwd_reset@test.it",
                email="u1_A_pwd_reset@test.it",
                password="pwd",
            )
            token = user_token_generator.make_token(user)
            send_password_reset_email(urlsafe_base64_encode(force_bytes(100000)), token)

        assert len(mailoutbox) == 0

    def test_send_password_reset_email(self, mailoutbox):
        user = mixer.blend(
            User,
            username="u1_B_pwd_reset@test.it",
            email="u1_B_pwd_reset@test.it",
            password="pwd",
        )

        token = user_token_generator.make_token(user)
        send_password_reset_email("u1_B_pwd_reset@test.it", token)

        assert len(mailoutbox) == 1
        assert list(mailoutbox[0].to) == ["u1_B_pwd_reset@test.it"]
