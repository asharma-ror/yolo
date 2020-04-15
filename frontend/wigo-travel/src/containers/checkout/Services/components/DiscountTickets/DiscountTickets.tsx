import {
  Button,
  FormGroup,
  makeStyles,
  TextField,
  Theme,
  Box,
  Grid,
} from "@material-ui/core"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  addDiscountTicket,
  removeDiscountTicket,
} from "../../../../../features/checkout/checkoutSlice"
import { RootState } from "../../../../../state/rootReducer"
import ErrorSnackbar from "../../../../../components/ui/molecules/ErrorSnackbar"
import { DiscountTicket } from "../../../../../features/checkout/checkoutTypes"

const useStyles = makeStyles((theme: Theme) => ({
  codeInput: {
    marginRight: theme.spacing(2),
    flex: 1,
  },
}))

interface AppliedDiscountProps {
  quotationId: string
  discount: DiscountTicket
}

const AppliedDiscount = ({ discount, quotationId }: AppliedDiscountProps) => {
  const dispatch = useDispatch()
  const [discountCodeError, setDiscountCodeError] = React.useState(false)
  const removeDiscount = () => {
    setDiscountCodeError(false)
    dispatch(
      removeDiscountTicket(quotationId, discount.code, undefined, () =>
        setDiscountCodeError(true)
      )
    )
  }
  return (
    <>
      <Grid container>
        <Grid item sm={8}>
          <p>Codice sconto: {discount.code}</p>
          <p>Buono da {discount.amount} €</p>
        </Grid>
        <Grid item sm={4}>
          <Button onClick={() => removeDiscount()}>Rimuovi</Button>
        </Grid>
      </Grid>
      <ErrorSnackbar
        condition={discountCodeError}
        message="Errore rimozione buono sconto"
      ></ErrorSnackbar>
    </>
  )
}

const DiscountTickets = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const quotationId = useSelector(
    (state: RootState) => state.checkout.quotationId
  )
  const discounts = useSelector((state: RootState) => state.checkout.discounts)
  const [discountCode, setDiscountCode] = React.useState("")
  const [discountCodeError, setDiscountCodeError] = React.useState(false)

  const addDiscount = () => {
    setDiscountCodeError(false)
    dispatch(
      addDiscountTicket(
        quotationId,
        discountCode.trim(),
        () => setDiscountCode(""),
        () => setDiscountCodeError(true)
      )
    )
  }

  return (
    <>
      <form noValidate autoComplete="off">
        <FormGroup row>
          <TextField
            label="Codice Sconto"
            value={discountCode}
            onChange={(event) => setDiscountCode(event.target.value)}
            className={classes.codeInput}
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addDiscount()}
          >
            Applica
          </Button>
          <ErrorSnackbar
            condition={discountCodeError}
            message="Buono sconto non valido"
          ></ErrorSnackbar>
        </FormGroup>
      </form>
      <Box mt={2}>
        {discounts.map((x) => (
          <AppliedDiscount
            key={x.code}
            quotationId={quotationId}
            discount={x}
          />
        ))}
      </Box>
    </>
  )
}

export default DiscountTickets
