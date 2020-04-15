import React from "react"
import Service from "../Service/Service"
import WorkIcon from "@material-ui/icons/Work"
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "../../../../../state/rootReducer"
import { Box, Typography, Button, makeStyles, Theme } from "@material-ui/core"
import {
  addAdditionalService,
  removeAdditionalService,
} from "../../../../../features/checkout/checkoutSlice"
import { QuantityType } from "../../../../../features/checkout/checkoutTypes"

const useStyles = makeStyles((theme: Theme) => ({
  price: {
    margin: theme.spacing(0, 2),
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

const QuantityLabel = (value: QuantityType) => {
  switch (value) {
    case "PerPerson":
      return <> A persona</>
    case "PerReservation":
      return <> Totale</>
    case "PerRoom":
      return <> Totali</>
    default:
      return undefined
  }
}

const AdditionalServices = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const quotationId = useSelector(
    (state: RootState) => state.checkout.quotationId
  )
  const additionalServices = useSelector(
    (state: RootState) => state.checkout.additionalServices
  )
  return (
    <>
      {additionalServices.map((service) => (
        <Service
          key={service.id}
          icon={<WorkIcon fontSize="large" color="action"></WorkIcon>}
          name={service.displayName}
          description={service.description}
        >
          <Box className={classes.actions}>
            <Box className={classes.price}>
              <Typography variant="h6">
                <>{service.isSelected ? "-" : "+"}</>
                <>
                  {service.price.amount}{" "}
                  {service.price.type === "total" ? "€" : "%"}
                </>
              </Typography>
              <Typography>{QuantityLabel(service.quantityType)}</Typography>
            </Box>
            <>
              {service.isSelected ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    dispatch(removeAdditionalService(quotationId, service.id))
                  }
                >
                  Rimuovi
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() =>
                    dispatch(addAdditionalService(quotationId, service.id))
                  }
                >
                  Aggiungi
                </Button>
              )}
            </>
          </Box>
        </Service>
      ))}
    </>
  )
}

export default AdditionalServices
