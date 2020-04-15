import { CssBaseline, Hidden } from "@material-ui/core"
import { makeStyles, ThemeProvider } from "@material-ui/core/styles"
import React from "react"
import theme from "../../../themes/default"
import { HeaderColor } from "../../ui/organisms/Header"
import DefaultFooter from "./components/DefaultFooter"
import DefaultNavHeader, { HeaderPosition } from "./components/DefaultNavHeader"

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
})

interface Props {
  children: any
  headerColor: HeaderColor
  headerPosition: HeaderPosition
  hideBrandWhenSm: boolean
  hideFooterWhenSm: boolean
  customSmHeaderControl?: React.ReactNode
}

const DefaultLayout = ({
  children,
  headerColor,
  headerPosition,
  hideBrandWhenSm,
  hideFooterWhenSm,
  customSmHeaderControl,
}: Props) => {
  const classes = useStyles()

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.container}>
          <DefaultNavHeader
            color={headerColor}
            position={headerPosition}
            hideBrandWhenSm={hideBrandWhenSm}
            customSmHeaderControl={customSmHeaderControl}
          />
          <main className={classes.content}>{children}</main>
          <Hidden smDown={hideFooterWhenSm}>
            <DefaultFooter></DefaultFooter>
          </Hidden>
        </div>
      </ThemeProvider>
    </>
  )
}

DefaultLayout.defaultProps = {
  headerColor: "primary" as HeaderColor,
  headerPosition: "default" as HeaderPosition,
  hideBrandWhenSm: false,
  hideFooterWhenSm: false,
}

export default DefaultLayout
