from typing import List

from graphene.test import Client

import server.schema
from server.apps.orders.models import Customer, Passenger
from server.apps.products.models import ProductAllotment


class ProductsClient:
    _client = Client(schema=server.schema.schema)

    def get_availability(self, allotment: ProductAllotment, tot_rooms):
        return self._client.execute(
            """
            query availability($productId: String!, $totAdults: Int!, $totRooms: Int!) {
              allProductAvailabilities(productId: $productId, totAdults: $totAdults, quantityAvailable_Gte: $totRooms) {
                edges {
                  node {
                    productId
                    availabilityKey
                    startDateFrom
                    startDateTo
                    nights
                    days
                    totAdults
                    price
                    departureOptionType
                    departureOptionValue
                  }
                }
              }
            }""",
            variables={
                "productId": allotment.product.product_id,
                "totAdults": allotment.occupancies.first().tot_adults,
                "totRooms": tot_rooms,
            },
        )


class OrdersClient:
    _client = Client(schema=server.schema.schema)

    def verify_reservation(self, payment_session_id):
        return self._client.execute(
            """
            mutation verifyReservation($paymentSessionId: String!) {
              verifyReservation(input:{
                paymentSessionId: $paymentSessionId
              }) {
                reservation {
                  quotation {
                    status
                    quotationId
                  }
                }
              }
            }
            """,
            variables={"paymentSessionId": payment_session_id},
        )

    def initialize_payment(
        self,
        provider_id,
        quotation_id,
        payment_method,
        payment_type,
        payload,
        success_url,
        cancel_url,
    ):
        return self._client.execute(
            """
            mutation initializePayment($providerId: String!, $quotationId: String!, $paymentMethod: String!, $paymentType: String!, $payload: String!, $successUrl: String!, $cancelUrl: String!) {
              initializePayment(input:{
                data: {
                  providerId: $providerId
                  quotationId: $quotationId
                  payment:{
                    method: $paymentMethod
                    type: $paymentType
                    payload: $payload
                  }
                  paymentSuccessBaseUrl: $successUrl
                  paymentCancelBaseUrl: $cancelUrl
                }
              }) {
                paymentData {
                  providerId
                  paymentPayload
                  paymentSessionId
                }
              }
            }
            """,
            variables={
                "providerId": provider_id,
                "quotationId": quotation_id,
                "paymentMethod": payment_method,
                "paymentType": payment_type,
                "payload": payload,
                "successUrl": success_url,
                "cancelUrl": cancel_url,
            },
        )

    def create_quotation(self, availability_keys: List[str]):
        return self._client.execute(
            """
            mutation createQuotation($availabilityKeys: [String]!) {
              createQuotation(input: {availabilityKeys: $availabilityKeys}) {
                quotation {
                  status
                  quotationId
                  totalPrice
                  depositPrice
                  quotationroomSet {
                    totAdults
                    passengerSet {
                      passengerIndex
                      minAge
                      maxAge
                    }
                  }
                }
              }
            }
            """,
            variables={"availabilityKeys": availability_keys},
        )

    def set_passengers(self, quotation_id, customer, passengers):
        return self._client.execute(
            """
            mutation setPassengers($quotationId: String!, $customer: CustomerInput!, $rooms: [RoomPassengersInput]!) {
              setQuotationPassengers(input: {
                quotationId: $quotationId,
                customer: $customer,
                rooms: $rooms
              }) {
                quotation {
                  status
                  quotationId
                  totalPrice
                  depositPrice
                  customer {
                    name
                    surname
                    gender
                    email
                    birthday
                    phone
                  }
                  quotationroomSet {
                    roomIndex
                    totAdults
                    passengerSet {
                      name
                      surname
                      birthday
                      gender
                    }
                  }
                }
              }
            }
            """,
            variables={
                "quotationId": quotation_id,
                "customer": self._serialize_customer(customer),
                "rooms": [
                    {"passengers": [self._serialize_passenger(x) for x in passengers]}
                ],
            },
        )

    @staticmethod
    def _serialize_customer(customer: Customer):
        return {
            "name": customer.name,
            "surname": customer.surname,
            "birthday": customer.birthday,
            "email": customer.email,
            "gender": customer.gender,
            "phone": customer.phone,
        }

    @staticmethod
    def _serialize_passenger(passenger: Passenger):
        return {
            "name": passenger.name,
            "surname": passenger.surname,
            "birthday": passenger.birthday,
            "gender": passenger.gender,
        }
