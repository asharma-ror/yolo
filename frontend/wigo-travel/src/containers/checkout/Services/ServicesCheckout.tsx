import {
  Box,
  Container,
  Divider,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core"
import React from "react"
import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import BackButton from "../Common/BackButton/BackButton"
import CheckoutStepper from "../Common/CheckoutStepper/CheckoutStepper"
import MobileProcedButton from "../Common/MobileProcedButton/MobileProcedButton"
import SummarySidebar from "../Common/SummarySidebar/SummarySidebar"
import AdditionalServices from "./components/AdditionalServices/AdditionalServices"
import DiscountTickets from "./components/DiscountTickets/DiscountTickets"
import IncludedServices from "./components/IncludedServices/IncludedServices"
import { useSelector } from "react-redux"
import { RootState } from "../../../state/rootReducer"
import { navigateToCheckoutPassengers } from "../../../utils/navigationUtils"

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 90,
  },
  main: {
    flex: 1,
  },
})

const ServicesCheckout = () => {
  const classes = useStyles()
  React.useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 50)
  })
  const quotationId = useSelector(
    (state: RootState) => state.checkout.quotationId
  )

  return (
    <DefaultLayout hideFooterWhenSm customSmHeaderControl={<BackButton />}>
      <div className={classes.root}>
        <Container className={classes.main}>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <CheckoutStepper step={0}></CheckoutStepper>
              <Hidden smUp>
                <Divider></Divider>
              </Hidden>
              <Hidden smDown>
                <BackButton>Indietro</BackButton>
              </Hidden>
              {/* <TravelSummary></TravelSummary> */}
              <Box mt={1} mb={4}>
                <Typography variant="h6">Servizi</Typography>
                <IncludedServices></IncludedServices>
                <AdditionalServices></AdditionalServices>
              </Box>
              <Box my={1}>
                <Typography variant="h6">Hai un codice sconto?</Typography>
                <Grid container justify="center">
                  <Grid item xs={12} sm={6}>
                    <DiscountTickets />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Hidden smDown>
                <Box mt={10}>
                  <SummarySidebar
                    label="Procedi"
                    onClick={() => navigateToCheckoutPassengers(quotationId)}
                  ></SummarySidebar>
                </Box>
              </Hidden>
            </Grid>
          </Grid>
        </Container>
        <MobileProcedButton
          label="Procedi"
          onClick={() => navigateToCheckoutPassengers(quotationId)}
        ></MobileProcedButton>
      </div>
    </DefaultLayout>
  )
}

export default ServicesCheckout
