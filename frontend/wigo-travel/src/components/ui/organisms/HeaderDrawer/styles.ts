import { Theme } from "@material-ui/core"

const headerDrawerStyles = (theme: Theme) => ({
  drawerPaper: {
    width: "100%",
    backgroundColor: theme.palette.primary.main,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  controls: {
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logo: {
    maxWidth: "30%",
  },
  content: {},
})

export default headerDrawerStyles
