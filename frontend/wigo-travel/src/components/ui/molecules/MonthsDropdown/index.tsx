import React from "react"
import classNames from "classnames"
import { makeStyles } from "@material-ui/core"
import CustomDropdown, {
  DropDownColor,
  DropDownVariant,
  DropDownSize,
  SelectItem,
} from "../../atoms/CustomDropdown"
import {
  getMonthDates,
  getMonthName,
  isSameMonthAndYear,
} from "../../../../utils/dateUtils"
import { distinct } from "../../../../utils/arrayUtils"

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    width: (props: any) => (props.fullWidth ? "100%" : undefined),
  },
  months: {
    flex: 7,
    marginRight: "5px",
  },
  years: {
    flex: 4,
  },
}))

interface Props {
  locale: string
  color: DropDownColor
  bold?: boolean
  fontSize?: string
  variant: DropDownVariant
  size?: DropDownSize
  negative?: boolean
  minDate: Date
  maxDate: Date
  value?: Date
  fullWidth?: boolean
  onChange: (date: Date | undefined) => void
  monthsClassName?: string
  yearsClassName?: string
}

interface CalendarItem extends SelectItem {
  value: number
}

const findMonth = (months: CalendarItem[], date?: Date) =>
  months.find((x) => x.value === date?.getMonth())

const findYear = (years: CalendarItem[], date?: Date) =>
  years.find((x) => x.value === date?.getFullYear())

const createCalendarOptions = (
  values: number[],
  labelCreator: (value: number) => string
) => {
  return distinct(values)
    .sort((a, b) => a - b)
    .map(
      (x) =>
        ({
          id: x.toString(),
          value: x,
          label: labelCreator(x),
        } as CalendarItem)
    )
}

const normalizeDateOnMonthCange = (
  newMonth: number,
  selectedYear: number,
  minDate: Date,
  maxDate: Date
) => {
  const newDate = new Date(selectedYear, newMonth, 1)
  if (newDate < minDate) {
    return isSameMonthAndYear(newDate, minDate)
      ? minDate
      : new Date(newDate.getFullYear() + 1, newMonth, 1)
  }
  if (newDate > maxDate) {
    return isSameMonthAndYear(newDate, maxDate)
      ? maxDate
      : new Date(newDate.getFullYear() - 1, newMonth, 1)
  }
  return newDate
}

const normalizeDateOnYearChange = (
  newYear: number,
  selectedMonth: number,
  minDate: Date,
  maxDate: Date
) => {
  const newDate = new Date(newYear, selectedMonth, 1)
  if (newDate < minDate) {
    return isSameMonthAndYear(newDate, minDate)
      ? minDate
      : new Date(newYear, minDate.getMonth(), 1)
  }
  if (newDate > maxDate) {
    return isSameMonthAndYear(newDate, maxDate)
      ? maxDate
      : new Date(newYear, maxDate.getMonth(), 1)
  }
  return newDate
}

const MonthsDropdown = ({
  locale,
  color,
  bold,
  fontSize,
  variant,
  size,
  negative,
  minDate,
  maxDate,
  value,
  fullWidth,
  onChange,
  monthsClassName,
  yearsClassName,
}: Props) => {
  const classes = useStyles({
    fullWidth,
  })
  const styleProps = { color, bold, fontSize, variant, size, negative }
  const dates = getMonthDates(minDate, maxDate)

  const months = createCalendarOptions(
    dates.map((x) => x.getMonth()),
    (x) => getMonthName(x, locale)
  )
  const years = createCalendarOptions(
    dates.map((x) => x.getFullYear()),
    (x) => x.toString()
  )

  const selectedMonth = findMonth(months, value)
  // const [selectedMonth, setSelectedMonth] = React.useState<
  //   CalendarItem | undefined
  // >(findMonth(months, value))
  const selectedYear = findYear(years, value)
  // const [selectedYear, setSelectedYear] = React.useState<
  //   CalendarItem | undefined
  // >(findYear(years, value))

  const emitNewDate = (date: Date | undefined) => {
    if (onChange) {
      onChange(date)
    }
  }

  const handleMonthChange = (value: CalendarItem | undefined) => {
    if (!value) {
      // setSelectedMonth(undefined)
      emitNewDate(undefined)
      return
    }

    if (!selectedYear) {
      // setSelectedMonth(value)
      return
    }

    const newDate = normalizeDateOnMonthCange(
      value.value,
      selectedYear.value,
      minDate,
      maxDate
    )

    // setSelectedMonth(value)
    // setSelectedYear(findYear(years, newDate))
    emitNewDate(newDate)
  }

  const handleYearChange = (value: CalendarItem | undefined) => {
    if (!value) {
      // setSelectedYear(undefined)
      emitNewDate(undefined)
      return
    }

    if (!selectedMonth) {
      // setSelectedYear(value)
      return
    }

    const newDate = normalizeDateOnYearChange(
      value.value,
      selectedMonth.value,
      minDate,
      maxDate
    )

    // setSelectedMonth(findMonth(months, newDate))
    // setSelectedYear(value)
    emitNewDate(newDate)
  }

  return (
    <div className={classes.root}>
      <CustomDropdown
        className={classNames(monthsClassName, classes.months)}
        values={months}
        value={selectedMonth}
        onValueChange={handleMonthChange}
        fullWidth
        {...styleProps}
      />
      <CustomDropdown
        className={classNames(yearsClassName, classes.years)}
        values={years}
        value={selectedYear}
        onValueChange={handleYearChange}
        {...styleProps}
      />
    </div>
  )
}

export default MonthsDropdown

MonthsDropdown.defaultProps = {
  locale: "it",
  color: "primary",
  variant: "outlined",
}
