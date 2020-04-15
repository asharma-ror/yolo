import { Destination, Product, ProductType, TimeRange } from "../products/types"

export type TravelAssignationStatus =
  | "assigned"
  | "toBeAssigned"
  | "toBeAssignedAsap"

export interface TravelAssignations {
  product: Product
  interval: TimeRange
  type: ProductType
  reservations: ReservationGroup[]
  options: TravelAssignationsOptionGroup[]
  occupations: ProductStatistics
  status: TravelAssignationStatus
}

export interface ProductStatistics {
  partnerOccupation: OccupationInfo
  wigoOccupation: OccupationInfo
}

export interface OccupationInfo {
  total: number
  reserved: number
}

export interface Occupancy {
  totAdults: number
  code: string
}

export interface ReservationGroup {
  occupancy: Occupancy
  quantity: number
  selectedTravelOptions: string[]
}

export interface Reservation {
  totPassengers: number
  reservationId: string
  selectedTravelOption: string
}

export interface TravelAssignationsOptionGroup {
  destination: Destination
  values: TravelAssignationsOption[]
}

export interface TravelAssignationsOption {
  id: string
  departure: TravelDetail
  return: TravelDetail
  accomodation?: AccomodationDetail
  maxPlaces: number
}

export interface TravelDetail {
  from: Destination
  to: Destination
  code: string
  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string
}

export interface AccomodationDetail {
  hotelName: string
  hotelDestinationName: string
}
