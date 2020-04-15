import { darken, makeStyles, Toolbar, Typography } from "@material-ui/core"
import React from "react"
import { ApplicationTheme } from "../../../styles/theme/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  toolbar: {
    backgroundColor:
      theme.palette.type === "dark"
        ? darken(theme.palette.primary.light, 0.6)
        : theme.palette.primary.light,
    minHeight: 48,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: "0 0 auto",
    "& h6": {
      fontSize: 16,
      color:
        theme.palette.type === "dark"
          ? darken(theme.palette.primary.light, 0.2)
          : darken(theme.palette.primary.dark, 0.2),
    },
  },
}))

interface DateFilterProps {
  title: React.ReactNode
  children: React.ReactNode
}

const FiltersToolbar = ({ title, children, ...props }: DateFilterProps) => {
  const classes = useStyles()
  return (
    <Toolbar className={classes.toolbar} {...props}>
      <div className={classes.title}>
        <Typography variant="h6">{title}</Typography>
      </div>
      <div className={classes.content}>{children}</div>
    </Toolbar>
  )
}

export default FiltersToolbar
