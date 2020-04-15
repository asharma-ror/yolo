import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "@reach/router"

import { RootState } from "../../../state/rootReducer"
import { emailVerification } from "../../../features/account/verificationSlice"
import { getQueryParam } from "../../../utils/urlUtils"
import Loader from "../../../components/ui/molecules/Loader"
import ReduxErrorSnackbar from "../../../components/ui/molecules/ReduxErrorSnackbar"

const EmailVerification = ({ location }: any) => {
  const dispatch = useDispatch()
  const { error, result } = useSelector((state: RootState) => state.verifyUser)
  const token = getQueryParam(location, "t")
  const uidb64 = getQueryParam(location, "u")

  useEffect(() => {
    if (token && uidb64) dispatch(emailVerification({ token, uidb64 }))
  }, [])

  useEffect(() => {
    if (result) navigate("/")
  }, [result])

  return (
    <>
      <Loader fullScreen />
      <ReduxErrorSnackbar errorSelector={() => error} message="Errore" />
    </>
  )
}

export default EmailVerification
