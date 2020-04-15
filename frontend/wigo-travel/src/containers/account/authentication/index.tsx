import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import { Container } from "@material-ui/core"

import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import { RootState } from "../../../state/rootReducer"
import {
  setUserLogin,
  setSocialLogin,
} from "../../../features/account/authenticationSlice"
import LoginForm from "../../../components/sections/account/LoginForm/LoginForm"
import ReduxErrorSnackbar from "../../../components/ui/molecules/ReduxErrorSnackbar"

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
})

interface FormData {
  username: string
  password: string
}

const AccountLogin = () => {
  const {
    register,
    errors: { username, password },
    handleSubmit,
  } = useForm({
    validationSchema: schema,
  })
  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.authenticate)

  const fields = {
    username: {
      name: "username",
      error: username,
    },
    password: {
      name: "password",
      error: password,
    },
  }

  const onSubmit = ({ username, password }: FormData) => {
    dispatch(
      setUserLogin({
        username,
        password,
      })
    )
  }

  const socialLoginResponse = (provider: string, response: any) => {
    const { accessToken } = response
    dispatch(setSocialLogin({ provider, accessToken }))
  }

  return (
    <DefaultLayout>
      <Container>
        <LoginForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          fields={fields}
          socialLoginResponse={socialLoginResponse}
        />
      </Container>
      <ReduxErrorSnackbar
        errorSelector={() => error}
        message={"Invalid Credentials"}
      />
    </DefaultLayout>
  )
}

export default AccountLogin
