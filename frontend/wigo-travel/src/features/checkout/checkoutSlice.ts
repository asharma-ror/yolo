import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  CheckoutState,
  InitializeQuotationPayload,
  UpdateQuotationPayload,
  QuotationDataPayload,
  SetPassengersMutationInput,
  PaymentGroup,
} from "./checkoutTypes"
import { AppThunk } from "../../state/store"
import { QuotationNode } from "../../api/backend-api"
import { extractQuotationPayload } from "./converters/quotationToStateConverter"
import {
  createQuotationMuation,
  addAdditionalServiceMutation,
  removeAdditionalServiceMutation,
  getQuotationQuery,
  setQuotationPassengersMutation,
  verifyReservationMutation,
  addDiscountTicketMutation,
  removeDiscountTicketMutation,
} from "../../api/quotations/api"
import {
  toCustomerInput,
  toRoomPassengersInput,
} from "./converters/stateToQuotationConverter"
import { selectMany } from "../../utils/arrayUtils"

const initialStateProvider = () =>
  ({
    quotationId: "",
    quotationStatus: "",
    totalPrice: undefined,
    depositPrice: undefined,
    occupancy: undefined,
    customer: undefined,
    rooms: undefined,
    includedServices: [],
    additionalServices: [],
    discounts: [],
    paymentMethods: undefined,
    selectedPaymentOption: undefined,
    isLoading: false,
    initialized: false,
    error: undefined,
  } as CheckoutState)

const initialState = initialStateProvider()

const operationFailed = (
  state: CheckoutState,
  action: PayloadAction<string>
) => {
  state.isLoading = false
  state.error = action.payload
}

const setQuotationData = (
  state: CheckoutState,
  payload: QuotationDataPayload
) => {
  state.quotationStatus = payload.quotationStatus
  state.totalPrice = payload.totalPrice
  state.depositPrice = payload.depositPrice
  state.additionalServices = payload.additionalServices
  state.includedServices = payload.includedServices
  state.discounts = payload.discountTicket
  state.customer = payload.customer
  state.rooms = payload.rooms
  state.occupancy = payload.occupancy
  state.paymentMethods = payload.paymentMethods
  if (payload.paymentMethods && !state.selectedPaymentOption) {
    state.selectedPaymentOption = payload.paymentMethods[0].options[0]
  }
}

const getPaymentOption = (patments: PaymentGroup[], id: string) =>
  selectMany(patments, (x) => x.options).find((x) => x.id === id)

const checkout = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    initializeQuotationStart() {
      const state = initialStateProvider()
      state.isLoading = true
      return state
    },
    initializeQuotationSuccess(
      state,
      action: PayloadAction<InitializeQuotationPayload>
    ) {
      setQuotationData(state, action.payload)
      state.quotationId = action.payload.quotationId
      state.initialized = true
      state.error = undefined
    },
    initializeQuotationError: operationFailed,
    updateQuotationStart(state) {
      state.isLoading = true
      state.error = undefined
    },
    updateQuotationSuccess(
      state,
      action: PayloadAction<UpdateQuotationPayload>
    ) {
      setQuotationData(state, action.payload)
      state.isLoading = false
      state.error = undefined
    },
    updateQuotationError: operationFailed,
    selectPaymentOption(state, action: PayloadAction<string>) {
      state.selectedPaymentOption = getPaymentOption(
        state.paymentMethods as PaymentGroup[],
        action.payload
      )
    },
  },
})

export const {
  initializeQuotationStart,
  initializeQuotationSuccess,
  initializeQuotationError,
  updateQuotationStart,
  updateQuotationSuccess,
  updateQuotationError,
  selectPaymentOption,
} = checkout.actions
export default checkout.reducer

const initializeQuotation = (
  updateAction: () => Promise<QuotationNode>,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(initializeQuotationStart())
    const quotation = await updateAction()
    if (!quotation) {
      throw new Error("Empty quotation response")
    }
    dispatch(initializeQuotationSuccess(extractQuotationPayload(quotation)))
    if (callback) {
      callback(quotation)
    }
  } catch (error) {
    console.error(error)
    dispatch(initializeQuotationError(error.toString()))
    if (errorCallback) {
      errorCallback(error)
    }
  }
}

export const createQuotation = (
  availabilityKeys: string[],
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return initializeQuotation(
    async () => {
      const result = await createQuotationMuation(availabilityKeys)
      return result.data?.createQuotation?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}

export const loadQuotation = (quotationId: string) => {
  return initializeQuotation(async () => {
    const result = await getQuotationQuery(quotationId)
    return result.data.quotation as QuotationNode
  })
}

const updateQuotation = (
  updateAction: () => Promise<QuotationNode>,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
): AppThunk => async (dispatch) => {
  try {
    dispatch(updateQuotationStart())
    const quotation = await updateAction()
    if (!quotation) {
      throw new Error("Empty quotation response")
    }
    dispatch(updateQuotationSuccess(extractQuotationPayload(quotation)))
    if (callback) {
      callback(quotation)
    }
  } catch (error) {
    console.error(error)
    dispatch(updateQuotationError(error.toString()))
    if (errorCallback) {
      errorCallback(error)
    }
  }
}

export const addAdditionalService = (
  quotationId: string,
  serviceId: string,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return updateQuotation(
    async () => {
      const result = await addAdditionalServiceMutation(quotationId, serviceId)
      return result.data?.addAdditionalService?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}

export const removeAdditionalService = (
  quotationId: string,
  serviceId: string,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return updateQuotation(
    async () => {
      const result = await removeAdditionalServiceMutation(
        quotationId,
        serviceId
      )
      return result.data?.removeAdditionalService?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}

export const addDiscountTicket = (
  quotationId: string,
  discountCode: string,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return updateQuotation(
    async () => {
      const result = await addDiscountTicketMutation(quotationId, discountCode)
      return result.data?.addDiscountTicket?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}

export const removeDiscountTicket = (
  quotationId: string,
  discountCode: string,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return updateQuotation(
    async () => {
      const result = await removeDiscountTicketMutation(
        quotationId,
        discountCode
      )
      return result.data?.removeDiscountTicket?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}

export const setQuotationPassengers = (
  input: SetPassengersMutationInput,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return updateQuotation(
    async () => {
      const result = await setQuotationPassengersMutation(
        input.quotationId,
        toCustomerInput(input.customer),
        input.rooms.map((x) => toRoomPassengersInput(x))
      )
      return result.data?.setQuotationPassengers?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}

export const verifyReservation = (
  paymentSessionId: string,
  callback?: (quotation: QuotationNode) => void,
  errorCallback?: (error: any) => void
) => {
  return initializeQuotation(
    async () => {
      const result = await verifyReservationMutation(paymentSessionId)
      return result.data?.verifyReservation?.reservation
        ?.quotation as QuotationNode
    },
    callback,
    errorCallback
  )
}
