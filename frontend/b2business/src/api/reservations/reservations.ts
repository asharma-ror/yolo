import { addWeeks, getWeekNumber } from "../../utils/dateUtils"
import { sortBy } from "../../utils/lists"
import { createRange } from "../../utils/numbers"
import { TravelAssignations } from "./types"

const fakeFlightTravelAssignations: TravelAssignations[] = [
  {
    product: {
      id: "bu-usa",
      name: "Bundle USA",
    },
    interval: {
      from: new Date(2020, 4, 6),
      to: new Date(2020, 4, 10),
      week: 15,
    },
    type: "flight",
    status: "toBeAssigned",
    options: [
      {
        destination: {
          code: "JFK",
          name: "New York (JFK)",
        },
        values: [
          {
            id: "bu-usa-mxp-jfk-IG901-2020-04-06",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "JFK",
                name: "New York (JFK)",
              },
              code: "IG901",
              departureDate: "2020-04-06",
              departureTime: "11:35",
              arrivalDate: "2020-04-06",
              arrivalTime: "14:45",
            },
            return: {
              from: {
                code: "JFK",
                name: "New York (JFK)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG902",
              departureDate: "2020-04-13",
              departureTime: "16:45",
              arrivalDate: "2020-04-14",
              arrivalTime: "06:55",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-jfk-IG901-2020-04-07",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "JFK",
                name: "New York (JFK)",
              },
              code: "IG901",
              departureDate: "2020-04-07",
              departureTime: "11:35",
              arrivalDate: "2020-04-07",
              arrivalTime: "14:45",
            },
            return: {
              from: {
                code: "JFK",
                name: "New York (JFK)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG902",
              departureDate: "2020-04-15",
              departureTime: "16:45",
              arrivalDate: "2020-04-16",
              arrivalTime: "06:55",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-jfk-IG901-2020-04-08",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "JFK",
                name: "New York (JFK)",
              },
              code: "IG901",
              departureDate: "2020-04-08",
              departureTime: "11:35",
              arrivalDate: "2020-04-08",
              arrivalTime: "14:45",
            },
            return: {
              from: {
                code: "JFK",
                name: "New York (JFK)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG902",
              departureDate: "2020-04-16",
              departureTime: "16:45",
              arrivalDate: "2020-04-17",
              arrivalTime: "06:55",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-jfk-IG901-2020-04-09",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "JFK",
                name: "New York (JFK)",
              },
              code: "IG901",
              departureDate: "2020-04-09",
              departureTime: "11:35",
              arrivalDate: "2020-04-09",
              arrivalTime: "14:45",
            },
            return: {
              from: {
                code: "JFK",
                name: "New York (JFK)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG902",
              departureDate: "2020-04-17",
              departureTime: "16:45",
              arrivalDate: "2020-04-18",
              arrivalTime: "06:55",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-jfk-IG901-2020-04-10",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "JFK",
                name: "New York (JFK)",
              },
              code: "IG901",
              departureDate: "2020-04-10",
              departureTime: "11:35",
              arrivalDate: "2020-04-10",
              arrivalTime: "14:45",
            },
            return: {
              from: {
                code: "JFK",
                name: "New York (JFK)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG902",
              departureDate: "2020-04-18",
              departureTime: "16:45",
              arrivalDate: "2020-04-19",
              arrivalTime: "06:55",
            },
            maxPlaces: 10,
          },
        ],
      },
      {
        destination: {
          code: "MIA",
          name: "Miami (MIA)",
        },
        values: [
          {
            id: "bu-usa-mxp-mia-IG969-2020-04-06",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "MIA",
                name: "Miami (MIA)",
              },
              code: "IG969",
              departureDate: "2020-04-06",
              departureTime: "09:55",
              arrivalDate: "2020-04-06",
              arrivalTime: "14:35",
            },
            return: {
              from: {
                code: "MIA",
                name: "Miami (MIA)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG970",
              departureDate: "2020-04-13",
              departureTime: "16:30",
              arrivalDate: "2020-04-14",
              arrivalTime: "08:05",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-mia-IG969-2020-04-08",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "MIA",
                name: "Miami (MIA)",
              },
              code: "IG969",
              departureDate: "2020-04-08",
              departureTime: "09:55",
              arrivalDate: "2020-04-08",
              arrivalTime: "14:35",
            },
            return: {
              from: {
                code: "MIA",
                name: "Miami (MIA)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG970",
              departureDate: "2020-04-15",
              departureTime: "16:30",
              arrivalDate: "2020-04-16",
              arrivalTime: "08:05",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-mia-IG969-2020-04-10",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "MIA",
                name: "Miami (MIA)",
              },
              code: "IG969",
              departureDate: "2020-04-10",
              departureTime: "09:55",
              arrivalDate: "2020-04-10",
              arrivalTime: "14:35",
            },
            return: {
              from: {
                code: "MIA",
                name: "Miami (MIA)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG970",
              departureDate: "2020-04-17",
              departureTime: "16:30",
              arrivalDate: "2020-04-18",
              arrivalTime: "08:05",
            },
            maxPlaces: 10,
          },
        ],
      },
      {
        destination: {
          code: "SFO",
          name: "San Francisco (SFO)",
        },
        values: [
          {
            id: "bu-usa-mxp-sfo-IG937-2020-04-07",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "SFO",
                name: "San Francisco (SFO)",
              },
              code: "IG937",
              departureDate: "2020-04-07",
              departureTime: "11:00",
              arrivalDate: "2020-04-07",
              arrivalTime: "14:25",
            },
            return: {
              from: {
                code: "SFO",
                name: "San Francisco (SFO)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG938",
              departureDate: "2020-04-15",
              departureTime: "16:25",
              arrivalDate: "2020-04-16",
              arrivalTime: "13:05",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-sfo-IG937-2020-04-08",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "SFO",
                name: "San Francisco (SFO)",
              },
              code: "IG937",
              departureDate: "2020-04-08",
              departureTime: "11:00",
              arrivalDate: "2020-04-08",
              arrivalTime: "14:25",
            },
            return: {
              from: {
                code: "SFO",
                name: "San Francisco (SFO)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG938",
              departureDate: "2020-04-16",
              departureTime: "16:25",
              arrivalDate: "2020-04-17",
              arrivalTime: "13:05",
            },
            maxPlaces: 10,
          },
          {
            id: "bu-usa-mxp-sfo-IG937-2020-04-09",
            departure: {
              from: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              to: {
                code: "SFO",
                name: "San Francisco (SFO)",
              },
              code: "IG937",
              departureDate: "2020-04-09",
              departureTime: "11:00",
              arrivalDate: "2020-04-09",
              arrivalTime: "14:25",
            },
            return: {
              from: {
                code: "SFO",
                name: "San Francisco (SFO)",
              },
              to: {
                code: "MXP",
                name: "Milano Malpensa (MXP)",
              },
              code: "IG938",
              departureDate: "2020-04-17",
              departureTime: "16:25",
              arrivalDate: "2020-04-18",
              arrivalTime: "13:05",
            },
            maxPlaces: 10,
          },
        ],
      },
    ],
    reservations: [
      {
        occupancy: {
          totAdults: 1,
          code: "1A",
        },
        quantity: 1,
        selectedTravelOptions: ["bu-usa-mxp-jfk-IG901-2020-04-06"],
      },
      {
        occupancy: {
          totAdults: 2,
          code: "2A",
        },
        quantity: 2,
        selectedTravelOptions: [
          "bu-usa-mxp-jfk-IG901-2020-04-06",
          "bu-usa-mxp-jfk-IG901-2020-04-06",
          "bu-usa-mxp-sfo-IG937-2020-04-08",
          "bu-usa-mxp-sfo-IG937-2020-04-08",
        ],
      },
      {
        occupancy: {
          totAdults: 3,
          code: "3A",
        },
        quantity: 3,
        selectedTravelOptions: [
          "bu-usa-mxp-sfo-IG937-2020-04-09",
          "bu-usa-mxp-mia-IG969-2020-04-06",
          "bu-usa-mxp-mia-IG969-2020-04-08",
        ],
      },
    ],
    occupations: {
      partnerOccupation: {
        reserved: 1800,
        total: 2000,
      },
      wigoOccupation: {
        reserved: 40,
        total: 80,
      },
    },
  },
]

