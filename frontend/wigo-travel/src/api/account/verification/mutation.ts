import { gql } from "apollo-boost"

export const EMAIL_VERIFICATION_MUTATION = gql`
  mutation verifyEmailAddress($token: String!, $uidb64: String!) {
    verifyEmailAddress(token: $token, uidb64: $uidb64) {
      ok
    }
  }
`
