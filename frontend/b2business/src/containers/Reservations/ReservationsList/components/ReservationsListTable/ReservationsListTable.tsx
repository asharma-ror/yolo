import {
  Button,
  makeStyles,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core"
import { Link } from "gatsby"
import React from "react"
import { TravelAssignations } from "../../../../../api/reservations/types"
import { ApplicationTheme } from "../../../../../styles/theme/types"
import { formatDate } from "../../../../../utils/dateUtils"
import StrippedTable from "./../../../../../components/ui/StrippedTable/StrippedTable"

interface Props {
  data: TravelAssignations[]
}

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  cta: {
    margin: theme.spacing(0, 1),
  },
  ctaAlert: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  ctaRegular: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}))

const ReservationsListTable = ({ data }: Props) => {
  const classes = useStyles()
  return (
    <>
      <StrippedTable>
        <TableHead>
          <TableRow>
            <TableCell>Bundle</TableCell>
            <TableCell>Week</TableCell>
            <TableCell>Empty Places</TableCell>
            <TableCell>Sold By WIGO</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((assignation, index) => (
            <TableRow key={index}>
              <TableCell padding="default">
                {assignation.product.name}
              </TableCell>
              <TableCell padding="default">
                {formatDate(assignation.interval.from)}
              </TableCell>
              <TableCell padding="default">
                {assignation.occupations.partnerOccupation.total -
                  assignation.occupations.partnerOccupation.reserved}
                {" / "}
                {assignation.occupations.partnerOccupation.total}
              </TableCell>
              <TableCell padding="default">
                {assignation.occupations.wigoOccupation.reserved}
                {" / "}
                {assignation.occupations.wigoOccupation.total}
              </TableCell>
              <TableCell align="right">
                {assignation.status === "assigned" ? (
                  <Button variant="contained" disabled>
                    Assigned
                  </Button>
                ) : (
                  <Link to="/reservations/assignation" className={classes.cta}>
                    <Button
                      className={
                        assignation.status === "toBeAssignedAsap"
                          ? classes.ctaAlert
                          : classes.ctaRegular
                      }
                      variant="contained"
                    >
                      Assing
                    </Button>
                  </Link>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StrippedTable>
    </>
  )
}

export default ReservationsListTable
