import Grid, { GridProps } from "@material-ui/core/Grid"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
import React from "react"

type Props = {
  children: React.ReactNode
  className?: string
  noGutters?: boolean
}

const useStyles = makeStyles({
  grid: {
    position: "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
    flexBasis: "auto",
  },
})

export default function GridItem({
  children,
  className = "",
  noGutters = false,
  ...rest
}: Props & GridProps) {
  const classes = useStyles()
  return (
    <Grid
      item
      {...rest}
      className={`${classes.grid} ${className}`}
      style={noGutters ? { paddingRight: 0, paddingLeft: 0 } : {}}
    >
      {children}
    </Grid>
  )
}
