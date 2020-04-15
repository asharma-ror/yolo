import React from "react"
import { makeStyles, useTheme } from "@material-ui/core/styles"
import { CircularProgress } from "@material-ui/core"
import { ThemeColor } from "../../../../types/theme-types"
import { getThemeColor } from "../../../../utils/themeUtils"

const useStyles = makeStyles(() => ({
  regular: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    width: "100vw",
    overflowX: "hidden",
    overflowY: "hidden",
    zIndex: 10000000,
    backgroundColor: "rgba(255,255,255, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    color: (props: any) => props.loaderColor,
  },
}))

interface Props {
  fullScreen?: boolean
  color: ThemeColor
  negative?: boolean
}

const Loader = ({ fullScreen, color, negative }: Props) => {
  const theme = useTheme()
  const classes = useStyles({
    loaderColor: getThemeColor(theme, color, negative),
  })
  return (
    <div className={fullScreen ? classes.fullScreen : classes.regular}>
      <CircularProgress color="inherit" classes={{ root: classes.loader }} />
    </div>
  )
}

Loader.defaultProps = {
  fullScreen: false,
  color: "primary",
}

export default Loader
