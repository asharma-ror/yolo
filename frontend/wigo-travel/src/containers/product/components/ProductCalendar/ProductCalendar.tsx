import { Dialog } from "@material-ui/core"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions/transition"
import { navigate } from "gatsby"
import ProductCalendarPeople from "./ProductCalendarPeople"
import ProductCalendarRoom from "./ProductCalendarRoom"
import ProductCalendarWeeks from "./ProductCalendarWeeks"
import React from "react"
import {
  readPreferredOccupancy,
  savePreferredOccupancy,
  readPreferredRooms,
  savePreferredRooms,
} from "../../services/userPreferenceService"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface Props {
  open: boolean
  productId: any
  totAdults?: number
  totRooms?: number
  onClose: () => void
}

const defaultProps = {
  totAdults: 2,
  totRooms: 1,
}

const ProductCalendar = ({
  open,
  onClose,
  productId,
  totAdults = defaultProps.totAdults,
  totRooms = defaultProps.totRooms,
}: Props) => {
  const [calendarStep, setCalendarStep] = React.useState(0)
  const [adults, setAdults] = React.useState(totAdults)
  const [rooms, setRooms] = React.useState(totRooms)

  React.useEffect(() => {
    const preferredAdults = readPreferredOccupancy<any>()?.totAdults
    if (preferredAdults) {
      setAdults(preferredAdults)
    }
    const preferredRooms = readPreferredRooms<number>()
    if (preferredRooms) {
      setRooms(preferredRooms)
    }
  })

  const handleClose = () => {
    setCalendarStep(0)
    onClose()
  }
  const setOccupancy = (occupancy: any) => {
    const { totAdults } = occupancy
    setAdults(totAdults)
    setCalendarStep(2)
  }

  const setRoom = (rooms: number) => {
    setRooms(rooms)
    setCalendarStep(2)
  }

  const renderCalendarStep = () => {
    switch (calendarStep) {
      case 0:
        return (
          <ProductCalendarPeople
            defaultAdults={adults}
            onOccupancySelected={(occupancy) => setOccupancy(occupancy)}
            onOccupancyChanged={(occupancy) =>
              savePreferredOccupancy(occupancy)
            }
            onClose={handleClose}
          />
        )
      case 1:
        return (
          <ProductCalendarRoom
            onRoomsSelected={(rooms) => setRoom(rooms)}
            onRoomsChanged={(rooms) => savePreferredRooms(rooms)}
            onClose={handleClose}
          />
        )
      case 2:
        return (
          <ProductCalendarWeeks
            productId={productId}
            totAdults={adults}
            totRooms={rooms}
            onAirpotSelected={(quotationId) =>
              navigate("/checkout/" + quotationId + "/services")
            }
            onClose={handleClose}
          />
        )
      default:
        return undefined
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      style={{ width: "100%", maxWidth: "none" }}
      aria-labelledby="calendar-dialog-title"
      aria-describedby="calendar-dialog-description"
    >
      {renderCalendarStep()}
    </Dialog>
  )
}

export default ProductCalendar
