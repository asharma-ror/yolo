import { gql } from "apollo-boost"

export const USER_REGISTER_MUTATION = gql`
  mutation registerUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $birthday: Date!
    $emailValidationBaseUrl: String!
  ) {
    registerUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      birthday: $birthday
      emailValidationBaseUrl: $emailValidationBaseUrl
    ) {
      user {
        username
        firstName
        lastName
        email
      }
      error {
        type
      }
    }
  }
`
