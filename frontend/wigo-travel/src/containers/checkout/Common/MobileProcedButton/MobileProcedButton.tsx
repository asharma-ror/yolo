import {
  Box,
  Button,
  Hidden,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core"
import React, { MouseEventHandler } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../state/rootReducer"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: 0,
    width: "100%",
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.default,
    zIndex: 1,
  },
  cta: {
    width: "100%",
  },
}))

interface Props {
  onClick: MouseEventHandler
  label: React.ReactNode
}

const MobileProcedButton = ({ onClick, label }: Props) => {
  const classes = useStyles()
  const price = useSelector((state: RootState) => state.checkout.totalPrice)
  return (
    <Hidden smUp>
      <Box className={classes.root}>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          mb={1}
        >
          <Typography variant="h5"></Typography>
          <Typography variant="h5">{price} €</Typography>
        </Box>
        <Button
          className={classes.cta}
          variant="contained"
          onClick={onClick}
          color="primary"
        >
          {label}
        </Button>
      </Box>
    </Hidden>
  )
}

export default MobileProcedButton
