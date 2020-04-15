from typing import List, Optional

import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql.execution.base import ResolveInfo

from . import models
from .commands.payments import initialize_payment_session
from .commands.quotation import (
    add_ancillary_service_to_quotation,
    add_discount_ticket_to_quotation,
    create_quotation,
    option_quotation,
    remove_ancillary_service_from_quotation,
    remove_discount_ticket_from_quotation,
    set_quotation_passengers,
)
from .commands.reservations import verify_reservation
from .models import Gender, PriceType, QuantityType, QuotationStatus, SelectionType
from .queries.quotation import get_quotation_status
from .types.payments import (
    InitializePaymentSessionInputType,
    InitializePaymentSessionOutputType,
)


def get_name(cls, name) -> str:
    cls_type = cls.get_name(name)
    if cls_type:
        return cls_type.lower()
    return ""


class QuotationNode(DjangoObjectType):
    class Meta:
        model = models.Quotation
        interfaces = (relay.Node,)
        filter_fields = ()

    status = graphene.String()

    def resolve_status(self, info: ResolveInfo) -> str:
        return get_name(QuotationStatus, self.status)


def get_price_type(name) -> str:
    return get_name(PriceType, name)


def get_quantity_type(name) -> str:
    return get_name(QuantityType, name)


def get_selection_type(name) -> str:
    return get_name(SelectionType, name)


class QuotationServiceType(DjangoObjectType):
    class Meta:
        model = models.QuotationService
        filter_fields = ()

    price_type = graphene.String()
    quantity_type = graphene.String()
    selection_type = graphene.String()
    service_type = graphene.String()

    def resolve_price_type(self, info):
        return get_price_type(self.price_type)

    def resolve_quantity_type(self, info):
        return get_quantity_type(self.quantity_type)

    def resolve_selection_type(self, info):
        return get_selection_type(self.selection_type).lower()

    def resolve_service_type(self, info):
        return self.service_type.code


class QuotationAdditionalServiceType(DjangoObjectType):
    class Meta:
        model = models.QuotationAdditionalService
        filter_fields = ()

    price_type = graphene.String()
    quantity_type = graphene.String()

    def resolve_price_type(self, info):
        return get_price_type(self.price_type)

    def resolve_quantity_type(self, info):
        return get_quantity_type(self.quantity_type)

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.order_by("service_id")


class QuotationRoomType(DjangoObjectType):
    class Meta:
        model = models.QuotationRoom
        filter_fields = ()

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.order_by("room_index")


class CustomerType(DjangoObjectType):
    class Meta:
        model = models.Customer
        filter_fields = ()

    gender = graphene.String()

    def resolve_gender(self, info: ResolveInfo) -> str:
        return get_name(Gender, self.gender).lower()


class PassengerType(DjangoObjectType):
    class Meta:
        model = models.Passenger
        filter_fields = ()

    gender = graphene.String()

    @classmethod
    def get_queryset(cls, queryset, info):
        return queryset.order_by("passenger_index")

    def resolve_gender(self, info: ResolveInfo) -> str:
        return get_name(Gender, self.gender).lower()


class ReservationNode(DjangoObjectType):
    class Meta:
        model = models.Reservation
        interfaces = (relay.Node,)
        filter_fields = ()


class PaymentType(DjangoObjectType):
    class Meta:
        model = models.Payment
        filter_fields = ()


class Query:
    all_quotations = DjangoFilterConnectionField(QuotationNode)
    quotation = graphene.Field(QuotationNode, quotation_id=graphene.String())

    def resolve_quotation(self, info, quotation_id):
        return models.Quotation.objects.filter(
            quotation_id__iexact=quotation_id
        ).first()

    all_reservations = DjangoFilterConnectionField(ReservationNode)
    reservation = relay.Node.Field(ReservationNode)


