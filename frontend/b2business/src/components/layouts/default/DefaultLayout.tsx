import React, { ReactNode } from "react"
import ThemeWrapper, { AppContext } from "../../../containers/App/ThemeWrapper"
import DashboardTemplate from "../../../containers/Templates/Dashboard"

interface Props {
  children: ReactNode
  location: Location
  title?: string
}

export default function DefaultLayout({ children, location, title }: Props) {
  return (
    <ThemeWrapper>
      <AppContext.Consumer>
        {(changeMode: Function) => (
          <DashboardTemplate
            changeMode={changeMode}
            location={location}
            title={title}
          >
            {children}
          </DashboardTemplate>
        )}
      </AppContext.Consumer>
    </ThemeWrapper>
  )
}
