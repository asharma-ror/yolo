import { faPaypal } from "@fortawesome/free-brands-svg-icons"
import { faCreditCard } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  Box,
  Grid,
  makeStyles,
  Radio,
  RadioGroup,
  Theme,
  Typography,
} from "@material-ui/core"
import React from "react"
import { getGreyBackgroundColor } from "../../../../../utils/themeUtils"
import {
  PaymentGroup,
  PaymentProviderType,
  PaymentOption,
} from "../../../../../features/checkout/checkoutTypes"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../../state/rootReducer"
import { selectPaymentOption } from "../../../../../features/checkout/checkoutSlice"

const useStyles = makeStyles((theme: Theme) => ({
  optionRoot: {
    backgroundColor: getGreyBackgroundColor(theme),
    margin: theme.spacing(1, 0),
  },
  optionsContainer: {
    display: "block",
  },
}))

interface PaymentProviderInfo {
  provider: PaymentProviderType
  icon: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

interface PaymentOptionProps {
  option: PaymentOption
  info: PaymentProviderInfo
}

const paymentProvidersInfo: PaymentProviderInfo[] = [
  {
    provider: "Stripe",
    icon: <FontAwesomeIcon icon={faCreditCard} size="lg" />,
    title: "Carta Di Credito",
    description: "",
  },
  {
    provider: "PayPal",
    icon: <FontAwesomeIcon icon={faPaypal} size="lg" />,
    title: "PayPal",
    description: "",
  },
]

const getProviderInfo = (type: PaymentProviderType) =>
  paymentProvidersInfo.find((x) => x.provider === type) as PaymentProviderInfo

const PaymentOptionSelection = ({ option, info }: PaymentOptionProps) => {
  const classes = useStyles()
  return (
    <Box className={classes.optionRoot}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Radio value={option.id} />
        </Grid>
        <Grid item xs={2}>
          {info.icon}
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">{info.title}</Typography>
          {info.description ? (
            <Typography variant="subtitle1">{info.description}</Typography>
          ) : undefined}
        </Grid>
      </Grid>
    </Box>
  )
}

interface PaymentModeParams {
  payment: PaymentGroup
}

const PaymentMode = ({ payment }: PaymentModeParams) => {
  return (
    <Box>
      <Typography>Page {payment.amount} €</Typography>
      {payment.options.map((x) => (
        <PaymentOptionSelection
          key={x.id}
          option={x}
          info={getProviderInfo(x.provider)}
        />
      ))}
    </Box>
  )
}

interface Params {
  paymentMethods: PaymentGroup[]
}

const PaymentOptions = ({ paymentMethods }: Params) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const selectedPaymentOption = useSelector(
    (state: RootState) => state.checkout.selectedPaymentOption
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectPaymentOption((event.target as HTMLInputElement).value))
  }

  return (
    <>
      <Typography variant="h6">Paga con</Typography>
      <RadioGroup
        className={classes.optionsContainer}
        value={selectedPaymentOption?.id}
        onChange={handleChange}
      >
        {paymentMethods.map((group) => (
          <PaymentMode key={group.type.toString()} payment={group} />
        ))}
      </RadioGroup>
    </>
  )
}

export default PaymentOptions
