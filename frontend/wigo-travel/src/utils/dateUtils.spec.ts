import { getMonthDates } from "./dateUtils"

test("Month dates", () => {
  const dates = getMonthDates(new Date(2020, 5, 1), new Date(2021, 6, 1))
  expect(dates).toStrictEqual([
    new Date(2020, 5, 1),
    new Date(2020, 6, 1),
    new Date(2020, 7, 1),
    new Date(2020, 8, 1),
    new Date(2020, 9, 1),
    new Date(2020, 10, 1),
    new Date(2020, 11, 1),
    new Date(2020, 12, 1),
    new Date(2021, 1, 1),
    new Date(2021, 2, 1),
    new Date(2021, 3, 1),
    new Date(2021, 4, 1),
    new Date(2021, 5, 1),
    new Date(2021, 6, 1),
  ])
})
