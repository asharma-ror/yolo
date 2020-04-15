import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { Typography, Container } from "@material-ui/core"

import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import ForgotPasswordForm from "../../../components/sections/account/PasswordReset/ForgotPassword"
import { RootState } from "../../../state/rootReducer"
import { setForgotPassword } from "../../../features/account/forgotPasswordSlice"
import ReduxErrorSnackbar from "../../../components/ui/molecules/ReduxErrorSnackbar"

const schema = yup.object().shape({
  email: yup.string().email().required(),
})

interface FormData {
  email: string
}

const ForgotPassword = () => {
  const dispatch = useDispatch()
  const { error, isMailSent } = useSelector(
    (state: RootState) => state.forgotPassword
  )
  const {
    register,
    errors: { email },
    handleSubmit,
  } = useForm({ validationSchema: schema })

  const fields = {
    email: {
      name: "email",
      error: email,
    },
  }

  const onSubmit = ({ email }: FormData) => {
    dispatch(setForgotPassword(email))
  }

  return (
    <DefaultLayout>
      <Container>
        <ForgotPasswordForm
          handleSubmit={handleSubmit(onSubmit)}
          register={register}
          fields={fields}
        />
        {isMailSent && (
          <Typography>
            Please check the mail for a password reset link
          </Typography>
        )}
      </Container>
      <ReduxErrorSnackbar
        errorSelector={() => error}
        message={"An error occured. Please try again."}
      />
    </DefaultLayout>
  )
}

export default ForgotPassword
