import { gql } from "apollo-boost"

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation sendPasswordResetEmail(
    $email: String!
    $passwordResetBaseUrl: String!
  ) {
    sendPasswordResetEmail(
      email: $email
      passwordResetBaseUrl: $passwordResetBaseUrl
    ) {
      ok
    }
  }
`
