type AttachmentType = {
  type: string; // e.g., "image", "pdf"
  url: string; // URL of the attachment
  description: string; // Description of the attachment
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
  date: string;
  time: string;
  urgencyLevel: "Low" | "Medium" | "High";
  expectedDuration: string;
  materialsProvided: string;
  email: string;
  jobCountry: string;
  phoneNumber: string;
  customerName: string;
  preferredCommunicationMethod: "Email" | "Phone" | "Text Message";
  jobStatus: boolean;
  paymentMethod:
    | "Cash"
    | "Credit Card"
    | "PayPal"
    | "Bank Transfer"
    | "Digital Payment"; // Accepted payment method
  experienceLevel: string;
  providerGenderPreference: "None" | "Male" | "Female";
  paymentMethodOnFile: string;
  paymentStatus: boolean;
  cancellationPolicy: string;
  specialInstructions: string;
  accessibilityInformation: string;
  image: string; // One Imaage
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
