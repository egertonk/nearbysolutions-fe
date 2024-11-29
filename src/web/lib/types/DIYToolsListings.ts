export type DIYToolListing = {
  toolId: string;
  toolName: string;
  description: string;
  category: string;
  brand: string;
  pricePerday: number;
  isAvailable: boolean;
  nextAvailableDate: string;
  rating: number;
  numberOfReviews: number;
  powerSource: string;
  imageUrls: string[];
  customerId: string;
  renterId: string;
  isShippingValid: boolean;
  shippingInformation: {
    shippingCost: number;
    estimatedDelivery: string;
  };
  discountPercent: number;
  returnDate: string;
  usageInstructions: string;
  safetyInformation: string;
};
