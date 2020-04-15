import { navigate } from "gatsby"

export const navigateToCheckoutServices = (quotationId: string) => {
  navigate(`/checkout/${quotationId}/services`)
}

export const navigateToCheckoutPassengers = (quotationId: string) => {
  navigate(`/checkout/${quotationId}/passengers`)
}

export const navigateToCheckoutPayment = (quotationId: string) => {
  navigate(`/checkout/${quotationId}/payment`)
}

export const buildThankYouPageAbsoluteUrl = (quotationId: string) => {
  return `${window.location.origin}/checkout/${quotationId}/thank-you`
}
