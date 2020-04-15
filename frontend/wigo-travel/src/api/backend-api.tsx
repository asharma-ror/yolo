import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Date: any;
  Decimal: any;
  Time: any;
  SocialCamelJSON: any;
  GenericScalar: any;
};

export type AccommodationType = {
   __typename?: 'AccommodationType';
  hotel?: Maybe<CompanyHotelNode>;
  room?: Maybe<CompanyRoomNode>;
};

export type AddAdditionalServiceMutationInput = {
  quotationId: Scalars['String'];
  serviceId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddAdditionalServiceMutationPayload = {
   __typename?: 'AddAdditionalServiceMutationPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddDiscountTicketMutationInput = {
  quotationId: Scalars['String'];
  discountCode: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AddDiscountTicketMutationPayload = {
   __typename?: 'AddDiscountTicketMutationPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type AllocationType = {
   __typename?: 'AllocationType';
  totPlaces?: Maybe<Scalars['Int']>;
  allocatedPlaces?: Maybe<Scalars['Int']>;
};

export type AllotmentHotelDetails = {
   __typename?: 'AllotmentHotelDetails';
  hotel?: Maybe<CompanyHotelNode>;
  estimatedAllocation?: Maybe<AllocationType>;
};


export type AllotmentHotelDetailsHotelArgs = {
  id: Scalars['ID'];
};

export type AllotmentOptionType = {
   __typename?: 'AllotmentOptionType';
  travelDeparture?: Maybe<AllotmentTravelSegment>;
  travelReturn?: Maybe<AllotmentTravelSegment>;
  hotels?: Maybe<Array<Maybe<AllotmentHotelDetails>>>;
};

export type AllotmentTravelSegment = {
   __typename?: 'AllotmentTravelSegment';
  details?: Maybe<TravelSegmentType>;
  estimatedAllocation?: Maybe<AllocationType>;
};

export type AncillaryServiceNode = Node & {
   __typename?: 'AncillaryServiceNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  serviceId: Scalars['String'];
  name: Scalars['String'];
  quantityType: AncillaryServiceQuantityType;
  selectionType: AncillaryServiceSelectionType;
  priceType: AncillaryServicePriceType;
  price: Scalars['Float'];
  priority: Scalars['Int'];
  validFrom?: Maybe<Scalars['Date']>;
  validTo?: Maybe<Scalars['Date']>;
  productallotmentSet: ProductAllotmentNodeConnection;
};


export type AncillaryServiceNodeProductallotmentSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type AncillaryServiceNodeConnection = {
   __typename?: 'AncillaryServiceNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<AncillaryServiceNodeEdge>>;
};

export type AncillaryServiceNodeEdge = {
   __typename?: 'AncillaryServiceNodeEdge';
  node?: Maybe<AncillaryServiceNode>;
  cursor: Scalars['String'];
};

export enum AncillaryServicePriceType {
  A_1 = 'A_1',
  A_2 = 'A_2'
}

export enum AncillaryServiceQuantityType {
  A_1 = 'A_1',
  A_2 = 'A_2',
  A_3 = 'A_3'
}

export enum AncillaryServiceSelectionType {
  A_1 = 'A_1',
  A_2 = 'A_2'
}

export type CalendarAvailabilityType = {
   __typename?: 'CalendarAvailabilityType';
  startDateFrom?: Maybe<Scalars['Date']>;
  nights?: Maybe<Scalars['Int']>;
  minPrice?: Maybe<Scalars['Decimal']>;
};

export type CompanyAirportNode = Node & {
   __typename?: 'CompanyAirportNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  location?: Maybe<CompanyDestinationNode>;
};

export type CompanyAirportNodeConnection = {
   __typename?: 'CompanyAirportNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyAirportNodeEdge>>;
};

export type CompanyAirportNodeEdge = {
   __typename?: 'CompanyAirportNodeEdge';
  node?: Maybe<CompanyAirportNode>;
  cursor: Scalars['String'];
};

export type CompanyDestinationNode = Node & {
   __typename?: 'CompanyDestinationNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  company: CompanyNode;
  parent?: Maybe<CompanyDestinationNode>;
  code: Scalars['String'];
  name: Scalars['String'];
  companydestinationSet: CompanyDestinationNodeConnection;
  companyhotelSet: CompanyHotelNodeConnection;
  companyairportSet: CompanyAirportNodeConnection;
};


export type CompanyDestinationNodeCompanydestinationSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  companyId?: Maybe<Scalars['ID']>;
};


export type CompanyDestinationNodeCompanyhotelSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['ID']>;
  location_CompanyId?: Maybe<Scalars['ID']>;
};


export type CompanyDestinationNodeCompanyairportSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['ID']>;
  location_CompanyId?: Maybe<Scalars['ID']>;
};

export type CompanyDestinationNodeConnection = {
   __typename?: 'CompanyDestinationNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyDestinationNodeEdge>>;
};

export type CompanyDestinationNodeEdge = {
   __typename?: 'CompanyDestinationNodeEdge';
  node?: Maybe<CompanyDestinationNode>;
  cursor: Scalars['String'];
};

export type CompanyHotelNode = Node & {
   __typename?: 'CompanyHotelNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  location?: Maybe<CompanyDestinationNode>;
};

export type CompanyHotelNodeConnection = {
   __typename?: 'CompanyHotelNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyHotelNodeEdge>>;
};

export type CompanyHotelNodeEdge = {
   __typename?: 'CompanyHotelNodeEdge';
  node?: Maybe<CompanyHotelNode>;
  cursor: Scalars['String'];
};

export type CompanyNode = Node & {
   __typename?: 'CompanyNode';
  id: Scalars['ID'];
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  name: Scalars['String'];
  companyId: Scalars['String'];
  companydestinationSet: CompanyDestinationNodeConnection;
  companyroomtypeSet: CompanyRoomNodeConnection;
};


export type CompanyNodeCompanydestinationSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  companyId?: Maybe<Scalars['ID']>;
};


export type CompanyNodeCompanyroomtypeSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['ID']>;
  category?: Maybe<Scalars['ID']>;
};

export type CompanyNodeConnection = {
   __typename?: 'CompanyNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyNodeEdge>>;
};

export type CompanyNodeEdge = {
   __typename?: 'CompanyNodeEdge';
  node?: Maybe<CompanyNode>;
  cursor: Scalars['String'];
};

export type CompanyProductAllotmentConnection = {
   __typename?: 'CompanyProductAllotmentConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyProductAllotmentEdge>>;
};

export type CompanyProductAllotmentEdge = {
   __typename?: 'CompanyProductAllotmentEdge';
  node?: Maybe<CompanyProductAllotmentNode>;
  cursor: Scalars['String'];
};

export type CompanyProductAllotmentNode = Node & {
   __typename?: 'CompanyProductAllotmentNode';
  id: Scalars['ID'];
  allotmentId?: Maybe<Scalars['String']>;
  product?: Maybe<CompanyProductNode>;
  interval?: Maybe<ProductAllotmentIntervalType>;
  options?: Maybe<Array<Maybe<AllotmentOptionType>>>;
  allocation?: Maybe<AllocationType>;
  allocationEstimation?: Maybe<AllocationType>;
};

export type CompanyProductConnection = {
   __typename?: 'CompanyProductConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyProductEdge>>;
};

export type CompanyProductEdge = {
   __typename?: 'CompanyProductEdge';
  node?: Maybe<CompanyProductNode>;
  cursor: Scalars['String'];
};

export type CompanyProductNode = Node & {
   __typename?: 'CompanyProductNode';
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['String']>;
  productType?: Maybe<Scalars['String']>;
};

export type CompanyRoomNode = Node & {
   __typename?: 'CompanyRoomNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  code: Scalars['String'];
  company: CompanyNode;
};

export type CompanyRoomNodeConnection = {
   __typename?: 'CompanyRoomNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<CompanyRoomNodeEdge>>;
};

export type CompanyRoomNodeEdge = {
   __typename?: 'CompanyRoomNodeEdge';
  node?: Maybe<CompanyRoomNode>;
  cursor: Scalars['String'];
};

export type ConfirmTravelAssignationInput = {
  travelAssignationId: Scalars['ID'];
  reservations: Array<Maybe<ReservationsSelectionInput>>;
};

