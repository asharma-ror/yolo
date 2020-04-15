export type QuantityType = "PerPerson" | "PerRoom" | "PerReservation"
export type Gender = "Male" | "Female"
export type PaymentAmountType = "Total" | "Deposit"
export type PaymentProviderType = "PayPal" | "Stripe"

export interface Price {
  amount: number
  type: string
}

export interface QuotationService {
  id: string
  displayName: string
  description: string
}

export interface IncludedService extends QuotationService {}

export interface AdditionalService extends QuotationService {
  price: Price
  quantityType: QuantityType
  isSelected: boolean
}

export interface RoomOccupancy {
  totAdults: number
}

export interface Occupancy {
  rooms: RoomOccupancy[]
}

export interface Customer {
  name: string
  surname: string
  gender: Gender | ""
  birthday: string
  taxCode: string
  email: string
  phone: string
  minAge?: number
  maxAge?: number
}

export interface Passenger {
  name: string
  surname: string
  gender: Gender | ""
  birthday: string
  minAge?: number
  maxAge?: number
}

export interface RoomPassengers {
  passengers: Passenger[]
}

export interface PaymentOption {
  id: string
  provider: PaymentProviderType
  type: PaymentAmountType
}

export interface PaymentGroup {
  type: PaymentAmountType
  amount: number
  options: PaymentOption[]
}

export interface DiscountTicket {
  amount: number
  code: string
}

export interface CheckoutState {
  quotationId: string
  quotationStatus: string
  occupancy: Occupancy | undefined
  customer: Customer | undefined
  rooms: RoomPassengers[] | undefined
  totalPrice: number | undefined
  depositPrice: number | undefined
  includedServices: IncludedService[]
  additionalServices: AdditionalService[]
  discounts: DiscountTicket[]
  paymentMethods: PaymentGroup[] | undefined
  selectedPaymentOption: PaymentOption | undefined
  initialized: boolean
  isLoading: boolean
  error: string | undefined
}

export interface QuotationDataPayload {
  quotationStatus: string
  totalPrice: number
  depositPrice: number | undefined
  includedServices: IncludedService[]
  additionalServices: AdditionalService[]
  discountTicket: DiscountTicket[]
  occupancy: Occupancy
  customer: Customer | undefined
  rooms: RoomPassengers[] | undefined
  paymentMethods: PaymentGroup[] | undefined
}

export interface InitializeQuotationPayload extends QuotationDataPayload {
  quotationId: string
}

export interface UpdateQuotationPayload extends QuotationDataPayload {}

export interface SetPassengersMutationInput {
  quotationId: string
  customer: Customer
  rooms: RoomPassengers[]
}
