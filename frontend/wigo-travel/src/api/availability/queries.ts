import gql from "graphql-tag"

export const QUERY_GET_DESTINATIONS = gql`
  query allProductDestinations {
    allProductDestinations {
      edges {
        node {
          code
          name
        }
      }
    }
  }
`

export const QUERY_GET_PRODUCT_AVAILABILITY = gql`
  query getProductAvailability(
    $productId: String!
    $totAdults: Int!
    $quantityAvailable_Gte: Int!
  ) {
    allProductAvailabilities(
      productId: $productId
      totAdults: $totAdults
      quantityAvailable_Gte: $quantityAvailable_Gte
    ) {
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
          departureOptionDisplayName
          departureOptionType
          departureOptionValue
        }
      }
    }
  }
`

export const QUERY_CALENDAR_AVAILABILITY = gql`
  query getCalendarAvailabilities(
    $totAdults: Int!
    $productId: String
    $destinationId: String
  ) {
    calendarAvailabilities(
      totAdults: $totAdults
      productId: $productId
      destinationId: $destinationId
    ) {
      startDateFrom
      nights
      minPrice
    }
  }
`
