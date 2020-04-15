from django.conf import settings
from itsdangerous import BadTimeSignature, SignatureExpired, URLSafeTimedSerializer


class UserTokenGenerator:

    _token_max_age_seconds = 3600
    _serializer = URLSafeTimedSerializer(settings.SECRET_KEY)

    def make_token(self, user) -> str:
        return self._serializer.dumps(user.pk)

    def check_token(self, user, token) -> bool:

        try:
            uid = self._serializer.loads(token, max_age=self._token_max_age_seconds)
            return uid == user.pk
        except (SignatureExpired, BadTimeSignature):
            return False


user_token_generator = UserTokenGenerator()
