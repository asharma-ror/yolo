import React from "react"
import { LogosProvider } from "./contents/logosContext"
import { LayoutContextProvider } from "./contents/defaultLayoutContext"
import { IconsContextProvider } from "./contents/iconsContext"
import { SitePagesProvider } from "./contents/sitePagesContext"
import { SearchWidgetProvider } from "./contents/searchWidgetContext"

export const ContentsProvider = ({ children }: any) => {
  return (
    <SitePagesProvider>
      <SearchWidgetProvider>
        <LogosProvider>
          <IconsContextProvider>
            <LayoutContextProvider>{children}</LayoutContextProvider>
          </IconsContextProvider>
        </LogosProvider>
      </SearchWidgetProvider>
    </SitePagesProvider>
  )
}
