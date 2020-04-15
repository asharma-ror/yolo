import client from "../../backend-api-client"

import {
  RegisterUserMutationVariables,
  RegisterUserMutation,
  RegisterUserDocument,
} from "../../backend-api"

export const userRegisterationMutation = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  birthday: string,
  emailValidationBaseUrl: string
) =>
  client.mutate<RegisterUserMutation, RegisterUserMutationVariables>({
    mutation: RegisterUserDocument,
    variables: {
      firstName,
      lastName,
      email,
      password,
      birthday,
      emailValidationBaseUrl,
    },
  })
