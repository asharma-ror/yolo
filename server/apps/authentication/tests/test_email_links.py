from urllib.parse import parse_qs, urlparse

import pytest
from mixer.backend.django import mixer

from server.apps.authentication.helpers.email_helper import (
    create_email_activation_url,
    create_password_reset_url,
)
from server.apps.authentication.helpers.user_helper import (
    decode_user_pk,
    verify_user_token,
)


@pytest.fixture
def user(django_user_model):
    return mixer.blend(django_user_model)


class TestEmailValidation:
    def test_create_email_activation_url(self, user):
        url = create_email_activation_url(user, "https://test.wigo/verify-email")
        parsed_url = urlparse(url)
        parsed_query = parse_qs(parsed_url.query)
        assert parsed_url.hostname == "test.wigo"
        assert parsed_url.path == "/verify-email"
        assert int(decode_user_pk(parsed_query.get("u")[0])) == user.pk
        assert verify_user_token(user, parsed_query.get("t")[0])

    def test_create_password_reset_url(self, user):
        url = create_password_reset_url(user, "https://test.wigo/reset-password")
        parsed_url = urlparse(url)
        parsed_query = parse_qs(parsed_url.query)
        assert parsed_url.hostname == "test.wigo"
        assert parsed_url.path == "/reset-password"
        assert int(decode_user_pk(parsed_query.get("u")[0])) == user.pk
        assert verify_user_token(user, parsed_query.get("t")[0])
