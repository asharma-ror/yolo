import { hexToRgb, Theme } from "@material-ui/core"

const headerStyles = (theme: Theme) => ({
  appBar: {
    display: "flex",
    border: "0",
    marginBottom: "0",
    color: theme.palette.grey["600"],
    width: "100%",
    backgroundColor: theme.palette.common.white,
    boxShadow: `0 4px 18px 0px rgba(${hexToRgb(
      theme.palette.common.black
    )}, 0.12), 0 7px 10px -5px rgba(${hexToRgb(
      theme.palette.common.black
    )}, 0.15)`,
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    [theme.breakpoints.up("sm")]: {
      padding: "0.25rem 0",
    },
  },
  container: {
    minHeight: "48px",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "540px",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "960px",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "1140px",
    },
    "& .header__logo-scrolled": {
      display: "none",
    },
  },
  absolute: {
    position: "absolute",
    top: "auto",
  },
  fixed: {
    position: "fixed",
  },
  title: {
    padding: 0,
    letterSpacing: "unset",
    "&,& a": {
      minWidth: "unset",
      lineHeight: "30px",
      fontSize: "18px",
      textTransform: "none",
      whiteSpace: "nowrap",
      color: "inherit",
      "&:hover,&:focus": {
        color: "inherit",
        background: "transparent",
      },
    },
  },
  accountButton: {
    padding: "5px 12px",
  },
  mobileMenuToggle: {
    padding: "5px 0",
  },
  logoContainer: {
    "& .header__logo": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .header__logo-scrolled": {
      display: "none",
    },
  },
  scrolled: {
    padding: "0.25rem 0 !important",
    "& .header__logo-default": {
      display: "none",
    },
    "& .header__logo-scrolled": {
      display: "flex",
    },
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    color: theme.palette.common.white,
    padding: "0.75rem 0",
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  collapse: {},
})

export default headerStyles
