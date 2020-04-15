import graphene
from graphene import relay


class UpdateAllotmentMutation(relay.ClientIDMutation):
    class Input:
        allotment_id = graphene.List(graphene.String, required=True)
        new_max_quantity = graphene.Int(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, allotment_id, new_max_quantity):
        return UpdateAllotmentMutation(ok=True)


class ReservationsSelectionInput(graphene.InputObjectType):
    occupancy_code = graphene.String(required=True)
    selected_travel_options = graphene.List(graphene.String, required=True)


class ConfirmTravelAssignationInput(graphene.InputObjectType):
    travel_assignation_id = graphene.ID(required=True)
    reservations = graphene.List(ReservationsSelectionInput, required=True)


class ConfirmTravelAssignationMutation(relay.ClientIDMutation):
    class Input:
        assignation = ConfirmTravelAssignationInput(required=True)

    ok = graphene.Boolean()

    @classmethod
    def mutate_and_get_payload(cls, root, info, assignation):
        return UpdateAllotmentMutation(ok=True)


class Mutation(graphene.ObjectType):
    # TODO: check if the supplier is allowed to change the allotment

    update_allotment = UpdateAllotmentMutation.Field()
    confirm_travel_assignation = ConfirmTravelAssignationMutation.Field()
