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
import React from "react"

interface Props {
  onRoomsSelected: (rooms: number) => void
  onRoomsChanged?: (rooms: number) => void
  onClose: () => void
  minRoom?: number
  maxRooms?: number
  initialRooms?: number
}

const defaultProps = {
  minRoom: 1,
  maxRooms: 2,
  initialRooms: 1,
}

const ProductCalendarRoom = ({
  onRoomsSelected,
  onRoomsChanged,
  onClose,
  minRoom = defaultProps.minRoom,
  maxRooms = defaultProps.maxRooms,
  initialRooms = defaultProps.initialRooms,
}: Props) => {
  const [rooms, setRooms] = React.useState(initialRooms)

  const updateRooms = (rooms: number) => {
    setRooms(rooms)
    if (onRoomsChanged) {
      onRoomsChanged(rooms)
    }
  }

  const addRoom = () => {
    if (rooms >= maxRooms) {
      return
    }
    updateRooms(rooms + 1)
  }

  const removeRoom = () => {
    if (rooms <= minRoom) {
      return
    }
    updateRooms(rooms - 1)
  }

  return (
    <>
      <DialogTitle>Seleziona la stanza</DialogTitle>
      <DialogContent>
        <Box alignItems="center" justifyContent="center" display="flex">
          <Button onClick={() => removeRoom()} disabled={rooms === minRoom}>
            <RemoveIcon />
          </Button>
          <TextField variant="outlined" size="small" value={rooms} />
          <Button onClick={() => addRoom()} disabled={rooms === maxRooms}>
            <AddIcon />
          </Button>
        </Box>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Annulla
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => onRoomsSelected(rooms)}
          >
            Conferma
          </Button>
        </DialogActions>
      </DialogContent>
    </>
  )
}

export default ProductCalendarRoom
