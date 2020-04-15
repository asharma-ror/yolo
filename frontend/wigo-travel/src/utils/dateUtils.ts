import { sort, first, last } from "./arrayUtils"

export const toISODate = (date: Date) =>
  `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`

export const addDays = (date: Date, days: number) => {
  const copy = new Date(Number(date))
  copy.setDate(date.getDate() + days)
  return copy
}

export const parseIsoDate = (value: string, separator = "-") => {
  const parts = value.split(separator)
  return new Date(
    Date.UTC(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]))
  )
}

export const parseItalianDate = (value: string, separator = "-") => {
  const parts = value.split(separator)
  return new Date(
    Date.UTC(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))
  )
}

export const isSameMonthAndYear = (date1: Date, date2: Date) =>
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear()

const monthNames: { [locale: string]: string[] } = {}
monthNames.en = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
monthNames.it = [
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
]

export const getMonthName = (monthNumber: number, locale: string) =>
  monthNames[locale][monthNumber]

export const getMonthDate = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1)

const addMonth = (date: Date) =>
  date.getMonth() < 12
    ? new Date(date.getFullYear(), date.getMonth() + 1, date.getDate())
    : new Date(date.getFullYear() + 1, date.getMonth(), date.getDate())

export const getMonthDates = (startDate: Date, endDate: Date) => {
  const dates = []
  let date = getMonthDate(startDate)
  while (date <= endDate) {
    dates.push(date)
    date = addMonth(date)
  }
  return dates
}

export const minDate = (dates: Date[]) => {
  return first(sort(dates, (x) => x.getTime()))
}

export const maxDate = (dates: Date[]) => {
  return last(sort(dates, (x) => x.getTime()))
}
