import Fade from "@material-ui/core/Fade"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import classNames from "classnames"
import { PropTypes } from "prop-types"
import React, { Fragment } from "react"
import dataMenu from "../../../api/ui/menu"
import BreadCrumb from "../../../components/ui/BreadCrumb/BreadCrumb"
import HeaderMenu from "../../../components/ui/Header/HeaderMenu"
import styles from "../appStyles-jss"
import Decoration from "../Decoration"

class DropMenuLayout extends React.Component {
  render() {
    const {
      classes,
      children,
      pageLoaded,
      mode,
      gradient,
      deco,
      bgPosition,
      changeMode,
      place,
      location,
      titleException,
      handleOpenGuide,
      toggleDrawer,
      sidebarOpen,
      loadTransition,
    } = this.props
    return (
      <Fragment>
        <HeaderMenu
          type="top-navigation"
          dataMenu={dataMenu}
          changeMode={changeMode}
          mode={mode}
          location={location}
          openGuide={handleOpenGuide}
          toggleDrawerOpen={toggleDrawer}
          openMobileNav={sidebarOpen}
          loadTransition={loadTransition}
          logoLink="/app"
        />
        <main
          className={classNames(classes.content, classes.highMargin)}
          id="mainContent"
        >
          <Decoration
            mode={mode}
            gradient={gradient}
            decoration={deco}
            bgPosition={bgPosition}
            horizontalMenu
          />
          <section
            className={classNames(classes.mainWrap, classes.topbarLayout)}
          >
            {titleException.indexOf(location.pathname) < 0 && (
              <div className={classes.pageTitle}>
                <Typography
                  component="h4"
                  className={
                    bgPosition === "header"
                      ? classes.darkTitle
                      : classes.lightTitle
                  }
                  variant="h4"
                >
                  {place}
                </Typography>
                <BreadCrumb
                  separator=" / "
                  theme={bgPosition === "header" ? "dark" : "light"}
                  location={location}
                />
              </div>
            )}
            {!pageLoaded && (
              <img
                src="/images/spinner.gif"
                alt="spinner"
                className={classes.circularProgress}
              />
            )}
            <Fade
              in={pageLoaded}
              mountOnEnter
              unmountOnExit
              {...(pageLoaded ? { timeout: 700 } : {})}
            >
              <div className={!pageLoaded ? classes.hideApp : ""}>
                {/* Application content will load here */}
                {children}
              </div>
            </Fade>
          </section>
        </main>
      </Fragment>
    )
  }
}

DropMenuLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  // history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  changeMode: PropTypes.func.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  loadTransition: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired,
  pageLoaded: PropTypes.bool.isRequired,
  mode: PropTypes.string.isRequired,
  gradient: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
  bgPosition: PropTypes.string.isRequired,
  place: PropTypes.string.isRequired,
  titleException: PropTypes.array.isRequired,
  handleOpenGuide: PropTypes.func.isRequired,
}

export default withStyles(styles)(DropMenuLayout)
