import { createSlice } from "@reduxjs/toolkit"

import {
  AuthenticationState,
  UserLoginMutationInputType,
  UserSocialLoginMutationType,
} from "./authenticationTypes"
import {
  userLoginMutation,
  userSocialLoginMutation,
} from "../../api/account/authentication/api"
import { AppThunk } from "../../state/store"
import { writeObject } from "../../services/deviceStorageService"

const initialStateProvider = () =>
  ({
    isLoading: false,
    error: undefined,
    isLoggedIn: false,
  } as AuthenticationState)

const initialState = initialStateProvider()

const { actions, reducer } = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    userLoginStart: () => ({
      ...initialState,
      isLoading: true,
      error: false,
    }),
    userLoginSuccessful: () => ({
      ...initialState,
      isLoading: false,
      error: false,
    }),
    userLoginFailure: () => ({
      ...initialState,
      error: true,
    }),
  },
})

const { userLoginStart, userLoginSuccessful, userLoginFailure } = actions

const setUser = (loginAction: any): AppThunk => async (dispatch) => {
  try {
    dispatch(userLoginStart)
    const { data } = await loginAction()
    if (data && (data.tokenAuth || data.socialAuth)) {
      const token = data.tokenAuth
        ? data.tokenAuth.token
        : data.socialAuth.token
      dispatch(userLoginSuccessful())
      return writeObject("token", token)
    }
  } catch (e) {
    dispatch(userLoginFailure())
  }
}

export const setUserLogin = (input: UserLoginMutationInputType) => {
  return setUser(async () => {
    const data = await userLoginMutation(input.username, input.password)
    return data
  })
}

export const setSocialLogin = (input: UserSocialLoginMutationType) => {
  return setUser(async () => {
    const data = await userSocialLoginMutation(
      input.accessToken,
      input.provider
    )
    return data
  })
}

export default reducer
