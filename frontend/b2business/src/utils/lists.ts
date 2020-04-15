function flatten<T>(input: T[][]): T[] {
  const items: T[] = []
  input.forEach(list => list.forEach(item => items.push(item)))
  return items
}

function sortBy<T>(input: T[], key: (element: T) => any) {
  return input.sort(function(a, b) {
    const x = key(a)
    const y = key(b)
    return x < y ? -1 : x > y ? 1 : 0
  })
}

function sumValues(input: number[]) {
  return input.reduce(function(a, b) {
    return a + b
  }, 0)
}

export { flatten, sortBy, sumValues }
