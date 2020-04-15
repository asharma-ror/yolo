import { gql } from "apollo-boost"

export const USER_LOGIN_MUTATION = gql`
  mutation login($password: String!, $username: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`
export const USER_SOCIAL_LOGIN_MUTATION = gql`
  mutation socialAuth($provider: String!, $accessToken: String!) {
    socialAuth(provider: $provider, accessToken: $accessToken) {
      token
    }
  }
`
