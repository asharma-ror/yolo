import {
  PaymentOption,
  PaymentProviderType,
  PaymentAmountType,
} from "../../../../features/checkout/checkoutTypes"
import { buildThankYouPageAbsoluteUrl } from "../../../../utils/navigationUtils"

const PAYPAL_PAYMENT_PROVIDER_ID = "pay_pal"
const STRIPE_PAYMENT_PROVIDER_ID = "stripe"

const DEPOSIT_PAYMENT_TYPE = "deposit"
const FULL_AMOUNT_PAYMENT_TYPE = "full_amount"

const backendProviderId = (provider: PaymentProviderType) => {
  switch (provider) {
    case "Stripe":
      return STRIPE_PAYMENT_PROVIDER_ID
    case "PayPal":
      return PAYPAL_PAYMENT_PROVIDER_ID
    default:
      throw new Error(`Invalid provider type ${provider}`)
  }
}

const backendPaymentType = (type: PaymentAmountType) => {
  switch (type) {
    case "Total":
      return FULL_AMOUNT_PAYMENT_TYPE
    case "Deposit":
      return DEPOSIT_PAYMENT_TYPE
    default:
      throw new Error(`Invalid payment type ${type}`)
  }
}

const createInitPaymentData = (
  quotationId: string,
  paymentOption: PaymentOption
) => ({
  quotationId: quotationId,
  providerId: backendProviderId(paymentOption.provider),
  payment: {
    method: "",
    type: backendPaymentType(paymentOption.type),
    payload: JSON.stringify({
      productName: "Product Name",
    }),
  },
  paymentCancelBaseUrl: window.location.href,
  paymentSuccessBaseUrl: buildThankYouPageAbsoluteUrl(quotationId),
})

export { createInitPaymentData }
