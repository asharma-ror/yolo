import graphene
import graphql_jwt
import graphql_social_auth
from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType

from server.apps.authentication.commands import (
    register_user,
    reset_password,
    send_password_reset_email,
    validate_user_email,
)
from server.apps.authentication.exceptions import (
    InvalidUserAgeError,
    UserAlreadyRegisteredError,
)


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class ValidationError(graphene.ObjectType):
    type = graphene.String()


class RegisterUser(graphene.Mutation):
    user = graphene.Field(UserType)
    error = graphene.Field(ValidationError)

    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)
        birthday = graphene.Date(required=True)
        password = graphene.String(required=True)
        email = graphene.String(required=True)
        email_validation_base_url = graphene.String(required=True)

    def mutate(
        self,
        info,
        first_name,
        last_name,
        birthday,
        password,
        email,
        email_validation_base_url,
    ):
        try:
            user = register_user(
                first_name=first_name,
                last_name=last_name,
                birthday=birthday,
                password=password,
                email=email,
                email_validation_base_url=email_validation_base_url,
            )
            return RegisterUser(user=user)
        except InvalidUserAgeError:
            return RegisterUser(
                user=None, error=ValidationError(type=InvalidUserAgeError.__name__),
            )
        except UserAlreadyRegisteredError:
            return RegisterUser(
                user=None,
                error=ValidationError(type=UserAlreadyRegisteredError.__name__),
            )


class VerifyEmailAddress(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        uidb64 = graphene.String(required=True)
        token = graphene.String(required=True)

    def mutate(self, info, uidb64, token):
        validate_user_email(uidb64=uidb64, token=token)
        return VerifyEmailAddress(ok=True)


class SendPasswordResetEmail(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        email = graphene.String(required=True)
        password_reset_base_url = graphene.String(required=True)

    def mutate(self, _, email, password_reset_base_url):
        send_password_reset_email(
            username=email, password_reset_base_url=password_reset_base_url,
        )
        return SendPasswordResetEmail(ok=True)


class ResetPassword(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        uidb64 = graphene.String(required=True)
        token = graphene.String(required=True)
        new_password = graphene.String(required=True)

    def mutate(self, info, uidb64, token, new_password):
        reset_password(
            uidb64=uidb64, token=token, new_password=new_password,
        )
        return ResetPassword(ok=True)


class Mutation(graphene.ObjectType):
    register_user = RegisterUser.Field()
    verify_email_address = VerifyEmailAddress.Field()
    send_password_reset_email = SendPasswordResetEmail.Field()
    reset_password = ResetPassword.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    social_auth = graphql_social_auth.SocialAuthJWT.Field()
