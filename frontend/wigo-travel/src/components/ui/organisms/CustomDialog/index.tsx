import useMediaQuery from "@material-ui/core/useMediaQuery"
import React from "react"
import Dialog from "@material-ui/core/Dialog"
import { useTheme, makeStyles } from "@material-ui/core/styles"
import { ThemeBreakpoint, ThemeColor } from "../../../../types/theme-types"
import { getColor, getColorContrast } from "../../../../utils/themeUtils"

interface Props {
  open: boolean
  onClose?: () => void
  fullScreen?: boolean
  fullScreenMaxBreakpoint: ThemeBreakpoint
  head?: React.ReactNode
  children?: React.ReactNode
  actions?: React.ReactNode
  backgoundColor?: ThemeColor
  padding?: string | number
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: (props: any) => props.backgoundColor,
    color: (props: any) => props.color,
    padding: (props: any) => props.padding ?? theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  head: {
    paddingBottom: theme.spacing(2),
  },
  content: {
    flex: 1,
  },
  actions: {
    paddingTop: theme.spacing(2),
  },
}))

const CustomDialog = ({
  open,
  onClose,
  fullScreen,
  fullScreenMaxBreakpoint,
  head,
  children,
  actions,
  backgoundColor,
  padding,
}: Props) => {
  const theme = useTheme()
  const dialogFullScreen =
    fullScreen && useMediaQuery(theme.breakpoints.down(fullScreenMaxBreakpoint))
  const classes = useStyles({
    backgoundColor: backgoundColor
      ? getColor(theme, backgoundColor)
      : undefined,
    color: backgoundColor ? getColorContrast(theme, backgoundColor) : undefined,
    padding,
  })
  return (
    <Dialog
      classes={{ paper: classes.root }}
      open={open}
      onClose={onClose}
      fullScreen={dialogFullScreen}
    >
      {head ? <div className={classes.head}>{head}</div> : undefined}
      {children ? <div className={classes.content}>{children}</div> : undefined}
      {actions ? <div className={classes.actions}>{actions}</div> : undefined}
    </Dialog>
  )
}

CustomDialog.defaultProps = {
  fullScreenMaxBreakpoint: "sm",
}

export default CustomDialog
