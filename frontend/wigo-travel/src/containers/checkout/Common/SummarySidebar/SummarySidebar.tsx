import { Button, Theme, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import React, { MouseEventHandler } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../../state/rootReducer"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(0, 3),
    textAlign: "center",
  },
  cta: {
    width: "100%",
  },
}))

interface Props {
  onClick: MouseEventHandler
  label: React.ReactNode
}

const SummarySidebar = ({ onClick, label }: Props) => {
  const classes = useStyles()
  const price = useSelector((state: RootState) => state.checkout.totalPrice)
  return (
    <div className={classes.root}>
      <Typography variant="h5">Product info</Typography>
      SIDEBAR CONTENT
      <Typography variant="h5">{price} €</Typography>
      <Button
        className={classes.cta}
        variant="contained"
        onClick={onClick}
        color="primary"
      >
        {label}
      </Button>
    </div>
  )
}

export default SummarySidebar
