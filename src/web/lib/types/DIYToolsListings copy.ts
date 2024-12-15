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
  pickupDateTime: string; // ISO String Date
  pickupAddressName: string;
  pickupAddressStreet: string;
  pickupAddressCity: string;
  pickupAddressState: string;
  pickupAddressCountry: string;
  dropoffDateTime: string; // ISO String Date
  dropoffAddressName: string;
  dropoffAddressStreet: string;
  dropoffAddressCity: string;
  dropoffAddressState: string;
  dropoffAddressCountry: string;
  providerName: string;
  providerEmail: string;
  providerPhone: string;
  createdAt: string; // ISO String Date
  updatedAt: string; // ISO String Date
  orderStatus: "Order-Confirmed" | "Picked-Up" | "Dropped-Off" | "Completed";
  image: string; // URL to image
};
