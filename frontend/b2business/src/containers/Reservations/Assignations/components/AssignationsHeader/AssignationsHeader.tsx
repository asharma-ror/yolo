import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core"
import indigo from "@material-ui/core/colors/indigo"
import lightBlue from "@material-ui/core/colors/lightBlue"
import orange from "@material-ui/core/colors/orange"
import teal from "@material-ui/core/colors/teal"
import BookmarkIcon from "@material-ui/icons/Bookmark"
import DateRangeIcon from "@material-ui/icons/DateRange"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import PersonIcon from "@material-ui/icons/Person"
import classNames from "classnames"
import React from "react"
import { TimeRange } from "../../../../../api/products/types"
import { formatDate } from "../../../../../utils/dateUtils"
import { ApplicationTheme } from "./../../../../../styles/theme/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    [theme.breakpoints.down("xs")]: {
      paddingRight: 0,
      paddingBottom: theme.spacing(2),
      width: "50%",
      float: "left",
    },
    "& $avatar": {
      [theme.breakpoints.up("sm")]: {
        width: 50,
        height: 50,
        "& svg": {
          fontSize: 32,
        },
      },
    },
  },
  avatar: {
    marginRight: theme.spacing(1),
    boxShadow: theme.glow.light,
    "& svg": {
      fontSize: 24,
    },
    "&$sm": {
      width: 30,
      height: 30,
    },
    "&$mc": {
      width: 24,
      height: 24,
      top: 0,
      left: 8,
      marginRight: 0,
    },
  },
  productAvatar: {
    backgroundColor: indigo.A200,
  },
  productText: {
    color: indigo.A200,
    fontWeight: theme.typography.fontWeightBold,
  },
  weekAvatar: {
    backgroundColor: teal[500],
  },
  weekText: {
    color: teal[500],
  },
  seatsAvatar: {
    backgroundColor: lightBlue[500],
  },
  seatsText: {
    color: lightBlue[500],
  },
  reservationsAvatar: {
    backgroundColor: orange[600],
  },
  reservationsText: {
    color: orange[600],
  },
  bold: {
    fontWeight: theme.typography.fontWeightBold,
  },
}))

interface Props {
  productName: string
  timeInterval: TimeRange
}

function AssignationsHeader({ productName, timeInterval }: Props) {
  const classes = useStyles()
  return (
    <Grid container spacing={2}>
      <Grid item md={3} xs={6} className={classes.box}>
        <Avatar className={classNames(classes.avatar, classes.productAvatar)}>
          <BookmarkIcon />
        </Avatar>
        <Typography variant="h6">
          <span className={classes.productText}>{productName}</span>
          <Typography className={classes.bold}>Product</Typography>
        </Typography>
      </Grid>
      <Grid item md={3} xs={6} className={classes.box}>
        <Avatar className={classNames(classes.avatar, classes.weekAvatar)}>
          <DateRangeIcon />
        </Avatar>
        <Typography variant="h6">
          <span className={classes.weekText}>
            {formatDate(timeInterval.from)}
          </span>
          <Typography className={classes.bold}>Week</Typography>
        </Typography>
      </Grid>
      <Grid item md={3} xs={6} className={classes.box}>
        <Avatar className={classNames(classes.avatar, classes.seatsAvatar)}>
          <PersonIcon></PersonIcon>
        </Avatar>
        <Typography variant="h6">
          <span className={classes.seatsText}>150 / 1100</span>
          <Typography className={classes.bold}>Empty places</Typography>
        </Typography>
      </Grid>
      <Grid item md={3} xs={6} className={classes.box}>
        <Avatar
          className={classNames(classes.avatar, classes.reservationsAvatar)}
        >
          <LocalOfferIcon />
        </Avatar>
        <Typography variant="h6">
          <span className={classes.reservationsText}>23 / 40</span>
          <Typography className={classes.bold}>Sold by WIGO</Typography>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default AssignationsHeader
