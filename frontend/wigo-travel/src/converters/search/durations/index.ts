import { CalendarAvailability } from "../../../types/availability"
import { DurationRange } from "../../../features/search/searchTypes"
import { distinct, range, isEmpty } from "../../../utils/arrayUtils"

export const createDurations = (
  availability: CalendarAvailability[],
  rangeOffset: number
): DurationRange[] => {
  if (isEmpty(availability)) {
    return []
  }

  const nights = distinct(availability.map((x) => x.nights))
  const minValue = Math.min(...nights)
  const maxValue = Math.max(...nights)
  const ranges = range(
    Math.floor((minValue - 1) / rangeOffset),
    Math.floor((maxValue - 1) / rangeOffset)
  )
  return ranges.map((x) => ({
    minNights: x * rangeOffset + 1,
    maxNights: (x + 1) * rangeOffset,
  }))
}
