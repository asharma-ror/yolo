import {
  Avatar,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from "@material-ui/core"
import orange from "@material-ui/core/colors/orange"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { roomsMap } from "../../../../../api/products/allotments"
import { ApplicationTheme } from "../../../../../styles/theme/types"
import AssignationsContext from "../../context/AssignationsContext"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  reservationsTitle: {
    display: "flex",
    justifyContent: "",
    alignItems: "flex-end",
    fontWeight: theme.typography.fontWeightBold,
  },
  reservationsAvatar: {
    backgroundColor: orange[600],
    marginRight: theme.spacing(1),
  },
  progressItem: {
    padding: theme.spacing(2, 1),
  },
  leftIcon: {},
  divider: {
    marginTop: theme.spacing(2),
  },
  secondaryWrap: {},
  progress: {},
  pinkProgress: {},
  purpleProgress: {},
  orangeProgress: {},
  blueProgress: {},
  greenProgress: {},
}))

const AssignationProgress = () => {
  const classes = useStyles()
  const { assignations, assignedRooms } = React.useContext(AssignationsContext)

  return (
    <>
      <div className={classes.reservationsTitle}>
        <Avatar className={classes.reservationsAvatar}>
          <LocalOfferIcon></LocalOfferIcon>
        </Avatar>
        <Typography variant="h6">Reservations To Assign</Typography>
      </div>
      <Divider className={classes.divider} />
      <Grid container>
        {assignations?.reservations.map(x => (
          <Grid
            key={x.occupancy.code}
            item
            xs={6}
            className={classes.progressItem}
          >
            <Typography gutterBottom>
              {x.quantity} x {roomsMap.get(x.occupancy.totAdults)} Room
            </Typography>
            <LinearProgress
              variant="determinate"
              value={
                (assignedRooms.getTotalRoomsQuantity(x.occupancy?.totAdults) /
                  x.quantity) *
                100
              }
            />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default AssignationProgress
