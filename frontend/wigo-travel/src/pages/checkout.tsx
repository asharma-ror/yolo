import { RouteComponentProps, Router } from "@reach/router"
import React from "react"
import PassengersCheckout from "../containers/checkout/Passengers/PassengersCheckout"
import PaymentCheckout from "../containers/checkout/Payment/PaymentCheckout"
import PurchaseCompleted from "../containers/checkout/PurchaseCompleted/PurchaseCompleted"
import ServicesCheckout from "../containers/checkout/Services/ServicesCheckout"
import { QuotationLoader } from "../containers/checkout/Common/QuotationLoader/QuotationLoader"
import { ReservationLoader } from "../containers/checkout/Common/ReservationLoader/ReservationLoader"
import { getQueryParam } from "../utils/urlUtils"
import SEO from "../components/seo/SEO"

const Checkout = () => {
  return (
    <>
      <SEO title="Checkout" noIndex />
      <Router>
        <RouterPage
          path="/checkout/:quotationId/services"
          pageComponent={(
            props: RouteComponentProps<{ quotationId: string }>
          ) => (
            <QuotationLoader quotationId={props.quotationId}>
              <ServicesCheckout></ServicesCheckout>
            </QuotationLoader>
          )}
        />
        <RouterPage
          path="/checkout/:quotationId/passengers"
          pageComponent={(
            props: RouteComponentProps<{ quotationId: string }>
          ) => (
            <QuotationLoader quotationId={props.quotationId}>
              <PassengersCheckout></PassengersCheckout>
            </QuotationLoader>
          )}
        />
        <RouterPage
          path="/checkout/:quotationId/payment"
          pageComponent={(
            props: RouteComponentProps<{ quotationId: string }>
          ) => (
            <QuotationLoader quotationId={props.quotationId}>
              <PaymentCheckout></PaymentCheckout>
            </QuotationLoader>
          )}
        />
        <RouterPage
          path="/checkout/:quotationId/thank-you"
          pageComponent={(props: RouteComponentProps<{}>) => (
            <>
              {getQueryParam(props.location, "s") ? (
                <ReservationLoader
                  paymentSessionId={getQueryParam(props.location, "s")}
                >
                  <PurchaseCompleted></PurchaseCompleted>
                </ReservationLoader>
              ) : undefined}
            </>
          )}
        />
      </Router>
    </>
  )
}

export default Checkout

const RouterPage = ({
  pageComponent,
  ...routerProps
}: {
  pageComponent: (routerProps: RouteComponentProps) => JSX.Element
} & RouteComponentProps) => {
  return <>{pageComponent(routerProps)}</>
}
