import Grid, { GridProps } from "@material-ui/core/Grid"
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles"
// nodejs library to set properties for components
import React from "react"

type Props = {
  children: React.ReactNode
  className?: string
  justify?: string
  alignItems?: string
}

const styles = {
  grid: {
    // marginRight: '-15px',
    // marginLeft: '-15px',
    width: "auto",
  },
}

const useStyles = makeStyles(styles)

export default function GridContainer({
  children,
  className = "",
  justify = "center",
  alignItems = "center",
  ...rest
}: Props & GridProps) {
  const classes = useStyles()
  return (
    <Grid
      container
      {...rest}
      className={`${classes.grid} ${className}`}
      justify={justify}
      alignItems={alignItems}
    >
      {children}
    </Grid>
  )
}
