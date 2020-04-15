from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal

import graphene


@dataclass
class PaymentContextData:
    quotation_id: str
    user_session_id: str
    payment_session_id: str


@dataclass
class PaymentInitInputData:
    amount: Decimal
    method: str
    type: str
    currency: str
    payload: dict  # type: ignore
    customer_email: str
    payment_session_id: str
    success_url: str
    cancel_url: str


@dataclass
class PaymentInitOutputData:
    payload: dict  # type: ignore
    payment_id: str


@dataclass
class TransactionResult:
    transaction_confirmed: bool
    transaction_time: datetime
    payment_id: str
    amount: float
    data: object


class PaymentSessionDataType(graphene.InputObjectType):
    method = graphene.String()
    type = graphene.String()
    payload = graphene.String()


class InitializePaymentSessionInputType(graphene.InputObjectType):
    provider_id = graphene.String()
    quotation_id = graphene.String()
    payment = PaymentSessionDataType()
    payment_success_base_url = graphene.String()
    payment_cancel_base_url = graphene.String()


class InitializePaymentSessionOutputType(graphene.ObjectType):
    provider_id = graphene.String()
    payment_payload = graphene.String()
    payment_session_id = graphene.String()
    payment_amount = graphene.Decimal()
    payment_success_url = graphene.String()
    payment_cancel_url = graphene.String()
    transaction_id = graphene.String()
