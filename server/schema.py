import graphene
from graphene_django.debug import DjangoDebug

import server.apps.authentication.schema
import server.apps.b2business.schema
import server.apps.orders.schema
import server.apps.products.schema


class Query(
    server.apps.b2business.schema.Query,
    server.apps.products.schema.Query,
    server.apps.orders.schema.Query,
    graphene.ObjectType,
):
    debug = graphene.Field(DjangoDebug, name="_debug")


class Mutation(
    server.apps.b2business.schema.Mutation,
    server.apps.orders.schema.Mutation,
    server.apps.authentication.schema.Mutation,
    graphene.ObjectType,
):
    debug = graphene.Field(DjangoDebug, name="_debug")


schema = graphene.Schema(query=Query, mutation=Mutation)
