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
import AccountLogin from "./components/AccountLogin/AccountLogin"
import TravelersForm from "./components/TravelersForm/TravelersForm"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../state/rootReducer"
import { navigateToCheckoutPayment } from "../../../utils/navigationUtils"
import { useForm } from "react-hook-form"
import {
  Occupancy,
  Customer,
  RoomPassengers,
} from "../../../features/checkout/checkoutTypes"
import { setQuotationPassengers } from "../../../features/checkout/checkoutSlice"
import {
  mergeCustomerWithPassengers,
  getFormDefaultValue,
} from "./converters/passengersFormConverter"
import ReduxErrorSnackbar from "../../../components/ui/molecules/ReduxErrorSnackbar"
import validationSchema from "./schema/validation"

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

const PassengersCheckout = () => {
  const classes = useStyles()
  const quotationId = useSelector(
    (state: RootState) => state.checkout.quotationId
  )
  const occupancy = useSelector((state: RootState) => state.checkout.occupancy)
  const customer = useSelector((state: RootState) => state.checkout.customer)
  const rooms = useSelector((state: RootState) => state.checkout.rooms)
  const { register, control, errors, handleSubmit } = useForm({
    defaultValues: getFormDefaultValue(occupancy as Occupancy, customer, rooms),
    validationSchema: validationSchema(rooms as RoomPassengers[]),
  })
  const dispatch = useDispatch()

  const onSubmit = (data: any) => {
    dispatch(
      setQuotationPassengers(
        {
          quotationId: quotationId,
          customer: data.customer as Customer,
          rooms: mergeCustomerWithPassengers(
            data.customer as Customer,
            (data.rooms ?? [{ passengers: [] }]) as RoomPassengers[]
          ),
        },
        () => navigateToCheckoutPayment(quotationId)
      )
    )
  }

  return (
    <DefaultLayout hideFooterWhenSm customSmHeaderControl={<BackButton />}>
      <div className={classes.root}>
        <Container className={classes.main}>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <CheckoutStepper step={1}></CheckoutStepper>
              <Hidden smUp>
                <Divider></Divider>
              </Hidden>
              <Hidden smDown>
                <BackButton>Indietro</BackButton>
              </Hidden>
              <Box my={2}>
                <Typography variant="h6">Hai già un account?</Typography>
                <AccountLogin />
              </Box>
              <Hidden smUp>
                <Divider></Divider>
              </Hidden>
              <TravelersForm
                occupancy={occupancy as Occupancy}
                register={register}
                control={control}
                errors={errors}
              />
              <ReduxErrorSnackbar
                errorSelector={(state) => state.checkout.error}
                message="Errore"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Hidden smDown>
                <Box mt={10}>
                  <SummarySidebar
                    label="Procedi"
                    onClick={handleSubmit(onSubmit)}
                  ></SummarySidebar>
                </Box>
              </Hidden>
            </Grid>
          </Grid>
        </Container>
        <MobileProcedButton
          label="Procedi"
          onClick={handleSubmit(onSubmit)}
        ></MobileProcedButton>
      </div>
    </DefaultLayout>
  )
}

export default PassengersCheckout
