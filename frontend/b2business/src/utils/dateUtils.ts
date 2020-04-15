const formatDate = (date: Date) => {
  function pad(s: number) {
    return s < 10 ? "0" + s : s
  }
  return [
    pad(date.getDate()),
    pad(date.getMonth() + 1),
    date.getFullYear(),
  ].join("/")
}

const toIsoDate = (date: Date) => {
  function pad(s: number) {
    return s < 10 ? "0" + s : s
  }
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join("-")
}

const addDays = (date: Date, days: number) => {
  const newDate = new Date(date.valueOf())
  newDate.setDate(date.getDate() + days)
  return newDate
}

const addWeeks = (date: Date, weeks: number) => addDays(date, 7 * weeks)

function getWeekNumber(dt: Date) {
  const thisDay = dt.getDate()
  const newDate = dt
  newDate.setDate(1) // first day of month
  const digit = newDate.getDay()
  const Q = (thisDay + digit) / 7
  const R = (thisDay + digit) % 7
  if (R !== 0) return Math.ceil(Q)
  else return Q
}

export { formatDate, toIsoDate, addDays, addWeeks, getWeekNumber }
