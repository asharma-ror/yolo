import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const primaryColor = {
  light: "#ff6e5e",
  main: "#ff3333",
  dark: "#c3000a",
}

const secondaryColor = {
  light: "#ffff50",
  main: "#ffcc00",
  dark: "#c79c00",
}

const theme = createMuiTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    error: {
      main: red.A400,
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgb(102, 102, 102)",
      // TODO: disabled: ""
    },
    background: {
      default: "#fff",
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        h6: "h5",
      },
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    fontFamily: '"Chivo", sans-serif',
    h1: {
      fontSize: "3.125rem", // 50px
      fontWeight: "normal",
      color: "rgb(0, 0, 0)",
      lineHeight: "3.125rem",
      textTransform: "uppercase",
    },
    h2: {
      fontSize: "2.25rem", // 36px
      fontWeight: 900,
      color: "rgb(0, 0, 0)",
      textTransform: "uppercase",
    },
    h3: {
      fontSize: "2rem", // 32px
      fontWeight: 900,
      color: "rgba(0, 0, 0, 0.87)",
      letterSpacing: "0.014rem",
      "&::last-word": {
        color: "#ff3333",
      },
    },
    h4: {
      fontSize: "1.875rem", // 30px
      fontWeight: "normal",
      color: "rgb(0, 0, 0)",
      letterSpacing: "0.013rem",
    },
    h5: {
      fontSize: "1.75rem", // 28px
      fontWeight: 900,
      color: "rgb(0, 0, 0.87)",
      lineHeight: "2.375rem",
    },
    subtitle1: {
      fontSize: "1.125rem", // 18px
      fontWeight: 900,
      color: "rgb(0, 0, 0)",
    },
    subtitle2: {
      fontSize: "1.125rem", // 18px
      fontWeight: "normal",
      color: "rgb(0, 0, 0)",
    },
    body1: {
      fontSize: "0.875rem", // 14px
      fontWeight: "normal",
      color: "rgb(102, 102, 102)",
      lineHeight: "1.25rem",
    },
    body2: {
      fontSize: "0.75rem", // 12px
      fontWeight: "normal",
      color: "rgb(102, 102, 102)",
      lineHeight: "1rem",
    },
    overline: {
      fontSize: "0.75rem", // 12px
      fontWeight: 900,
      color: "rgba(0, 0, 0, 0.87)",
      lineHeight: "1rem",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none !important",
      },
    },
    MuiFab: {
      root: {
        boxShadow: "none !important",
      },
    },
    MuiButtonBase: {
      root: {
        boxShadow: "none !important",
      },
    },
    MuiOutlinedInput: {
      root: {
        "& fieldset": {
          borderWidth: "2px",
        },
      },
    },
    MuiButton: {
      root: {
        boxShadow: "none !important",
        borderWidth: "2px",
        fontWeight: "bold",
        letterSpacing: 1.25,
        paddingLeft: 20,
        paddingRight: 20,
      },
      contained: {},
      outlined: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 18,
        paddingRight: 18,
      },
      outlinedPrimary: {
        borderWidth: "2px",
        borderColor: primaryColor.main,
        "&:hover": {
          borderWidth: "2px",
        },
      },
      outlinedSecondary: {
        borderWidth: "2px",
        borderColor: secondaryColor.main,
        "&:hover": {
          borderWidth: "2px",
        },
      },
    },
  },
})

export default theme
