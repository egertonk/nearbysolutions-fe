import { CustomerTypes } from "./orderTypes";

export type ToolRentalListing = {
  toolId: string; // Unique identifier for the tool
  posterId: number; // Unique identifier for the person who posted the tools (same as customer number)
  toolName: string; // Name of the tool
  description: string; // Short description of the tool
  toolCategory: string; // Category the tool belongs to (e.g., Power Tools, Hand Tools)
  toolBrand: string; // Brand of the tool
  toolAddress: string; // Address locationof the tool
  toolCity: string; // City location of the tool
  toolZipcode: string; // Zip code location of the tool
  toolState: string; // State location of the tool
  toolCountry: string; // Country location of the tool
  pricePerDay: number; // Rental price per day
  available: boolean; // Availability status
  nextAvailableDate: string; // Next date the tool will be available (optional for always available tools)
  rating: number; // Average rating of the tool
  numberOfReviews: number; // Total number of reviews
  powerSource: string; // Power source, if applicable (e.g., Corded, Battery-powered)
  imageUrls: string[]; // Array of image URLs for the tool
  customerId: string; // ID of the customer currently renting
  renterId: string; // ID of the person renting out the tool
  isShippingValid: boolean; // Indicates if shipping is available
  shippingInformation: {
    shippingCost: number; // Cost of shipping
    estimatedDelivery: string; // Estimated delivery time
  };
  discountPercent: number; // Discount percentage
  returnDate: string; // Expected return date
  usageInstructions: string; // Instructions for using the tool
  safetyInformation: string; // Safety guidelines when using the tool
};

export type ToolAndCustomerTypes = {
  toolId: string; // Unique identifier for the tool
  customerId: string; // ID of the customer currently renting
  toolRentalListing: ToolRentalListing; // tool info
  customer?: CustomerTypes; // customer info
};
