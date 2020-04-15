import { loadStripe } from "@stripe/stripe-js"
import { PaymentProviderType } from "../../../../features/checkout/checkoutTypes"
import { PaymentDataFragment } from "../../../../api/backend-api"

const redirectToPayPal = (paymentData: PaymentDataFragment) => {
  if (!paymentData.paymentPayload) {
    throw new Error("Missing paylod data")
  }

  const payload = JSON.parse(paymentData.paymentPayload)
  const redirectUrl = payload.links.find((x: any) => x.rel === "approve")
  window.location.href = redirectUrl.href
}

const redirectToStripe = async (paymentData: PaymentDataFragment) => {
  if (!paymentData.paymentPayload) {
    throw new Error("Missing paylod data")
  }
  const payload = JSON.parse(paymentData.paymentPayload)
  const stripe = await loadStripe(payload.metadata.publicKey)
  await stripe?.redirectToCheckout({
    sessionId: payload.id,
  })
}

const redirectToPayment = (
  provider: PaymentProviderType,
  paymentData: PaymentDataFragment
) => {
  switch (provider) {
    case "Stripe":
      redirectToStripe(paymentData)
      break
    case "PayPal":
      redirectToPayPal(paymentData)
      break
    default:
      throw new Error(`Invalid provider ${provider}`)
  }
}

export { redirectToPayment }
