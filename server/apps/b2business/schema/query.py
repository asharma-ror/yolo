import graphene
from graphene import ObjectType, relay
from graphene_django.filter import DjangoFilterConnectionField

from server.apps.companies.schema import (
    CompanyAirportNode,
    CompanyDestinationNode,
    CompanyHotelNode,
    CompanyNode,
    CompanyRoomNode,
)
from server.apps.travels.schema import TravelReservationNode


class CompanyProductNode(graphene.ObjectType):
    name = graphene.String()
    product_id = graphene.String()
    product_type = graphene.String()

    class Meta:
        interfaces = (relay.Node,)


class CompanyProductConnection(graphene.Connection):
    class Meta:
        node = CompanyProductNode


class ProductAllotmentIntervalType(graphene.ObjectType):
    date_from = graphene.Date()
    date_to = graphene.Date()


class AllocationType(graphene.ObjectType):
    tot_places = graphene.Int()
    allocated_places = graphene.Int()


class TravelTimeType(graphene.ObjectType):
    date = graphene.Date()
    time = graphene.Time()


class TravelSegmentType(graphene.ObjectType):
    travel_id = graphene.String()
    destination_from = relay.Node.Field(CompanyDestinationNode)
    destination_to = relay.Node.Field(CompanyDestinationNode)
    departure = graphene.Field(TravelTimeType)
    arrival = graphene.Field(TravelTimeType)


class AllotmentTravelSegment(graphene.ObjectType):
    details = graphene.Field(TravelSegmentType)
    estimated_allocation = graphene.Field(AllocationType)


class AllotmentHotelDetails(graphene.ObjectType):
    hotel = relay.Node.Field(CompanyHotelNode)
    estimated_allocation = graphene.Field(AllocationType)


class AllotmentOptionType(graphene.ObjectType):
    travel_departure = graphene.Field(AllotmentTravelSegment)
    travel_return = graphene.Field(AllotmentTravelSegment)
    hotels = graphene.List(AllotmentHotelDetails)


class CompanyProductAllotmentNode(graphene.ObjectType):
    allotment_id = graphene.String()
    product = graphene.Field(CompanyProductNode)
    interval = graphene.Field(ProductAllotmentIntervalType)
    options = graphene.List(AllotmentOptionType)
    allocation = graphene.Field(AllocationType)
    allocation_estimation = graphene.Field(AllocationType)

    class Meta:
        interfaces = (relay.Node,)


class CompanyProductAllotmentConnection(graphene.Connection):
    class Meta:
        node = CompanyProductAllotmentNode


class ReservationOccupancyType(graphene.ObjectType):
    code = graphene.String()
    tot_adults = graphene.Int()


class ReservationGroupType(graphene.ObjectType):
    occupancy = graphene.Field(ReservationOccupancyType)
    quantity = graphene.Int()
    reservations = graphene.List(TravelReservationNode)
    selected_travel_options = graphene.List(graphene.String)


class AccommodationType(graphene.ObjectType):
    hotel = graphene.Field(CompanyHotelNode)
    room = graphene.Field(CompanyRoomNode)


class TravelAssignationsOption(graphene.ObjectType):
    id = graphene.String()
    travel_departure = graphene.Field(TravelSegmentType)
    travel_return = graphene.Field(TravelSegmentType)
    accommodation = graphene.Field(AccommodationType)
    max_places = graphene.Int()


class TravelAssignationsOptionGroupType(graphene.ObjectType):
    destination = relay.Node.Field(CompanyDestinationNode)
    values = graphene.List(TravelAssignationsOption)


class OccupationInfoType(graphene.ObjectType):
    total = graphene.Int()
    reserved = graphene.Int()


class ProductStatistics(graphene.ObjectType):
    partner_occupations = graphene.Field(OccupationInfoType)
    b2c_occupations = graphene.Field(OccupationInfoType)


class TravelAssignationNode(graphene.ObjectType):
    product = graphene.Field(CompanyProductNode)
    interval = graphene.Field(ProductAllotmentIntervalType)
    reservation_groups = graphene.List(ReservationGroupType)
    options = graphene.List(TravelAssignationsOptionGroupType)
    occupations = graphene.Field(ProductStatistics)
    status = graphene.String()

    class Meta:
        interfaces = (relay.Node,)


class TravelAssignationConnection(graphene.Connection):
    class Meta:
        node = TravelAssignationNode


class DataValueType(graphene.ObjectType):
    value = graphene.Decimal()
    unit = graphene.String()