export type ConfirmTravelAssignationMutationInput = {
  assignation: ConfirmTravelAssignationInput;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ConfirmTravelAssignationMutationPayload = {
   __typename?: 'ConfirmTravelAssignationMutationPayload';
  ok?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateQuotationMutationInput = {
  availabilityKeys: Array<Maybe<Scalars['String']>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CreateQuotationMutationPayload = {
   __typename?: 'CreateQuotationMutationPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type CustomerInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  birthday: Scalars['Date'];
  gender?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  birthCountry?: Maybe<Scalars['String']>;
  birthState?: Maybe<Scalars['String']>;
  birthCity?: Maybe<Scalars['String']>;
};

export type CustomerType = {
   __typename?: 'CustomerType';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  quotation: QuotationNode;
  name: Scalars['String'];
  surname: Scalars['String'];
  email: Scalars['String'];
  userId?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Scalars['String']>;
  taxCode?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  birthCountry?: Maybe<Scalars['String']>;
  birthState?: Maybe<Scalars['String']>;
  birthCity?: Maybe<Scalars['String']>;
};

export type DashboardSummaryDataType = {
   __typename?: 'DashboardSummaryDataType';
  today?: Maybe<DashboardSummaryValuesType>;
  nextWeek?: Maybe<DashboardSummaryValuesType>;
  closure?: Maybe<DashboardSummaryValuesType>;
};

export type DashboardSummaryValuesType = {
   __typename?: 'DashboardSummaryValuesType';
  lastYear?: Maybe<DataValueType>;
  actual?: Maybe<DataValueType>;
  optimal?: Maybe<DataValueType>;
};

export type DataProgressType = {
   __typename?: 'DataProgressType';
  value?: Maybe<Scalars['Decimal']>;
  total?: Maybe<Scalars['Decimal']>;
  unit?: Maybe<Scalars['String']>;
};

export type DataValueType = {
   __typename?: 'DataValueType';
  value?: Maybe<Scalars['Decimal']>;
  unit?: Maybe<Scalars['String']>;
};




export type DepartureOption = Node & {
   __typename?: 'DepartureOption';
  id: Scalars['ID'];
  type: DepartureOptionType;
  value: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  productallotmentSet: ProductAllotmentNodeConnection;
};


export type DepartureOptionProductallotmentSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DepartureOptionConnection = {
   __typename?: 'DepartureOptionConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<DepartureOptionEdge>>;
};

export type DepartureOptionEdge = {
   __typename?: 'DepartureOptionEdge';
  node?: Maybe<DepartureOption>;
  cursor: Scalars['String'];
};

export enum DepartureOptionType {
  A_1 = 'A_1',
  A_2 = 'A_2',
  A_3 = 'A_3'
}

export type DestinationNode = Node & {
   __typename?: 'DestinationNode';
  id: Scalars['ID'];
  parent?: Maybe<DestinationNode>;
  code: Scalars['String'];
  name: Scalars['String'];
  searchable: Scalars['Boolean'];
  destinationSet: DestinationNodeConnection;
  productSet: ProductNodeConnection;
};


export type DestinationNodeDestinationSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type DestinationNodeProductSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type DestinationNodeConnection = {
   __typename?: 'DestinationNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<DestinationNodeEdge>>;
};

export type DestinationNodeEdge = {
   __typename?: 'DestinationNodeEdge';
  node?: Maybe<DestinationNode>;
  cursor: Scalars['String'];
};

export type DestinationRakingSummaryDataType = {
   __typename?: 'DestinationRakingSummaryDataType';
  bestPerforming?: Maybe<Array<Maybe<DestinationRankingDataType>>>;
  worstPerforming?: Maybe<Array<Maybe<DestinationRankingDataType>>>;
};

export type DestinationRankingDataType = {
   __typename?: 'DestinationRankingDataType';
  destination?: Maybe<CompanyDestinationNode>;
  lastYearRevenue?: Maybe<DataValueType>;
  actualRevenue?: Maybe<DataValueType>;
  optimalRevenue?: Maybe<DataValueType>;
};


export type DestinationRankingDataTypeDestinationArgs = {
  id: Scalars['ID'];
};

export type DjangoDebug = {
   __typename?: 'DjangoDebug';
  sql?: Maybe<Array<Maybe<DjangoDebugSql>>>;
};

export type DjangoDebugSql = {
   __typename?: 'DjangoDebugSQL';
  vendor: Scalars['String'];
  alias: Scalars['String'];
  sql?: Maybe<Scalars['String']>;
  duration: Scalars['Float'];
  rawSql: Scalars['String'];
  params: Scalars['String'];
  startTime: Scalars['Float'];
  stopTime: Scalars['Float'];
  isSlow: Scalars['Boolean'];
  isSelect: Scalars['Boolean'];
  transId?: Maybe<Scalars['String']>;
  transStatus?: Maybe<Scalars['String']>;
  isoLevel?: Maybe<Scalars['String']>;
  encoding?: Maybe<Scalars['String']>;
};


export type InitializePaymentSessionInput = {
  data: InitializePaymentSessionInputType;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type InitializePaymentSessionInputType = {
  providerId?: Maybe<Scalars['String']>;
  quotationId?: Maybe<Scalars['String']>;
  payment?: Maybe<PaymentSessionDataType>;
  paymentSuccessBaseUrl?: Maybe<Scalars['String']>;
  paymentCancelBaseUrl?: Maybe<Scalars['String']>;
};

export type InitializePaymentSessionOutputType = {
   __typename?: 'InitializePaymentSessionOutputType';
  providerId?: Maybe<Scalars['String']>;
  paymentPayload?: Maybe<Scalars['String']>;
  paymentSessionId?: Maybe<Scalars['String']>;
  paymentAmount?: Maybe<Scalars['Decimal']>;
  paymentSuccessUrl?: Maybe<Scalars['String']>;
  paymentCancelUrl?: Maybe<Scalars['String']>;
  transactionId?: Maybe<Scalars['String']>;
};

export type InitializePaymentSessionPayload = {
   __typename?: 'InitializePaymentSessionPayload';
  paymentData?: Maybe<InitializePaymentSessionOutputType>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  registerUser?: Maybe<RegisterUser>;
  verifyEmailAddress?: Maybe<VerifyEmailAddress>;
  sendPasswordResetEmail?: Maybe<SendPasswordResetEmail>;
  resetPassword?: Maybe<ResetPassword>;
  tokenAuth?: Maybe<ObtainJsonWebToken>;
  verifyToken?: Maybe<Verify>;
  refreshToken?: Maybe<Refresh>;
  socialAuth?: Maybe<SocialAuthJwt>;
  createQuotation?: Maybe<CreateQuotationMutationPayload>;
  addAdditionalService?: Maybe<AddAdditionalServiceMutationPayload>;
  removeAdditionalService?: Maybe<RemoveAdditionalServiceMutationPayload>;
  setQuotationPassengers?: Maybe<SetQuotationPassengersPayload>;
  optionQuotation?: Maybe<OptionQuotationPayload>;
  initializePayment?: Maybe<InitializePaymentSessionPayload>;
  verifyReservation?: Maybe<VerifyReservationPayload>;
  addDiscountTicket?: Maybe<AddDiscountTicketMutationPayload>;
  removeDiscountTicket?: Maybe<RemoveDiscountTicketMutationPayload>;
  updateAllotment?: Maybe<UpdateAllotmentMutationPayload>;
  confirmTravelAssignation?: Maybe<ConfirmTravelAssignationMutationPayload>;
  _debug?: Maybe<DjangoDebug>;
};


export type MutationRegisterUserArgs = {
  birthday: Scalars['Date'];
  email: Scalars['String'];
  emailValidationBaseUrl: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyEmailAddressArgs = {
  token: Scalars['String'];
  uidb64: Scalars['String'];
};


export type MutationSendPasswordResetEmailArgs = {
  email: Scalars['String'];
  passwordResetBaseUrl: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  uidb64: Scalars['String'];
};


export type MutationTokenAuthArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVerifyTokenArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationRefreshTokenArgs = {
  token?: Maybe<Scalars['String']>;
};


export type MutationSocialAuthArgs = {
  accessToken: Scalars['String'];
  provider: Scalars['String'];
};


export type MutationCreateQuotationArgs = {
  input: CreateQuotationMutationInput;
};


export type MutationAddAdditionalServiceArgs = {
  input: AddAdditionalServiceMutationInput;
};


export type MutationRemoveAdditionalServiceArgs = {
  input: RemoveAdditionalServiceMutationInput;
};


export type MutationSetQuotationPassengersArgs = {
  input: SetQuotationPassengersInput;
};


export type MutationOptionQuotationArgs = {
  input: OptionQuotationInput;
};


export type MutationInitializePaymentArgs = {
  input: InitializePaymentSessionInput;
};


export type MutationVerifyReservationArgs = {
  input: VerifyReservationInput;
};


export type MutationAddDiscountTicketArgs = {
  input: AddDiscountTicketMutationInput;
};


export type MutationRemoveDiscountTicketArgs = {
  input: RemoveDiscountTicketMutationInput;
};


export type MutationUpdateAllotmentArgs = {
  input: UpdateAllotmentMutationInput;
};


export type MutationConfirmTravelAssignationArgs = {
  input: ConfirmTravelAssignationMutationInput;
};

export type Node = {
  id: Scalars['ID'];
};

export type ObtainJsonWebToken = {
   __typename?: 'ObtainJSONWebToken';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type OccupationInfoType = {
   __typename?: 'OccupationInfoType';
  total?: Maybe<Scalars['Int']>;
  reserved?: Maybe<Scalars['Int']>;
};

export type OptionQuotationInput = {
  quotationId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type OptionQuotationPayload = {
   __typename?: 'OptionQuotationPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type PageInfo = {
   __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
};

export type PassengerInput = {
  name: Scalars['String'];
  surname: Scalars['String'];
  birthday: Scalars['Date'];
  gender?: Maybe<Scalars['String']>;
};

export type PassengerType = {
   __typename?: 'PassengerType';
  id: Scalars['ID'];
  room: QuotationRoomType;
  passengerIndex: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  surname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  minAge?: Maybe<Scalars['Int']>;
  maxAge?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['String']>;
};

export enum PaymentPaymentType {
  A_1 = 'A_1',
  A_2 = 'A_2',
  A_3 = 'A_3'
}

export type PaymentSessionDataType = {
  method?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  payload?: Maybe<Scalars['String']>;
};

export type PaymentType = {
   __typename?: 'PaymentType';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  reservation: ReservationNode;
  userSessionId: Scalars['String'];
  paymentSessionId: Scalars['String'];
  paymentMethod: Scalars['String'];
  paymentType: PaymentPaymentType;
  paymentAmount: Scalars['Float'];
  transactionProvider: Scalars['String'];
  transactionId: Scalars['String'];
  transactionTime: Scalars['DateTime'];
};

export type PricingDashboardDataType = {
   __typename?: 'PricingDashboardDataType';
  revenue?: Maybe<DashboardSummaryDataType>;
  loadFactor?: Maybe<DashboardSummaryDataType>;
};

export type PricingDashboardFilterType = {
  dateFrom?: Maybe<Scalars['Date']>;
  dateTo?: Maybe<Scalars['Date']>;
  destinationCode?: Maybe<Scalars['String']>;
};

export type PricingDataConnection = {
   __typename?: 'PricingDataConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<PricingDataEdge>>;
};

export type PricingDataEdge = {
   __typename?: 'PricingDataEdge';
  node?: Maybe<PricingDataNode>;
  cursor: Scalars['String'];
};

export type PricingDataFilterType = {
  departureDate?: Maybe<Scalars['Date']>;
  departureAirport?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
};

export type PricingDataNode = Node & {
   __typename?: 'PricingDataNode';
  id: Scalars['ID'];
  departureDate?: Maybe<Scalars['Date']>;
  airportCode?: Maybe<Scalars['String']>;
  airportName?: Maybe<Scalars['String']>;
  hotelId?: Maybe<Scalars['String']>;
  hotelName?: Maybe<Scalars['String']>;
  destinationId?: Maybe<Scalars['String']>;
  destinationName?: Maybe<Scalars['String']>;
  roomType?: Maybe<Scalars['String']>;
  roomName?: Maybe<Scalars['String']>;
  bookingDate?: Maybe<Scalars['Date']>;
  lastYear?: Maybe<PricingDetailsValuesType>;
  actual?: Maybe<PricingDetailsValuesType>;
  optimal?: Maybe<PricingDetailsValuesType>;
};

export type PricingDetailsValuesType = {
   __typename?: 'PricingDetailsValuesType';
  price?: Maybe<DataValueType>;
  percLoadFactor?: Maybe<DataValueType>;
  absLoadFactor?: Maybe<DataProgressType>;
  revenue?: Maybe<DataValueType>;
};

export type ProductAllotmentIntervalType = {
   __typename?: 'ProductAllotmentIntervalType';
  dateFrom?: Maybe<Scalars['Date']>;
  dateTo?: Maybe<Scalars['Date']>;
};

export type ProductAllotmentNode = Node & {
   __typename?: 'ProductAllotmentNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  allotmentId: Scalars['String'];
  product: ProductNode;
  startDateFrom: Scalars['Date'];
  startDateTo: Scalars['Date'];
  nights: Scalars['Int'];
  days: Scalars['Int'];
  price: Scalars['Float'];
  quantity: Scalars['Int'];
  ancillaryServices: AncillaryServiceNodeConnection;
  departureOptions: DepartureOptionConnection;
  maxContiguousAllotmentNights: Scalars['Int'];
};


export type ProductAllotmentNodeAncillaryServicesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ProductAllotmentNodeDepartureOptionsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ProductAllotmentNodeConnection = {
   __typename?: 'ProductAllotmentNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<ProductAllotmentNodeEdge>>;
};

export type ProductAllotmentNodeEdge = {
   __typename?: 'ProductAllotmentNodeEdge';
  node?: Maybe<ProductAllotmentNode>;
  cursor: Scalars['String'];
};

export type ProductAvailabilityNode = Node & {
   __typename?: 'ProductAvailabilityNode';
  id: Scalars['ID'];
  availabilityKey: Scalars['String'];
  totAllotments: Scalars['Int'];
  productId: Scalars['String'];
  startDateFrom: Scalars['Date'];
  startDateTo: Scalars['Date'];
  nights: Scalars['Int'];
  days: Scalars['Int'];
  totAdults: Scalars['Int'];
  adultValidators?: Maybe<Scalars['String']>;
  occupancyCode: Scalars['String'];
  price: Scalars['Float'];
  departureOptionType?: Maybe<Scalars['String']>;
  departureOptionValue: Scalars['String'];
  departureOptionDisplayName?: Maybe<Scalars['String']>;
  destinationCodes: Array<Maybe<Scalars['String']>>;
  destinationsData: Scalars['String'];
};

export type ProductAvailabilityNodeConnection = {
   __typename?: 'ProductAvailabilityNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<ProductAvailabilityNodeEdge>>;
};

export type ProductAvailabilityNodeEdge = {
   __typename?: 'ProductAvailabilityNodeEdge';
  node?: Maybe<ProductAvailabilityNode>;
  cursor: Scalars['String'];
};

export type ProductNode = Node & {
   __typename?: 'ProductNode';
  id: Scalars['ID'];
  name: Scalars['String'];
  productId: Scalars['String'];
  alias: Scalars['String'];
  destinations: DestinationNodeConnection;
  productallotmentSet: ProductAllotmentNodeConnection;
};


export type ProductNodeDestinationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type ProductNodeProductallotmentSetArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ProductNodeConnection = {
   __typename?: 'ProductNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<ProductNodeEdge>>;
};

export type ProductNodeEdge = {
   __typename?: 'ProductNodeEdge';
  node?: Maybe<ProductNode>;
  cursor: Scalars['String'];
};

export type ProductStatistics = {
   __typename?: 'ProductStatistics';
  partnerOccupations?: Maybe<OccupationInfoType>;
  b2cOccupations?: Maybe<OccupationInfoType>;
};

export type Query = {
   __typename?: 'Query';
  allQuotations?: Maybe<QuotationNodeConnection>;
  quotation?: Maybe<QuotationNode>;
  allReservations?: Maybe<ReservationNodeConnection>;
  reservation?: Maybe<ReservationNode>;
  product?: Maybe<ProductNode>;
  calendarAvailabilities?: Maybe<Array<Maybe<CalendarAvailabilityType>>>;
  allProductDestinations?: Maybe<DestinationNodeConnection>;
  allProductAvailabilities?: Maybe<ProductAvailabilityNodeConnection>;
  allAncillaryServices?: Maybe<AncillaryServiceNodeConnection>;
  company?: Maybe<CompanyNode>;
  allCompanies?: Maybe<CompanyNodeConnection>;
  allCompanyDestinations?: Maybe<CompanyDestinationNodeConnection>;
  allCompanyHotels?: Maybe<CompanyHotelNodeConnection>;
  allCompanyAirports?: Maybe<CompanyAirportNodeConnection>;
  companyProducts?: Maybe<CompanyProductConnection>;
  companyProductAllotments?: Maybe<CompanyProductAllotmentConnection>;
  travelAssignations?: Maybe<TravelAssignationConnection>;
  travelAssignation?: Maybe<TravelAssignationNode>;
  pricingDashboardData?: Maybe<PricingDashboardDataType>;
  destinationsRankingData?: Maybe<DestinationRakingSummaryDataType>;
  pricingDetails?: Maybe<PricingDataConnection>;
  _debug?: Maybe<DjangoDebug>;
};


export type QueryAllQuotationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryQuotationArgs = {
  quotationId?: Maybe<Scalars['String']>;
};


export type QueryAllReservationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryReservationArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  productId?: Maybe<Scalars['String']>;
};


export type QueryCalendarAvailabilitiesArgs = {
  totAdults?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  destinationId?: Maybe<Scalars['String']>;
};


export type QueryAllProductDestinationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryAllProductAvailabilitiesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['String']>;
  totAdults?: Maybe<Scalars['Int']>;
  startDateFrom?: Maybe<Scalars['Date']>;
  quantityAvailable?: Maybe<Scalars['Int']>;
  quantityAvailable_Gte?: Maybe<Scalars['Int']>;
};


export type QueryAllAncillaryServicesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCompanyArgs = {
  id: Scalars['ID'];
};


export type QueryAllCompaniesArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  companyId?: Maybe<Scalars['String']>;
};


export type QueryAllCompanyDestinationsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['ID']>;
  companyId?: Maybe<Scalars['ID']>;
};


export type QueryAllCompanyHotelsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['ID']>;
  location_CompanyId?: Maybe<Scalars['ID']>;
};


export type QueryAllCompanyAirportsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['ID']>;
  location_CompanyId?: Maybe<Scalars['ID']>;
};


export type QueryCompanyProductsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryCompanyProductAllotmentsArgs = {
  productId?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTravelAssignationsArgs = {
  products?: Maybe<Array<Maybe<Scalars['String']>>>;
  departureAirports?: Maybe<Array<Maybe<Scalars['String']>>>;
  departureDateFrom?: Maybe<Scalars['Date']>;
  departureDateTo?: Maybe<Scalars['Date']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type QueryTravelAssignationArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryPricingDashboardDataArgs = {
  filter?: Maybe<PricingDashboardFilterType>;
};


export type QueryDestinationsRankingDataArgs = {
  filter?: Maybe<PricingDashboardFilterType>;
};


export type QueryPricingDetailsArgs = {
  filter?: Maybe<PricingDataFilterType>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type QuotationAdditionalServiceType = {
   __typename?: 'QuotationAdditionalServiceType';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  room: QuotationRoomType;
  priceType?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  priority: Scalars['Int'];
  quantityType?: Maybe<Scalars['String']>;
  serviceId: Scalars['String'];
};

export type QuotationNode = Node & {
   __typename?: 'QuotationNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  quotationId: Scalars['String'];
  productId: Scalars['String'];
  status?: Maybe<Scalars['String']>;
  startDateFrom: Scalars['Date'];
  startDateTo: Scalars['Date'];
  nights: Scalars['Int'];
  days: Scalars['Int'];
  departureOptionType: Scalars['String'];
  departureOptionValue?: Maybe<Scalars['String']>;
  totalPrice: Scalars['Float'];
  totalDiscount: Scalars['Float'];
  depositPrice?: Maybe<Scalars['Float']>;
  quotationroomSet: Array<QuotationRoomType>;
  customer?: Maybe<CustomerType>;
  reservation?: Maybe<ReservationNode>;
};

export type QuotationNodeConnection = {
   __typename?: 'QuotationNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<QuotationNodeEdge>>;
};

export type QuotationNodeEdge = {
   __typename?: 'QuotationNodeEdge';
  node?: Maybe<QuotationNode>;
  cursor: Scalars['String'];
};

export type QuotationRoomType = {
   __typename?: 'QuotationRoomType';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  roomIndex: Scalars['Int'];
  quotation: QuotationNode;
  masterAllotmentId: Scalars['String'];
  allotmentsId: Array<Maybe<Scalars['String']>>;
  totAllotments: Scalars['Int'];
  availabilityKey: Scalars['String'];
  optioned: Scalars['Boolean'];
  roomPrice: Scalars['Float'];
  roomDiscount: Scalars['Float'];
  occupancyCode: Scalars['String'];
  totAdults: Scalars['Int'];
  quotationserviceSet: Array<QuotationServiceType>;
  quotationadditionalserviceSet: Array<QuotationAdditionalServiceType>;
  passengerSet: Array<PassengerType>;
};

export type QuotationServiceType = {
   __typename?: 'QuotationServiceType';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  room: QuotationRoomType;
  priceType?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  priority: Scalars['Int'];
  quantityType?: Maybe<Scalars['String']>;
  selectionType?: Maybe<Scalars['String']>;
  quantity: Scalars['Int'];
  serviceType?: Maybe<Scalars['String']>;
  serviceId: Scalars['String'];
};

export type Refresh = {
   __typename?: 'Refresh';
  payload: Scalars['GenericScalar'];
  refreshExpiresIn: Scalars['Int'];
  token: Scalars['String'];
};

export type RegisterUser = {
   __typename?: 'RegisterUser';
  user?: Maybe<UserType>;
  error?: Maybe<ValidationError>;
};

export type RemoveAdditionalServiceMutationInput = {
  quotationId: Scalars['String'];
  serviceId: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveAdditionalServiceMutationPayload = {
   __typename?: 'RemoveAdditionalServiceMutationPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveDiscountTicketMutationInput = {
  quotationId: Scalars['String'];
  discountCode: Scalars['String'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type RemoveDiscountTicketMutationPayload = {
   __typename?: 'RemoveDiscountTicketMutationPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type ReservationGroupType = {
   __typename?: 'ReservationGroupType';
  occupancy?: Maybe<ReservationOccupancyType>;
  quantity?: Maybe<Scalars['Int']>;
  reservations?: Maybe<Array<Maybe<TravelReservationNode>>>;
  selectedTravelOptions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ReservationNode = Node & {
   __typename?: 'ReservationNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  quotation: QuotationNode;
  reservationId: Scalars['String'];
  paymentSet: Array<PaymentType>;
};

export type ReservationNodeConnection = {
   __typename?: 'ReservationNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<ReservationNodeEdge>>;
};

export type ReservationNodeEdge = {
   __typename?: 'ReservationNodeEdge';
  node?: Maybe<ReservationNode>;
  cursor: Scalars['String'];
};

export type ReservationOccupancyType = {
   __typename?: 'ReservationOccupancyType';
  code?: Maybe<Scalars['String']>;
  totAdults?: Maybe<Scalars['Int']>;
};

export type ReservationsSelectionInput = {
  occupancyCode: Scalars['String'];
  selectedTravelOptions: Array<Maybe<Scalars['String']>>;
};

export type ResetPassword = {
   __typename?: 'ResetPassword';
  ok?: Maybe<Scalars['Boolean']>;
};

export type RoomPassengersInput = {
  passengers: Array<Maybe<PassengerInput>>;
};

export type SendPasswordResetEmail = {
   __typename?: 'SendPasswordResetEmail';
  ok?: Maybe<Scalars['Boolean']>;
};

export type SetQuotationPassengersInput = {
  quotationId: Scalars['String'];
  customer: CustomerInput;
  rooms: Array<Maybe<RoomPassengersInput>>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type SetQuotationPassengersPayload = {
   __typename?: 'SetQuotationPassengersPayload';
  quotation?: Maybe<QuotationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type SocialAuthJwt = {
   __typename?: 'SocialAuthJWT';
  social?: Maybe<SocialType>;
  token?: Maybe<Scalars['String']>;
};


export type SocialNode = Node & {
   __typename?: 'SocialNode';
  id: Scalars['ID'];
  user: UserType;
  provider: Scalars['String'];
  uid: Scalars['String'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
};

export type SocialNodeConnection = {
   __typename?: 'SocialNodeConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<SocialNodeEdge>>;
};

export type SocialNodeEdge = {
   __typename?: 'SocialNodeEdge';
  node?: Maybe<SocialNode>;
  cursor: Scalars['String'];
};

export type SocialType = {
   __typename?: 'SocialType';
  id: Scalars['ID'];
  user: UserType;
  provider: Scalars['String'];
  uid: Scalars['String'];
  extraData?: Maybe<Scalars['SocialCamelJSON']>;
};


export type TravelAssignationConnection = {
   __typename?: 'TravelAssignationConnection';
  pageInfo: PageInfo;
  edges: Array<Maybe<TravelAssignationEdge>>;
};

export type TravelAssignationEdge = {
   __typename?: 'TravelAssignationEdge';
  node?: Maybe<TravelAssignationNode>;
  cursor: Scalars['String'];
};

export type TravelAssignationNode = Node & {
   __typename?: 'TravelAssignationNode';
  id: Scalars['ID'];
  product?: Maybe<CompanyProductNode>;
  interval?: Maybe<ProductAllotmentIntervalType>;
  reservationGroups?: Maybe<Array<Maybe<ReservationGroupType>>>;
  options?: Maybe<Array<Maybe<TravelAssignationsOptionGroupType>>>;
  occupations?: Maybe<ProductStatistics>;
  status?: Maybe<Scalars['String']>;
};

export type TravelAssignationsOption = {
   __typename?: 'TravelAssignationsOption';
  id?: Maybe<Scalars['String']>;
  travelDeparture?: Maybe<TravelSegmentType>;
  travelReturn?: Maybe<TravelSegmentType>;
  accommodation?: Maybe<AccommodationType>;
  maxPlaces?: Maybe<Scalars['Int']>;
};

export type TravelAssignationsOptionGroupType = {
   __typename?: 'TravelAssignationsOptionGroupType';
  destination?: Maybe<CompanyDestinationNode>;
  values?: Maybe<Array<Maybe<TravelAssignationsOption>>>;
};


export type TravelAssignationsOptionGroupTypeDestinationArgs = {
  id: Scalars['ID'];
};

export type TravelInstanceNode = {
   __typename?: 'TravelInstanceNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  reservation: TravelReservationRoomNode;
  departureDate: Scalars['Date'];
};

export type TravelReservationNode = {
   __typename?: 'TravelReservationNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  reservationId: Scalars['String'];
  reservationDate: Scalars['Date'];
  productId: Scalars['String'];
  startDateFrom: Scalars['Date'];
  startDateTo: Scalars['Date'];
  departureOptionType: Scalars['String'];
  departureOptionValue?: Maybe<Scalars['String']>;
  status: TravelReservationStatus;
  instance?: Maybe<TravelInstanceNode>;
};

export type TravelReservationRoomNode = {
   __typename?: 'TravelReservationRoomNode';
  created: Scalars['DateTime'];
  modified: Scalars['DateTime'];
  id: Scalars['ID'];
  reservationId: Scalars['String'];
  reservationDate: Scalars['Date'];
  productId: Scalars['String'];
  startDateFrom: Scalars['Date'];
  startDateTo: Scalars['Date'];
  departureOptionType: Scalars['String'];
  departureOptionValue?: Maybe<Scalars['String']>;
  status: TravelReservationStatus;
  instance?: Maybe<TravelInstanceNode>;
};

export enum TravelReservationStatus {
  A_1 = 'A_1',
  A_2 = 'A_2',
  A_3 = 'A_3'
}

export type TravelSegmentType = {
   __typename?: 'TravelSegmentType';
  travelId?: Maybe<Scalars['String']>;
  destinationFrom?: Maybe<CompanyDestinationNode>;
  destinationTo?: Maybe<CompanyDestinationNode>;
  departure?: Maybe<TravelTimeType>;
  arrival?: Maybe<TravelTimeType>;
};


export type TravelSegmentTypeDestinationFromArgs = {
  id: Scalars['ID'];
};


export type TravelSegmentTypeDestinationToArgs = {
  id: Scalars['ID'];
};

export type TravelTimeType = {
   __typename?: 'TravelTimeType';
  date?: Maybe<Scalars['Date']>;
  time?: Maybe<Scalars['Time']>;
};

export type UpdateAllotmentMutationInput = {
  allotmentId: Array<Maybe<Scalars['String']>>;
  newMaxQuantity: Scalars['Int'];
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UpdateAllotmentMutationPayload = {
   __typename?: 'UpdateAllotmentMutationPayload';
  ok?: Maybe<Scalars['Boolean']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type UserType = {
   __typename?: 'UserType';
  id: Scalars['ID'];
  password: Scalars['String'];
  lastLogin?: Maybe<Scalars['DateTime']>;
  isSuperuser: Scalars['Boolean'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  isStaff: Scalars['Boolean'];
  isActive: Scalars['Boolean'];
  dateJoined: Scalars['DateTime'];
  emailConfirmed: Scalars['Boolean'];
  birthday?: Maybe<Scalars['Date']>;
  socialAuth: SocialNodeConnection;
};


export type UserTypeSocialAuthArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  uid?: Maybe<Scalars['String']>;
  uid_In?: Maybe<Scalars['String']>;
  provider?: Maybe<Scalars['String']>;
  provider_In?: Maybe<Scalars['String']>;
};

export type ValidationError = {
   __typename?: 'ValidationError';
  type?: Maybe<Scalars['String']>;
};

export type Verify = {
   __typename?: 'Verify';
  payload: Scalars['GenericScalar'];
};

export type VerifyEmailAddress = {
   __typename?: 'VerifyEmailAddress';
  ok?: Maybe<Scalars['Boolean']>;
};

export type VerifyReservationInput = {
  paymentSessionId?: Maybe<Scalars['String']>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type VerifyReservationPayload = {
   __typename?: 'VerifyReservationPayload';
  reservation?: Maybe<ReservationNode>;
  clientMutationId?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { tokenAuth?: Maybe<(
    { __typename?: 'ObtainJSONWebToken' }
    & Pick<ObtainJsonWebToken, 'token'>
  )> }
);

export type SocialAuthMutationVariables = {
  provider: Scalars['String'];
  accessToken: Scalars['String'];
};


export type SocialAuthMutation = (
  { __typename?: 'Mutation' }
  & { socialAuth?: Maybe<(
    { __typename?: 'SocialAuthJWT' }
    & Pick<SocialAuthJwt, 'token'>
  )> }
);

export type SendPasswordResetEmailMutationVariables = {
  email: Scalars['String'];
  passwordResetBaseUrl: Scalars['String'];
};


export type SendPasswordResetEmailMutation = (
  { __typename?: 'Mutation' }
  & { sendPasswordResetEmail?: Maybe<(
    { __typename?: 'SendPasswordResetEmail' }
    & Pick<SendPasswordResetEmail, 'ok'>
  )> }
);

export type RegisterUserMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  birthday: Scalars['Date'];
  emailValidationBaseUrl: Scalars['String'];
};


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & { registerUser?: Maybe<(
    { __typename?: 'RegisterUser' }
    & { user?: Maybe<(
      { __typename?: 'UserType' }
      & Pick<UserType, 'username' | 'firstName' | 'lastName' | 'email'>
    )>, error?: Maybe<(
      { __typename?: 'ValidationError' }
      & Pick<ValidationError, 'type'>
    )> }
  )> }
);

export type PwdResetMutationVariables = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
  uidb64: Scalars['String'];
};


export type PwdResetMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Maybe<(
    { __typename?: 'ResetPassword' }
    & Pick<ResetPassword, 'ok'>
  )> }
);

export type VerifyEmailAddressMutationVariables = {
  token: Scalars['String'];
  uidb64: Scalars['String'];
};


export type VerifyEmailAddressMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmailAddress?: Maybe<(
    { __typename?: 'VerifyEmailAddress' }
    & Pick<VerifyEmailAddress, 'ok'>
  )> }
);

export type AllProductDestinationsQueryVariables = {};


export type AllProductDestinationsQuery = (
  { __typename?: 'Query' }
  & { allProductDestinations?: Maybe<(
    { __typename?: 'DestinationNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'DestinationNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'DestinationNode' }
        & Pick<DestinationNode, 'code' | 'name'>
      )> }
    )>> }
  )> }
);

export type GetProductAvailabilityQueryVariables = {
  productId: Scalars['String'];
  totAdults: Scalars['Int'];
  quantityAvailable_Gte: Scalars['Int'];
};


export type GetProductAvailabilityQuery = (
  { __typename?: 'Query' }
  & { allProductAvailabilities?: Maybe<(
    { __typename?: 'ProductAvailabilityNodeConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'ProductAvailabilityNodeEdge' }
      & { node?: Maybe<(
        { __typename?: 'ProductAvailabilityNode' }
        & Pick<ProductAvailabilityNode, 'productId' | 'availabilityKey' | 'startDateFrom' | 'startDateTo' | 'nights' | 'days' | 'totAdults' | 'price' | 'departureOptionDisplayName' | 'departureOptionType' | 'departureOptionValue'>
      )> }
    )>> }
  )> }
);

export type GetCalendarAvailabilitiesQueryVariables = {
  totAdults: Scalars['Int'];
  productId?: Maybe<Scalars['String']>;
  destinationId?: Maybe<Scalars['String']>;
};


export type GetCalendarAvailabilitiesQuery = (
  { __typename?: 'Query' }
  & { calendarAvailabilities?: Maybe<Array<Maybe<(
    { __typename?: 'CalendarAvailabilityType' }
    & Pick<CalendarAvailabilityType, 'startDateFrom' | 'nights' | 'minPrice'>
  )>>> }
);

export type QuotationDataFragment = (
  { __typename?: 'QuotationNode' }
  & Pick<QuotationNode, 'quotationId' | 'productId' | 'status' | 'startDateFrom' | 'startDateTo' | 'nights' | 'days' | 'departureOptionType' | 'departureOptionValue' | 'totalPrice' | 'totalDiscount' | 'depositPrice'>
  & { quotationroomSet: Array<(
    { __typename?: 'QuotationRoomType' }
    & Pick<QuotationRoomType, 'id' | 'roomIndex' | 'occupancyCode' | 'totAdults'>
    & { quotationserviceSet: Array<(
      { __typename?: 'QuotationServiceType' }
      & Pick<QuotationServiceType, 'id' | 'name' | 'priceType' | 'price' | 'quantityType' | 'selectionType' | 'serviceType' | 'serviceId'>
    )>, quotationadditionalserviceSet: Array<(
      { __typename?: 'QuotationAdditionalServiceType' }
      & Pick<QuotationAdditionalServiceType, 'name' | 'priceType' | 'price' | 'quantityType' | 'serviceId'>
    )>, passengerSet: Array<(
      { __typename?: 'PassengerType' }
      & Pick<PassengerType, 'passengerIndex' | 'name' | 'surname' | 'birthday' | 'minAge' | 'maxAge' | 'gender'>
    )> }
  )>, customer?: Maybe<(
    { __typename?: 'CustomerType' }
    & Pick<CustomerType, 'name' | 'surname' | 'email' | 'userId' | 'birthday' | 'gender' | 'taxCode' | 'phone'>
  )> }
);

export type PaymentDataFragment = (
  { __typename?: 'InitializePaymentSessionOutputType' }
  & Pick<InitializePaymentSessionOutputType, 'providerId' | 'paymentPayload' | 'paymentSessionId' | 'paymentAmount' | 'paymentSuccessUrl' | 'paymentCancelUrl' | 'transactionId'>
);

export type CreateQuotationMutationVariables = {
  availabilityKeys: Array<Maybe<Scalars['String']>>;
};


export type CreateQuotationMutation = (
  { __typename?: 'Mutation' }
  & { createQuotation?: Maybe<(
    { __typename?: 'CreateQuotationMutationPayload' }
    & { quotation?: Maybe<(
      { __typename?: 'QuotationNode' }
      & QuotationDataFragment
    )> }
  )> }
);

export type AddAdditionalServiceMutationVariables = {
  quotationId: Scalars['String'];
  serviceId: Scalars['String'];
};


export type AddAdditionalServiceMutation = (
  { __typename?: 'Mutation' }
  & { addAdditionalService?: Maybe<(
    { __typename?: 'AddAdditionalServiceMutationPayload' }
    & { quotation?: Maybe<(
      { __typename?: 'QuotationNode' }
      & QuotationDataFragment
    )> }
  )> }
);

export type RemoveAdditionalServiceMutationVariables = {
  quotationId: Scalars['String'];
  serviceId: Scalars['String'];
};


export type RemoveAdditionalServiceMutation = (
  { __typename?: 'Mutation' }
  & { removeAdditionalService?: Maybe<(
    { __typename?: 'RemoveAdditionalServiceMutationPayload' }
    & { quotation?: Maybe<(
      { __typename?: 'QuotationNode' }
      & QuotationDataFragment
    )> }
  )> }
);

export type AddDiscountTicketMutationVariables = {
  quotationId: Scalars['String'];
  discountCode: Scalars['String'];
};


export type AddDiscountTicketMutation = (
  { __typename?: 'Mutation' }
  & { addDiscountTicket?: Maybe<(
    { __typename?: 'AddDiscountTicketMutationPayload' }
    & { quotation?: Maybe<(
      { __typename?: 'QuotationNode' }
      & QuotationDataFragment
    )> }
  )> }
);

export type RemoveDiscountTicketMutationVariables = {
  quotationId: Scalars['String'];
  discountCode: Scalars['String'];
};


export type RemoveDiscountTicketMutation = (
  { __typename?: 'Mutation' }
  & { removeDiscountTicket?: Maybe<(
    { __typename?: 'RemoveDiscountTicketMutationPayload' }
    & { quotation?: Maybe<(
      { __typename?: 'QuotationNode' }
      & QuotationDataFragment
    )> }
  )> }
);

export type SetQuotationPassengersMutationVariables = {
  quotationId: Scalars['String'];
  customer: CustomerInput;
  rooms: Array<Maybe<RoomPassengersInput>>;
};


export type SetQuotationPassengersMutation = (
  { __typename?: 'Mutation' }
  & { setQuotationPassengers?: Maybe<(
    { __typename?: 'SetQuotationPassengersPayload' }
    & { quotation?: Maybe<(
      { __typename?: 'QuotationNode' }
      & QuotationDataFragment
    )> }
  )> }
);

export type InitializePaymentMutationVariables = {
  paymentData: InitializePaymentSessionInputType;
};


export type InitializePaymentMutation = (
  { __typename?: 'Mutation' }
  & { initializePayment?: Maybe<(
    { __typename?: 'InitializePaymentSessionPayload' }
    & { paymentData?: Maybe<(
      { __typename?: 'InitializePaymentSessionOutputType' }
      & PaymentDataFragment
    )> }
  )> }
);

export type VerifyReservationMutationVariables = {
  paymentSessionId: Scalars['String'];
};


export type VerifyReservationMutation = (
  { __typename?: 'Mutation' }
  & { verifyReservation?: Maybe<(
    { __typename?: 'VerifyReservationPayload' }
    & { reservation?: Maybe<(
      { __typename?: 'ReservationNode' }
      & Pick<ReservationNode, 'reservationId'>
      & { quotation: (
        { __typename?: 'QuotationNode' }
        & QuotationDataFragment
      ) }
    )> }
  )> }
);

export type GetQuotationQueryVariables = {
  quotationId: Scalars['String'];
};


export type GetQuotationQuery = (
  { __typename?: 'Query' }
  & { quotation?: Maybe<(
    { __typename?: 'QuotationNode' }
    & QuotationDataFragment
  )> }
);

export const QuotationDataFragmentDoc = gql`
    fragment QuotationData on QuotationNode {
  quotationId
  productId
  status
  startDateFrom
  startDateTo
  nights
  days
  departureOptionType
  departureOptionValue
  totalPrice
  totalDiscount
  depositPrice
  quotationroomSet {
    id
    roomIndex
    occupancyCode
    totAdults
    quotationserviceSet {
      id
      name
      priceType
      price
      quantityType
      selectionType
      serviceType
      serviceId
    }
    quotationadditionalserviceSet {
      name
      priceType
      price
      quantityType
      serviceId
    }
    passengerSet {
      passengerIndex
      name
      surname
      birthday
      minAge
      maxAge
      gender
    }
  }
  customer {
    name
    surname
    email
    userId
    birthday
    gender
    taxCode
    phone
  }
}
    `;
export const PaymentDataFragmentDoc = gql`
    fragment PaymentData on InitializePaymentSessionOutputType {
  providerId
  paymentPayload
  paymentSessionId
  paymentAmount
  paymentSuccessUrl
  paymentCancelUrl
  transactionId
}
    `;
export const LoginDocument = gql`
    mutation login($password: String!, $username: String!) {
  tokenAuth(username: $username, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}> = ApolloReactHoc.MutateProps<LoginMutation, LoginMutationVariables> & TChildProps;
export function withLogin<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SocialAuthDocument = gql`
    mutation socialAuth($provider: String!, $accessToken: String!) {
  socialAuth(provider: $provider, accessToken: $accessToken) {
    token
  }
}
    `;
export type SocialAuthMutationFn = ApolloReactCommon.MutationFunction<SocialAuthMutation, SocialAuthMutationVariables>;
export type SocialAuthComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SocialAuthMutation, SocialAuthMutationVariables>, 'mutation'>;

    export const SocialAuthComponent = (props: SocialAuthComponentProps) => (
      <ApolloReactComponents.Mutation<SocialAuthMutation, SocialAuthMutationVariables> mutation={SocialAuthDocument} {...props} />
    );
    
export type SocialAuthProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SocialAuthMutation, SocialAuthMutationVariables> & TChildProps;
export function withSocialAuth<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SocialAuthMutation,
  SocialAuthMutationVariables,
  SocialAuthProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SocialAuthMutation, SocialAuthMutationVariables, SocialAuthProps<TChildProps>>(SocialAuthDocument, {
      alias: 'socialAuth',
      ...operationOptions
    });
};

/**
 * __useSocialAuthMutation__
 *
 * To run a mutation, you first call `useSocialAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSocialAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [socialAuthMutation, { data, loading, error }] = useSocialAuthMutation({
 *   variables: {
 *      provider: // value for 'provider'
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useSocialAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SocialAuthMutation, SocialAuthMutationVariables>) {
        return ApolloReactHooks.useMutation<SocialAuthMutation, SocialAuthMutationVariables>(SocialAuthDocument, baseOptions);
      }
export type SocialAuthMutationHookResult = ReturnType<typeof useSocialAuthMutation>;
export type SocialAuthMutationResult = ApolloReactCommon.MutationResult<SocialAuthMutation>;
export type SocialAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<SocialAuthMutation, SocialAuthMutationVariables>;
export const SendPasswordResetEmailDocument = gql`
    mutation sendPasswordResetEmail($email: String!, $passwordResetBaseUrl: String!) {
  sendPasswordResetEmail(email: $email, passwordResetBaseUrl: $passwordResetBaseUrl) {
    ok
  }
}
    `;
export type SendPasswordResetEmailMutationFn = ApolloReactCommon.MutationFunction<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export type SendPasswordResetEmailComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>, 'mutation'>;

    export const SendPasswordResetEmailComponent = (props: SendPasswordResetEmailComponentProps) => (
      <ApolloReactComponents.Mutation<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables> mutation={SendPasswordResetEmailDocument} {...props} />
    );
    
export type SendPasswordResetEmailProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables> & TChildProps;
export function withSendPasswordResetEmail<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SendPasswordResetEmailMutation,
  SendPasswordResetEmailMutationVariables,
  SendPasswordResetEmailProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables, SendPasswordResetEmailProps<TChildProps>>(SendPasswordResetEmailDocument, {
      alias: 'sendPasswordResetEmail',
      ...operationOptions
    });
};

/**
 * __useSendPasswordResetEmailMutation__
 *
 * To run a mutation, you first call `useSendPasswordResetEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendPasswordResetEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendPasswordResetEmailMutation, { data, loading, error }] = useSendPasswordResetEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *      passwordResetBaseUrl: // value for 'passwordResetBaseUrl'
 *   },
 * });
 */
export function useSendPasswordResetEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>(SendPasswordResetEmailDocument, baseOptions);
      }
export type SendPasswordResetEmailMutationHookResult = ReturnType<typeof useSendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationResult = ApolloReactCommon.MutationResult<SendPasswordResetEmailMutation>;
export type SendPasswordResetEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<SendPasswordResetEmailMutation, SendPasswordResetEmailMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($email: String!, $password: String!, $firstName: String!, $lastName: String!, $birthday: Date!, $emailValidationBaseUrl: String!) {
  registerUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName, birthday: $birthday, emailValidationBaseUrl: $emailValidationBaseUrl) {
    user {
      username
      firstName
      lastName
      email
    }
    error {
      type
    }
  }
}
    `;
export type RegisterUserMutationFn = ApolloReactCommon.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;
export type RegisterUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RegisterUserMutation, RegisterUserMutationVariables>, 'mutation'>;

    export const RegisterUserComponent = (props: RegisterUserComponentProps) => (
      <ApolloReactComponents.Mutation<RegisterUserMutation, RegisterUserMutationVariables> mutation={RegisterUserDocument} {...props} />
    );
    
export type RegisterUserProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RegisterUserMutation, RegisterUserMutationVariables> & TChildProps;
export function withRegisterUser<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RegisterUserMutation,
  RegisterUserMutationVariables,
  RegisterUserProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RegisterUserMutation, RegisterUserMutationVariables, RegisterUserProps<TChildProps>>(RegisterUserDocument, {
      alias: 'registerUser',
      ...operationOptions
    });
};

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      birthday: // value for 'birthday'
 *      emailValidationBaseUrl: // value for 'emailValidationBaseUrl'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, baseOptions);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = ApolloReactCommon.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const PwdResetDocument = gql`
    mutation pwdReset($newPassword: String!, $token: String!, $uidb64: String!) {
  resetPassword(newPassword: $newPassword, token: $token, uidb64: $uidb64) {
    ok
  }
}
    `;
export type PwdResetMutationFn = ApolloReactCommon.MutationFunction<PwdResetMutation, PwdResetMutationVariables>;
export type PwdResetComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<PwdResetMutation, PwdResetMutationVariables>, 'mutation'>;

    export const PwdResetComponent = (props: PwdResetComponentProps) => (
      <ApolloReactComponents.Mutation<PwdResetMutation, PwdResetMutationVariables> mutation={PwdResetDocument} {...props} />
    );
    
export type PwdResetProps<TChildProps = {}> = ApolloReactHoc.MutateProps<PwdResetMutation, PwdResetMutationVariables> & TChildProps;
export function withPwdReset<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  PwdResetMutation,
  PwdResetMutationVariables,
  PwdResetProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, PwdResetMutation, PwdResetMutationVariables, PwdResetProps<TChildProps>>(PwdResetDocument, {
      alias: 'pwdReset',
      ...operationOptions
    });
};

/**
 * __usePwdResetMutation__
 *
 * To run a mutation, you first call `usePwdResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePwdResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [pwdResetMutation, { data, loading, error }] = usePwdResetMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *      uidb64: // value for 'uidb64'
 *   },
 * });
 */
