import {
  ToolOrderHistory,
  ToolOrderHistoryDetails,
  ToolOrderHistoryWithPagination,
  ToolRentalListing,
} from "../types/DIYToolsListings";
import { emptyUser } from "./SolutionistEmtyData";

export const emptyToolRentalListing: ToolRentalListing = {
  toolId: 0,
  toolName: "",
  description: "",
  toolCategory: "",
  toolBrand: "",
  toolAddress: "",
  toolCity: "",
  toolState: "",
  toolCountry: "",
  toolZipcode: "",
  pricePerDay: 0,
  isAvailable: false,
  nextAvailableDate: null,
  rating: 0,
  numberOfReviews: 0,
  powerSource: "",
  renterId: null,
  isShippingValid: false,
  shippingCost: 0,
  estimatedDelivery: "",
  discountPercent: 0,
  returnDate: null,
  usageInstructions: "",
  safetyInformation: "",
  imageUrl: [],
  posterId: 0,
};

export const emptyToolOrderHistory: ToolOrderHistory = {
  id: 0,
  renterId: 0,
  posterId: 0,
  toolId: 0,
  createdAt: "",
  rentStartDate: "",
  rentEndDate: "",
  returnDate: "",
  pricePerDay: 0,
  totalPrice: 0,
  finalPrice: 0,
  orderStatus: "Pending",
  paymentStatus: "Unpaid",
  shippingStatus: "Pending",
  shippingCost: 0,
  discountPercent: 0,
  isShippingValid: false,
  toolZipcode: "",
  toolName: "",
  toolCategory: "",
  toolBrand: "",
  toolAddress: "",
  toolCity: "",
  toolState: "",
  toolCountry: "",
  description: "",
  powerSource: "",
  rentalDays: 0,
  imageUrls: "[]",
  discountPrice: 0,
  subtotal: 0,
  tax: 0,
  calculateOriginalPrice() {
    return 0;
  },
};

export const emptyToolOrderHistoryWithPagination: ToolOrderHistoryWithPagination =
  {
    content: [],
  };

export const emptyToolOrderHistoryDetails: ToolOrderHistoryDetails = {
  customerInformation: emptyUser,
  toolOrderHistory: emptyToolOrderHistory,
  posterDetails: emptyUser,
};
