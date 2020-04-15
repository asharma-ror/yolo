import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { RootState } from "../../../../state/rootReducer"
import { verifyReservation } from "../../../../features/checkout/checkoutSlice"
import {
  navigateToCheckoutPaymentError,
  navigateToReservationFinalizationError,
} from "../../../../utils/errorPages"
import Loader from "../../../../components/ui/molecules/Loader"

interface Params {
  paymentSessionId: string
  children: React.ReactNode
}

export const ReservationLoader = ({ paymentSessionId, children }: Params) => {
  const dispatch = useDispatch()
  const initialized = useSelector(
    (state: RootState) => state.checkout.initialized
  )
  React.useEffect(() => {
    dispatch(
      verifyReservation(
        paymentSessionId,
        (quotation) => {
          if (quotation.status !== "confirmed") {
            console.error(
              `Quotation ${quotation.quotationId} not in confirmed state`
            )
            navigateToReservationFinalizationError()
          }
        },
        (error) => {
          console.error(error)
          navigateToCheckoutPaymentError()
        }
      )
    )
  }, [])
  return <>{initialized ? <>{children}</> : <Loader fullScreen />}</>
}
