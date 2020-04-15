import { CalendarAvailability } from "../../../types/availability"
import { createDurations } from "."

const mockAvailability = (
  nights: number,
  date: Date
): CalendarAvailability => ({
  nights: nights,
  minPrice: 100,
  startDateFrom: date,
})

const mockWeekAvailability = (nights: number) => [
  mockAvailability(nights, new Date(2020, 1, 1)),
  mockAvailability(nights, new Date(2020, 1, 7)),
  mockAvailability(nights, new Date(2020, 1, 14)),
]

test("Create two week ranges", () => {
  const availability = [...mockWeekAvailability(7), ...mockWeekAvailability(14)]
  const durations = createDurations(availability, 7)
  expect(durations).toStrictEqual([
    {
      minNights: 1,
      maxNights: 7,
    },
    {
      minNights: 8,
      maxNights: 14,
    },
  ])
})

test("Create three week ranges", () => {
  const availability = [
    ...mockWeekAvailability(7),
    ...mockWeekAvailability(14),
    ...mockWeekAvailability(21),
  ]
  const durations = createDurations(availability, 7)
  expect(durations).toStrictEqual([
    {
      minNights: 1,
      maxNights: 7,
    },
    {
      minNights: 8,
      maxNights: 14,
    },
    {
      minNights: 15,
      maxNights: 21,
    },
  ])
})
