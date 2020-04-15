import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@material-ui/core"
import orange from "@material-ui/core/colors/orange"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { ApplicationTheme } from "../../../../../styles/theme/types"
import { sumValues } from "../../../../../utils/lists"
import AssignationsContext from "../../context/AssignationsContext"

const useStyles = makeStyles((theme: ApplicationTheme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  statusContainer: {
    textAlign: "center",
  },
  ctaContainer: {
    padding: theme.spacing(1, 3),
  },
  progress: {
    color: orange[600],
  },
}))

const AssignationConfirmation = () => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const { assignations, assignedRooms } = React.useContext(AssignationsContext)
  const totPlaces = sumValues(
    assignations.reservations.map(x => x.occupancy.totAdults * x.quantity)
  )

  const assignedPlaces = assignedRooms.getTotalAssignedPlaces()

  return (
    <div className={classes.root}>
      <div className={classes.statusContainer}>
        <Typography variant="h6">Assigned Places</Typography>
        <Typography variant="h4" className={classes.progress}>
          {assignedPlaces} / {totPlaces}
        </Typography>
      </div>
      <div className={classes.ctaContainer}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          disabled={assignedPlaces < totPlaces}
          onClick={handleClickOpen}
        >
          Confirm
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Coinfirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want to coinfirm selected assignations?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default AssignationConfirmation
