import { gql } from "apollo-boost"

export const GET_QUOTATION_QUERY = gql`
  query getQuotation($quotationId: String!) {
    quotation(quotationId: $quotationId) {
      ...QuotationData
    }
  }
`
