import React from "react"
import { Theme, makeStyles } from "@material-ui/core"
import { getColor, getColorContrast } from "../../../../utils/themeUtils"
import { ThemeColor } from "../../../../types/theme-types"

interface Props {
  headContent?: React.ReactNode
  footerContent?: React.ReactNode
  children: React.ReactNode
  backgroundColor?: ThemeColor
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: (props: any) =>
      props.backgroundColor
        ? getColor(theme, props.backgroundColor)
        : undefined,
    color: (props: any) =>
      props.backgroundColor
        ? getColorContrast(theme, props.backgroundColor)
        : undefined,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    width: "100%",
    padding: theme.spacing(1),
  },
  content: {
    flex: 1,
  },
}))

const Pane = ({
  headContent,
  footerContent,
  backgroundColor,
  children,
}: Props) => {
  const classes = useStyles({
    backgroundColor,
  })
  return (
    <div className={classes.root}>
      <div>{headContent}</div>
      <div className={classes.content}>{children}</div>
      <div>{footerContent}</div>
    </div>
  )
}

export default Pane
