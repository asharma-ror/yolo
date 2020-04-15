import React from "react"
import { ApolloProvider } from "@apollo/react-hooks"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"
import { Provider } from "react-redux"
import client from "../api/backend-api-client"
import store from "../state/store"
import { ContentsProvider } from "../context/rootProvider"

interface Params {
  element: any
}

export const wrapRootElement = ({ element }: Params) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <ContentsProvider>{element}</ContentsProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </Provider>
  )
}
