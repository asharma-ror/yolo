import { ProductAvailabilityNode } from "../../../../api/backend-api"
import { jsonDistinct, distinct, range } from "../../../../utils/arrayUtils"
import {
  CalendarDepartureOption,
  CalendarDuration,
} from "../../types/calendarTypes"

export const getDepartureOptions = (
  availabilityItems: ProductAvailabilityNode[]
): CalendarDepartureOption[] => {
  const options = availabilityItems.map(
    (x) =>
      ({
        id: [x?.departureOptionType, x?.departureOptionValue]
          .join("|")
          .toLowerCase(),
        type: x?.departureOptionType,
        value: x?.departureOptionValue,
        displayName: x?.departureOptionDisplayName,
      } as CalendarDepartureOption)
  )
  return options ? jsonDistinct(options) : []
}

const NIGHT_RANGES_STEP = 7

const getWeekIndex = (nights: number) => Math.ceil(nights / NIGHT_RANGES_STEP)

const createDurationItem = (weekIndex: number): CalendarDuration => ({
  id: `w-${weekIndex}`,
  nightsFrom: (weekIndex - 1) * NIGHT_RANGES_STEP + 1,
  nightsTo: weekIndex * NIGHT_RANGES_STEP,
  displayName: `${weekIndex} settimana`,
})

const containsAnyNight = (item: CalendarDuration, nights: number[]) =>
  nights.find((x) => item.nightsFrom <= x && x <= item.nightsTo) !== undefined

export const getDurations = (
  availabilityItems: ProductAvailabilityNode[]
): CalendarDuration[] => {
  const nights = distinct(availabilityItems.map((x) => x.nights))
  const weeksRange = range(
    getWeekIndex(Math.min(...nights)),
    getWeekIndex(Math.max(...nights))
  )

  return weeksRange
    .map(createDurationItem)
    .filter((x) => containsAnyNight(x, nights))
}

export const filterAvailabilityItems = (
  availabilityItems: ProductAvailabilityNode[],
  departure?: CalendarDepartureOption,
  duration?: CalendarDuration
) => {
  return availabilityItems?.filter(
    (x) =>
      (!departure ||
        (x?.departureOptionType === departure.type &&
          x.departureOptionValue === departure.value)) &&
      (!duration ||
        (duration.nightsFrom <= x.nights && x.nights <= duration.nightsTo))
  )
}
