import gql from "graphql-tag"

export const QUOTATION_DATA = gql`
  fragment QuotationData on QuotationNode {
    quotationId
    productId
    status
    startDateFrom
    startDateTo
    nights
    days
    departureOptionType
    departureOptionValue
    totalPrice
    totalDiscount
    depositPrice
    quotationroomSet {
      id
      roomIndex
      occupancyCode
      totAdults
      quotationserviceSet {
        id
        name
        priceType
        price
        quantityType
        selectionType
        serviceType
        serviceId
      }
      quotationadditionalserviceSet {
        name
        priceType
        price
        quantityType
        serviceId
      }
      passengerSet {
        passengerIndex
        name
        surname
        birthday
        minAge
        maxAge
        gender
      }
    }
    customer {
      name
      surname
      email
      userId
      birthday
      gender
      taxCode
      phone
    }
  }
`

export const PAYMENT_DATA = gql`
  fragment PaymentData on InitializePaymentSessionOutputType {
    providerId
    paymentPayload
    paymentSessionId
    paymentAmount
    paymentSuccessUrl
    paymentCancelUrl
    transactionId
  }
`
