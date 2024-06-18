export type DIYToolListing = {
  toolId: string;
  toolName: string;
  description: string;
  category: string;
  brand: string;
  modelNumber: string;
  pricePerday: number;
  availability: boolean;
  rating: number;
  numberOfReviews: number;
  specifications: {
    dimensions: string;
    weight: string;
    material: string;
    powerSource: string;
  };
  imageUrls: string[];
  features: string[];
  warrantyInformation: string;
  sellerInformation: {
    sellerName: string;
    contactInfo: string;
  };
  shippingInformation: {
    shippingCost: number;
    estimatedDelivery: string;
  };
  returnDate: string;
  rentalTotalDays: number;
  usageInstructions: string;
  safetyInformation: string;
  discountsOffers?: string;
};
