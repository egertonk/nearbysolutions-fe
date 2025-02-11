import { PaymentDetails } from "./DIYToolsListings copy";

export type imageDetailsTypes = {
  name: string;
  image: string[];
};

export type JobDetailTypes = {
  id: string;
  jobName: string;
  jobTask: string;
  jobPrice: string;
  jobZip: string;
  jobCityLocation: string;
  jobDate: string;
  time: string;
  email: string;
  jobCountry: string;
  jobState: string;
  urgencyLevel: string;
  phoneNumber: string;
  customerName: string;
  jobAddress: string;
};

export type JobPosting = {
  id: number;
  jobName: string;
  jobTask: string;
  jobDescription: string;
  jobPrice: number;
  jobZip: string;
  jobCityLocation: string;
  jobAddress: string;
  jobDate: string; // ISO 8601 Date format (YYYY-MM-DD)
  time: string; // Time in HH:MM:SS format
  urgencyLevel: "Low" | "Medium" | "High"; // Define as an enum if applicable
  expectedDuration: string;
  materialsProvided: "Yes" | "No"; // Consider using a boolean instead
  email: string;
  phoneNumber: string;
  customerName: string;
  preferredCommunicationMethod: "Email" | "Phone" | "Text";
  experienceLevel: "Beginner" | "Intermediate" | "Expert";
  providerGenderPreference: "None" | "Male" | "Female";
  paymentMethodOnFile:
    | "Cash"
    | "Credit Card"
    | "PayPal"
    | "Bank Transfer"
    | "Digital Payment"; // Accepted payment method
  paymentStatus: boolean;
  cancellationPolicy: string;
  specialInstructions: string;
  accessibilityInformation: string;
  poster_id: number;
  jobCountry: string;
  jobState: string;
  jobAcceptedBySolutionist: boolean;
  jobAcceptedByPoster: boolean;
  paymentId: number;
  jobStatus: "Pending" | "Under Review" | "Completed" | "Cancelled"; // Add more statuses as needed
  createdAt: string; // ISO 8601 Date-time format
  updatedAt: string; // ISO 8601 Date-time format
  images: string[]; // Array of image URLs
  jobCategory: string;
  jobCategoryServices: string;
};

export type FullJobPostingDetails = {
  jobPosting: JobPosting;
  paymentDetails: PaymentDetails;
};

export type NoLicensePermitVerificationServiceTypes = {
  id: number;
  category: string;
  name: string;
  description: string;
  licensePermitVerification: boolean;
};

export type Service = {
  id: number;
  category: string;
  name: string;
  description: string;
  licensePermitVerification: boolean;
};

export type GroupedServices = Record<string, Service[]>;
