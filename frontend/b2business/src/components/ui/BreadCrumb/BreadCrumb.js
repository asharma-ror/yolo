import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classNames from "classnames"
import styles from "./breadCrumb-jss"
import { Link } from "gatsby"
const Breadcrumbs = props => {
  const { classes, theme, separator, location } = props
  let parts = location.pathname.split("/")
  const place = parts[parts.length - 1]
  parts = parts.slice(1, parts.length - 1)
  return (
    <section
      className={classNames(
        theme === "dark" ? classes.dark : classes.light,
        classes.breadcrumbs
      )}
    >
      <p>
        You are here:
        <span>
          {parts.map((part, partIndex) => {
            const path = ["", ...parts.slice(0, partIndex + 1)].join("/")
            return (
              <Fragment key={path}>
                <Link to={path}>{part}</Link>
                {separator}
              </Fragment>
            )
          })}
          &nbsp;
          {place}
        </span>
      </p>
    </section>
  )
}

Breadcrumbs.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  separator: PropTypes.string.isRequired,
}

export default withStyles(styles)(Breadcrumbs)
