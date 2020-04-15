import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Theme,
  Typography,
} from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import PersonIcon from "@material-ui/icons/Person"
import { makeStyles } from "@material-ui/styles"
import React from "react"
import { ProductAllotmentWithEstimations } from "../../../../../../../api/products/types"
import QuantityInput from "../../../../../../../components/ui/QuantityInput/QuantityInput"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",

    "& p": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },
  allocationBox: {
    margin: theme.spacing(3, 1),
    textAlign: "center",
  },
  allocationBarLabel: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: theme.spacing(2, 0),
  },
  b2cAllotmentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}))

interface Props {
  data: ProductAllotmentWithEstimations
}

const AllotmentTotal = ({ data }: Props) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [newAllotmentValue, setNewAllotmentValue] = React.useState(0)

  const openAllotmentDialog = () => {
    setOpen(true)
  }

  const handleAllotmentDialogCancel = () => {
    setOpen(false)
  }

  const handleAllotmentDialogOk = () => {
    setOpen(false)
    data.allocation.allocatedPlaces = newAllotmentValue
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.allocationBox}>
        <Typography color="primary">Estimated Unsold</Typography>
        <Box className={classes.allocationBarLabel}>
          <PersonIcon color="secondary"></PersonIcon>
          <Typography>
            {data.allocationEstimation.emptyPlaces}
            &nbsp;/&nbsp;
            {data.allocationEstimation.totalPlaces}
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={
            ((data.allocationEstimation.totalPlaces -
              data.allocationEstimation.emptyPlaces) /
              data.allocationEstimation.totalPlaces) *
            100
          }
        />
      </Box>
      <Box className={classes.allocationBox}>
        <Typography color="primary">WIGO Allotment</Typography>
        <Box className={classes.b2cAllotmentBox}>
          <Typography variant="h3">
            {data.allocation.allocatedPlaces}{" "}
          </Typography>
          <div>
            <Button color="primary" onClick={openAllotmentDialog}>
              <EditIcon></EditIcon>
            </Button>
            <Dialog
              open={open}
              onClose={handleAllotmentDialogOk}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Edit Allotment</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Edit WIGO allotment for <strong>{data.product.name}</strong>{" "}
                  week <strong>{data.interval.week}</strong>
                </DialogContentText>
                <QuantityInput
                  initialValue={data.allocation.allocatedPlaces}
                  minValue={data.allocation.allocatedPlaces}
                  onChange={x => setNewAllotmentValue(x)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleAllotmentDialogCancel} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleAllotmentDialogOk} color="primary">
                  Ok
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </Box>
      </Box>
    </Box>
  )
}

export default AllotmentTotal