export function usePwdResetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PwdResetMutation, PwdResetMutationVariables>) {
        return ApolloReactHooks.useMutation<PwdResetMutation, PwdResetMutationVariables>(PwdResetDocument, baseOptions);
      }
export type PwdResetMutationHookResult = ReturnType<typeof usePwdResetMutation>;
export type PwdResetMutationResult = ApolloReactCommon.MutationResult<PwdResetMutation>;
export type PwdResetMutationOptions = ApolloReactCommon.BaseMutationOptions<PwdResetMutation, PwdResetMutationVariables>;
export const VerifyEmailAddressDocument = gql`
    mutation verifyEmailAddress($token: String!, $uidb64: String!) {
  verifyEmailAddress(token: $token, uidb64: $uidb64) {
    ok
  }
}
    `;
export type VerifyEmailAddressMutationFn = ApolloReactCommon.MutationFunction<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;
export type VerifyEmailAddressComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>, 'mutation'>;

    export const VerifyEmailAddressComponent = (props: VerifyEmailAddressComponentProps) => (
      <ApolloReactComponents.Mutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables> mutation={VerifyEmailAddressDocument} {...props} />
    );
    
export type VerifyEmailAddressProps<TChildProps = {}> = ApolloReactHoc.MutateProps<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables> & TChildProps;
export function withVerifyEmailAddress<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  VerifyEmailAddressMutation,
  VerifyEmailAddressMutationVariables,
  VerifyEmailAddressProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables, VerifyEmailAddressProps<TChildProps>>(VerifyEmailAddressDocument, {
      alias: 'verifyEmailAddress',
      ...operationOptions
    });
};

