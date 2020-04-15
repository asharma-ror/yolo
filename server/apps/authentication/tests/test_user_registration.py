from datetime import date

import pytest
from dateutil.relativedelta import relativedelta
from mixer.backend.django import mixer

from ..commands import register_user
from ..exceptions import InvalidUserAgeError, UserAlreadyRegisteredError
from ..models import User

EMAIL_VERIFICATION_BASE_URL = "http://testing/account/verify-email"


@pytest.fixture
def today():
    return date.today()


@pytest.mark.django_db
class TestUserRegistration:
    def test_user_already_registered_with_confirmed_email_raise_error(self, mailoutbox):
        with pytest.raises(UserAlreadyRegisteredError):
            user = mixer.blend(
                User,
                username="already_registered_user@test.it",
                email="already_registered_user@test.it",
                password="pwd",
            )
            user.email_confirmed = True
            user.save()

            register_user(
                first_name="simone",
                last_name="sabba",
                birthday=date(1985, 4, 24),
                password="prova",
                email="already_registered_user@test.it",
                email_validation_base_url=EMAIL_VERIFICATION_BASE_URL,
            )

        assert len(mailoutbox) == 0

    def test_new_user_with_invalid_age_raise_error(self, mailoutbox, today):
        with pytest.raises(InvalidUserAgeError):
            register_user(
                first_name="simone",
                last_name="sabba",
                birthday=today,
                password="prova",
                email="already_registered_user@test.it",
                email_validation_base_url=EMAIL_VERIFICATION_BASE_URL,
            )

        assert len(mailoutbox) == 0

    def test_new_user_with_edge_age_less_one_day_raise_error(self, mailoutbox, today):
        with pytest.raises(InvalidUserAgeError):
            register_user(
                first_name="simone",
                last_name="sabba",
                birthday=today - relativedelta(years=18) + relativedelta(days=1),
                password="prova",
                email="already_registered_user@test.it",
                email_validation_base_url=EMAIL_VERIFICATION_BASE_URL,
            )

        assert len(mailoutbox) == 0

    def test_new_user_with_edge_age_works(self, mailoutbox, today):
        user = register_user(
            first_name="simone",
            last_name="sabba",
            birthday=today - relativedelta(years=18),
            password="prova",
            email="eighteen_user@test.it",
            email_validation_base_url=EMAIL_VERIFICATION_BASE_URL,
        )

        assert user.first_name == "simone"
        assert user.last_name == "sabba"
        assert user.birthday == today - relativedelta(years=18)
        assert user.email == "eighteen_user@test.it"
        assert user.email_confirmed is False

        assert len(mailoutbox) == 1
        assert list(mailoutbox[0].to) == ["eighteen_user@test.it"]

    def test_user_already_registered_with_unconfirmed_email(self, mailoutbox):
        mixer.blend(
            User,
            username="not_confirmed_user@test.it",
            email="not_confirmed_user@test.it",
            password="pwd",
        )

        user = register_user(
            first_name="simone",
            last_name="sabba",
            birthday=date(1985, 4, 24),
            password="prova",
            email="not_confirmed_user@test.it",
            email_validation_base_url=EMAIL_VERIFICATION_BASE_URL,
        )

        assert user.first_name == "simone"
        assert user.last_name == "sabba"
        assert user.birthday == date(1985, 4, 24)
        assert user.email == "not_confirmed_user@test.it"
        assert user.email_confirmed is False

        assert len(mailoutbox) == 1
        assert list(mailoutbox[0].to) == ["not_confirmed_user@test.it"]

    def test_new_user_registration(self, mailoutbox):
        user = register_user(
            first_name="simone",
            last_name="sabba",
            birthday=date(1985, 4, 24),
            password="prova",
            email="new_user@test.it",
            email_validation_base_url=EMAIL_VERIFICATION_BASE_URL,
        )

        assert user.first_name == "simone"
        assert user.last_name == "sabba"
        assert user.birthday == date(1985, 4, 24)
        assert user.email == "new_user@test.it"
        assert user.email_confirmed is False

        assert len(mailoutbox) == 1
        assert list(mailoutbox[0].to) == ["new_user@test.it"]
