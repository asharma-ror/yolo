import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import Alert from "@material-ui/lab/Alert"
import React from "react"

interface Occupancy {
  totAdults: number
}

interface Props {
  onOccupancySelected: (occupancy: Occupancy) => void
  onOccupancyChanged?: (occupancy: Occupancy) => void
  onClose: () => void
  minAdults?: number
  maxAdults?: number
  defaultAdults?: number
}

const defaultProps = {
  minAdults: 1,
  maxAdults: 4,
  defaultAdults: 2,
}

const ProductCalendarPeople = ({
  onOccupancySelected,
  onOccupancyChanged,
  onClose,
  minAdults = defaultProps.minAdults,
  maxAdults = defaultProps.maxAdults,
  defaultAdults = defaultProps.defaultAdults,
}: Props) => {
  const [occupancy, setOccupancy] = React.useState<Occupancy>({
    totAdults: defaultAdults,
  })

  const updateOccupancy = (occupancy: Occupancy) => {
    setOccupancy(occupancy)
    if (onOccupancyChanged) {
      onOccupancyChanged(occupancy)
    }
  }

  const addAdult = () => {
    if (occupancy.totAdults === maxAdults) {
      return
    }
    updateOccupancy({ totAdults: occupancy.totAdults + 1 })
  }

  const removeAdult = () => {
    if (occupancy.totAdults === minAdults) {
      return
    }
    updateOccupancy({ totAdults: occupancy.totAdults - 1 })
  }

  return (
    <>
      <DialogTitle>In quanti siete?</DialogTitle>
      <DialogContent>
        <Box alignItems="center" justifyContent="center" display="flex">
          <Button
            onClick={() => removeAdult()}
            disabled={occupancy.totAdults === minAdults}
          >
            <RemoveIcon />
          </Button>
          <TextField
            variant="outlined"
            size="small"
            value={occupancy.totAdults}
          />
          <Button
            onClick={() => addAdult()}
            disabled={occupancy.totAdults === maxAdults}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box my={1}>
          <Alert severity="info">
            I passeggeri devono avere un&apos;età compresa tra 18 e 30 anni alla
            data di prenotazione.
          </Alert>
        </Box>
        {occupancy.totAdults === 1 ? (
          <Box my={1}>
            <Alert severity="warning">
              Se viaggi da solo ti saranno aggiunti 150€ sul totale come
              supplemento camera singola
            </Alert>
          </Box>
        ) : undefined}
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Annulla
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onOccupancySelected(occupancy)}
          >
            Conferma
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}

export default ProductCalendarPeople
