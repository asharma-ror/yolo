const writeObject = <T>(key: string, value: T) =>
  window.localStorage.setItem(key, JSON.stringify(value))

const readObject = <T>(key: string): T | undefined => {
  const serializedValue = window.localStorage.getItem(key)
  return serializedValue ? (JSON.parse(serializedValue) as T) : undefined
}

export { writeObject, readObject }
