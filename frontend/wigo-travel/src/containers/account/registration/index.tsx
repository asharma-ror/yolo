import React from "react"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"

import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import { RootState } from "../../../state/rootReducer"
import { setUserRegisteration } from "../../../features/account/registrationSlice"
import RegisterForm from "../../../components/sections/account/RegisterForm/RegisterForm"
import ReduxErrorSnackbar from "../../../components/ui/molecules/ReduxErrorSnackbar"
import { Container } from "@material-ui/core"

const schema = yup.object().shape({
  username: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  password: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup
    .date()
    .test(
      "age-check",
      "Age should be greater than 18 years",
      (value) => moment().diff(moment(value), "years") >= 18
    ),
})

interface FormData {
  username: string
  password: string
  email: string
  lastName: string
  firstName: string
  birthday: string
}

const Register = () => {
  const {
    register,
    errors: { username, password, email, birthday, lastName, firstName },
    handleSubmit,
  } = useForm({ validationSchema: schema })
  const dispatch = useDispatch()
  const { error } = useSelector((state: RootState) => state.register)

  const fields = {
    username: {
      name: "username",
      error: username,
    },
    password: {
      name: "password",
      error: password,
    },
    email: {
      name: "email",
      error: email,
    },
    firstName: {
      name: "firstName",
      error: firstName,
    },
    lastName: {
      name: "lastName",
      error: lastName,
    },
    birthday: {
      name: "birthday",
      error: birthday,
    },
  }

  const onSubmit = ({
    password,
    email,
    firstName,
    lastName,
    birthday,
  }: FormData) => {
    dispatch(
      setUserRegisteration({
        password,
        email,
        firstName,
        lastName,
        birthday: moment(birthday).format("YYYY-MM-DD"),
      })
    )
  }

  return (
    <DefaultLayout>
      <Container>
        <RegisterForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          fields={fields}
        />
      </Container>
      <ReduxErrorSnackbar
        errorSelector={() => error?.hasError}
        message={"An error occured. Please try again."}
      />
    </DefaultLayout>
  )
}

export default Register
