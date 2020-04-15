import React from "react"
import { TravelAssignations } from "../../../../api/reservations/types"
import { sumValues } from "../../../../utils/lists"

export class RoomsMap {
  private map = new Map<number, Map<string, number>>()

  setRoomQuantity(totAdults: number, quantity: number, roomId: string) {
    this.getOccupancyRoomsMap(totAdults).set(roomId, quantity)
    console.log("RoomsMap", this.map)
  }

  getRoomQuantity(totAdults: number, roomId: string) {
    return this.getOccupancyRoomsMap(totAdults).get(roomId) ?? 0
  }

  getTotalAssignedPlaces() {
    return sumValues(
      Array.from(this.map.keys()).map(x => x * this.getTotalRoomsQuantity(x))
    )
  }

  getTotalRoomsQuantity(totAdults: number) {
    return sumValues(Array.from(this.getOccupancyRoomsMap(totAdults).values()))
  }

  getTotalRoomsOfType(totAdults: number, roomId: string) {
    return this.getOrAdd(this.getOccupancyRoomsMap(totAdults), roomId, () => 0)
  }

  private getOccupancyRoomsMap(totAdults: number): Map<string, number> {
    return this.getOrAdd(this.map, totAdults, () => new Map<string, number>())
  }

  private getOrAdd<TKey, TVal>(
    map: Map<TKey, TVal>,
    key: TKey,
    init: () => TVal
  ): TVal {
    let item = map.get(key)
    if (item) {
      return item
    }

    item = init()
    map.set(key, item)
    return item
  }
}

interface AssignationsContext {
  assignations: TravelAssignations
  assignedRooms: RoomsMap
  setRoomAssignation: (
    totAdults: number,
    totAssigned: number,
    roomId: string
  ) => void
  assignRoom: (totAdults: number, roomId: string) => void
  removeRoom: (totAdults: number, roomId: string) => void
}

export const defaultAssignationsState = {
  assignations: {
    interval: {
      from: new Date(),
      to: new Date(),
      week: 0,
    },
    occupations: {
      partnerOccupation: {
        total: 0,
        reserved: 0,
      },
      wigoOccupation: {
        total: 0,
        reserved: 0,
      },
    },
    options: [],
    reservations: [],
    product: {
      id: "",
      name: "",
    },
    status: "toBeAssigned",
    type: "package",
  },
  assignedRooms: new RoomsMap(),
}

export default React.createContext<AssignationsContext>({
  assignations: defaultAssignationsState.assignations as TravelAssignations,
  assignedRooms: defaultAssignationsState.assignedRooms,
  setRoomAssignation: (
    totAdults: number,
    totAssigned: number,
    roomId: string
  ) => {
    throw new Error("Not implemented")
  },
  assignRoom: (totAdults: number, roomId: string) => {
    throw new Error("Not implemented")
  },
  removeRoom: (totAdults: number, roomId: string) => {
    throw new Error("Not implemented")
  },
})
