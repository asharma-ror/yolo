import { GetCalendarAvailabilitiesQuery } from "../../api/backend-api"
import { CalendarAvailability } from "../../types/availability"
import { parseIsoDate } from "../../utils/dateUtils"

export const toCalendarAvailabilities = (
  response: GetCalendarAvailabilitiesQuery
): CalendarAvailability[] =>
  response.calendarAvailabilities?.map((x) => ({
    startDateFrom: parseIsoDate(x?.startDateFrom as string),
    minPrice: x?.minPrice as number,
    nights: x?.nights as number,
  })) ?? []
