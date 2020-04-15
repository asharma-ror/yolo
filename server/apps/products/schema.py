import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from . import models
from .models import DepartureOptionType
from .queries.availability import (
    get_all_product_availabilities,
    get_calendar_products_availability,
)
from .queries.product import get_product


class ProductNode(DjangoObjectType):
    class Meta:
        model = models.Product
        interfaces = (relay.Node,)
        filter_fields = ()
        exclude = ("created", "modified")


class DestinationNode(DjangoObjectType):
    class Meta:
        model = models.ProductDestination
        interfaces = (relay.Node,)
        filter_fields = ()
        exclude = ("created", "modified")

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.filter(searchable=True)


class ProductAllotmentNode(DjangoObjectType):
    class Meta:
        model = models.ProductAllotment
        interfaces = (relay.Node,)
        filter_fields = ()


class DepartureOption(DjangoObjectType):
    class Meta:
        model = models.DepartureOption
        interfaces = (relay.Node,)
        filter_fields = ()


class ProductAvailabilityNode(DjangoObjectType):
    class Meta:
        model = models.ProductAvailability
        interfaces = (relay.Node,)
        filter_fields = {
            "product_id": ["exact"],
            "tot_adults": ["exact"],
            "start_date_from": ["exact"],
            "quantity_available": ["exact", "gte"],
        }
        exclude = (
            "created",
            "modified",
            "quantity_available",
            "quantity_total",
            "master_allotment_id",
            "allotments_id",
        )

    departure_option_type = graphene.String()

    def resolve_price_type(self, info):
        return str(DepartureOptionType.get_name(self.departure_option_type)).lower()


class AncillaryServiceNode(DjangoObjectType):
    class Meta:
        model = models.AncillaryService
        interfaces = (relay.Node,)
        filter_fields = ()


class CalendarAvailabilityType(graphene.ObjectType):
    start_date_from = graphene.Date()
    nights = graphene.Int()
    min_price = graphene.Decimal()


class Query:
    product = graphene.Field(ProductNode, product_id=graphene.String())
    calendar_availabilities = graphene.List(
        CalendarAvailabilityType,
        tot_adults=graphene.Int(),
        product_id=graphene.String(required=False),
        destination_id=graphene.String(required=False),
    )

    all_product_destinations = DjangoFilterConnectionField(DestinationNode)
    all_product_availabilities = DjangoFilterConnectionField(ProductAvailabilityNode)
    all_ancillary_services = DjangoFilterConnectionField(AncillaryServiceNode)

    def resolve_calendar_availabilities(
        self, info, tot_adults, product_id=None, destination_id=None
    ):
        return get_calendar_products_availability(
            tot_adults, product_id, destination_id
        )

    def resolve_all_product_availabilities(self, info, **kwargs):
        return get_all_product_availabilities()

    def resolve_product(self, info, product_id):
        return get_product(product_id)