class DataProgressType(graphene.ObjectType):
    value = graphene.Decimal()
    total = graphene.Decimal()
    unit = graphene.String()


class DashboardSummaryValuesType(graphene.ObjectType):
    last_year = graphene.Field(DataValueType)
    actual = graphene.Field(DataValueType)
    optimal = graphene.Field(DataValueType)


class DashboardSummaryDataType(graphene.ObjectType):
    today = graphene.Field(DashboardSummaryValuesType)
    next_week = graphene.Field(DashboardSummaryValuesType)
    closure = graphene.Field(DashboardSummaryValuesType)


class PricingDashboardDataType(graphene.ObjectType):
    revenue = graphene.Field(DashboardSummaryDataType)
    load_factor = graphene.Field(DashboardSummaryDataType)


class PricingDashboardFilterType(graphene.InputObjectType):
    date_from = graphene.Date()
    date_to = graphene.Date()
    destination_code = graphene.String()


class DestinationRankingDataType(graphene.ObjectType):
    destination = relay.Node.Field(CompanyDestinationNode)
    last_year_revenue = graphene.Field(DataValueType)
    actual_revenue = graphene.Field(DataValueType)
    optimal_revenue = graphene.Field(DataValueType)


class DestinationRakingSummaryDataType(graphene.ObjectType):
    best_performing = graphene.List(DestinationRankingDataType)
    worst_performing = graphene.List(DestinationRankingDataType)


class PricingDetailsValuesType(graphene.ObjectType):
    price = graphene.Field(DataValueType)
    perc_load_factor = graphene.Field(DataValueType)
    abs_load_factor = graphene.Field(DataProgressType)
    revenue = graphene.Field(DataValueType)


class PricingDataNode(graphene.ObjectType):
    departure_date = graphene.Date()
    airport_code = graphene.String()
    airport_name = graphene.String()
    hotel_id = graphene.String()
    hotel_name = graphene.String()
    destination_id = graphene.String()
    destination_name = graphene.String()
    room_type = graphene.String()
    room_name = graphene.String()
    booking_date = graphene.Date()
    last_year = graphene.Field(PricingDetailsValuesType)
    actual = graphene.Field(PricingDetailsValuesType)
    optimal = graphene.Field(PricingDetailsValuesType)

    class Meta:
        interfaces = (relay.Node,)


class PricingDataConnection(graphene.Connection):
    class Meta:
        node = PricingDataNode


class PricingDataFilterType(graphene.InputObjectType):
    departure_date = graphene.Date()
    departure_airport = graphene.String()
    room_type = graphene.String()


class Query(ObjectType):
    company = relay.Node.Field(CompanyNode)
    all_companies = DjangoFilterConnectionField(CompanyNode)

    all_company_destinations = DjangoFilterConnectionField(CompanyDestinationNode)
    all_company_hotels = DjangoFilterConnectionField(CompanyHotelNode)
    all_company_airports = DjangoFilterConnectionField(CompanyAirportNode)

    company_products = relay.ConnectionField(CompanyProductConnection)

    def resolve_company_products(self, info, **kwargs):
        return []

    company_product_allotments = relay.ConnectionField(
        CompanyProductAllotmentConnection, product_id=graphene.String()
    )

    def resolve_company_product_allotments(self, info, product_id, **kwargs):
        return []

    travel_assignations = relay.ConnectionField(
        TravelAssignationConnection,
        products=graphene.List(graphene.String),
        departure_airports=graphene.List(graphene.String),
        departure_date_from=graphene.Date(),
        departure_date_to=graphene.Date(),
    )
    travel_assignation = graphene.Field(TravelAssignationNode, id=graphene.ID())

    pricing_dashboard_data = graphene.Field(
        PricingDashboardDataType, filter=graphene.Argument(PricingDashboardFilterType)
    )
    destinations_ranking_data = graphene.Field(
        DestinationRakingSummaryDataType,
        filter=graphene.Argument(PricingDashboardFilterType),
    )
    pricing_details = relay.ConnectionField(
        PricingDataConnection, filter=graphene.Argument(PricingDataFilterType)
    )

    # TODO: filter all query results by company_id retrieved form the user context
    # TODO: it should also implemented a mechanism that allow the superusers to impersonate a supplier

    def resolve_travel_assignations(
        self,
        info,
        products,
        departure_airports,
        departure_date_from,
        departure_date_to,
        **kwargs,
    ):
        return []

    def resolve_travel_assignation(self, info, id):
        return None