/**
 * __useVerifyEmailAddressMutation__
 *
 * To run a mutation, you first call `useVerifyEmailAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailAddressMutation, { data, loading, error }] = useVerifyEmailAddressMutation({
 *   variables: {
 *      token: // value for 'token'
 *      uidb64: // value for 'uidb64'
 *   },
 * });
 */
export function useVerifyEmailAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>(VerifyEmailAddressDocument, baseOptions);
      }
export type VerifyEmailAddressMutationHookResult = ReturnType<typeof useVerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationResult = ApolloReactCommon.MutationResult<VerifyEmailAddressMutation>;
export type VerifyEmailAddressMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyEmailAddressMutation, VerifyEmailAddressMutationVariables>;
export const AllProductDestinationsDocument = gql`
    query allProductDestinations {
  allProductDestinations {
    edges {
      node {
        code
        name
      }
    }
  }
}
    `;
export type AllProductDestinationsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<AllProductDestinationsQuery, AllProductDestinationsQueryVariables>, 'query'>;

    export const AllProductDestinationsComponent = (props: AllProductDestinationsComponentProps) => (
      <ApolloReactComponents.Query<AllProductDestinationsQuery, AllProductDestinationsQueryVariables> query={AllProductDestinationsDocument} {...props} />
    );
    