class CreateQuotationMutation(relay.ClientIDMutation):
    class Input:
        availability_keys = graphene.List(graphene.String, required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(
        cls, root: None, info: Optional[ResolveInfo], availability_keys: List[str]
    ) -> "CreateQuotationMutation":
        quotation = create_quotation(availability_keys)
        return CreateQuotationMutation(quotation=quotation)


class AddAdditionalServiceMutation(relay.ClientIDMutation):
    class Input:
        quotation_id = graphene.String(required=True)
        service_id = graphene.String(required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(
        cls, root: None, info: None, quotation_id: str, service_id: str
    ) -> "CreateQuotationMutation":
        quotation = add_ancillary_service_to_quotation(quotation_id, service_id)
        return CreateQuotationMutation(quotation=quotation)


class RemoveAdditionalServiceMutation(relay.ClientIDMutation):
    class Input:
        quotation_id = graphene.String(required=True)
        service_id = graphene.String(required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(
        cls, root: None, info: None, quotation_id: str, service_id: str
    ) -> "CreateQuotationMutation":
        quotation = remove_ancillary_service_from_quotation(quotation_id, service_id)
        return CreateQuotationMutation(quotation=quotation)


class AddDiscountTicketMutation(relay.ClientIDMutation):
    class Input:
        quotation_id = graphene.String(required=True)
        discount_code = graphene.String(required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(
        cls, root: None, info: None, quotation_id: str, discount_code: str
    ) -> "AddDiscountTicketMutation":
        quotation = add_discount_ticket_to_quotation(quotation_id, discount_code)
        return AddDiscountTicketMutation(quotation=quotation)


class RemoveDiscountTicketMutation(relay.ClientIDMutation):
    class Input:
        quotation_id = graphene.String(required=True)
        discount_code = graphene.String(required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(
        cls, root: None, info: None, quotation_id: str, discount_code: str
    ) -> "RemoveDiscountTicketMutation":
        quotation = remove_discount_ticket_from_quotation(quotation_id, discount_code)
        return RemoveDiscountTicketMutation(quotation=quotation)


class CustomerInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    surname = graphene.String(required=True)
    email = graphene.String(required=True)
    user_id = graphene.String()
    birthday = graphene.Date(required=True)
    gender = graphene.String()
    tax_code = graphene.String()
    phone = graphene.String()
    country = graphene.String()
    state = graphene.String()
    city = graphene.String()
    address = graphene.String()
    zip_code = graphene.String()
    birth_country = graphene.String()
    birth_state = graphene.String()
    birth_city = graphene.String()


class PassengerInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    surname = graphene.String(required=True)
    birthday = graphene.Date(required=True)
    gender = graphene.String()


class RoomPassengersInput(graphene.InputObjectType):
    passengers = graphene.List(PassengerInput, required=True)


class SetQuotationPassengers(relay.ClientIDMutation):
    class Input:
        quotation_id = graphene.String(required=True)
        customer = CustomerInput(required=True)
        rooms = graphene.List(RoomPassengersInput, required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, quotation_id, customer, rooms):
        quotation = set_quotation_passengers(
            quotation_id=quotation_id, customer=customer, rooms_passengers=rooms
        )
        return CreateQuotationMutation(quotation=quotation)


class OptionQuotation(relay.ClientIDMutation):
    class Input:
        quotation_id = graphene.String(required=True)

    quotation = graphene.Field(QuotationNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, quotation_id):

        quotation = option_quotation(quotation_id=quotation_id)
        return CreateQuotationMutation(quotation=quotation)


class InitializePaymentSession(relay.ClientIDMutation):
    class Input:
        data = InitializePaymentSessionInputType(required=True)

    payment_data = graphene.Field(InitializePaymentSessionOutputType)

    @classmethod
    def mutate_and_get_payload(cls, root, info, data):
        if get_quotation_status(data.quotation_id) != QuotationStatus.OPTIONED:
            option_quotation(quotation_id=data.quotation_id)
        payment_session = initialize_payment_session(data)
        return InitializePaymentSession(payment_data=payment_session)


class VerifyReservation(relay.ClientIDMutation):
    class Input:
        payment_session_id = graphene.String()

    reservation = graphene.Field(ReservationNode)

    @classmethod
    def mutate_and_get_payload(
        cls, root: None, info: ResolveInfo, payment_session_id: str
    ) -> "VerifyReservation":
        reservation = verify_reservation(payment_session_id)
        return VerifyReservation(reservation=reservation)


class Mutation(graphene.ObjectType):
    create_quotation = CreateQuotationMutation.Field()
    add_additional_service = AddAdditionalServiceMutation.Field()
    remove_additional_service = RemoveAdditionalServiceMutation.Field()
    set_quotation_passengers = SetQuotationPassengers.Field()
    option_quotation = OptionQuotation.Field()
    initialize_payment = InitializePaymentSession.Field()
    verify_reservation = VerifyReservation.Field()
    add_discount_ticket = AddDiscountTicketMutation.Field()
    remove_discount_ticket = RemoveDiscountTicketMutation.Field()
