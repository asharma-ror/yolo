import { CalendarAvailability } from "../../../types/availability"
import { DurationRange } from "../../../features/search/searchTypes"

export const filterAvailability = (
  availability: CalendarAvailability[],
  duration?: DurationRange,
  date?: Date
): CalendarAvailability[] => {
  return availability.filter(
    (x) =>
      (!date || x.startDateFrom.getTime() === date.getTime()) &&
      (!duration ||
        (duration.minNights <= x.nights && x.nights <= duration.maxNights))
  )
}