export type AllProductDestinationsProps<TChildProps = {}> = ApolloReactHoc.DataProps<AllProductDestinationsQuery, AllProductDestinationsQueryVariables> & TChildProps;
export function withAllProductDestinations<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AllProductDestinationsQuery,
  AllProductDestinationsQueryVariables,
  AllProductDestinationsProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, AllProductDestinationsQuery, AllProductDestinationsQueryVariables, AllProductDestinationsProps<TChildProps>>(AllProductDestinationsDocument, {
      alias: 'allProductDestinations',
      ...operationOptions
    });
};

/**
 * __useAllProductDestinationsQuery__
 *
 * To run a query within a React component, call `useAllProductDestinationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllProductDestinationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllProductDestinationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllProductDestinationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AllProductDestinationsQuery, AllProductDestinationsQueryVariables>) {
        return ApolloReactHooks.useQuery<AllProductDestinationsQuery, AllProductDestinationsQueryVariables>(AllProductDestinationsDocument, baseOptions);
      }
export function useAllProductDestinationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AllProductDestinationsQuery, AllProductDestinationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AllProductDestinationsQuery, AllProductDestinationsQueryVariables>(AllProductDestinationsDocument, baseOptions);
        }
export type AllProductDestinationsQueryHookResult = ReturnType<typeof useAllProductDestinationsQuery>;
export type AllProductDestinationsLazyQueryHookResult = ReturnType<typeof useAllProductDestinationsLazyQuery>;
export type AllProductDestinationsQueryResult = ApolloReactCommon.QueryResult<AllProductDestinationsQuery, AllProductDestinationsQueryVariables>;
export const GetProductAvailabilityDocument = gql`
    query getProductAvailability($productId: String!, $totAdults: Int!, $quantityAvailable_Gte: Int!) {
  allProductAvailabilities(productId: $productId, totAdults: $totAdults, quantityAvailable_Gte: $quantityAvailable_Gte) {
    edges {
      node {
        productId
        availabilityKey
        startDateFrom
        startDateTo
        nights
        days
        totAdults
        price
        departureOptionDisplayName
        departureOptionType
        departureOptionValue
      }
    }
  }
}
    `;
export type GetProductAvailabilityComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables>, 'query'> & ({ variables: GetProductAvailabilityQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetProductAvailabilityComponent = (props: GetProductAvailabilityComponentProps) => (
      <ApolloReactComponents.Query<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables> query={GetProductAvailabilityDocument} {...props} />
    );
    
export type GetProductAvailabilityProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables> & TChildProps;
export function withGetProductAvailability<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetProductAvailabilityQuery,
  GetProductAvailabilityQueryVariables,
  GetProductAvailabilityProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables, GetProductAvailabilityProps<TChildProps>>(GetProductAvailabilityDocument, {
      alias: 'getProductAvailability',
      ...operationOptions
    });
};

/**
 * __useGetProductAvailabilityQuery__
 *
 * To run a query within a React component, call `useGetProductAvailabilityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductAvailabilityQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductAvailabilityQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      totAdults: // value for 'totAdults'
 *      quantityAvailable_Gte: // value for 'quantityAvailable_Gte'
 *   },
 * });
 */
