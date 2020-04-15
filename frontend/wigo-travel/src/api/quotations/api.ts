import client from "../../api/backend-api-client"
import {
  CreateQuotationMutation,
  CreateQuotationMutationVariables,
  CreateQuotationDocument,
  AddAdditionalServiceMutation,
  AddAdditionalServiceMutationVariables,
  AddAdditionalServiceDocument,
  RemoveAdditionalServiceMutation,
  RemoveAdditionalServiceMutationVariables,
  RemoveAdditionalServiceDocument,
  SetQuotationPassengersMutation,
  SetQuotationPassengersMutationVariables,
  SetQuotationPassengersDocument,
  CustomerInput,
  RoomPassengersInput,
  InitializePaymentMutation,
  InitializePaymentMutationVariables,
  InitializePaymentDocument,
  InitializePaymentSessionInputType,
  VerifyReservationDocument,
  VerifyReservationMutationVariables,
  GetQuotationDocument,
  GetQuotationQuery,
  GetQuotationQueryVariables,
  VerifyReservationMutation,
  AddDiscountTicketMutation,
  AddDiscountTicketMutationVariables,
  AddDiscountTicketDocument,
  RemoveDiscountTicketMutation,
  RemoveDiscountTicketMutationVariables,
  RemoveDiscountTicketDocument,
} from "../backend-api"

export const getQuotationQuery = (quotationId: string) =>
  client.query<GetQuotationQuery, GetQuotationQueryVariables>({
    query: GetQuotationDocument,
    variables: {
      quotationId: quotationId,
    },
  })

export const createQuotationMuation = (availabilityKeys: string[]) =>
  client.mutate<CreateQuotationMutation, CreateQuotationMutationVariables>({
    mutation: CreateQuotationDocument,
    variables: {
      availabilityKeys: availabilityKeys,
    },
  })

export const addAdditionalServiceMutation = (
  quotationId: string,
  serviceId: string
) =>
  client.mutate<
    AddAdditionalServiceMutation,
    AddAdditionalServiceMutationVariables
  >({
    mutation: AddAdditionalServiceDocument,
    variables: {
      quotationId: quotationId,
      serviceId: serviceId,
    },
  })

export const removeAdditionalServiceMutation = (
  quotationId: string,
  serviceId: string
) =>
  client.mutate<
    RemoveAdditionalServiceMutation,
    RemoveAdditionalServiceMutationVariables
  >({
    mutation: RemoveAdditionalServiceDocument,
    variables: {
      quotationId: quotationId,
      serviceId: serviceId,
    },
  })

export const addDiscountTicketMutation = (
  quotationId: string,
  discountCode: string
) =>
  client.mutate<AddDiscountTicketMutation, AddDiscountTicketMutationVariables>({
    mutation: AddDiscountTicketDocument,
    variables: {
      quotationId: quotationId,
      discountCode: discountCode,
    },
  })

export const removeDiscountTicketMutation = (
  quotationId: string,
  discountCode: string
) =>
  client.mutate<
    RemoveDiscountTicketMutation,
    RemoveDiscountTicketMutationVariables
  >({
    mutation: RemoveDiscountTicketDocument,
    variables: {
      quotationId: quotationId,
      discountCode: discountCode,
    },
  })

export const setQuotationPassengersMutation = (
  quotationId: string,
  customer: CustomerInput,
  rooms: RoomPassengersInput[]
) =>
  client.mutate<
    SetQuotationPassengersMutation,
    SetQuotationPassengersMutationVariables
  >({
    mutation: SetQuotationPassengersDocument,
    variables: {
      quotationId: quotationId,
      customer: customer,
      rooms: rooms,
    },
  })

export const initializePaymentMutation = (
  paymentData: InitializePaymentSessionInputType
) =>
  client.mutate<InitializePaymentMutation, InitializePaymentMutationVariables>({
    mutation: InitializePaymentDocument,
    variables: {
      paymentData: paymentData,
    },
  })

export const verifyReservationMutation = (paymentSessionId: string) =>
  client.mutate<VerifyReservationMutation, VerifyReservationMutationVariables>({
    mutation: VerifyReservationDocument,
    variables: {
      paymentSessionId: paymentSessionId,
    },
  })
