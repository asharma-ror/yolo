import client from "../../backend-api-client"

import {
  SendPasswordResetEmailDocument,
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables,
} from "../../backend-api"

export const forgotPasswordMutation = (
  email: string,
  passwordResetBaseUrl: string
) =>
  client.mutate<
    SendPasswordResetEmailMutation,
    SendPasswordResetEmailMutationVariables
  >({
    mutation: SendPasswordResetEmailDocument,
    variables: {
      email,
      passwordResetBaseUrl,
    },
  })
