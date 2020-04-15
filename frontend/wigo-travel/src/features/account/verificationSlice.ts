import { createSlice } from "@reduxjs/toolkit"

import { emailRegistrationMutation } from "../../api/account/verification/api"
import { AppThunk } from "../../state/store"
import {
  VerificationState,
  UserVerificationInputTypes,
} from "./verificationTypes"

const initialStateProvider = () =>
  ({
    isLoading: false,
    error: undefined,
    result: undefined,
  } as VerificationState)

const initialState = initialStateProvider()

const { actions, reducer } = createSlice({
  name: "verify",
  initialState,
  reducers: {
    emailVerificationStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    emailVerificationSuccessful: () => ({
      isLoading: false,
      error: false,
      result: "ok",
    }),
    emailVerificationError: () => ({
      ...initialState,
      error: true,
    }),
  },
})

const {
  emailVerificationStart,
  emailVerificationSuccessful,
  emailVerificationError,
} = actions

export const emailVerification = ({
  token,
  uidb64,
}: UserVerificationInputTypes): AppThunk => async (dispatch) => {
  try {
    dispatch(emailVerificationStart)
    await emailRegistrationMutation(token, uidb64)
    dispatch(emailVerificationSuccessful())
  } catch (e) {
    dispatch(emailVerificationError)
  }
}

export default reducer
