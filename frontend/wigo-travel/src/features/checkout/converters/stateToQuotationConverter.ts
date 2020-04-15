import { Gender, Customer, Passenger, RoomPassengers } from "../checkoutTypes"
import {
  CustomerInput,
  PassengerInput,
  RoomPassengersInput,
} from "../../../api/backend-api"
import { parseItalianDate, toISODate } from "../../../utils/dateUtils"

const convertGender = (value: Gender): string => {
  switch (value) {
    case "Male":
      return "male"
    case "Female":
      return "female"
    default:
      throw Error(`Invalid gender ${value}`)
  }
}

const convertDate = (value: string) => toISODate(parseItalianDate(value, "/"))

const toCustomerInput = (customer: Customer): CustomerInput => ({
  name: customer.name,
  surname: customer.surname,
  gender: customer.gender ? convertGender(customer.gender) : undefined,
  birthday: convertDate(customer.birthday),
  taxCode: customer.taxCode,
  email: customer.email,
  phone: customer.phone,
})

const toPassengerType = (passenger: Passenger): PassengerInput => ({
  name: passenger.name,
  surname: passenger.surname,
  birthday: convertDate(passenger.birthday),
  gender: passenger.gender ? convertGender(passenger.gender) : undefined,
})

const toRoomPassengersInput = (room: RoomPassengers): RoomPassengersInput => ({
  passengers: room.passengers.map((x) => toPassengerType(x)),
})

export { toCustomerInput, toRoomPassengersInput }
