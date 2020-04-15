const createRange = (start: number, end: number) => {
  const list = []
  for (let i = start; i <= end; i++) {
    list.push(i)
  }
  return list
}

export { createRange }
