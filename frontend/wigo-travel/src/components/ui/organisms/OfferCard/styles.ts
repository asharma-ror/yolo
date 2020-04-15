import { Theme } from "@material-ui/core"

const offerCardStyles = (theme: Theme) => ({
  cardContainer: {
    margin: theme.spacing(2, 0),
  },
  cardMain: {
    minHeight: 388,
    display: "block",
    position: "relative",
  },
  cardHead: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "50%",
    width: "100%",
    display: "flex",
  },
  cardImage: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
  },
  cardBody: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "50%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: theme.spacing(1),
  },
  topDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priceContainer: {
    marginTop: theme.spacing(2),
  },
  priceLabel: {
    padding: theme.spacing(3, 1),
    color: theme.palette.common.white,
    display: "flex",
    alignItems: "flex-end",
  },
  pricePrefix: {
    marginRight: "0.125rem",
    marginBottom: "0.33rem",
    fontSize: "0.75rem",
  },
  priceValue: {
    paddingRight: theme.spacing(2),
  },
  bottomDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  rankingContainer: {
    display: "flex",
  },
  rankingValue: {
    marginRight: 5,
  },
  caracheristic: {
    marginTop: 10,
    display: "flex",
  },
  caraIcon: {
    marginRight: 8,
  },
  cta: {
    margin: "0 10px",
  },
})

export default offerCardStyles