export function useGetProductAvailabilityQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables>(GetProductAvailabilityDocument, baseOptions);
      }
export function useGetProductAvailabilityLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables>(GetProductAvailabilityDocument, baseOptions);
        }
export type GetProductAvailabilityQueryHookResult = ReturnType<typeof useGetProductAvailabilityQuery>;
export type GetProductAvailabilityLazyQueryHookResult = ReturnType<typeof useGetProductAvailabilityLazyQuery>;
export type GetProductAvailabilityQueryResult = ApolloReactCommon.QueryResult<GetProductAvailabilityQuery, GetProductAvailabilityQueryVariables>;
export const GetCalendarAvailabilitiesDocument = gql`
    query getCalendarAvailabilities($totAdults: Int!, $productId: String, $destinationId: String) {
  calendarAvailabilities(totAdults: $totAdults, productId: $productId, destinationId: $destinationId) {
    startDateFrom
    nights
    minPrice
  }
}
    `;
export type GetCalendarAvailabilitiesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables>, 'query'> & ({ variables: GetCalendarAvailabilitiesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCalendarAvailabilitiesComponent = (props: GetCalendarAvailabilitiesComponentProps) => (
      <ApolloReactComponents.Query<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables> query={GetCalendarAvailabilitiesDocument} {...props} />
    );
    
export type GetCalendarAvailabilitiesProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables> & TChildProps;
export function withGetCalendarAvailabilities<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetCalendarAvailabilitiesQuery,
  GetCalendarAvailabilitiesQueryVariables,
  GetCalendarAvailabilitiesProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables, GetCalendarAvailabilitiesProps<TChildProps>>(GetCalendarAvailabilitiesDocument, {
      alias: 'getCalendarAvailabilities',
      ...operationOptions
    });
};

/**
 * __useGetCalendarAvailabilitiesQuery__
 *
 * To run a query within a React component, call `useGetCalendarAvailabilitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarAvailabilitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarAvailabilitiesQuery({
 *   variables: {
 *      totAdults: // value for 'totAdults'
 *      productId: // value for 'productId'
 *      destinationId: // value for 'destinationId'
 *   },
 * });
 */
export function useGetCalendarAvailabilitiesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables>(GetCalendarAvailabilitiesDocument, baseOptions);
      }
export function useGetCalendarAvailabilitiesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables>(GetCalendarAvailabilitiesDocument, baseOptions);
        }
export type GetCalendarAvailabilitiesQueryHookResult = ReturnType<typeof useGetCalendarAvailabilitiesQuery>;
export type GetCalendarAvailabilitiesLazyQueryHookResult = ReturnType<typeof useGetCalendarAvailabilitiesLazyQuery>;
export type GetCalendarAvailabilitiesQueryResult = ApolloReactCommon.QueryResult<GetCalendarAvailabilitiesQuery, GetCalendarAvailabilitiesQueryVariables>;
export const CreateQuotationDocument = gql`
    mutation createQuotation($availabilityKeys: [String]!) {
  createQuotation(input: {availabilityKeys: $availabilityKeys}) {
    quotation {
      ...QuotationData
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type CreateQuotationMutationFn = ApolloReactCommon.MutationFunction<CreateQuotationMutation, CreateQuotationMutationVariables>;
export type CreateQuotationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateQuotationMutation, CreateQuotationMutationVariables>, 'mutation'>;

    export const CreateQuotationComponent = (props: CreateQuotationComponentProps) => (
      <ApolloReactComponents.Mutation<CreateQuotationMutation, CreateQuotationMutationVariables> mutation={CreateQuotationDocument} {...props} />
    );
    
export type CreateQuotationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<CreateQuotationMutation, CreateQuotationMutationVariables> & TChildProps;
export function withCreateQuotation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  CreateQuotationMutation,
  CreateQuotationMutationVariables,
  CreateQuotationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, CreateQuotationMutation, CreateQuotationMutationVariables, CreateQuotationProps<TChildProps>>(CreateQuotationDocument, {
      alias: 'createQuotation',
      ...operationOptions
    });
};

/**
 * __useCreateQuotationMutation__
 *
 * To run a mutation, you first call `useCreateQuotationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuotationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuotationMutation, { data, loading, error }] = useCreateQuotationMutation({
 *   variables: {
 *      availabilityKeys: // value for 'availabilityKeys'
 *   },
 * });
 */
export function useCreateQuotationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateQuotationMutation, CreateQuotationMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateQuotationMutation, CreateQuotationMutationVariables>(CreateQuotationDocument, baseOptions);
      }
export type CreateQuotationMutationHookResult = ReturnType<typeof useCreateQuotationMutation>;
export type CreateQuotationMutationResult = ApolloReactCommon.MutationResult<CreateQuotationMutation>;
export type CreateQuotationMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateQuotationMutation, CreateQuotationMutationVariables>;
export const AddAdditionalServiceDocument = gql`
    mutation addAdditionalService($quotationId: String!, $serviceId: String!) {
  addAdditionalService(input: {quotationId: $quotationId, serviceId: $serviceId}) {
    quotation {
      ...QuotationData
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type AddAdditionalServiceMutationFn = ApolloReactCommon.MutationFunction<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables>;
export type AddAdditionalServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables>, 'mutation'>;

    export const AddAdditionalServiceComponent = (props: AddAdditionalServiceComponentProps) => (
      <ApolloReactComponents.Mutation<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables> mutation={AddAdditionalServiceDocument} {...props} />
    );
    
export type AddAdditionalServiceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables> & TChildProps;
export function withAddAdditionalService<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddAdditionalServiceMutation,
  AddAdditionalServiceMutationVariables,
  AddAdditionalServiceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables, AddAdditionalServiceProps<TChildProps>>(AddAdditionalServiceDocument, {
      alias: 'addAdditionalService',
      ...operationOptions
    });
};

/**
 * __useAddAdditionalServiceMutation__
 *
 * To run a mutation, you first call `useAddAdditionalServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddAdditionalServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addAdditionalServiceMutation, { data, loading, error }] = useAddAdditionalServiceMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useAddAdditionalServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables>(AddAdditionalServiceDocument, baseOptions);
      }
export type AddAdditionalServiceMutationHookResult = ReturnType<typeof useAddAdditionalServiceMutation>;
export type AddAdditionalServiceMutationResult = ApolloReactCommon.MutationResult<AddAdditionalServiceMutation>;
export type AddAdditionalServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<AddAdditionalServiceMutation, AddAdditionalServiceMutationVariables>;
export const RemoveAdditionalServiceDocument = gql`
    mutation removeAdditionalService($quotationId: String!, $serviceId: String!) {
  removeAdditionalService(input: {quotationId: $quotationId, serviceId: $serviceId}) {
    quotation {
      ...QuotationData
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type RemoveAdditionalServiceMutationFn = ApolloReactCommon.MutationFunction<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables>;
export type RemoveAdditionalServiceComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables>, 'mutation'>;

    export const RemoveAdditionalServiceComponent = (props: RemoveAdditionalServiceComponentProps) => (
      <ApolloReactComponents.Mutation<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables> mutation={RemoveAdditionalServiceDocument} {...props} />
    );
    
export type RemoveAdditionalServiceProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables> & TChildProps;
export function withRemoveAdditionalService<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RemoveAdditionalServiceMutation,
  RemoveAdditionalServiceMutationVariables,
  RemoveAdditionalServiceProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables, RemoveAdditionalServiceProps<TChildProps>>(RemoveAdditionalServiceDocument, {
      alias: 'removeAdditionalService',
      ...operationOptions
    });
};

/**
 * __useRemoveAdditionalServiceMutation__
 *
 * To run a mutation, you first call `useRemoveAdditionalServiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAdditionalServiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAdditionalServiceMutation, { data, loading, error }] = useRemoveAdditionalServiceMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      serviceId: // value for 'serviceId'
 *   },
 * });
 */
export function useRemoveAdditionalServiceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables>(RemoveAdditionalServiceDocument, baseOptions);
      }
export type RemoveAdditionalServiceMutationHookResult = ReturnType<typeof useRemoveAdditionalServiceMutation>;
export type RemoveAdditionalServiceMutationResult = ApolloReactCommon.MutationResult<RemoveAdditionalServiceMutation>;
export type RemoveAdditionalServiceMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveAdditionalServiceMutation, RemoveAdditionalServiceMutationVariables>;
export const AddDiscountTicketDocument = gql`
    mutation addDiscountTicket($quotationId: String!, $discountCode: String!) {
  addDiscountTicket(input: {quotationId: $quotationId, discountCode: $discountCode}) {
    quotation {
      ...QuotationData
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type AddDiscountTicketMutationFn = ApolloReactCommon.MutationFunction<AddDiscountTicketMutation, AddDiscountTicketMutationVariables>;
export type AddDiscountTicketComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddDiscountTicketMutation, AddDiscountTicketMutationVariables>, 'mutation'>;

    export const AddDiscountTicketComponent = (props: AddDiscountTicketComponentProps) => (
      <ApolloReactComponents.Mutation<AddDiscountTicketMutation, AddDiscountTicketMutationVariables> mutation={AddDiscountTicketDocument} {...props} />
    );
    
export type AddDiscountTicketProps<TChildProps = {}> = ApolloReactHoc.MutateProps<AddDiscountTicketMutation, AddDiscountTicketMutationVariables> & TChildProps;
export function withAddDiscountTicket<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddDiscountTicketMutation,
  AddDiscountTicketMutationVariables,
  AddDiscountTicketProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, AddDiscountTicketMutation, AddDiscountTicketMutationVariables, AddDiscountTicketProps<TChildProps>>(AddDiscountTicketDocument, {
      alias: 'addDiscountTicket',
      ...operationOptions
    });
};

/**
 * __useAddDiscountTicketMutation__
 *
 * To run a mutation, you first call `useAddDiscountTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddDiscountTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addDiscountTicketMutation, { data, loading, error }] = useAddDiscountTicketMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      discountCode: // value for 'discountCode'
 *   },
 * });
 */
export function useAddDiscountTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddDiscountTicketMutation, AddDiscountTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<AddDiscountTicketMutation, AddDiscountTicketMutationVariables>(AddDiscountTicketDocument, baseOptions);
      }