const fakePackageTravelAssignations: TravelAssignations[] = sortBy(
  [
    ...createRange(0, 5).map(
      x =>
        ({
          product: {
            id: "bu-egitto",
            name: "Bundle Egitto",
          },
          interval: {
            from: addWeeks(new Date(2020, 4, 6), x),
            to: addWeeks(new Date(2020, 4, 10), x),
            week: getWeekNumber(new Date(2020, 4, 6)) + x,
          },
          type: "package",
          status:
            x === 0
              ? "assigned"
              : x === 1
              ? "toBeAssignedAsap"
              : "toBeAssigned",
          options: [
            {
              destination: {
                code: "HRG",
                name: "Hurghada",
              },
              values: [
                {
                  id: "HURG-0",
                  departure: {
                    code: "MXP",
                    departureDate: "2020-05-06",
                    departureTime: "10:00",
                    arrivalDate: "2020-05-06",
                    arrivalTime: "15:00",
                    from: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                    to: {
                      code: "HRG",
                      name: "Hurghada",
                    },
                  },
                  return: {
                    code: "HRG",
                    departureDate: "2020-05-13",
                    departureTime: "13:00",
                    arrivalDate: "2020-05-13",
                    arrivalTime: "18:00",
                    from: {
                      code: "HRG",
                      name: "Hurghada",
                    },
                    to: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                  },
                  accomodation: {
                    hotelName: "Hotel 1",
                    hotelDestinationName: "Hurghada",
                  },
                  maxPlaces: 5,
                },
                {
                  id: "HURG-1",
                  departure: {
                    code: "MXP",
                    departureDate: "2020-05-06",
                    departureTime: "10:00",
                    arrivalDate: "2020-05-06",
                    arrivalTime: "15:00",
                    from: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                    to: {
                      code: "HRG",
                      name: "Hurghada",
                    },
                  },
                  return: {
                    code: "HRG",
                    departureDate: "2020-05-13",
                    departureTime: "13:00",
                    arrivalDate: "2020-05-13",
                    arrivalTime: "18:00",
                    from: {
                      code: "HRG",
                      name: "Hurghada",
                    },
                    to: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                  },
                  accomodation: {
                    hotelName: "Hotel 2",
                    hotelDestinationName: "Hurghada",
                  },
                  maxPlaces: 5,
                },
              ],
            },
            {
              destination: {
                code: "SSH",
                name: "Sharm El Sheik",
              },
              values: [
                {
                  id: "SSH-0",
                  departure: {
                    code: "SSH",
                    departureDate: "2020-05-07",
                    departureTime: "12:00",
                    arrivalDate: "2020-05-07",
                    arrivalTime: "17:00",
                    from: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                    to: {
                      code: "SSH",
                      name: "Sharm El Sheik",
                    },
                  },
                  return: {
                    code: "SSH",
                    departureDate: "2020-05-14",
                    departureTime: "13:30",
                    arrivalDate: "2020-05-14",
                    arrivalTime: "18:30",
                    from: {
                      code: "SSH",
                      name: "Sharm El Sheik",
                    },
                    to: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                  },
                  accomodation: {
                    hotelName: "Hotel 3",
                    hotelDestinationName: "Sharm El Sheik",
                  },
                  maxPlaces: 5,
                },
                {
                  id: "SSH-1",
                  departure: {
                    code: "SSH",
                    departureDate: "2020-05-07",
                    departureTime: "12:00",
                    arrivalDate: "2020-05-07",
                    arrivalTime: "17:00",
                    from: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                    to: {
                      code: "SSH",
                      name: "Sharm El Sheik",
                    },
                  },
                  return: {
                    code: "SSH",
                    departureDate: "2020-05-14",
                    departureTime: "13:30",
                    arrivalDate: "2020-05-14",
                    arrivalTime: "18:30",
                    from: {
                      code: "SSH",
                      name: "Sharm El Sheik",
                    },
                    to: {
                      code: "MXP",
                      name: "Milano Malpensa",
                    },
                  },
                  accomodation: {
                    hotelName: "Hotel 4",
                    hotelDestinationName: "Sharm El Sheik",
                  },
                  maxPlaces: 5,
                },
              ],
            },
          ],
          reservations: [
            {
              occupancy: {
                code: "1A",
                totAdults: 1,
              },
              quantity: 1,
              selectedTravelOptions: [],
            },
            {
              occupancy: {
                code: "2A",
                totAdults: 2,
              },
              quantity: 4,
              selectedTravelOptions: [],
            },
            {
              occupancy: {
                code: "3A",
                totAdults: 3,
              },
              quantity: 2,
              selectedTravelOptions: [],
            },
            {
              occupancy: {
                code: "4A",
                totAdults: 4,
              },
              quantity: 2,
              selectedTravelOptions: [],
            },
          ],
          occupations: {
            partnerOccupation: {
              reserved: 1800,
              total: 2000,
            },
            wigoOccupation: {
              reserved: 40,
              total: 80,
            },
          },
        } as TravelAssignations)
    ),
    ...createRange(0, 5).map(
      x =>
        ({
          product: {
            id: "bu-grecia",
            name: "Bundle Isole Greche",
          },
          interval: {
            from: addWeeks(new Date(2020, 4, 6), x),
            to: addWeeks(new Date(2020, 4, 10), x),
            week: getWeekNumber(new Date(2020, 4, 6)) + x,
          },
          type: "package",
          status:
            x === 0
              ? "assigned"
              : x === 1
              ? "toBeAssignedAsap"
              : "toBeAssigned",
          options: [],
          reservations: [],
          occupations: {
            partnerOccupation: {
              reserved: 1800,
              total: 2000,
            },
            wigoOccupation: {
              reserved: 40,
              total: 80,
            },
          },
        } as TravelAssignations)
    ),
    ...createRange(0, 5).map(
      x =>
        ({
          product: {
            id: "bu-canarie",
            name: "Bundle Canarie",
          },
          interval: {
            from: addWeeks(new Date(2020, 4, 6), x),
            to: addWeeks(new Date(2020, 4, 10), x),
            week: getWeekNumber(new Date(2020, 4, 6)) + x,
          },
          type: "package",
          status:
            x === 0
              ? "assigned"
              : x === 1
              ? "toBeAssignedAsap"
              : "toBeAssigned",
          options: [],
          reservations: [],
          occupations: {
            partnerOccupation: {
              reserved: 1800,
              total: 2000,
            },
            wigoOccupation: {
              reserved: 40,
              total: 80,
            },
          },
        } as TravelAssignations)
    ),
  ],
  (x: TravelAssignations) => x.interval.week
)

export { fakeFlightTravelAssignations, fakePackageTravelAssignations }
