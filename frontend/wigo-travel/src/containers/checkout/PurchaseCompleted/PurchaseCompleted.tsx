import { Box, Container, Divider, Grid, Hidden } from "@material-ui/core"
import React from "react"
import DefaultLayout from "../../../components/layouts/default/DefaultLayout"
import CheckoutStepper from "../Common/CheckoutStepper/CheckoutStepper"
import PurchaseRelatedContents from "./components/PurchaseRelatedContents/PurchaseRelatedContents"
import ThankYouMessage from "./components/ThankYouMessage/ThankYouMessage"

const PurchaseCompleted = () => {
  return (
    <DefaultLayout>
      <Container>
        <Grid container>
          <Grid item xs={12} sm={9}>
            <CheckoutStepper step={3}></CheckoutStepper>
            <Hidden smUp>
              <Divider></Divider>
            </Hidden>
            <Box my={3}>
              <ThankYouMessage />
            </Box>
            <Box my={1}>
              <Divider />
            </Box>
            <Box my={1}>
              <PurchaseRelatedContents />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Hidden smDown>SIDEBAR</Hidden>
          </Grid>
        </Grid>
      </Container>
    </DefaultLayout>
  )
}

export default PurchaseCompleted
