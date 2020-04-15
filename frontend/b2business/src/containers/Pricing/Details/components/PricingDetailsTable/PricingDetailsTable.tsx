import {
  Box,
  Button,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core"
import React from "react"
import {
  PricingDetailsRecord,
  PricingDetailsValues,
} from "../../../../../api/pricing/types"
import NumericData from "../../../../../components/ui/NumericData/NumericData"
import StrippedTable from "../../../../../components/ui/StrippedTable/StrippedTable"
import { formatDate } from "../../../../../utils/dateUtils"

const useStyles = makeStyles((theme: Theme) => ({
  inlineValues: {
    display: "flex",
    flexDirection: "row",
  },
  value: {
    margin: theme.spacing(0, 1),
  },
}))

interface PricingDetailsProps {
  data: PricingDetailsValues
}

const PricingDetails = ({ data }: PricingDetailsProps) => {
  const classes = useStyles()
  return (
    <div className={classes.inlineValues}>
      <div className={classes.value}>
        <NumericData data={data.price} />
      </div>
      -
      <div className={classes.value}>
        <NumericData data={data.percLoadFactor} />
      </div>
      -
      <div className={classes.value}>
        {data.absLoadFactor.value} / {data.absLoadFactor.total}
      </div>
      <div className={classes.value}>
        <NumericData data={data.revenue} />
      </div>
    </div>
  )
}

interface Props {
  data: PricingDetailsRecord[]
}

const PricingDetailsTable = ({ data }: Props) => {
  return (
    <>
      <StrippedTable>
        <TableHead>
          <TableRow>
            <TableCell>Departure Date</TableCell>
            <TableCell>Airport</TableCell>
            <TableCell>Hotel</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Room Type</TableCell>
            <TableCell>Booking Date</TableCell>
            <TableCell>Last Year</TableCell>
            <TableCell>Actual</TableCell>
            <TableCell>Optimal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{formatDate(row.departureDate)}</TableCell>
              <TableCell>{row.airportName}</TableCell>
              <TableCell>{row.hotelName}</TableCell>
              <TableCell>{row.destinationName}</TableCell>
              <TableCell>{row.roomName}</TableCell>
              <TableCell>{formatDate(row.bookingDate)}</TableCell>
              <TableCell>
                <PricingDetails data={row.lastYear} />
              </TableCell>
              <TableCell>
                <PricingDetails data={row.actual} />
              </TableCell>
              <TableCell>
                <PricingDetails data={row.optimal} />
              </TableCell>
              {/* 
              
              
              <TableCell align="right"></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </StrippedTable>
      <Box marginTop={3} display="flex" justifyContent="flex-end">
        <Button color="primary" variant="outlined">
          Export CSV
        </Button>
      </Box>
    </>
  )
}

export default PricingDetailsTable
