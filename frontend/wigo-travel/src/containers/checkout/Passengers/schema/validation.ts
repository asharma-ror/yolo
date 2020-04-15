import * as yup from "yup"
import {
  RoomPassengers,
  Passenger,
} from "../../../../features/checkout/checkoutTypes"
import { parseItalianDate } from "../../../../utils/dateUtils"

const AGE_VALIDATION_NAME = "age"

const shiftDate = (value: Date, yearsOffset: number) => {
  const d = new Date(
    Date.UTC(
      value.getFullYear() + yearsOffset,
      value.getMonth(),
      value.getDate()
    )
  )
  return d
}

const today = () => {
  const d = new Date()
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
}

const isValidBirthday = (birthday: Date, minAge?: number, maxAge?: number) => {
  const d = today()
  const minDate = maxAge ? shiftDate(d, -maxAge - 1) : undefined
  const maxDate = minAge ? shiftDate(d, -minAge) : undefined
  return (!minDate || minDate < birthday) && (!maxDate || birthday <= maxDate)
}

const extractIndex = (value: string) => {
  const index = value?.match(/\[(.*?)\]/)
  if (!index) {
    throw new Error(`Cannot extract index from expression ${value}`)
  }
  return parseInt(index[1])
}

const getPassenger = (
  context: yup.TestContext,
  rooms: RoomPassengers[]
): Passenger => {
  const path = context.path.split(".")
  const roomIndex = extractIndex(path[0])
  const passengerIndex = extractIndex(path[1]) + (roomIndex === 0 ? 1 : 0)
  return rooms[roomIndex].passengers[passengerIndex]
}

const validateAgeTest = (passenger: Passenger, value?: any) => {
  if (!value) {
    return false
  }

  return isValidBirthday(
    parseItalianDate(value, "/"),
    passenger.minAge,
    passenger.maxAge
  )
}

const schema = (rooms: RoomPassengers[]) => {
  return yup.object().shape({
    customer: yup.object().shape({
      name: yup.string().required(),
      surname: yup.string().required(),
      gender: yup.string().required(),
      birthday: yup
        .string()
        .required()
        .test(AGE_VALIDATION_NAME, "Data di nascita non valida", function (
          value
        ) {
          return validateAgeTest(rooms[0].passengers[0], value)
        }),
      taxCode: yup.string().required(),
      email: yup.string().email().required(),
      phone: yup.string().required(),
    }),
    rooms: yup.array().of(
      yup.object().shape({
        passengers: yup.array().of(
          yup.object().shape({
            name: yup.string().required(),
            surname: yup.string().required(),
            birthday: yup
              .string()
              .required()
              .test(
                AGE_VALIDATION_NAME,
                "Data di nascita non valida",
                function (value) {
                  return validateAgeTest(getPassenger(this, rooms), value)
                }
              ),
            gender: yup.string().required(),
          })
        ),
      })
    ),
  })
}

export default schema
