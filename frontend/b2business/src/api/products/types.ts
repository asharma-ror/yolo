export interface Product {
  id: string
  name: string
}

export interface ProductAllotmentWithEstimations {
  product: Product
  interval: TimeRange
  type: ProductType
  options: ProductOption[]
  allocation: ProductAllotmentAllocation
  allocationEstimation: ProductAllocationEstimation
}

export type ProductType = "flight" | "ferry" | "hotel" | "package"

export interface ProductAllotmentAllocation {
  totalPlaces: number
  allocatedPlaces: number
}

export interface ProductAllocationEstimation {
  totalPlaces: number
  emptyPlaces: number
}

export interface ProductOption {
  departure: TravelSegment
  return: TravelSegment
  hotels: HotelDetails[]
}

export interface TravelSegment {
  from: Destination
  to: Destination
  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string
  estimatedAllocation: AllocationEstimate
}

export interface HotelDetails {
  hotelName: string
  hotelDestination: string
  estimatedAllocation: AllocationEstimate
}

export interface ProductDetails {
  from: Destination
  to: Destination
  code: string
  departureDate: string
  departureTime: string
  arrivalDate: string
  arrivalTime: string
}

export interface AllocationEstimate {
  totPlaces: number
  allocatedPlaces: number
}

export interface Destination {
  code: string
  name: string
}

export interface TimeRange {
  from: Date
  to: Date
  week: number
}
