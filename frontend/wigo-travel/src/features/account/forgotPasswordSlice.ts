import { createSlice } from "@reduxjs/toolkit"

import { ForgotPasswordState } from "./forgotPasswordTypes"
import { forgotPasswordMutation } from "../../api/account/forgotPassword/api"
import { AppThunk } from "../../state/store"

const initialStateProvider = () =>
  ({
    isLoading: false,
    error: null,
    isMailSent: false,
  } as ForgotPasswordState)

const initialState = initialStateProvider()

const { actions, reducer } = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    forgotPasswordStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    forgotPasswordSuccessfull: () => ({
      isLoading: false,
      error: false,
      isMailSent: true,
    }),
    forgotPasswordError: () => ({
      isLoading: false,
      error: true,
      isMailSent: false,
    }),
  },
})

const {
  forgotPasswordStart,
  forgotPasswordSuccessfull,
  forgotPasswordError,
} = actions

export const setForgotPassword = (email: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(forgotPasswordStart())
    await forgotPasswordMutation(
      email,
      `${window.location.origin}/account/password-reset`
    )
    dispatch(forgotPasswordSuccessfull())
  } catch (e) {
    dispatch(forgotPasswordError())
  }
}

export default reducer
