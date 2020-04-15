import { jsonEquals } from "./objectUtils"

const range = (start: number, end: number): number[] => {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start)
}

const indexes = (startIndex: number, count: number) =>
  range(startIndex, startIndex + count - 1)

const distinct = <T>(values: T[]) => {
  return values.filter((n, i) => values.indexOf(n) === i)
}

const distinctElements = <T>(values: T[], comparer: (value: T) => any) => {
  return values.filter(
    (other, i, arr) =>
      arr.findIndex((t) => comparer(t) === comparer(other)) === i
  )
}

const jsonDistinct = <T>(values: T[]) => {
  return distinctElements(values, (x) => JSON.stringify(x))
}

const selectMany = <TArr, TVal>(
  array: TArr[],
  selector: (value: TArr) => TVal[]
): TVal[] => {
  return array.reduce(function (a, b) {
    return a.concat(selector(b))
  }, [] as TVal[])
}

const flatten = <T>(array: T[][]): T[] => selectMany(array, (x) => x)

const sort = <T>(array: T[], property: (element: T) => number) =>
  array.sort((a, b) => property(a) - property(b))

const first = <T>(array: T[]) => array[0]
const firstOrUndefined = <T>(array: T[]) =>
  array.length > 0 ? first(array) : undefined
const firstOrDefault = <T>(array: T[], defaultValue: T) =>
  array.length > 0 ? first(array) : defaultValue

const last = <T>(array: T[]) => array[array.length - 1]
const lastOrUndefined = <T>(array: T[]) =>
  array.length > 0 ? last(array) : undefined
const lastOrDefault = <T>(array: T[], defaultValue: T) =>
  array.length > 0 ? last(array) : defaultValue

const findOrDefault = <T>(
  array: T[],
  filter: (element: T) => boolean,
  defaultValue: T
) => array.find(filter) ?? defaultValue

const findMatching = <T>(array: T[], value: T) =>
  array.find((x) => jsonEquals(x, value))

const containsMatching = <T>(array: T[], value: T) =>
  findMatching(array, value) !== undefined

const isEmpty = <T>(array: T[]) => array.length === 0
const isNotEmpty = <T>(array: T[]) => !isEmpty(array)

export {
  range,
  indexes,
  sort,
  first,
  firstOrUndefined,
  firstOrDefault,
  last,
  lastOrUndefined,
  lastOrDefault,
  findOrDefault,
  distinct,
  distinctElements,
  selectMany,
  flatten,
  jsonDistinct,
  findMatching,
  containsMatching,
  isEmpty,
  isNotEmpty,
}
