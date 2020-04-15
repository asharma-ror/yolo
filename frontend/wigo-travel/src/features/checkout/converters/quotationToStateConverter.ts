import {
  AdditionalService,
  IncludedService,
  InitializeQuotationPayload,
  QuantityType,
  Occupancy,
  Customer,
  RoomPassengers,
  Gender,
  Passenger,
  PaymentGroup,
  PaymentAmountType,
  PaymentProviderType,
  DiscountTicket,
} from "../checkoutTypes"
import {
  QuotationNode,
  QuotationAdditionalServiceType,
  QuotationServiceType,
  CustomerType,
  PassengerType,
  QuotationRoomType,
} from "../../../api/backend-api"

const AUTOMATIC_SELECTION_TYPE = "automatic"
const ANCILLARY_SERVICE_TYPE = "ancillary_service"
const DISCOUNT_SERVICE_TYPE = "coupon"

const isIncludedAncillaryService = (service: QuotationServiceType) =>
  service?.serviceType === ANCILLARY_SERVICE_TYPE &&
  service.selectionType === AUTOMATIC_SELECTION_TYPE

const toIncludedService = (service: QuotationServiceType): IncludedService => ({
  id: service.serviceId,
  displayName: service.name,
  description: "",
})

const parseQuantityType = (value: string): QuantityType => {
  switch (value) {
    case "per_person":
      return "PerPerson"
    case "per_reservation":
      return "PerReservation"
    case "per_room":
      return "PerRoom"
    default:
      throw Error(`Invalid quantity type ${value}`)
  }
}

const parseGender = (value: string): Gender => {
  switch (value) {
    case "male":
      return "Male"
    case "female":
      return "Female"
    default:
      throw Error(`Invalid gender ${value}`)
  }
}

const toAdditionalService = (
  service: QuotationAdditionalServiceType,
  quotationServices: QuotationServiceType[]
): AdditionalService => ({
  id: service.serviceId,
  displayName: service.name,
  description: "",
  isSelected:
    quotationServices.findIndex((x) => x.serviceId === service.serviceId) >= 0,
  price: {
    amount: service.price,
    type: service.priceType ?? "",
  },
  quantityType: parseQuantityType(service.quantityType ?? ""),
})

const toDiscountTicket = (service: QuotationServiceType): DiscountTicket => ({
  amount: Math.abs(service.price),
  code: service.serviceId,
})

const toCustomer = (
  customer: CustomerType,
  customerPassenger: PassengerType
): Customer => ({
  name: customer.name ?? "",
  surname: customer.surname ?? "",
  gender: customer.gender ? parseGender(customer.gender) : "",
  birthday: customer.birthday ?? "",
  taxCode: customer.taxCode ?? "",
  email: customer.email ?? "",
  phone: customer.phone ?? "",
  minAge: customerPassenger.minAge ?? undefined,
  maxAge: customerPassenger.maxAge ?? undefined,
})

const toPassenger = (passenger: PassengerType): Passenger => ({
  name: passenger.name ?? "",
  surname: passenger.surname ?? "",
  birthday: passenger.birthday ?? "",
  gender: passenger.gender ? parseGender(passenger.gender) : "",
  minAge: passenger.minAge ?? undefined,
  maxAge: passenger.maxAge ?? undefined,
})

const toRoom = (room: QuotationRoomType): RoomPassengers => ({
  passengers: room.passengerSet
    .sort((x, y) => x.passengerIndex - y.passengerIndex)
    .map((x) => toPassenger(x)),
})

const hasPassengers = (quotation: QuotationNode) =>
  quotation?.quotationroomSet[0].passengerSet.length > 0

const createPaymentOptionId = (
  paymentType: PaymentAmountType,
  provider: PaymentProviderType
) => `${paymentType}_${provider}`.toLowerCase()

const createPaymentOption = (
  paymentType: PaymentAmountType,
  provider: PaymentProviderType
) => ({
  id: createPaymentOptionId(paymentType, provider),
  provider: provider,
  type: paymentType,
})

const createPaymentGroup = (
  paymentType: PaymentAmountType,
  amount: number
): PaymentGroup => ({
  amount: amount,
  type: paymentType,
  options: [
    createPaymentOption(paymentType, "Stripe"),
    createPaymentOption(paymentType, "PayPal"),
  ],
})

const defaultPaymentMethods = (quotation: QuotationNode) => {
  const payments = []
  if (quotation.depositPrice) {
    payments.push(createPaymentGroup("Deposit", quotation.depositPrice))
  }
  payments.push(createPaymentGroup("Total", quotation.totalPrice))
  return payments
}

const converter = {
  getQuotationId: (quotation: QuotationNode) => quotation.quotationId,

  getQuotationStatus: (quotation: QuotationNode) => quotation.status as string,

  getOccupancy: (quotation: QuotationNode): Occupancy => ({
    rooms: quotation.quotationroomSet.map((x) => ({
      totAdults: x.totAdults,
    })),
  }),

  getCustomer: (quotation: QuotationNode): Customer | undefined =>
    quotation.customer
      ? toCustomer(
          quotation.customer,
          quotation.quotationroomSet[0].passengerSet[0]
        )
      : undefined,

  getRooms: (quotation: QuotationNode): RoomPassengers[] | undefined =>
    hasPassengers(quotation)
      ? quotation?.quotationroomSet
          .sort((x, y) => x.roomIndex - y.roomIndex)
          .map((x) => toRoom(x)) ?? undefined
      : undefined,

  getTotalPrice: (quotation: QuotationNode) => quotation.totalPrice,
  getDepositPrice: (quotation: QuotationNode) =>
    quotation.depositPrice ?? undefined,

  getIncludedServices: (quotation: QuotationNode): IncludedService[] =>
    quotation.quotationroomSet[0].quotationserviceSet
      .filter((x) => isIncludedAncillaryService(x))
      .map((x) => toIncludedService(x)) ?? [],

  getAdditionalServices: (quotation: QuotationNode): AdditionalService[] =>
    quotation.quotationroomSet[0].quotationadditionalserviceSet.map((x) =>
      toAdditionalService(x, quotation.quotationroomSet[0].quotationserviceSet)
    ) ?? [],

  getDiscountTickets: (quotation: QuotationNode): DiscountTicket[] =>
    quotation.quotationroomSet[0].quotationserviceSet
      .filter((x) => x.serviceType === DISCOUNT_SERVICE_TYPE)
      .map((x) => toDiscountTicket(x)) ?? [],

  getPaymentMethods: (quotation: QuotationNode): PaymentGroup[] | undefined =>
    hasPassengers(quotation) ? defaultPaymentMethods(quotation) : undefined,
}

const extractQuotationPayload = (
  quotation: QuotationNode
): InitializeQuotationPayload => ({
  quotationId: converter.getQuotationId(quotation),
  quotationStatus: converter.getQuotationStatus(quotation),
  totalPrice: converter.getTotalPrice(quotation),
  depositPrice: converter.getDepositPrice(quotation),
  includedServices: converter.getIncludedServices(quotation),
  additionalServices: converter.getAdditionalServices(quotation),
  discountTicket: converter.getDiscountTickets(quotation),
  occupancy: converter.getOccupancy(quotation),
  customer: converter.getCustomer(quotation),
  rooms: converter.getRooms(quotation),
  paymentMethods: converter.getPaymentMethods(quotation),
})

export { extractQuotationPayload }
