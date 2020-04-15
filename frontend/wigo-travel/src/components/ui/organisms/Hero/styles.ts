import { Theme } from "@material-ui/core"

export const heroStyles = (theme: Theme) => ({
  claimTitle: {
    paddingTop: theme.spacing(4),
    margin: theme.spacing(2, 0),
  },
  claimSubtitle: {
    margin: theme.spacing(2, 0),
  },
  ctaContainer: {
    margin: theme.spacing(4, 0),
    paddingBottom: theme.spacing(2),
  },
  cta: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 900,
  },
  titleAlignLeft: {
    textAlign: "left",
  },
  titleAlignRight: {
    textAlign: "right",
  },
  titleCenter: {
    textAlign: "center",
  },
  titleLeftColumn: {
    textAlign: "left",
    maxWidth: "70%",
  },
  titleRightColumn: {
    textAlign: "right",
    maxWidth: "70%",
    marginLeft: "auto",
  },
  subtitleAlignLeft: {
    textAlign: "left",
  },
  subtitleAlignRight: {
    textAlign: "right",
  },
  subtitleCenter: {
    textAlign: "center",
  },
  subtitleLeftColumn: {
    textAlign: "left",
    maxWidth: "85%",
  },
  subtitleRightColumn: {
    textAlign: "right",
    maxWidth: "85%",
    marginLeft: "auto",
  },
})
