from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode

from server.apps.authentication.tokens import user_token_generator

from ..models import User


def encode_user_pk(user: User) -> str:
    return urlsafe_base64_encode(force_bytes(user.pk))


def decode_user_pk(uidb64: str) -> str:
    return force_str(urlsafe_base64_decode(uidb64))


def create_user_token(user: User) -> str:
    return user_token_generator.make_token(user)


def verify_user_token(user: User, token: str) -> bool:
    return user_token_generator.check_token(user, token)
