import { RootState } from "../../../../state/rootReducer"
import { useSelector } from "react-redux"
import ErrorSnackbar from "../ErrorSnackbar"
import React from "react"

interface Props {
  errorSelector: (state: RootState) => any
  message: React.ReactNode
}

const ReduxErrorSnackbar = ({ errorSelector, message }: Props) => {
  const error = useSelector(errorSelector)
  return (
    <>
      {error ? (
        <ErrorSnackbar
          condition={error !== undefined}
          message={message}
        ></ErrorSnackbar>
      ) : undefined}
    </>
  )
}

export default ReduxErrorSnackbar
