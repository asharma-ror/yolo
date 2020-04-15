import { gql } from "apollo-boost"

export const CREATE_QUOTATION_MUTATION = gql`
  mutation createQuotation($availabilityKeys: [String]!) {
    createQuotation(input: { availabilityKeys: $availabilityKeys }) {
      quotation {
        ...QuotationData
      }
    }
  }
`

export const ADD_ADDITIONAL_SERVICE_MUTATION = gql`
  mutation addAdditionalService($quotationId: String!, $serviceId: String!) {
    addAdditionalService(
      input: { quotationId: $quotationId, serviceId: $serviceId }
    ) {
      quotation {
        ...QuotationData
      }
    }
  }
`

export const REMOVE_ADDITIONAL_SERVICE_MUTATION = gql`
  mutation removeAdditionalService($quotationId: String!, $serviceId: String!) {
    removeAdditionalService(
      input: { quotationId: $quotationId, serviceId: $serviceId }
    ) {
      quotation {
        ...QuotationData
      }
    }
  }
`

export const ADD_DISCOUNT_TICKET_MUTATION = gql`
  mutation addDiscountTicket($quotationId: String!, $discountCode: String!) {
    addDiscountTicket(
      input: { quotationId: $quotationId, discountCode: $discountCode }
    ) {
      quotation {
        ...QuotationData
      }
    }
  }
`

export const REMOVE_DISCOUNT_TICKET_MUTATION = gql`
  mutation removeDiscountTicket($quotationId: String!, $discountCode: String!) {
    removeDiscountTicket(
      input: { quotationId: $quotationId, discountCode: $discountCode }
    ) {
      quotation {
        ...QuotationData
      }
    }
  }
`

export const SET_QUOTATION_PASSENGERS_MUTATION = gql`
  mutation setQuotationPassengers(
    $quotationId: String!
    $customer: CustomerInput!
    $rooms: [RoomPassengersInput]!
  ) {
    setQuotationPassengers(
      input: { quotationId: $quotationId, customer: $customer, rooms: $rooms }
    ) {
      quotation {
        ...QuotationData
      }
    }
  }
`

export const INITIALIZE_PAYMENT_MUTATION = gql`
  mutation initializePayment($paymentData: InitializePaymentSessionInputType!) {
    initializePayment(input: { data: $paymentData }) {
      paymentData {
        ...PaymentData
      }
    }
  }
`

export const VERIFY_RESERVATION_MUTATION = gql`
  mutation verifyReservation($paymentSessionId: String!) {
    verifyReservation(input: { paymentSessionId: $paymentSessionId }) {
      reservation {
        reservationId
        quotation {
          ...QuotationData
        }
      }
    }
  }
`
