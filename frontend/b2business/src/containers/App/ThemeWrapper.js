import {
  createMuiTheme,
  MuiThemeProvider,
  withStyles,
} from "@material-ui/core/styles"
import { PropTypes } from "prop-types"
import React from "react"
import Loading from "react-loading-bar"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { changeModeAction } from "../../state/actions/UiActions"
import "../../styles/components/vendors/react-loading-bar/index.css"
import applicationTheme from "../../styles/theme/applicationTheme"

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
}

export const AppContext = React.createContext()

class ThemeWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageLoaded: true,
      theme: createMuiTheme(applicationTheme(props.color, props.mode)),
    }
  }

  UNSAFE_componentWillMount = () => {
    this.onProgressShow()
  }

  componentDidMount = () => {
    this.playProgress()
  }

  componentWillUnmount() {
    this.onProgressShow()
  }

  handleChangeMode = mode => {
    const { color, changeMode } = this.props
    this.setState({ theme: createMuiTheme(applicationTheme(color, mode)) })
    changeMode(mode)
  }

  onProgressShow = () => {
    this.setState({ pageLoaded: true })
  }

  onProgressHide = () => {
    this.setState({ pageLoaded: false })
  }

  playProgress = () => {
    this.onProgressShow()
    setTimeout(() => {
      this.onProgressHide()
    }, 500)
  }

  render() {
    const { classes, children } = this.props
    const { pageLoaded, theme } = this.state
    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Loading
            show={pageLoaded}
            color="rgba(255,255,255,.9)"
            showSpinner={false}
          />
          <AppContext.Provider value={this.handleChangeMode}>
            {children}
          </AppContext.Provider>
        </div>
      </MuiThemeProvider>
    )
  }
}

ThemeWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  changeMode: PropTypes.func.isRequired,
}

const reducer = "ui"
const mapStateToProps = state => ({
  force: state, // force state from reducer
  color: state.getIn([reducer, "theme"]),
  mode: state.getIn([reducer, "type"]),
})

const dispatchToProps = dispatch => ({
  changeMode: bindActionCreators(changeModeAction, dispatch),
})

const ThemeWrapperMapped = connect(
  mapStateToProps,
  dispatchToProps
)(ThemeWrapper)

export default withStyles(styles)(ThemeWrapperMapped)
