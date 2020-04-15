import { combineReducers } from "@reduxjs/toolkit"

import searchReducer from "../features/search/searchSlice"
import checkoutReducer from "../features/checkout/checkoutSlice"
import authenticateReducer from "../features/account/authenticationSlice"
import registerReducer from "../features/account/registrationSlice"
import verifyReducer from "../features/account/verificationSlice"
import forgotPasswordReducer from "../features/account/forgotPasswordSlice"
import resetPasswordReducer from "../features/account/resetPasswordSlice"

const rootReducer = combineReducers({
  search: searchReducer,
  checkout: checkoutReducer,
  authenticate: authenticateReducer,
  register: registerReducer,
  verifyUser: verifyReducer,
  forgotPassword: forgotPasswordReducer,
  resetPassword: resetPasswordReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
