/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react"
import Dashboard from "../Templates/Dashboard"
import ThemeWrapper, { AppContext } from "./ThemeWrapper"

type Props = {
  readonly children?: React.ReactNode
  location: Location
  title?: string
}

class Layout extends React.Component<Props, {}> {
  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {(changeMode: boolean) => (
            <Dashboard
              changeMode={changeMode}
              location={this.props.location}
              title={this.props.title}
            >
              {this.props.children}
            </Dashboard>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    )
  }
}

export default Layout
