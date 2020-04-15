import {
  darken,
  fade,
  lighten,
  makeStyles,
  Table,
  Theme,
} from "@material-ui/core"
import React from "react"

const useStyles = makeStyles((theme: Theme) => ({
  stripped: {
    "& tbody tr:nth-child(even)": {
      background:
        theme.palette.type === "dark"
          ? fade(theme.palette.grey[900], 0.5)
          : theme.palette.grey[50],
    },
    "& tbody tr:hover": {
      background:
        theme.palette.type === "dark"
          ? darken(theme.palette.primary.light, 0.8)
          : lighten(theme.palette.primary.light, 0.5),
    },
  },
}))

interface Props {
  children: React.ReactNode
}

const StrippedTable = ({ children, ...props }: Props) => {
  const classes = useStyles()
  return (
    <Table className={classes.stripped} {...props}>
      {children}
    </Table>
  )
}

export default StrippedTable
