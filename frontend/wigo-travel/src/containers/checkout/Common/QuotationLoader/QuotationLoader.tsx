import React from "react"
import { useSelector, useDispatch } from "react-redux"

import { RootState } from "../../../../state/rootReducer"
import { loadQuotation } from "../../../../features/checkout/checkoutSlice"
import Loader from "../../../../components/ui/molecules/Loader"

interface Params {
  quotationId: string | undefined
  children: React.ReactNode
}

export const QuotationLoader = ({ quotationId, children }: Params) => {
  const dispatch = useDispatch()
  const initialized = useSelector(
    (state: RootState) => state.checkout.initialized
  )
  const isLoading = useSelector((state: RootState) => state.checkout.isLoading)

  if (!initialized && !isLoading && quotationId) {
    dispatch(loadQuotation(quotationId))
  }

  return <>{initialized ? <>{children}</> : <Loader fullScreen />}</>
}
