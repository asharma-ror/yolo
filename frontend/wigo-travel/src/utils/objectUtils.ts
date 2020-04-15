export const jsonClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}

export const jsonEquals = <T>(obj1: T, obj2: T) =>
  JSON.stringify(obj1) === JSON.stringify(obj2)
