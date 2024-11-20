type AttachmentType = {
  type: string; // e.g., "image", "pdf"
  url: string; // URL of the attachment
  description: string; // Description of the attachment
};

export type JobPosting = {
  jobName: string; // Name of the job
  jobTask: string; // Specific task to be done
  jobDescription: string; // Detailed description of the job
  jobPrice: string; // Price for the job, in dollars
  jobZip: string; // Zip code of the job location
  jobCityLocation: string; // City where the job is located
  jobAddress: string; // Full address of the job location
  date: string; // Date of the job (YYYY-MM-DD format)
  time: string; // Time of the job (e.g., "10:00 AM")
  urgencyLevel: "Low" | "Medium" | "High"; // Priority level of the job
  expectedDuration: string; // Estimated duration of the job (e.g., "2 hours")
  materialsProvided: string; // Description of materials/tools provided by the customer
  email: string; // Customer's email
  phoneNumber: string; // Customer's phone number
  customerName: string; // Customer's full name
  preferredCommunicationMethod: "Email" | "Phone" | "Text Message"; // Preferred contact method
  jobStatus: boolean; // Indicates if the job is currently active (true/false)
  experienceLevel: string; // Minimum experience required (e.g., "2+ years")
  providerGenderPreference: "None" | "Male" | "Female"; // Optional gender preference for service provider
  paymentMethod:
    | "Cash"
    | "Credit Card"
    | "PayPal"
    | "Bank Transfer"
    | "Digital Payment"; // Accepted payment method
  paymentStatus: boolean; // Indicates if payment has been made (true/false)
  cancellationPolicy: string; // Details about the cancellation policy
  attachments: AttachmentType[]; // Array of attachments related to the job
  specialInstructions?: string; // Any additional instructions
  accessibilityInformation?: string; // Accessibility details for the job location
};
