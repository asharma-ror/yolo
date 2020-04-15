from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.functional import cached_property


class User(AbstractUser):
    """Custom User model for easy extension any new functionality.

    Types:
        1. B2B User: User records having CompanyUser defined
    """

    email_confirmed = models.BooleanField(default=False)
    birthday = models.DateField(null=True, blank=True)

    @cached_property
    def is_b2b_user(self):
        return self.companyuser_set.exists()  # type: ignore
