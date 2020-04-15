import React from "react"
import Service from "../Service/Service"
import WorkIcon from "@material-ui/icons/Work"
import CheckIcon from "@material-ui/icons/Check"
import { useSelector } from "react-redux"
import { RootState } from "../../../../../state/rootReducer"
import { makeStyles, Theme, Box, Typography } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) => ({
  included: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  check: {
    color: theme.palette.success.main,
  },
}))

const IncludedServices = () => {
  const classes = useStyles()
  const includedServices = useSelector(
    (state: RootState) => state.checkout.includedServices
  )

  return (
    <>
      {includedServices.map((service) => (
        <Service
          key={service.id}
          icon={<WorkIcon fontSize="large" color="action"></WorkIcon>}
          name={service.displayName}
          description={service.description}
        >
          <Box className={classes.included}>
            <Typography variant="h6">Incluso</Typography>
            <CheckIcon className={classes.check}></CheckIcon>
          </Box>
        </Service>
      ))}
    </>
  )
}

export default IncludedServices
