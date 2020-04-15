import { ProductAvailabilityNode } from "../../../api/backend-api"
import { randomId } from "../../../utils/stringUtils"
import { toISODate, addDays } from "../../../utils/dateUtils"
import { range, flatten } from "../../../utils/arrayUtils"

const createHotelAvailability = (
  productId: string,
  totAdults: number,
  startDate: Date,
  nights: number,
  price: number
): ProductAvailabilityNode => ({
  availabilityKey: randomId(),
  id: randomId(),
  days: nights,
  nights: nights,
  departureOptionValue: "",
  departureOptionType: "None",
  occupancyCode: `${totAdults}U30`,
  price: price,
  productId: productId,
  startDateFrom: toISODate(startDate),
  startDateTo: toISODate(addDays(startDate, nights)),
  totAdults: totAdults,
  totAllotments: 1,
  destinationCodes: [],
  destinationsData: "",
})

const createHotelAvailabilities = (
  productId: string,
  startDate: Date,
  nights: number,
  totWeeks: number,
  totAdults: number,
  price: number
) =>
  range(0, totWeeks).map((x) =>
    createHotelAvailability(
      productId,
      totAdults,
      addDays(startDate, nights * x),
      nights,
      price
    )
  )

export const singleHotelAvailabilities = (
  availability: MockedAvailabilityInfo
): ProductAvailabilityNode[] =>
  flatten(
    availability.nights.map((x) =>
      createHotelAvailabilities(
        availability.productId,
        availability.startDate,
        x,
        availability.totWeeks,
        availability.totAdults,
        availability.price
      )
    )
  )

interface MockedAvailabilityInfo {
  productId: string
  startDate: Date
  nights: number[]
  totWeeks: number
  totAdults: number
  price: number
}
