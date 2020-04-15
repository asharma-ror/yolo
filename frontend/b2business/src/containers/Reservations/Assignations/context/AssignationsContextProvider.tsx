import React from "react"
import {
  ReservationGroup,
  TravelAssignations,
} from "../../../../api/reservations/types"
import AssignationsContext, {
  defaultAssignationsState,
} from "./AssignationsContext"

interface Props {
  initialAssignationsData: TravelAssignations
  children: React.ReactNode
}

const AssignationsContextProvider = ({
  initialAssignationsData,
  children,
}: Props) => {
  const setRoomAssignation = (
    totAdults: number,
    totAssigned: number,
    roomId: string
  ) => {
    modifyAssignation(prevState => {
      prevState.assignedRooms.setRoomQuantity(totAdults, totAssigned, roomId)
      return {
        ...prevState,
      }
    })
  }

  const assignRoom = (totAdults: number, roomId: string) => {
    modifyAssignation(prevState => {
      const reservationsGroup = prevState.assignations.reservations.find(
        (x: ReservationGroup) => x.occupancy.totAdults === totAdults
      )
      if (!reservationsGroup) {
        throw new Error("Invalid occupancy")
      }
      // reservationsGroup.selectedTravelOptions.push(roomId)
      // const newAssignedRooms = new Map<number, number>(prevState.assignedRooms)
      // newAssignedRooms.set(totAdults, newAssignedRooms.get(totAdults) ?? 0 + 1)
      return {
        ...prevState,
      }
    })
  }

  const removeRoom = (totAdults: number, roomId: string) => {
    modifyAssignation(prevState => {
      const reservationsGroup = prevState.assignations.reservations.find(
        (x: ReservationGroup) => x.occupancy.totAdults === totAdults
      )
      if (!reservationsGroup) {
        throw new Error("Invalid occupancy")
      }
      const indexToRemove = reservationsGroup.selectedTravelOptions.findIndex(
        x => x === roomId
      )
      reservationsGroup.selectedTravelOptions.splice(indexToRemove, 1)

      // const newAssignedRooms = new Map<number, number>(prevState.assignedRooms)
      // newAssignedRooms.set(totAdults, newAssignedRooms.get(totAdults) ?? 0 - 1)
      return {
        ...prevState,
      }
    })
  }

  const assignationsState = {
    assignations: initialAssignationsData as TravelAssignations,
    assignedRooms: defaultAssignationsState.assignedRooms,
    setRoomAssignation,
    assignRoom,
    removeRoom,
  }

  const [assignation, modifyAssignation] = React.useState(assignationsState)

  return (
    <AssignationsContext.Provider value={assignation}>
      {children}
    </AssignationsContext.Provider>
  )
}

export default AssignationsContextProvider
