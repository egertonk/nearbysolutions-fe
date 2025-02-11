export type RentalOrderHistory = {
  id: number;
  customerId: number;
  paymentStatus: string;
  transactionId: string;
  amountPaid: number;
  toolName: string;
  toolBrand: string;
  toolCategory: string;
  toolPricePerDay: number;
  toolRentalDays: number;
  pickupDateTime: string; // ISO Date-Time string
  pickupAddressName: string;
  pickupAddressStreet: string;
  pickupAddressCity: string;
  pickupAddressState: string;
  pickupAddressCountry: string;
  dropoffDateTime: string; // ISO Date-Time string
  dropoffAddressName: string;
  dropoffAddressStreet: string;
  dropoffAddressCity: string;
  dropoffAddressState: string;
  dropoffAddressCountry: string;
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  createdAt: string; // ISO Date-Time string
  updatedAt: string; // ISO Date-Time string
  orderStatus: string;
  image?: string;
  description: string;
  fromDate: string; // ISO Date string
  fromTime: string; // Time string
  untilDate: string; // ISO Date string
  untilTime: string; // Time string
  toolZipcode: string;
  discountPrice: number;
  discountPercent: number;
  toolId: number;
  ownerFullName: string;
  renterFullName: string;
  ownerEmail: string;
  renterEmail: string;
  ownerPhoneNumber: string;
  renterPhoneNumber: string;
  renterAddressName: string;
  renterAddressStreet: string;
  renterAddressCity: string;
  renterZipCode: string;
  renterAddressState: string;
  renterAddressCountry: string;
};

export type PaymentDetails = {
  paymentId: number;
  rentalOrderHistoryId: number;
  customerId: number;
  cardholderName: string;
  cardNumberLast4: string;
  cardExpiry: string; // Format MM/YYYY
  cvv: string;
  paymentMethod: string;
  billingAddress: string;
  billingPhone: string;
  amountDue: number;
  amountPaid: number;
  taxAmount: number;
  currency: string;
  paymentStatus: string;
  createdAt: string; // ISO Date-Time string
  updatedAt: string; // ISO Date-Time string
};

export type FullPaymentDetailsDTO = {
  rentalDetails: RentalOrderHistory;
  paymentDetails: PaymentDetails;
};
