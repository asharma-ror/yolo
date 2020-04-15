import { Theme } from "@material-ui/core"

const strokeStyles = (theme: Theme) => ({
  stroke: {
    display: "block",
    height: 1,
    borderWidth: ({ thickness }: any) => `${thickness}px`,
    borderStyle: "solid",
    borderColor: theme.palette.common.black,
    margin: "1em 0",
    padding: 0,
  },
  primary: {
    borderColor: theme.palette.primary.main,
  },
  secondary: {
    borderColor: theme.palette.secondary.main,
  },
  white: {
    borderColor: theme.palette.common.white,
  },
  noMargin: {
    margin: 0,
  },
})

export { strokeStyles }
