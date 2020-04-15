import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import { createStyles, withStyles, WithStyles } from "@material-ui/core/styles"

const styles = createStyles({
  circularProgress: {
    position: "fixed",
    top: "calc(50% - 45px)",
    left: "calc(50% - 45px)",
  },
})

function Loading({ classes }: WithStyles<typeof styles>) {
  return (
    <CircularProgress
      className={classes.circularProgress}
      size={90}
      thickness={1}
      color="secondary"
    />
  )
}

export default withStyles(styles)(Loading)
