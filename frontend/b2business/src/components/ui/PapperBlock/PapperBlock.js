import Paper from "@material-ui/core/Paper"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import Ionicon from "react-ionicons"
import { compose } from "recompose"
import styles from "./papperStyle-jss"

class PapperBlock extends React.Component {
  render() {
    const {
      classes,
      title,
      desc,
      header,
      children,
      whiteBg,
      greyBg,
      noMargin,
      noDescription,
      colorMode,
      overflowX,
      icon,
    } = this.props
    return (
      <div>
        <Paper
          className={classNames(
            classes.root,
            noMargin && classes.noMargin,
            colorMode && classes.colorMode
          )}
          elevation={0}
        >
          {noDescription ? (
            undefined
          ) : (
            <div className={classes.descBlock}>
              {icon ? (
                <span className={classes.iconTitle}>
                  <Ionicon icon={icon} />
                </span>
              ) : (
                undefined
              )}
              <div className={classes.titleText}>
                <Typography
                  variant="h6"
                  component="h2"
                  className={classes.title}
                >
                  {title}
                </Typography>
                <Typography component="p" className={classes.description}>
                  {desc}
                </Typography>
              </div>
            </div>
          )}

          {header ? <div>{header}</div> : undefined}

          <section
            className={classNames(
              classes.content,
              whiteBg && classes.whiteBg,
              greyBg && classes.greyBg,
              overflowX && classes.overflowX
            )}
          >
            {children}
          </section>
        </Paper>
      </div>
    )
  }
}

PapperBlock.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string,
  desc: PropTypes.string,
  icon: PropTypes.string,
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
  whiteBg: PropTypes.bool,
  greyBg: PropTypes.bool,
  colorMode: PropTypes.bool,
  noMargin: PropTypes.bool,
  noDescription: PropTypes.bool,
  overflowX: PropTypes.bool,
}

PapperBlock.defaultProps = {
  whiteBg: false,
  greyBg: false,
  noMargin: false,
  noDescription: false,
  colorMode: false,
  overflowX: false,
  icon: undefined,
}

export default compose(withStyles(styles))(PapperBlock)
