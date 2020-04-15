import { Box, Grid, makeStyles, Theme, Typography } from "@material-ui/core"
import AccessTimeIcon from "@material-ui/icons/AccessTime"
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff"
import NightsStayIcon from "@material-ui/icons/NightsStay"
import PeopleIcon from "@material-ui/icons/People"
import React from "react"
import { getGreyBackgroundColor } from "../../../../utils/themeUtils"

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  title: {
    textAlign: "center",
  },
  info: {
    backgroundColor: getGreyBackgroundColor(theme),
  },
  people: {
    display: "flex",
    flexDirection: "row",
  },
  nights: {
    display: "flex",
    flexDirection: "row",
  },
  dates: {
    display: "flex",
    flexDirection: "row",
  },
  airport: {
    display: "flex",
    flexDirection: "row",
  },
  summaryIcon: {
    marginRight: 8,
  },
}))

const TravelSummary = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Box my={1}>
        <Typography variant="h3" className={classes.title}>
          Grecia
        </Typography>
      </Box>
      <Box my={2} px={1} className={classes.info}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box my={1} className={classes.people}>
              <PeopleIcon className={classes.summaryIcon}></PeopleIcon>
              <Typography variant="subtitle1">2 persone</Typography>
            </Box>
            <Box my={1} className={classes.nights}>
              <NightsStayIcon className={classes.summaryIcon}></NightsStayIcon>
              <Typography variant="subtitle1">7 notti</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box my={1} className={classes.airport}>
              <FlightTakeoffIcon
                className={classes.summaryIcon}
              ></FlightTakeoffIcon>
              <Typography variant="subtitle1">da Milano Malpensa</Typography>
            </Box>
            <Box my={1} className={classes.dates}>
              <AccessTimeIcon className={classes.summaryIcon}></AccessTimeIcon>
              <div>
                <Typography variant="subtitle1">Partenza possibile</Typography>
                <Typography variant="subtitle1">
                  dal 20/02/2020 al 27/02/2020
                </Typography>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default TravelSummary
