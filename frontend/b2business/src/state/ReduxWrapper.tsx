import React from "react"
import { Provider } from "react-redux"
// import LanguageProvider from "../containers/LanguageProvider"
// import { ConnectedRouter } from "connected-react-router/immutable"
// import history from "../utils/history"

import configureStore from "./redux/configureStore"

// const createStore = () => reduxCreateStore(rootReducer)
const initialState = {}
const store = configureStore(initialState)

// <Provider store={createStore()}>{element}</Provider>
const WrappedApp = ({ element }: { element?: React.Component }) => (
  <Provider store={store}>
    {/* <LanguageProvider messages={messages}> */}
    {/*  <ConnectedRouter history={history}> */}
    {element}
    {/* </ConnectedRouter> */}
    {/* </LanguageProvider> */}
  </Provider>
)

export default WrappedApp
