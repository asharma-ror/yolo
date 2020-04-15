import React from "react"
import {
  MUIThemeProvider,
  StaticLogosProvider,
  StaticSitePagesProvider,
  StaticIconsProvider,
} from "../mocks/providers"

const AppContextDecorator = (storyFn: any) => (
  <StaticSitePagesProvider>
    <StaticLogosProvider>
      <StaticIconsProvider>
        <MUIThemeProvider>{storyFn()}</MUIThemeProvider>
      </StaticIconsProvider>
    </StaticLogosProvider>
  </StaticSitePagesProvider>
)
export default AppContextDecorator
