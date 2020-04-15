import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import {
  UserInterface,
  RegisterationState,
  UserRegisterationMutationInputType,
} from "./registrationTypes"
import { userRegisterationMutation } from "../../api/account/registeration/api"
import { AppThunk } from "../../state/store"

const initialStateProvider = () =>
  ({
    isLoading: false,
    error: {
      hasError: false,
      message: undefined,
    },
    user: undefined,
  } as RegisterationState)

const initialState = initialStateProvider()

const { actions, reducer } = createSlice({
  name: "register",
  initialState,
  reducers: {
    userRegisterStart: () => ({
      ...initialState,
      isLoading: true,
    }),
    userRegisterSuccessful: (state, action: PayloadAction<UserInterface>) => ({
      ...state,
      error: {
        hasError: false,
        message: undefined,
      },
      isLoading: false,
      user: action.payload,
    }),
    userRegisterFailure: (state, action: PayloadAction<string>) => ({
      ...state,
      error: {
        hasError: false,
        message: action.payload,
      },
    }),
  },
})

const {
  userRegisterStart,
  userRegisterSuccessful,
  userRegisterFailure,
} = actions

export const setUserRegisteration = ({
  password,
  firstName,
  lastName,
  email,
  birthday,
}: UserRegisterationMutationInputType): AppThunk => async (dispatch) => {
  try {
    dispatch(userRegisterStart)
    const { data } = await userRegisterationMutation(
      firstName,
      lastName,
      email,
      password,
      birthday,
      `${window.location.origin}/account/verify-email`
    )
    if (data && data.registerUser) {
      const user = data.registerUser.user
      if (user) dispatch(userRegisterSuccessful(user))
    }
  } catch (e) {
    dispatch(userRegisterFailure(e))
  }
}

export default reducer
