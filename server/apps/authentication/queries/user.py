from typing import Optional

from ..models import User


def get_user(username) -> Optional[User]:
    return User.objects.filter(username__iexact=username).first()
