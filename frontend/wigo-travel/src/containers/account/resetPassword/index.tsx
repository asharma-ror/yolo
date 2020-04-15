import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { Container, Typography } from "@material-ui/core"

import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import PasswordResetForm from "../../../components/sections/account/PasswordReset/ResetPassword"
import { RootState } from "../../../state/rootReducer"
import { setResetPassword } from "../../../features/account/resetPasswordSlice"
import ReduxErrorSnackbar from "../../../components/ui/molecules/ReduxErrorSnackbar"
import { getQueryParam } from "../../../utils/urlUtils"
import Loader from "../../../components/ui/molecules/Loader"

const schema = yup.object().shape({
  newPassword: yup.string().required(),
})

interface FormData {
  newPassword: string
}

const ResetPassword = ({ location }: any) => {
  const {
    register,
    errors: { newPassword },
    handleSubmit,
  } = useForm({ validationSchema: schema })
  const dispatch = useDispatch()
  const { error, passwordResetSuccess, isLoading } = useSelector(
    (state: RootState) => state.resetPassword
  )
  const token = getQueryParam(location, "t")
  const uidb64 = getQueryParam(location, "u")

  const fields = {
    newPassword: {
      name: "newPassword",
      error: newPassword,
    },
  }

  const onSubmit = ({ newPassword }: FormData) => {
    dispatch(setResetPassword({ newPassword, token, uidb64 }))
  }

  return (
    <DefaultLayout>
      <Container>
        <PasswordResetForm
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          fields={fields}
        />
        {isLoading && <Loader />}
        {passwordResetSuccess && (
          <Typography> Your password has been successfully reset. </Typography>
        )}
      </Container>
      <ReduxErrorSnackbar
        errorSelector={() => error}
        message={"An error occured. Please try again."}
      />
    </DefaultLayout>
  )
}

export default ResetPassword
