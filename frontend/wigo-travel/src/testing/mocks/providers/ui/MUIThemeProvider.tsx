import React from "react"
import { ThemeProvider, CssBaseline } from "@material-ui/core"
import theme from "../../../../themes/default"

interface Props {
  children: React.ReactNode
}

const MUIThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export { MUIThemeProvider }
