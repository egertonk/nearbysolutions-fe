import { CustomerTypes } from "./orderTypes";
import { UserTypes } from "./solutionistTypes";

export type ToolRentalListing = {
  toolId: number;
  toolName: string;
  description: string;
  toolCategory: string;
  toolBrand: string;
  toolAddress: string;
  toolCity: string;
  toolState: string;
  toolCountry: string;
  toolZipcode: string;
  pricePerDay: number | 0;
  isAvailable: boolean;
  nextAvailableDate: string | null;
  rating: number;
  numberOfReviews: number;
  powerSource: string;
  renterId: number | null;
  isShippingValid: boolean;
  shippingCost: number;
  estimatedDelivery: string;
  discountPercent: number;
  returnDate: string | null;
  usageInstructions: string;
  safetyInformation: string;
  imageUrl: string[]; // JSON array stored as string[]
  posterId: number;
};

export type ToolAndCustomerTypes = {
  toolRentalDetails: ToolRentalListing; // tool info
  customerInformation?: CustomerTypes; // customer info
};

export type OrderStatus = "Pending" | "Completed" | "Cancelled" | "Processing";
export type PaymentStatus = "Paid" | "Unpaid" | "Refunded";
export type ShippingStatus =
  | "Pending"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Returned"
  | "Pickup"
  | "Not_Required";

export interface ToolOrderHistory {
  calculateOriginalPrice(finalPrice: number, discountPercent: number): number;
  id: number | 0;
  renterId: number | 0;
  posterId: number | 0;
  toolId: number | 0;
  createdAt: string | ""; // ISO Date String (e.g., "2025-02-24T03:49:51.898181")
  rentStartDate: string | ""; // ISO Date String
  rentEndDate: string | ""; // ISO Date String
  returnDate?: string | ""; // ISO Date String (nullable)
  pricePerDay: number | 0;
  totalPrice: number | 0;
  finalPrice: number | 0;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  shippingStatus: ShippingStatus;
  shippingCost: number | 0;
  discountPercent: number | 0;
  isShippingValid: boolean | false;
  toolZipcode: string | "";
  toolName: string | "";
  toolCategory?: string | "";
  toolBrand?: string | "";
  toolAddress?: string | "";
  toolCity?: string | "";
  toolState?: string | "";
  toolCountry?: string | "";
  description?: string | "";
  powerSource?: string | "";
  rentalDays: number | 0;
  imageUrls: string | ""; // Array of URLs
  discountPrice: number | 0;
  subtotal: number | 0;
  tax: number | 0;
}

export type ToolOrderHistoryWithPagination = {
  content: ToolOrderHistory[];
};

export type ToolOrderHistoryDetails = {
  customerInformation: UserTypes;
  toolOrderHistory: ToolOrderHistory;
  posterDetails: UserTypes;
};
