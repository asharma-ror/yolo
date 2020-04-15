import client from "../../backend-api-client"

import {
  VerifyEmailAddressMutationVariables,
  VerifyEmailAddressMutation,
  VerifyEmailAddressDocument,
} from "../../backend-api"

export const emailRegistrationMutation = (token: string, uidb64: string) =>
  client.mutate<
    VerifyEmailAddressMutation,
    VerifyEmailAddressMutationVariables
  >({
    mutation: VerifyEmailAddressDocument,
    variables: {
      token,
      uidb64,
    },
  })
