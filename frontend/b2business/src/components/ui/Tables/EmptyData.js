import { withStyles } from "@material-ui/core/styles"
import TableIcon from "@material-ui/icons/Apps"
import PropTypes from "prop-types"
import React from "react"
import styles from "./tableStyle-jss"

function EmptyData(props) {
  const { classes } = props
  return (
    <div className={classes.nodata}>
      <TableIcon />
      No Data
    </div>
  )
}

EmptyData.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(EmptyData)
