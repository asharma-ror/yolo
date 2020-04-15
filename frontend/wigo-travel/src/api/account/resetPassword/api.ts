import client from "../../backend-api-client"

import {
  PwdResetDocument,
  PwdResetMutation,
  PwdResetMutationVariables,
} from "../../backend-api"

export const pwdResetMutation = (
  newPassword: string,
  token: string,
  uidb64: string
) =>
  client.mutate<PwdResetMutation, PwdResetMutationVariables>({
    mutation: PwdResetDocument,
    variables: {
      newPassword,
      token,
      uidb64,
    },
  })
