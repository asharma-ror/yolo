import { gql } from "apollo-boost"

export const RESET_PASSWORD_MUTATION = gql`
  mutation pwdReset($newPassword: String!, $token: String!, $uidb64: String!) {
    resetPassword(newPassword: $newPassword, token: $token, uidb64: $uidb64) {
      ok
    }
  }
`
