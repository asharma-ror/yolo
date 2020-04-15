import { makeStyles, Step, StepLabel, Stepper, Theme } from "@material-ui/core"
import React from "react"

function getSteps() {
  return ["Servizi", "Passeggeri", "Pagamento"]
}

const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}))

interface Props {
  step: number
}

// todo: implement state with redux and delete step input prop

const CheckoutStepper = ({ step }: Props) => {
  const classes = useStyles()
  const steps = getSteps()

  return (
    <Stepper activeStep={step} className={classes.stepper}>
      {steps.map((label) => {
        const stepProps: { completed?: boolean } = {}
        const labelProps: { optional?: React.ReactNode } = {}

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        )
      })}
    </Stepper>
  )
}

export default CheckoutStepper
