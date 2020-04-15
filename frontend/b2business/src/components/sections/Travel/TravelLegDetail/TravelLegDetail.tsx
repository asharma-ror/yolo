import { makeStyles } from "@material-ui/styles"
import React from "react"
import { ApplicationTheme } from "../../../../styles/theme/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  root: {
    display: "flex",
    flexFlow: "row wrap",
    textAlign: "center",
  },
  departure: {
    display: "flex",
    maxWidth: "32%",
    paddingRight: ".375rem",
    flexDirection: "column",
    alignItems: "flex-end",
    flex: "0 1 32%",
    textAlign: "right",
    boxSizing: "border-box",
  },
  stops: {
    maxWidth: "36%",
    padding: "0 .375rem",
    flex: "0 1 36%",
    textAlign: "center",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
  },
  arrival: {
    display: "flex",
    maxWidth: "32%",
    paddingLeft: ".375rem",
    flexDirection: "column",
    alignItems: "flex-start",
    flex: "0 1 32%",
    textAlign: "left",
    boxSizing: "border-box",
  },
  timeLabel: {
    fontSize: "1.5rem",
    lineHeight: "1.875rem",
    fontWeight: 400,
    letterSpacing: "normal",
  },
  stopLine: {
    position: "relative",
    display: "block",
    width: "90%",
    height: ".125rem",
    margin: ".375rem auto",
    padding: 0,
    borderRadius: ".375rem",
    backgroundColor: "#68697f",
    lineHeight: 0,
    textAlign: "center",
  },
  flightIcon: {
    position: "absolute",
    top: "50%",
    right: "-.375rem",
    display: "block",
    width: "1.5rem",
    height: "1.5rem",
    marginTop: "-.7rem",
    paddingLeft: ".25rem",
    backgroundColor: "#fff",
  },
}))

interface Props {
  departureTime: string
  departureCode: string
  arrivalTime: string
  arrivalCode: string
}

const TravelLegDetail = ({
  departureTime,
  departureCode,
  arrivalTime,
  arrivalCode,
}: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.departure}>
        <span className={classes.timeLabel}>{departureTime}</span>
        <span>{departureCode}</span>
      </div>
      <div className={classes.stops}>
        <span className={classes.stopLine}>
          <img className={classes.flightIcon} src="/icons/flight.svg"></img>
        </span>
      </div>
      <div className={classes.arrival}>
        <span className={classes.timeLabel}>{arrivalTime}</span>
        <span>{arrivalCode}</span>
      </div>
    </div>
  )
}

export default TravelLegDetail
