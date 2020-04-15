import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import { PropTypes } from "prop-types"
import React from "react"
import { connect } from "react-redux"
import ErrorWrap from "../../../components/ui/Error/ErrorWrap"
import styles from "../../../containers/Templates/appStyles-jss"

class NotFoundDedicated extends React.Component {
  render() {
    const { classes, gradient } = this.props
    return (
      <div
        className={classNames(
          classes.appFrameOuter,
          gradient ? classes.gradientBg : classes.solidBg
        )}
      >
        <main className={classes.outerContent} id="mainContent">
          <div className={classes.petal} />
          <ErrorWrap title="404" desc="Oops, Page Not Found :(" />
        </main>
      </div>
    )
  }
}

NotFoundDedicated.propTypes = {
  classes: PropTypes.object.isRequired,
  gradient: PropTypes.bool.isRequired,
}

const reducer = "ui"
const mapStateToProps = state => ({
  gradient: state.getIn([reducer, "gradient"]),
})

const NotFoundDedicatedMaped = connect(mapStateToProps)(NotFoundDedicated)

export default withStyles(styles)(NotFoundDedicatedMaped)