export type AddDiscountTicketMutationHookResult = ReturnType<typeof useAddDiscountTicketMutation>;
export type AddDiscountTicketMutationResult = ApolloReactCommon.MutationResult<AddDiscountTicketMutation>;
export type AddDiscountTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<AddDiscountTicketMutation, AddDiscountTicketMutationVariables>;
export const RemoveDiscountTicketDocument = gql`
    mutation removeDiscountTicket($quotationId: String!, $discountCode: String!) {
  removeDiscountTicket(input: {quotationId: $quotationId, discountCode: $discountCode}) {
    quotation {
      ...QuotationData
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type RemoveDiscountTicketMutationFn = ApolloReactCommon.MutationFunction<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables>;
export type RemoveDiscountTicketComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables>, 'mutation'>;

    export const RemoveDiscountTicketComponent = (props: RemoveDiscountTicketComponentProps) => (
      <ApolloReactComponents.Mutation<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables> mutation={RemoveDiscountTicketDocument} {...props} />
    );
    
export type RemoveDiscountTicketProps<TChildProps = {}> = ApolloReactHoc.MutateProps<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables> & TChildProps;
export function withRemoveDiscountTicket<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RemoveDiscountTicketMutation,
  RemoveDiscountTicketMutationVariables,
  RemoveDiscountTicketProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables, RemoveDiscountTicketProps<TChildProps>>(RemoveDiscountTicketDocument, {
      alias: 'removeDiscountTicket',
      ...operationOptions
    });
};

/**
 * __useRemoveDiscountTicketMutation__
 *
 * To run a mutation, you first call `useRemoveDiscountTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDiscountTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDiscountTicketMutation, { data, loading, error }] = useRemoveDiscountTicketMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      discountCode: // value for 'discountCode'
 *   },
 * });
 */
export function useRemoveDiscountTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables>(RemoveDiscountTicketDocument, baseOptions);
      }
export type RemoveDiscountTicketMutationHookResult = ReturnType<typeof useRemoveDiscountTicketMutation>;
export type RemoveDiscountTicketMutationResult = ApolloReactCommon.MutationResult<RemoveDiscountTicketMutation>;
export type RemoveDiscountTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<RemoveDiscountTicketMutation, RemoveDiscountTicketMutationVariables>;
export const SetQuotationPassengersDocument = gql`
    mutation setQuotationPassengers($quotationId: String!, $customer: CustomerInput!, $rooms: [RoomPassengersInput]!) {
  setQuotationPassengers(input: {quotationId: $quotationId, customer: $customer, rooms: $rooms}) {
    quotation {
      ...QuotationData
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type SetQuotationPassengersMutationFn = ApolloReactCommon.MutationFunction<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables>;
export type SetQuotationPassengersComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables>, 'mutation'>;

    export const SetQuotationPassengersComponent = (props: SetQuotationPassengersComponentProps) => (
      <ApolloReactComponents.Mutation<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables> mutation={SetQuotationPassengersDocument} {...props} />
    );
    
export type SetQuotationPassengersProps<TChildProps = {}> = ApolloReactHoc.MutateProps<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables> & TChildProps;
export function withSetQuotationPassengers<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SetQuotationPassengersMutation,
  SetQuotationPassengersMutationVariables,
  SetQuotationPassengersProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables, SetQuotationPassengersProps<TChildProps>>(SetQuotationPassengersDocument, {
      alias: 'setQuotationPassengers',
      ...operationOptions
    });
};

/**
 * __useSetQuotationPassengersMutation__
 *
 * To run a mutation, you first call `useSetQuotationPassengersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetQuotationPassengersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setQuotationPassengersMutation, { data, loading, error }] = useSetQuotationPassengersMutation({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *      customer: // value for 'customer'
 *      rooms: // value for 'rooms'
 *   },
 * });
 */
export function useSetQuotationPassengersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables>) {
        return ApolloReactHooks.useMutation<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables>(SetQuotationPassengersDocument, baseOptions);
      }
export type SetQuotationPassengersMutationHookResult = ReturnType<typeof useSetQuotationPassengersMutation>;
export type SetQuotationPassengersMutationResult = ApolloReactCommon.MutationResult<SetQuotationPassengersMutation>;
export type SetQuotationPassengersMutationOptions = ApolloReactCommon.BaseMutationOptions<SetQuotationPassengersMutation, SetQuotationPassengersMutationVariables>;
export const InitializePaymentDocument = gql`
    mutation initializePayment($paymentData: InitializePaymentSessionInputType!) {
  initializePayment(input: {data: $paymentData}) {
    paymentData {
      ...PaymentData
    }
  }
}
    ${PaymentDataFragmentDoc}`;
export type InitializePaymentMutationFn = ApolloReactCommon.MutationFunction<InitializePaymentMutation, InitializePaymentMutationVariables>;
export type InitializePaymentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<InitializePaymentMutation, InitializePaymentMutationVariables>, 'mutation'>;

    export const InitializePaymentComponent = (props: InitializePaymentComponentProps) => (
      <ApolloReactComponents.Mutation<InitializePaymentMutation, InitializePaymentMutationVariables> mutation={InitializePaymentDocument} {...props} />
    );
    
export type InitializePaymentProps<TChildProps = {}> = ApolloReactHoc.MutateProps<InitializePaymentMutation, InitializePaymentMutationVariables> & TChildProps;
export function withInitializePayment<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  InitializePaymentMutation,
  InitializePaymentMutationVariables,
  InitializePaymentProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, InitializePaymentMutation, InitializePaymentMutationVariables, InitializePaymentProps<TChildProps>>(InitializePaymentDocument, {
      alias: 'initializePayment',
      ...operationOptions
    });
};

/**
 * __useInitializePaymentMutation__
 *
 * To run a mutation, you first call `useInitializePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitializePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initializePaymentMutation, { data, loading, error }] = useInitializePaymentMutation({
 *   variables: {
 *      paymentData: // value for 'paymentData'
 *   },
 * });
 */
export function useInitializePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<InitializePaymentMutation, InitializePaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<InitializePaymentMutation, InitializePaymentMutationVariables>(InitializePaymentDocument, baseOptions);
      }
export type InitializePaymentMutationHookResult = ReturnType<typeof useInitializePaymentMutation>;
export type InitializePaymentMutationResult = ApolloReactCommon.MutationResult<InitializePaymentMutation>;
export type InitializePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<InitializePaymentMutation, InitializePaymentMutationVariables>;
export const VerifyReservationDocument = gql`
    mutation verifyReservation($paymentSessionId: String!) {
  verifyReservation(input: {paymentSessionId: $paymentSessionId}) {
    reservation {
      reservationId
      quotation {
        ...QuotationData
      }
    }
  }
}
    ${QuotationDataFragmentDoc}`;
export type VerifyReservationMutationFn = ApolloReactCommon.MutationFunction<VerifyReservationMutation, VerifyReservationMutationVariables>;
export type VerifyReservationComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<VerifyReservationMutation, VerifyReservationMutationVariables>, 'mutation'>;

    export const VerifyReservationComponent = (props: VerifyReservationComponentProps) => (
      <ApolloReactComponents.Mutation<VerifyReservationMutation, VerifyReservationMutationVariables> mutation={VerifyReservationDocument} {...props} />
    );
    
export type VerifyReservationProps<TChildProps = {}> = ApolloReactHoc.MutateProps<VerifyReservationMutation, VerifyReservationMutationVariables> & TChildProps;
export function withVerifyReservation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  VerifyReservationMutation,
  VerifyReservationMutationVariables,
  VerifyReservationProps<TChildProps>>) {
    return ApolloReactHoc.withMutation<TProps, VerifyReservationMutation, VerifyReservationMutationVariables, VerifyReservationProps<TChildProps>>(VerifyReservationDocument, {
      alias: 'verifyReservation',
      ...operationOptions
    });
};

/**
 * __useVerifyReservationMutation__
 *
 * To run a mutation, you first call `useVerifyReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyReservationMutation, { data, loading, error }] = useVerifyReservationMutation({
 *   variables: {
 *      paymentSessionId: // value for 'paymentSessionId'
 *   },
 * });
 */
export function useVerifyReservationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyReservationMutation, VerifyReservationMutationVariables>) {
        return ApolloReactHooks.useMutation<VerifyReservationMutation, VerifyReservationMutationVariables>(VerifyReservationDocument, baseOptions);
      }
export type VerifyReservationMutationHookResult = ReturnType<typeof useVerifyReservationMutation>;
export type VerifyReservationMutationResult = ApolloReactCommon.MutationResult<VerifyReservationMutation>;
export type VerifyReservationMutationOptions = ApolloReactCommon.BaseMutationOptions<VerifyReservationMutation, VerifyReservationMutationVariables>;
export const GetQuotationDocument = gql`
    query getQuotation($quotationId: String!) {
  quotation(quotationId: $quotationId) {
    ...QuotationData
  }
}
    ${QuotationDataFragmentDoc}`;
export type GetQuotationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetQuotationQuery, GetQuotationQueryVariables>, 'query'> & ({ variables: GetQuotationQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetQuotationComponent = (props: GetQuotationComponentProps) => (
      <ApolloReactComponents.Query<GetQuotationQuery, GetQuotationQueryVariables> query={GetQuotationDocument} {...props} />
    );
    
export type GetQuotationProps<TChildProps = {}> = ApolloReactHoc.DataProps<GetQuotationQuery, GetQuotationQueryVariables> & TChildProps;
export function withGetQuotation<TProps, TChildProps = {}>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetQuotationQuery,
  GetQuotationQueryVariables,
  GetQuotationProps<TChildProps>>) {
    return ApolloReactHoc.withQuery<TProps, GetQuotationQuery, GetQuotationQueryVariables, GetQuotationProps<TChildProps>>(GetQuotationDocument, {
      alias: 'getQuotation',
      ...operationOptions
    });
};

/**
 * __useGetQuotationQuery__
 *
 * To run a query within a React component, call `useGetQuotationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetQuotationQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetQuotationQuery({
 *   variables: {
 *      quotationId: // value for 'quotationId'
 *   },
 * });
 */
export function useGetQuotationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetQuotationQuery, GetQuotationQueryVariables>) {
        return ApolloReactHooks.useQuery<GetQuotationQuery, GetQuotationQueryVariables>(GetQuotationDocument, baseOptions);
      }
export function useGetQuotationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetQuotationQuery, GetQuotationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetQuotationQuery, GetQuotationQueryVariables>(GetQuotationDocument, baseOptions);
        }
export type GetQuotationQueryHookResult = ReturnType<typeof useGetQuotationQuery>;
export type GetQuotationLazyQueryHookResult = ReturnType<typeof useGetQuotationLazyQuery>;
export type GetQuotationQueryResult = ApolloReactCommon.QueryResult<GetQuotationQuery, GetQuotationQueryVariables>;