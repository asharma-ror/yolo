import ApolloClient from "apollo-boost"

import { readObject } from "../services/deviceStorageService"

const client = new ApolloClient({
  request: (operation) => {
    const token = readObject("token")
    operation.setContext({
      headers: {
        authorization: token,
      },
    })
  },
  uri: process.env.BACKEND_GRAPHQL_ENDPOINT,
})

export default client
