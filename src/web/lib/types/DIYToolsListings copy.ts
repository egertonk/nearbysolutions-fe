export type RentalOrderHistory = {
  id: number;
  customerId: number;
  paymentStatus: string;
  paymentMethod: string;
  cardholderName: string;
  last4Digits: string;
  transactionId: string;
  amountPaid: number;
  toolName: string;
  toolBrand: string;
  toolCategory: string;
  toolPricePerDay: number;
  toolRentalDays: number;
  toolSubtotal: number;
  toolTax: number;
  toolTotal: number;
  pickupDateTime: string; // ISO string format
  pickupAddressName: string;
  pickupAddressStreet: string;
  pickupAddressCity: string;
  pickupAddressState: string;
  pickupAddressCountry: string;
  dropoffDateTime: string; // ISO string format
  dropoffAddressName: string;
  dropoffAddressStreet: string;
  dropoffAddressCity: string;
  dropoffAddressState: string;
  dropoffAddressCountry: string;
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  orderStatus: "Order-Confirmed" | "Picked-Up" | "Dropped-Off" | "Completed";
  image?: string; // Optional field for image URL
  description: string;
  fromDate: string; // ISO date format
  fromTime: string; // ISO time format
  untilDate: string; // ISO date format
  untilTime: string; // ISO time format
  toolZipcode: string;
  discountPrice: number;
  discountPercent: number;
  toolId: number;

  // New Fields for Owner and Renter Details
  ownerFullName: string;
  renterFullName: string;
  ownerEmail: string;
  renterEmail: string;
  ownerPhoneNumber: string;
  renterPhoneNumber: string;

  // New Fields for Renter Address
  renterAddressName: string;
  renterAddressStreet: string;
  renterAddressCity: string;
  renterZipCode: string;
  renterAddressState: string;
  renterAddressCountry: string;
};
