import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined"
import Toolbar from "@material-ui/core/Toolbar"
import Menu from "@material-ui/icons/Menu"
import { makeStyles } from "@material-ui/styles"
import classNames from "classnames"
import { Link } from "gatsby"
import React from "react"
import headerStyles from "./styles"
import HeaderDrawer from "../HeaderDrawer"

export type HeaderColor =
  | "primary"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "transparent"
  | "white"
  | "rose"
  | "dark"

interface ChangeColorOnScroll {
  height: number
  color: HeaderColor
}

interface Props {
  color: HeaderColor
  brand?: React.ReactNode
  brandScrolled?: React.ReactNode
  fixed?: boolean
  absolute?: boolean
  changeColorOnScroll?: ChangeColorOnScroll
  hideBrandWhenSm?: boolean
  customSmHeaderControl?: React.ReactNode
  desktopLinksContent?: React.ReactNode
  mobileLinksContent?: React.ReactNode
  mobileBottomContent?: React.ReactNode
}

const useStyles = makeStyles(headerStyles as any)

const Header = ({
  color,
  brand,
  brandScrolled,
  fixed,
  absolute,
  changeColorOnScroll,
  hideBrandWhenSm,
  customSmHeaderControl,
  desktopLinksContent,
  mobileLinksContent,
  mobileBottomContent,
}: Props) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const headerElement = () => document.body.getElementsByTagName("header")[0]
  // const logoContainer = () => document.body.getElementsByClassName(classes.logoContainer)[0]
  const headerColorChange = () => {
    const windowsScrollTop = window.pageYOffset
    // @ts-ignore
    if (windowsScrollTop > changeColorOnScroll.height) {
      headerElement().classList.remove(classes[color])
      headerElement()
        // @ts-ignore
        .classList.add(classes[changeColorOnScroll.color])
      headerElement().classList.add(classes.scrolled)
    } else {
      headerElement().classList.add(classes[color])
      headerElement()
        // @ts-ignore
        .classList.remove(classes[changeColorOnScroll.color])
      headerElement().classList.remove(classes.scrolled)
    }
  }
  React.useEffect(() => {
    if (changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange)
    }
    return function cleanup() {
      if (changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange)
      }
    }
  })
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const handleAccountMenu = () => {
    console.log("account menu")
  }
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  })
  return (
    <AppBar className={appBarClasses} style={{ marginBottom: "0" }}>
      <Toolbar className={classes.container}>
        <div>
          <Hidden smDown={hideBrandWhenSm}>
            <Button className={classes.title}>
              <Link to="/" className={classes.logoContainer}>
                <div className="header__logo header__logo-default">{brand}</div>
                <div className="header__logo header__logo-scrolled">
                  {brandScrolled ?? brand}
                </div>
              </Link>
            </Button>
          </Hidden>
        </div>
        <div>
          <Hidden smDown implementation="css">
            <div className={classes.collapse}>{desktopLinksContent}</div>
          </Hidden>
          <IconButton
            className={classes.accountButton}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleAccountMenu}
            color="inherit"
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <Hidden mdUp>
            {customSmHeaderControl || (
              <IconButton
                className={classes.mobileMenuToggle}
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
              >
                <Menu />
              </IconButton>
            )}
          </Hidden>
        </div>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <HeaderDrawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          bottomContent={mobileBottomContent}
        >
          {mobileLinksContent}
        </HeaderDrawer>
      </Hidden>
    </AppBar>
  )
}

export default Header
