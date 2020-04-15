import { addDays } from "../../utils/dateUtils"
import { createRange } from "../../utils/numbers"
import {
  DestinationRankingData,
  PricingDashboardData,
  PricingDetailsRecord,
} from "./types"

export const fakeDashboardData: PricingDashboardData = {
  loadFactor: {
    today: {
      actual: {
        value: 58,
        unit: "%",
      },
      lastYear: {
        value: 54,
        unit: "%",
      },
    },
    nextWeek: {
      actual: {
        value: 60,
        unit: "%",
      },
      optimal: {
        value: 62,
        unit: "%",
      },
      lastYear: {
        value: 58,
        unit: "%",
      },
    },
    closure: {
      actual: {
        value: 80,
        unit: "%",
      },
      lastYear: {
        value: 78,
        unit: "%",
      },
      optimal: {
        value: 84,
        unit: "%",
      },
    },
  },
  revenue: {
    today: {
      actual: {
        value: 31000000,
        unit: "€",
      },
      lastYear: {
        value: 28000000,
        unit: "€",
      },
    },
    nextWeek: {
      actual: {
        value: 31500000,
        unit: "€",
      },
      optimal: {
        value: 33000000,
        unit: "€",
      },
      lastYear: {
        value: 28500000,
        unit: "€",
      },
    },
    closure: {
      actual: {
        value: 40000000,
        unit: "€",
      },
      lastYear: {
        value: 35000000,
        unit: "€",
      },
      optimal: {
        value: 42000000,
        unit: "€",
      },
    },
  },
}

export const bestTopLevelDestinations: DestinationRankingData[] = [
  {
    destinationId: "001",
    destinationName: "Egitto",
    lastYearRevenue: { value: 32000000, unit: "€" },
    actualRevenue: { value: 41000000, unit: "€" },
    optimalRevenue: { value: 41100000, unit: "€" },
  },
  {
    destinationId: "002",
    destinationName: "Canarie",
    lastYearRevenue: { value: 30000000, unit: "€" },
    actualRevenue: { value: 40000000, unit: "€" },
    optimalRevenue: { value: 40200000, unit: "€" },
  },
]

export const criticalTopLevelDestinations: DestinationRankingData[] = [
  {
    destinationId: "003",
    destinationName: "Grecia",
    lastYearRevenue: { value: 35000000, unit: "€" },
    actualRevenue: { value: 40000000, unit: "€" },
    optimalRevenue: { value: 50000000, unit: "€" },
  },
  {
    destinationId: "004",
    destinationName: "Canarie",
    lastYearRevenue: { value: 38000000, unit: "€" },
    actualRevenue: { value: 42000000, unit: "€" },
    optimalRevenue: { value: 48000000, unit: "€" },
  },
]

const today = new Date()

export const fakePricingDetailsRecords: PricingDetailsRecord[] = createRange(
  1,
  100
).map(x => ({
  departureDate: new Date(2020, 4, 20),
  airportCode: "MXP",
  airportName: "Milano Malpensa",
  hotelId: "Hotel1",
  hotelName: "Hotel 1",
  destinationId: "001",
  destinationName: "Egitto",
  roomType: "Base",
  roomName: "Base",
  bookingDate: addDays(today, x),
  lastYear: {
    price: { value: 100, unit: "€" },
    percLoadFactor: { value: 80, unit: "%" },
    absLoadFactor: { value: 100, total: 2000 },
    revenue: { value: 1000, unit: "€" },
  },
  actual: {
    price: { value: 100, unit: "€" },
    percLoadFactor: { value: 80, unit: "%" },
    absLoadFactor: { value: 100, total: 2000 },
    revenue: { value: 1000, unit: "€" },
  },
  optimal: {
    price: { value: 100, unit: "€" },
    percLoadFactor: { value: 80, unit: "%" },
    absLoadFactor: { value: 100, total: 2000 },
    revenue: { value: 1000, unit: "€" },
  },
}))

export const fakeDetailsFilters = {
  airports: [
    {
      label: "Milano Malpensa",
      value: "MXP",
    },
    {
      label: "Bergamo Orio al Serio",
      value: "BGY",
    },
    {
      label: "Torino",
      value: "TRN",
    },
  ],
  hotels: [
    {
      label: "Hotel 1",
      value: "hotel-1",
    },
    {
      label: "Hotel 2",
      value: "hotel-2",
    },
    {
      label: "Hotel 3",
      value: "hotel-3",
    },
  ],
  destinations: [
    {
      label: "All",
      value: "000",
    },
    {
      label: "Egitto",
      value: "001",
    },
    {
      label: "Grecia",
      value: "002",
    },
    {
      label: "Canarie",
      value: "003",
    },
    {
      label: "Baleari",
      value: "004",
    },
  ],
  roomTypes: [
    {
      label: "Doppia Standard",
      value: "001",
    },
    {
      label: "Doppia Superior",
      value: "002",
    },
    {
      label: "Tripla Standard",
      value: "003",
    },
    {
      label: "Tripla Vista Mare",
      value: "004",
    },
  ],
  bundles: [
    {
      label: "Bundle Egitto",
      value: "bu-egitto",
    },
    {
      label: "Bundle Isole Greche",
      value: "bu-grecia",
    },
    {
      label: "Bundle Canarie",
      value: "bu-canarie",
    },
  ],
}
