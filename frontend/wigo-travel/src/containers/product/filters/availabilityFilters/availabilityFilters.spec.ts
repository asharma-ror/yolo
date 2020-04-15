import { singleHotelAvailabilities } from "../../../../testing/mocks/backend/availability"
import { getDurations } from "./availabilityFilters"

test("expects a dates range of two weeks to be created", () => {
  const availability = singleHotelAvailabilities({
    productId: "product-1",
    price: 1000,
    startDate: new Date(2020, 3, 1),
    totAdults: 2,
    totWeeks: 5,
    nights: [7, 14],
  })

  const durations = getDurations(availability)
  expect(durations.length).toBe(2)
  expect(durations[0].nightsFrom).toBe(1)
  expect(durations[0].nightsTo).toBe(7)
  expect(durations[1].nightsFrom).toBe(8)
  expect(durations[1].nightsTo).toBe(14)
})
