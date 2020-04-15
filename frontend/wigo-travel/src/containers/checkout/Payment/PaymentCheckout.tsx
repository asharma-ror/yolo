import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  makeStyles,
} from "@material-ui/core"
import React from "react"
import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import BackButton from "../Common/BackButton/BackButton"
import CheckoutStepper from "../Common/CheckoutStepper/CheckoutStepper"
import MobileProcedButton from "../Common/MobileProcedButton/MobileProcedButton"
import SummarySidebar from "../Common/SummarySidebar/SummarySidebar"
import PaymentOptions from "./components/PaymentOptions/PaymentOptions"
import PurchaseSummary from "./components/PurchaseSummary/PurchaseSummary"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/rootReducer"
import { navigateToCheckoutPassengers } from "../../../utils/navigationUtils"
import { PaymentGroup } from "../../../features/checkout/checkoutTypes"
import {
  useInitializePaymentMutation,
  PaymentDataFragment,
} from "../../../api/backend-api"
import { redirectToPayment } from "./services/paymentService"
import { createInitPaymentData } from "./converters/paymentRequestConverter"
import ErrorSnackbar from "../../../components/ui/molecules/ErrorSnackbar"
import Loader from "../../../components/ui/molecules/Loader"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 50,
  },
  main: {
    flex: 1,
  },
})

const PaymentCheckout = () => {
  const classes = useStyles()
  const quotationId = useSelector(
    (state: RootState) => state.checkout.quotationId
  )
  const paymentMethods = useSelector(
    (state: RootState) => state.checkout.paymentMethods
  )
  const selectedPaymentOption = useSelector(
    (state: RootState) => state.checkout.selectedPaymentOption
  )
  const [initializePayment, { error, loading }] = useInitializePaymentMutation()

  if (!paymentMethods) {
    navigateToCheckoutPassengers(quotationId)
  }

  const handlePurchaseSubmit = () => {
    if (!selectedPaymentOption) {
      throw new Error("No selected payment option")
    }

    initializePayment({
      variables: {
        paymentData: createInitPaymentData(quotationId, selectedPaymentOption),
      },
    }).then((x) =>
      redirectToPayment(
        selectedPaymentOption.provider,
        x.data?.initializePayment?.paymentData as PaymentDataFragment
      )
    )
  }

  return (
    <DefaultLayout hideFooterWhenSm customSmHeaderControl={<BackButton />}>
      <div className={classes.root}>
        <Container className={classes.main}>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <CheckoutStepper step={2}></CheckoutStepper>
              <Hidden smUp>
                <Divider></Divider>
              </Hidden>
              <Hidden smDown>
                <BackButton>Indietro</BackButton>
              </Hidden>
              <Box my={1}>
                <PurchaseSummary />
              </Box>
              <Divider />
              <Box my={1}>
                <PaymentOptions
                  paymentMethods={paymentMethods as PaymentGroup[]}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Hidden smDown>
                <Box mt={10}>
                  <SummarySidebar
                    label="Acquista"
                    onClick={() => handlePurchaseSubmit()}
                  ></SummarySidebar>
                </Box>
              </Hidden>
            </Grid>
          </Grid>
        </Container>
        <MobileProcedButton
          label="Acquista"
          onClick={() => handlePurchaseSubmit()}
        ></MobileProcedButton>
        {loading ? <Loader fullScreen /> : undefined}
        <ErrorSnackbar
          condition={error}
          message="Si è verificato un errore durante la transazione"
        ></ErrorSnackbar>
      </div>
    </DefaultLayout>
  )
}

export default PaymentCheckout
