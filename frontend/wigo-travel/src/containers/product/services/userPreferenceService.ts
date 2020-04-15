import { writeObject, readObject } from "../../../services/deviceStorageService"

const PREFERRED_OCCUPANCY_KEY = "_product_preferred_occupancy"
const PREFERRED_ROOMS_KEY = "_product_preferred_rooms_number"

const savePreferredOccupancy = <T>(value: T) =>
  writeObject(PREFERRED_OCCUPANCY_KEY, value)

const readPreferredOccupancy = <T>() => readObject<T>(PREFERRED_OCCUPANCY_KEY)

const savePreferredRooms = <T>(value: T) =>
  writeObject(PREFERRED_ROOMS_KEY, value)

const readPreferredRooms = <T>() => readObject<T>(PREFERRED_ROOMS_KEY)

export {
  savePreferredOccupancy,
  readPreferredOccupancy,
  savePreferredRooms,
  readPreferredRooms,
}
