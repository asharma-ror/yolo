import { navigate } from "gatsby"

const ERROR_PAGE_PREFIX = "error"

const ERROR_CATEGORIES = {
  GENERIC: "generic",
  CHECKOUT: "checkout",
}

const navigateToErrorPage = (errorCategory: string, errorType: string) => {
  navigate(`/${ERROR_PAGE_PREFIX}/${errorCategory}/${errorType}`)
}

const navigateToGenericErrorPage = (errorType: string) => {
  navigateToErrorPage(ERROR_CATEGORIES.GENERIC, errorType)
}

const navigateToCheckoutErrorPage = (errorType: string) => {
  navigateToErrorPage(ERROR_CATEGORIES.CHECKOUT, errorType)
}

export const navigateToInternalServerError = () =>
  navigateToGenericErrorPage("internal-server-error")

export const navigateToGenericCheckoutError = () =>
  navigateToCheckoutErrorPage("generic-error")

export const navigateToCheckoutPaymentError = () =>
  navigateToCheckoutErrorPage("payment-verification")

export const navigateToReservationFinalizationError = () =>
  navigateToCheckoutErrorPage("reservation-finalization")

export const navigateToQuotationNotFoundError = () =>
  navigateToCheckoutErrorPage("quotation-not-found")
