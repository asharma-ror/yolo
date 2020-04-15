import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Theme,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import * as React from "react"
import NumberFormat from "react-number-format"
import { DestinationRankingData } from "../../../../../api/pricing/types"
// import PerfectScrollbar from "react-perfect-scrollbar"

type Props = {
  data: Array<DestinationRankingData>
  label: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  container: {
    marginBottom: theme.spacing(4),
  },
}))

const DestinationRanking = ({ data, label }: Props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Card>
        <CardHeader title={label} />
        <Divider />
        <CardContent>
          {/* <PerfectScrollbar> */}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>REVENUE @Last Year</TableCell>
                <TableCell>REVENUE @actual</TableCell>
                <TableCell>REVENUE @optimal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(destination => (
                <TableRow key={destination.destinationId}>
                  <TableCell>
                    <strong>{destination.destinationName}</strong>
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      displayType="text"
                      value={destination.lastYearRevenue.value}
                      thousandSeparator="."
                      decimalSeparator=","
                    />{" "}
                    {destination.lastYearRevenue.unit}
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      displayType="text"
                      value={destination.actualRevenue.value}
                      thousandSeparator="."
                      decimalSeparator=","
                    />{" "}
                    {destination.actualRevenue.unit}
                  </TableCell>
                  <TableCell>
                    <NumberFormat
                      displayType="text"
                      value={destination.optimalRevenue.value}
                      thousandSeparator="."
                      decimalSeparator=","
                    />{" "}
                    {destination.optimalRevenue.unit}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* </PerfectScrollbar> */}
        </CardContent>
      </Card>
    </div>
  )
}

export default DestinationRanking
