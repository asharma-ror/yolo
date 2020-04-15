import { Avatar, Box, Divider, makeStyles, Typography } from "@material-ui/core"
import { lightBlue } from "@material-ui/core/colors"
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal"
import HotelIcon from "@material-ui/icons/Hotel"
import React from "react"
import {
  ProductAllotmentWithEstimations,
  ProductOption,
} from "../../../../../../../api/products/types"
import TravelLegDetail from "../../../../../../../components/sections/Travel/TravelLegDetail/TravelLegDetail"
import { ApplicationTheme } from "./../../../../../../../styles/theme/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  detailsPanel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  detailsRoot: {},
  detailsHeader: {
    height: "1rem",
    marginBottom: "0.5rem",
    color: theme.palette.primary.main,
    textAlign: "center",
    fontWeight: theme.typography.fontWeightBold,
  },
  detailsContent: {},
  destinationRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: theme.spacing(4),
  },
  flightsPanel: {
    flex: 1,
  },
  calendarPanel: {
    flex: 1,
  },
  emptySeats: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  calendarDate: {
    marginRight: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
    fontSize: "0.75rem",
    backgroundColor: theme.palette.primary.dark,
  },
  calendarDatePlaceholder: {
    marginRight: theme.spacing(1),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  estimationsPanel: {
    flex: 1,
  },
  estimatesRow: {
    justifyContent: "center",
  },
  unsoldEstimateLabel: {
    minWidth: "80px",
  },
  seatsAvatar: {
    marginRight: theme.spacing(1),
    width: 30,
    height: 30,
    boxShadow: theme.glow.light,
    backgroundColor: lightBlue[500],
  },
  seatsText: {
    fontWeight: theme.typography.fontWeightBold,
    color: lightBlue[500],
  },
  flightLeg: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(2, 0),
  },
  flightTime: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  flightLabel: {
    textAlign: "left",
  },
  hotelInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2, 0),
  },
  estimationText: {
    textAlign: "left",
  },
  hotelTitle: {
    margin: theme.spacing(0, 3),
  },
}))

interface SegmentTravelDetailsProps {
  option: ProductOption
}

const DetailsPanel = ({ option }: SegmentTravelDetailsProps) => {
  const classes = useStyles()
  return (
    <Box className={classes.detailsPanel}>
      <div>
        <div className={classes.flightLeg}>
          <div className={classes.flightLabel}>
            <Typography>
              <strong>Departure</strong>
            </Typography>
            <Typography>{option.departure.departureDate}</Typography>
          </div>
          <div className={classes.flightTime}>
            <TravelLegDetail
              departureTime={option.departure.departureTime}
              departureCode={option.departure.from.code}
              arrivalCode={option.departure.to.code}
              arrivalTime={option.departure.arrivalTime}
            />
          </div>
          <div>
            <div className={classes.emptySeats}>
              <Avatar className={classes.seatsAvatar}>
                <AirlineSeatReclineNormalIcon fontSize="small" />
              </Avatar>
              <div className={classes.estimationText}>
                <span className={classes.seatsText}>
                  {option.departure.estimatedAllocation.totPlaces -
                    option.departure.estimatedAllocation.allocatedPlaces}{" "}
                  / {option.departure.estimatedAllocation.totPlaces}
                </span>
                <Typography variant="body1">Estimated empty</Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.flightLeg}>
          <div className={classes.flightLabel}>
            <Typography>
              <strong>Return</strong>
            </Typography>
            <Typography>{option.return.departureDate}</Typography>
          </div>
          <div className={classes.flightTime}>
            <TravelLegDetail
              departureTime={option.return.departureTime}
              departureCode={option.return.from.code}
              arrivalCode={option.return.to.code}
              arrivalTime={option.return.arrivalTime}
            />
          </div>
          <div>
            <div className={classes.emptySeats}>
              <Avatar className={classes.seatsAvatar}>
                <AirlineSeatReclineNormalIcon fontSize="small" />
              </Avatar>
              <div className={classes.estimationText}>
                <span className={classes.seatsText}>
                  {option.return.estimatedAllocation.totPlaces -
                    option.return.estimatedAllocation.allocatedPlaces}{" "}
                  / {option.return.estimatedAllocation.totPlaces}
                </span>
                <Typography variant="body1">Estimated empty</Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {option.hotels.map((hotel, index) => (
          <div key={index} className={classes.hotelInfo}>
            <div className={classes.hotelTitle}>
              <Typography variant="h5">{hotel.hotelName}</Typography>
            </div>
            <div className={classes.emptySeats}>
              <Avatar className={classes.seatsAvatar}>
                <HotelIcon fontSize="small" />
              </Avatar>
              <div className={classes.estimationText}>
                <span className={classes.seatsText}>
                  {hotel.estimatedAllocation.totPlaces -
                    hotel.estimatedAllocation.allocatedPlaces}{" "}
                  / {hotel.estimatedAllocation.totPlaces}
                </span>
                <Typography variant="body1">Estimated empty</Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  )
}

interface Props {
  data: ProductAllotmentWithEstimations
}

const TravelDetails = ({ data }: Props) => {
  return (
    <>
      <Box my={1}>
        <Divider />
      </Box>
      {data.options.map((option, i) => (
        <div key={i}>
          <DetailsPanel option={option}></DetailsPanel>
          <Box my={1}>
            <Divider />
          </Box>
        </div>
      ))}
    </>
  )
}

export default TravelDetails
