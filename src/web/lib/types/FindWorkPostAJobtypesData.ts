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
  jobStatus:
    | "Pending"
    | "Under Review"
    | "Completed"
    | "Cancelled"
    | "Solutionist Assigned"; // Add more statuses as needed
  createdAt: string; // ISO 8601 Date-time format
  updatedAt: string; // ISO 8601 Date-time format
  images: string; // Array of image URLs
  jobCategory: string;
  jobCategoryServices: string;
  solutionistId: number;
  posterId: number;
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

export type JobOrderHistory = {
  orderId: number;
  jobId: number;
  solutionistId: number;
  posterId: number;
  jobName: string;
  jobTask: string;
  jobDescription: string;
  jobPrice: number;
  jobZip: string;
  jobCityLocation: string;
  jobAddress: string;
  jobDate: string; // ISO Date string (YYYY-MM-DD)
  jobTime: string; // Time string (HH:mm:ss)
  urgencyLevel: string;
  expectedDuration: string;
  materialsProvided: string;
  email: string;
  phoneNumber: string;
  customerName: string;
  preferredCommunicationMethod: string;
  experienceLevel: string;
  providerGenderPreference: string;
  paymentMethodProfile: string;
  paymentStatus: boolean;
  cancellationPolicy: string;
  specialInstructions: string;
  accessibilityInformation: string;
  jobCountry: string;
  jobState: string;
  jobAcceptedBySolutionist: boolean;
  jobAcceptedByPoster: boolean;
  paymentId: number;
  jobStatus: string;
  jobCategory: string;
  jobCategoryServices: string;
  createdAt: string; // ISO Date-Time string (YYYY-MM-DDTHH:mm:ss.sssZ)
  updatedAt: string; // ISO Date-Time string (YYYY-MM-DDTHH:mm:ss.sssZ)
  images: string; // Array of image URLs
};

// Default values object
export const defaultJobOrderHistory: JobOrderHistory = {
  orderId: 0,
  jobId: 0,
  solutionistId: 0,
  posterId: 0,
  jobName: "",
  jobTask: "",
  jobDescription: "",
  jobPrice: 0,
  jobZip: "",
  jobCityLocation: "",
  jobAddress: "",
  jobDate: new Date().toISOString().split("T")[0], // Defaults to today (YYYY-MM-DD)
  jobTime: "00:00:00",
  urgencyLevel: "Low",
  expectedDuration: "N/A",
  materialsProvided: "N/A",
  email: "",
  phoneNumber: "",
  customerName: "",
  preferredCommunicationMethod: "Email",
  experienceLevel: "Beginner",
  providerGenderPreference: "No Preference",
  paymentMethodProfile: "Unknown",
  paymentStatus: false,
  cancellationPolicy: "Standard",
  specialInstructions: "",
  accessibilityInformation: "N/A",
  jobCountry: "USA",
  jobState: "",
  jobAcceptedBySolutionist: false,
  jobAcceptedByPoster: false,
  paymentId: 0,
  jobStatus: "Pending",
  jobCategory: "",
  jobCategoryServices: "",
  createdAt: new Date().toISOString(), // Defaults to current timestamp
  updatedAt: new Date().toISOString(), // Defaults to current timestamp
  images: "",
};
