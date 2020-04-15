from django_hint import QueryType
from graphene import relay
from graphene_django import DjangoObjectType
from graphql_jwt.decorators import login_required

from . import models


class CompanyUserMixin:
    company_user_fld: str

    @classmethod
    @login_required
    def get_queryset(cls, queryset: QueryType, info):
        user = info.context.user
        if user.is_superuser:
            return queryset
        if user.is_b2b_user:
            if cls.company_user_fld:
                return queryset.filter(**{f"{cls.company_user_fld}__user": user})

        return queryset.none()


class CompanyNode(CompanyUserMixin, DjangoObjectType):
    company_user_fld = "companyuser"

    class Meta:
        model = models.Company
        filter_fields = ["name", "company_id"]
        interfaces = (relay.Node,)


class CompanyDestinationNode(CompanyUserMixin, DjangoObjectType):
    company_user_fld = "company__companyuser"

    class Meta:
        model = models.CompanyDestination
        filter_fields = ["name", "code", "parent", "company_id"]
        interfaces = (relay.Node,)


class CompanyHotelNode(CompanyUserMixin, DjangoObjectType):
    company_user_fld = "location__company__companyuser"

    class Meta:
        model = models.CompanyHotel
        filter_fields = ["name", "code", "location", "location__company_id"]
        interfaces = (relay.Node,)


class CompanyAirportNode(CompanyUserMixin, DjangoObjectType):
    company_user_fld = "location__company__companyuser"

    class Meta:
        model = models.CompanyAirport
        filter_fields = ["name", "code", "location", "location__company_id"]
        interfaces = (relay.Node,)


class CompanyRoomNode(CompanyUserMixin, DjangoObjectType):
    class Meta:
        model = models.CompanyRoomType
        filter_fields = ["name", "code", "company", "category"]
        interfaces = (relay.Node,)
