import { addWeeks } from "date-fns"
import { toIsoDate } from "../../utils/dateUtils"
import { createRange } from "../../utils/numbers"
import { Product, ProductAllotmentWithEstimations } from "./types"

const roomsMap = new Map<number, string>([
  [1, "Single"],
  [2, "Double"],
  [3, "Triple"],
  [4, "Quadruple"],
])

// const fakeAiritalyAllotments: ProductAllotmentWithEstimations[] = [
//   {
//     product: {
//       id: "bu-usa",
//       name: "Bundle USA",
//     },
//     interval: {
//       from: new Date(2020, 4, 6),
//       to: new Date(2020, 4, 10),
//       week: 15,
//     },
//     type: "flight",
//     details: {
//       departure: [
//         {
//           from: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           to: {
//             code: "JFK",
//             name: "New York (JFK)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-06",
//               departureTime: "11:35",
//               arrivalDate: "2020-04-06",
//               arrivalTime: "14:45",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-07",
//               departureTime: "11:35",
//               arrivalDate: "2020-04-07",
//               arrivalTime: "14:45",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-08",
//               departureTime: "11:35",
//               arrivalDate: "2020-04-08",
//               arrivalTime: "14:45",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-09",
//               departureTime: "11:35",
//               arrivalDate: "2020-04-09",
//               arrivalTime: "14:45",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-10",
//               departureTime: "11:35",
//               arrivalDate: "2020-04-10",
//               arrivalTime: "14:45",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           to: {
//             code: "MIA",
//             name: "Miami (MIA)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG969",
//               departureDate: "2020-04-06",
//               departureTime: "09:55",
//               arrivalDate: "2020-04-06",
//               arrivalTime: "14:35",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG969",
//               departureDate: "2020-04-08",
//               departureTime: "09:55",
//               arrivalDate: "2020-04-08",
//               arrivalTime: "14:35",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG969",
//               departureDate: "2020-04-10",
//               departureTime: "09:55",
//               arrivalDate: "2020-04-10",
//               arrivalTime: "14:35",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           to: {
//             code: "SFO",
//             name: "San Francisco (SFO)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               code: "IG937",
//               departureDate: "2020-04-07",
//               departureTime: "11:00",
//               arrivalDate: "2020-04-07",
//               arrivalTime: "14:25",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               code: "IG937",
//               departureDate: "2020-04-08",
//               departureTime: "11:00",
//               arrivalDate: "2020-04-08",
//               arrivalTime: "14:25",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               code: "IG937",
//               departureDate: "2020-04-09",
//               departureTime: "11:00",
//               arrivalDate: "2020-04-09",
//               arrivalTime: "14:25",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//       ],
//       return: [
//         {
//           from: {
//             code: "JFK",
//             name: "New York (JFK)",
//           },
//           to: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           options: [
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-13",
//               departureTime: "16:45",
//               arrivalDate: "2020-04-14",
//               arrivalTime: "06:55",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-14",
//               departureTime: "16:45",
//               arrivalDate: "2020-04-15",
//               arrivalTime: "06:55",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-15",
//               departureTime: "16:45",
//               arrivalDate: "2020-04-16",
//               arrivalTime: "06:55",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-16",
//               departureTime: "16:45",
//               arrivalDate: "2020-04-17",
//               arrivalTime: "06:55",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-17",
//               departureTime: "16:45",
//               arrivalDate: "2020-04-18",
//               arrivalTime: "06:55",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "MIA",
//             name: "Miami (MIA)",
//           },
//           to: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG970",
//               departureDate: "2020-04-13",
//               departureTime: "16:30",
//               arrivalDate: "2020-04-14",
//               arrivalTime: "08:05",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },

//             {
//               from: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG970",
//               departureDate: "2020-04-15",
//               departureTime: "16:30",
//               arrivalDate: "2020-04-16",
//               arrivalTime: "08:05",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG970",
//               departureDate: "2020-04-17",
//               departureTime: "16:30",
//               arrivalDate: "2020-04-18",
//               arrivalTime: "08:05",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "SFO",
//             name: "San Francisco (SFO)",
//           },
//           to: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           options: [
//             {
//               from: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG938",
//               departureDate: "2020-04-14",
//               departureTime: "16:25",
//               arrivalDate: "2020-04-15",
//               arrivalTime: "13:05",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG938",
//               departureDate: "2020-04-15",
//               departureTime: "16:25",
//               arrivalDate: "2020-04-16",
//               arrivalTime: "13:05",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG938",
//               departureDate: "2020-04-16",
//               departureTime: "16:25",
//               arrivalDate: "2020-04-17",
//               arrivalTime: "13:05",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//       ],
//     },
//     allocation: {
//       totalPlaces: 2200,
//       allocatedPlaces: 40,
//     },
//     allocationEstimation: {
//       totalPlaces: 2200,
//       emptyPlaces: 400,
//     },
//   },
//   {
//     product: {
//       id: "bu-usa",
//       name: "Bundle USA",
//     },
//     interval: {
//       from: new Date(2020, 4, 13),
//       to: new Date(2020, 4, 17),
//       week: 16,
//     },
//     type: "flight",
//     details: {
//       departure: [
//         {
//           from: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           to: {
//             code: "JFK",
//             name: "New York (JFK)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-13",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-13",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-14",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-14",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-15",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-15",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-16",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-16",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               code: "IG901",
//               departureDate: "2020-04-17",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-17",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           to: {
//             code: "MIA",
//             name: "Miami (MIA)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG969",
//               departureDate: "2020-04-13",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-13",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG969",
//               departureDate: "2020-04-15",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-15",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG969",
//               departureDate: "2020-04-17",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-17",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           to: {
//             code: "SFO",
//             name: "San Francisco (SFO)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               code: "IG937",
//               departureDate: "2020-04-14",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-14",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               code: "IG937",
//               departureDate: "2020-04-15",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-15",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               to: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               code: "IG937",
//               departureDate: "2020-04-16",
//               departureTime: "10:20",
//               arrivalDate: "2020-04-16",
//               arrivalTime: "15:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//       ],
//       return: [
//         {
//           from: {
//             code: "JFK",
//             name: "New York (JFK)",
//           },
//           to: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           options: [
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-20",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-20",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-21",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-21",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-22",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-22",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-23",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-23",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG902",
//               departureDate: "2020-04-24",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-24",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "MIA",
//             name: "Miami (MIA)",
//           },
//           to: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           options: [
//             {
//               from: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG970",
//               departureDate: "2020-04-20",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-20",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },

//             {
//               from: {
//                 code: "JFK",
//                 name: "New York (JFK)",
//               },
//               to: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               code: "IG970",
//               departureDate: "2020-04-22",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-22",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "MIA",
//                 name: "Miami (MIA)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG970",
//               departureDate: "2020-04-24",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-24",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//         {
//           from: {
//             code: "SFO",
//             name: "San Francisco (SFO)",
//           },
//           to: {
//             code: "MXP",
//             name: "Milano Malpensa (MXP)",
//           },
//           options: [
//             {
//               from: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG938",
//               departureDate: "2020-04-21",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-21",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG938",
//               departureDate: "2020-04-22",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-22",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//             {
//               from: {
//                 code: "SFO",
//                 name: "San Francisco (SFO)",
//               },
//               to: {
//                 code: "MXP",
//                 name: "Milano Malpensa (MXP)",
//               },
//               code: "IG938",
//               departureDate: "2020-04-23",
//               departureTime: "10:00",
//               arrivalDate: "2020-04-23",
//               arrivalTime: "22:20",
//               estimatedAllocation: {
//                 totPlaces: 200,
//                 allocatedPlaces: 180,
//               },
//             },
//           ],
//         },
//       ],
//     },
//     allocation: {
//       totalPlaces: 2200,
//       allocatedPlaces: 40,
//     },
//     allocationEstimation: {
//       totalPlaces: 2200,
//       emptyPlaces: 400,
//     },
//   },
// ]

