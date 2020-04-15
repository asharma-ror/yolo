export interface PricingDetailsRecord {
  departureDate: Date
  airportCode: string
  airportName: string
  hotelId: string
  hotelName: string
  destinationId: string
  destinationName: string
  roomType: string
  roomName: string
  bookingDate: Date
  lastYear: PricingDetailsValues
  actual: PricingDetailsValues
  optimal: PricingDetailsValues
}

export interface PricingDetailsValues {
  price: DataValue
  percLoadFactor: DataValue
  absLoadFactor: DataProgress
  revenue: DataValue
}

export interface DestinationRankingData {
  destinationId: string
  destinationName: string
  lastYearRevenue: DataValue
  actualRevenue: DataValue
  optimalRevenue: DataValue
}

export interface PricingDashboardData {
  revenue: DashboardSummaryData
  loadFactor: DashboardSummaryData
}

export interface DashboardSummaryData {
  today: DashboardSummaryValues
  nextWeek: DashboardSummaryValues
  closure: DashboardSummaryValues
}

export interface DashboardSummaryValues {
  lastYear: DataValue
  actual: DataValue
  optimal?: DataValue
}

export interface DataValue {
  value: number
  unit?: string
}

export interface DataProgress {
  value: number
  total: number
  unit?: string
}
