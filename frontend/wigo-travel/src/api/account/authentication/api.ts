import client from "../../backend-api-client"

import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  SocialAuthDocument,
  SocialAuthMutation,
  SocialAuthMutationVariables,
} from "../../backend-api"

export const userLoginMutation = (username: string, password: string) =>
  client.mutate<LoginMutation, LoginMutationVariables>({
    mutation: LoginDocument,
    variables: {
      username,
      password,
    },
  })

export const userSocialLoginMutation = (
  accessToken: string,
  provider: string
) =>
  client.mutate<SocialAuthMutation, SocialAuthMutationVariables>({
    mutation: SocialAuthDocument,
    variables: {
      accessToken,
      provider,
    },
  })
