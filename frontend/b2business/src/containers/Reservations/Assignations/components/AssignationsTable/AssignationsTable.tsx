import {
  Avatar,
  Box,
  Grid,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core"
import lightBlue from "@material-ui/core/colors/lightBlue"
import AirlineSeatReclineNormalIcon from "@material-ui/icons/AirlineSeatReclineNormal"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { roomsMap } from "../../../../../api/products/allotments"
import TravelLegDetail from "../../../../../components/sections/Travel/TravelLegDetail/TravelLegDetail"
import QuantityInput from "../../../../../components/ui/QuantityInput/QuantityInput"
import StrippedTable from "../../../../../components/ui/StrippedTable/StrippedTable"
import { ApplicationTheme } from "../../../../../styles/theme/types"
import { formatDate } from "../../../../../utils/dateUtils"
import { flatten } from "../../../../../utils/lists"
import AssignationsContext, {
  RoomsMap,
} from "../../context/AssignationsContext"
import {
  AccomodationDetail,
  ReservationGroup,
  TravelAssignationsOption,
  TravelDetail,
} from "./../../../../../api/reservations/types"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  travelIdentifiers: {
    display: "flex",
    flexDirection: "column",
  },
  emptySeats: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
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
  assignationsControl: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  assignationsLabel: {
    flex: 1,
  },
  assignationsCta: {
    flex: 2,
  },
}))

interface AccomodationDetailsRowProps {
  details: AccomodationDetail
}

const AccomodationDetailsRow = ({ details }: AccomodationDetailsRowProps) => {
  return (
    <Box mb={4}>
      <Typography variant="h4">
        {details.hotelName} - {details.hotelDestinationName}
      </Typography>
    </Box>
  )
}

interface TravelDetailsRowProps {
  label: React.ReactNode
  details: TravelDetail
}

const TravelDetailsRow = ({ details, label }: TravelDetailsRowProps) => {
  const classes = useStyles()
  return (
    <Grid container alignItems="center">
      <Grid item sm={2} className={classes.travelIdentifiers}>
        <Typography>
          <strong>{label}</strong>
        </Typography>
        <Typography>{formatDate(new Date(details.departureDate))}</Typography>
      </Grid>
      <Grid item sm={5}>
        <TravelLegDetail
          departureTime={details.departureTime}
          departureCode={details.from.code}
          arrivalTime={details.arrivalTime}
          arrivalCode={details.to.code}
        ></TravelLegDetail>
      </Grid>
      <Grid item sm={5} className={classes.emptySeats}>
        <Avatar className={classes.seatsAvatar}>
          <AirlineSeatReclineNormalIcon fontSize="small" />
        </Avatar>
        <div>
          <span className={classes.seatsText}>20 / 200</span>
          <Typography variant="body1">Empty seats</Typography>
        </div>
      </Grid>
    </Grid>
  )
}

interface TravelAssignatioRowProps {
  option: TravelAssignationsOption
  reservations: ReservationGroup[]
  assignedRooms: RoomsMap
  onChange: (totAdults: number, newValue: number, roomId: string) => void
}

const TravelAssignationRow = ({
  option,
  reservations,
  assignedRooms,
  onChange,
}: TravelAssignatioRowProps) => {
  const classes = useStyles()
  const onValueChanged = (totAdults: number, newQuantity: number) => {
    onChange(totAdults, newQuantity, option.id)
  }

  const getMaxValue = (totAdults: number) => {
    const matchingReservations = reservations.find(
      x => x.occupancy.totAdults === totAdults
    )
    const tot = matchingReservations?.quantity ?? 0
    const totToBeAssigned = tot - assignedRooms.getTotalRoomsQuantity(totAdults)

    const max =
      assignedRooms.getTotalRoomsOfType(totAdults, option.id) + totToBeAssigned
    return max
  }

  return (
    <div>
      {[1, 2, 3, 4].map((x: number) => (
        <div key={x} className={classes.assignationsControl}>
          <div className={classes.assignationsLabel}>
            <Typography>{roomsMap.get(x)} Room</Typography>
          </div>
          <div className={classes.assignationsCta}>
            <QuantityInput
              key={x}
              initialValue={0}
              minValue={0}
              maxValue={getMaxValue(x)}
              onChange={e => onValueChanged(x, e)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const AssignationsTable = () => {
  const { assignations, assignedRooms, setRoomAssignation } = React.useContext(
    AssignationsContext
  )
  const rows = flatten(assignations.options.map(x => x.values))
  const onRoomChanged = (
    totAdults: number,
    newValue: number,
    roomId: string
  ) => {
    setRoomAssignation(totAdults, newValue, roomId)
  }
  return (
    <>
      <StrippedTable>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(option => (
            <TableRow key={option.id}>
              <TableCell padding="default">
                <Grid container>
                  <Grid item sm={8}>
                    {option.accomodation ? (
                      <AccomodationDetailsRow
                        details={option.accomodation}
                      ></AccomodationDetailsRow>
                    ) : (
                      undefined
                    )}
                    <TravelDetailsRow
                      label="Departure"
                      details={option.departure}
                    ></TravelDetailsRow>
                    <Box my={1}></Box>
                    <TravelDetailsRow
                      label="Return"
                      details={option.return}
                    ></TravelDetailsRow>
                  </Grid>
                  <Grid item sm={4}>
                    <Box>
                      <TravelAssignationRow
                        option={option}
                        reservations={assignations.reservations}
                        assignedRooms={assignedRooms}
                        onChange={onRoomChanged}
                      ></TravelAssignationRow>
                    </Box>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StrippedTable>
    </>
  )
}

export default AssignationsTable