const fakeValturProducts: Product[] = [
  {
    id: "bu-egitto",
    name: "Bundle Egitto",
  },
  {
    id: "bu-grecia",
    name: "Bundle Isole Greche",
  },
  {
    id: "bu-can",
    name: "Bundle Canarie",
  },
]

const fakeValturAllotments: ProductAllotmentWithEstimations[] = createRange(
  0,
  2
).map(x => ({
  product: fakeValturProducts[0],
  interval: {
    from: new Date(2020, 3, 6),
    to: new Date(2020, 3, 10),
    week: 15 + x,
  },
  type: "package",
  options: [
    {
      departure: {
        from: {
          code: "MXP",
          name: "Milano Malpensa",
        },
        to: {
          code: "HRG",
          name: "Hurgada",
        },
        departureDate: toIsoDate(addWeeks(new Date(2020, 3, 6), x)),
        departureTime: "11:35",
        arrivalDate: toIsoDate(addWeeks(new Date(2020, 3, 6), x)),
        arrivalTime: "14:45",
        estimatedAllocation: {
          totPlaces: 200,
          allocatedPlaces: 180,
        },
      },
      return: {
        from: {
          code: "HRG",
          name: "Hurgada",
        },
        to: {
          code: "MXP",
          name: "Milano Malpensa",
        },
        departureDate: toIsoDate(addWeeks(new Date(2020, 3, 13), x)),
        departureTime: "13:00",
        arrivalDate: toIsoDate(addWeeks(new Date(2020, 3, 13), x)),
        arrivalTime: "17:00",
        estimatedAllocation: {
          totPlaces: 200,
          allocatedPlaces: 180,
        },
      },
      hotels: [
        {
          hotelName: "Hotel 1",
          hotelDestination: "",
          estimatedAllocation: {
            totPlaces: 200,
            allocatedPlaces: 180,
          },
        },
        {
          hotelName: "Hotel 2",
          hotelDestination: "",
          estimatedAllocation: {
            totPlaces: 200,
            allocatedPlaces: 170,
          },
        },
        {
          hotelName: "Hotel 3",
          hotelDestination: "",
          estimatedAllocation: {
            totPlaces: 200,
            allocatedPlaces: 185,
          },
        },
      ],
    },
    {
      departure: {
        from: {
          code: "MXP",
          name: "Milano Malpensa",
        },
        to: {
          code: "SSH",
          name: "Sharm El Sheikh",
        },
        departureDate: "2020-04-08",
        departureTime: "12:30",
        arrivalDate: "2020-04-08",
        arrivalTime: "15:30",
        estimatedAllocation: {
          totPlaces: 200,
          allocatedPlaces: 180,
        },
      },
      return: {
        from: {
          code: "SSH",
          name: "Sharm El Sheikh",
        },
        to: {
          code: "MXP",
          name: "Milano Malpensa",
        },
        departureDate: "2020-04-15",
        departureTime: "14:00",
        arrivalDate: "2020-04-15",
        arrivalTime: "18:00",
        estimatedAllocation: {
          totPlaces: 200,
          allocatedPlaces: 180,
        },
      },
      hotels: [
        {
          hotelName: "Hotel 4",
          hotelDestination: "",
          estimatedAllocation: {
            totPlaces: 200,
            allocatedPlaces: 180,
          },
        },
        {
          hotelName: "Hotel 5",
          hotelDestination: "",
          estimatedAllocation: {
            totPlaces: 200,
            allocatedPlaces: 170,
          },
        },
        {
          hotelName: "Hotel 6",
          hotelDestination: "",
          estimatedAllocation: {
            totPlaces: 200,
            allocatedPlaces: 185,
          },
        },
      ],
    },
  ],
  allocation: {
    totalPlaces: 2200,
    allocatedPlaces: 40,
  },
  allocationEstimation: {
    totalPlaces: 2200,
    emptyPlaces: 400,
  },
}))

export { roomsMap, fakeValturProducts, fakeValturAllotments }
