import {
  Customer,
  RoomPassengers,
  Passenger,
  Occupancy,
} from "../../../../features/checkout/checkoutTypes"
import { jsonClone } from "../../../../utils/objectUtils"
import { indexes } from "../../../../utils/arrayUtils"

const customerToPassenger = (customer: Customer): Passenger => {
  return {
    name: customer.name,
    surname: customer.surname,
    gender: customer.gender,
    birthday: customer.birthday,
  }
}

const mergeCustomerWithPassengers = (
  customer: Customer,
  rooms: RoomPassengers[]
): RoomPassengers[] => {
  const updatedRooms = jsonClone(rooms)
  updatedRooms[0].passengers.unshift(customerToPassenger(customer))
  return updatedRooms
}

const removeCustomerFromPassengers = (
  rooms: RoomPassengers[]
): RoomPassengers[] => {
  const updatedRooms = jsonClone(rooms)
  updatedRooms[0].passengers.shift()
  return updatedRooms
}

const initCustomerForForm = (customer: Customer | undefined): Customer => {
  return (
    customer ?? {
      name: "",
      surname: "",
      birthday: "",
      email: "",
      phone: "",
      taxCode: "",
      gender: "",
    }
  )
}

const createEmptyPassenger = (): Passenger => ({
  name: "",
  surname: "",
  gender: "",
  birthday: "",
})

const getExtraPassengersCount = (roomIndex: number, occupancy: Occupancy) =>
  roomIndex === 0
    ? occupancy.rooms[roomIndex].totAdults - 1
    : occupancy.rooms[roomIndex].totAdults

const initPassengersForForm = (
  occupancy: Occupancy,
  rooms: RoomPassengers[] | undefined
): RoomPassengers[] => {
  if (rooms) {
    return removeCustomerFromPassengers(rooms)
  }

  return indexes(0, occupancy.rooms.length).map((x) => ({
    passengers: indexes(0, getExtraPassengersCount(x, occupancy)).map(() =>
      createEmptyPassenger()
    ),
  }))
}

const getFormDefaultValue = (
  occupancy: Occupancy,
  customer: Customer | undefined,
  rooms: RoomPassengers[] | undefined
) => {
  return {
    customer: initCustomerForForm(customer),
    rooms: initPassengersForForm(occupancy, rooms),
  }
}

export { mergeCustomerWithPassengers, getFormDefaultValue }
