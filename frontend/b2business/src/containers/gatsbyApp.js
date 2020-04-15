import React from "react"
import ThemeWrapper, { AppContext } from "./App/ThemeWrapper"
import Dashboard from "../containers/Templates/Dashboard"
import BlankPage from "./Pages/BlankPage"

class App extends React.Component {
  render() {
    return (
      <ThemeWrapper>
        <AppContext.Consumer>
          {changeMode => (
            <Dashboard changeMode={changeMode} location={this.props.location}>
              <BlankPage {...this.props} />
            </Dashboard>
          )}
        </AppContext.Consumer>
      </ThemeWrapper>
    )
  }
}

export default App
