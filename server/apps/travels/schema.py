from graphene_django import DjangoObjectType

from . import models


class TravelReservationNode(DjangoObjectType):
    class Meta:
        model = models.TravelReservation


class TravelReservationRoomNode(DjangoObjectType):
    class Meta:
        model = models.TravelReservation


class TravelInstanceNode(DjangoObjectType):
    class Meta:
        model = models.TravelInstance
