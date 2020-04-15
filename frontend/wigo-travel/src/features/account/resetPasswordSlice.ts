import { createSlice } from "@reduxjs/toolkit"

import {
  ResetPasswordState,
  ResetPasswordMutationInputTypes,
} from "./resetPasswordTypes"
import { pwdResetMutation } from "../../api/account/resetPassword/api"
import { AppThunk } from "../../state/store"

const initialStateProvider = () =>
  ({
    isLoading: false,
    error: null,
    passwordResetSuccess: false,
  } as ResetPasswordState)

const initialState = initialStateProvider()

const { actions, reducer } = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    resetPasswordStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    resetPasswordSuccessfull: () => ({
      isLoading: false,
      error: false,
      passwordResetSuccess: true,
    }),
    resetPasswordError: () => ({
      isLoading: false,
      error: true,
      passwordResetSuccess: false,
    }),
  },
})

const {
  resetPasswordStart,
  resetPasswordSuccessfull,
  resetPasswordError,
} = actions

export const setResetPassword = ({
  newPassword,
  token,
  uidb64,
}: ResetPasswordMutationInputTypes): AppThunk => async (dispatch) => {
  try {
    dispatch(resetPasswordStart())
    await pwdResetMutation(newPassword, token, uidb64)
    dispatch(resetPasswordSuccessfull())
  } catch (e) {
    dispatch(resetPasswordError())
  }
}

export default reducer
