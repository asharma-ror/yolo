import moment from "moment"
import React from "react"
import DayPicker from "react-day-picker"
import { makeStyles } from "@material-ui/core"
import { ThemeColor } from "../../../../types/theme-types"
import styles from "./styles"
import { range } from "../../../../utils/arrayUtils"

// source: https://react-day-picker.js.org/examples/selected-week

const WEEKDAYS_SHORT = {
  it: ["DOM", "LUN", "MAR", "MER", "GIO", "VEN", "SAB"],
}

const MONTHS = {
  it: [
    "Gennaio",
    "Febbraio",
    "Marzo",
    "Aprile",
    "Maggio",
    "Giugno",
    "Luglio",
    "Agosto",
    "Settembre",
    "Ottobre",
    "Novembre",
    "Dicembre",
  ],
}

const WEEKDAYS_LONG = {
  it: [
    "Domenica",
    "Lunedì",
    "Martedì",
    "Mercoledì",
    "Giovedì",
    "Venerdì",
    "Sabato",
  ],
}

const FIRST_DAY_OF_WEEK = {
  it: 1,
}
// Translate aria-labels
const LABELS = {
  it: { nextMonth: "Prossimo mese", previousMonth: "Mese precedente" },
}

function getWeekDays(datesRange: DatesRange) {
  const days = moment(datesRange.to).diff(moment(datesRange.from), "days")
  return range(0, days).map((x) =>
    moment(datesRange.from).add(x, "days").toDate()
  )
}

interface DatesRange {
  from: Date
  to: Date
}

const getMatchingRange = (date: Date, ranges: DatesRange[]) => {
  return ranges.find((x) => x.from <= date && date <= x.to)
}

interface Props {
  color: ThemeColor
  hideHeader?: boolean
  fullWidth?: boolean
  ranges: DatesRange[]
  hideSelectedWhenHover: boolean
  onDateRangeChanged: (range: DatesRange) => void
}

const useStyles = makeStyles(styles as any)

const RangeDayPicker = ({
  onDateRangeChanged,
  ranges,
  color,
  hideHeader,
  hideSelectedWhenHover,
  fullWidth,
}: Props) => {
  const classes = useStyles({ color, hideHeader, fullWidth })

  const [hoverRange, setHoverRange] = React.useState<DatesRange | undefined>()
  const [selectedRange, setSelectedRange] = React.useState<
    DatesRange | undefined
  >()

  const handleDayChange = (date: any) => {
    const dateValue = moment(date).toDate()
    const range = getMatchingRange(dateValue, ranges)
    if (!range) {
      return
    }
    setSelectedRange(range)
    onDateRangeChanged(range)
  }

  const handleDayEnter = (date: any) => {
    const dateValue = moment(date).toDate()
    const range = getMatchingRange(dateValue, ranges)
    setHoverRange(range)
  }

  const handleDayLeave = () => {
    setHoverRange(undefined)
  }

  const handleWeekClick = (weekNumber: any, days: any, e: any) => {}

  const locale = "it"

  const modifiers = (
    selectedRange: DatesRange | undefined,
    hideSelectedWhenHover: boolean
  ) => {
    return {
      hoverRange,
      selectedRange: selectedRange
        ? {
            from: selectedRange.from,
            to: selectedRange.to,
          }
        : undefined,
      hideSelected: hideSelectedWhenHover &&
        selectedRange &&
        hoverRange &&
        hoverRange.from && {
          from: selectedRange.from,
          to: selectedRange.to,
        },
      hoverRangeStart: hoverRange?.from,
      hoverRangeEnd: hoverRange?.to,
      selectedRangeStart: selectedRange?.from,
      selectedRangeEnd: selectedRange?.to,
    }
  }

  return (
    <DayPicker
      className={classes.calendar}
      locale="it"
      months={MONTHS[locale]}
      weekdaysLong={WEEKDAYS_LONG[locale]}
      weekdaysShort={WEEKDAYS_SHORT[locale]}
      renderDay={(date) => <>{date.getDate()}</>}
      renderWeek={() => <></>}
      firstDayOfWeek={FIRST_DAY_OF_WEEK[locale]}
      labels={LABELS[locale]}
      selectedDays={selectedRange ? getWeekDays(selectedRange) : []}
      showOutsideDays
      modifiers={modifiers(selectedRange, hideSelectedWhenHover) as any}
      onDayClick={handleDayChange}
      onDayMouseEnter={handleDayEnter}
      onDayMouseLeave={handleDayLeave}
      onWeekClick={handleWeekClick}
    />
  )
}

RangeDayPicker.defaultProps = {
  color: "primary",
  rangeLength: 7,
  hideSelectedWhenHover: false,
}

export default RangeDayPicker
