// Our Solutionist talent types

import { SolutionistWorkSetting } from "../../../store/solutionistWorkSettingsSlice";

export type SolutionistSkillTypes = {
  id: number;
  name: string;
  description: string;
  proficiencyLevel: string;
  fixPrice: number;
};

export type TalentInformationTypes = {
  talentId: number;
  imageSource: string;
  talentIntroduction: string;
  vacationStatus: boolean;
  verifyStatus: boolean;
  vacationDaysOff: string | null; // Nullable
};

export type SolutionistTalentTypes = {
  talentinformation: TalentInformationTypes;
};

export type UserTypes = {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  username: string;
  passwordHash: string;
  phoneNumber: string;
  profilePicture: string;
  dateOfBirth: string; // Use ISO 8601 date format
  location: string;
  createdAt: string; // Use ISO 8601 date-time format
  updatedAt: string; // Use ISO 8601 date-time format
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  middleName: string;
  lastName: string;
  firstName: string;
  fullName: string | null; // Nullable
  isVerified: boolean;
  verificationToken: string | null; // Nullable
  resetPasswordToken: string | null; // Nullable
  resetPasswordExpiration: string | null; // Nullable
  lastLogin: string | null; // Nullable
  loginAttempts: number;
  isLocked: boolean;
  notificationPreferences: string | null; // Nullable
  preferredTheme: string | null; // Nullable
  gender: string | null; // Nullable
  nationality: string | null; // Nullable
  permissions: string | null; // Nullable
  roleLevel: number;
  lastLoginIp: string | null; // Nullable
  deviceInfo: string | null; // Nullable
  subscriptionType: string | null; // Nullable
  subscriptionStatus: string | null; // Nullable
  subscriptionStartDate: string | null; // Nullable
  subscriptionEndDate: string | null; // Nullable
  referralCode: string | null;
  referredBy: string | null;
  isDeleted: boolean;
  deletedAt: string | null; // Nullable
};

export type SolutionistResponseTypes = {
  solutionistSkills: SolutionistSkillTypes[];
  solutionistTalents: SolutionistTalentTypes[];
  solutionistInformation: UserTypes;
  solutionistSocialMedias: SocialMediaTypes[];
  solutionistWorkSettings: SolutionistWorkSettingsTypes;
};

export type CustommerResponseTypes = {
  customerAddress: CustomerAddressTypes[];
  customerInformation: UserTypes;
  solutionistSocialMedias: SocialMediaTypes[];
};

export type CustomerAddressTypes = {
  id: number;
  userId: number;
  street: string;
  addressLine2: string | null;
  city: string;
  state: string | null;
  region: string | null;
  postalCode: string | null;
  country: string;
  latitude: number | null;
  longitude: number | null;
  addressType: string;
  label: string | null;
  isDefault: boolean;
  isVerified: boolean;
  permanent: boolean | null;
  createdAt: string;
  updatedAt: string;
};

export type PaymentInfoTypes = {
  nameOnCard: string | null;
  cardNumber: string | null;
  cardType: string | null;
  expirationDate: string | null;
  securityCode: string | null;
  postalCode: string | null;
};

export type SocialMediaTypes = {
  id: number; // The unique identifier for the social media entry
  name: string; // The name of the social media platform
  link: string; // The URL link to the social media profile
  userId: number; // The ID of the user associated with the social media profile
};

export type AvailableDaysTypes = {
  days: string[]; // Array of days (e.g., ["Monday", "Tuesday"])
};

export type SolutionistWorkSettingsTypes = {
  id: number; // Unique identifier
  userId: number; // ID of the associated user
  addressId: number; // ID of the address
  businessStartTime: string; // Business start time in "HH:mm:ss" format
  businessEndTime: string; // Business end time in "HH:mm:ss" format
  oneBlockedStatus: boolean; // Status indicating if one is blocked
  jobAsapStatus: boolean; // Status for ASAP jobs
  onlineStatus: boolean; // Status for online availability
  availableDays: AvailableDaysTypes | string; // Days available (JSON as a string or parsed object)
  vacationStatus: boolean; // Vacation status
  vacationStartDate: string | null; // Start date of vacation (ISO 8601 date format or null)
  vacationEndDate: string | null; // End date of vacation (ISO 8601 date format or null)
  twentyFourHoursStatus: boolean; // Status for 24-hour availability
  twelveHoursStatus: boolean; // Status for 12-hour availability
  timezone: string; // Timezone string
  lastUpdatedBy: number | null; // ID of the last updater (nullable)
  workLocation: string | null; // Location of work (nullable)
  specialInstructions: string | null; // Special instructions (nullable)
  createdAt: string; // Timestamp for creation (ISO 8601 format)
  updatedAt: string; // Timestamp for last update (ISO 8601 format)
  longTermSubscriptionAllow: boolean; // Status indicating if long-term subscriptions are allowed
};

export interface Skill {
  id: number;
  name: string;
  description: string;
  proficiencyLevel: string;
}

export interface Address {
  id: number;
  userId: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType: string;
  createdAt: string;
  updatedAt: string;
  permanent: boolean;
}

export interface SocialMedia {
  id: number;
  name: string;
  link: string;
  talent: any; // Adjust this type based on your needs
}

export interface JobTitleTypes {
  id: number;
  discount: number;
  fixPrice: number;
  isFixPrice: boolean;
  ratePerHour: number;
  selectedStatus: boolean;
  title: string;
}

export interface Talent {
  talentId: number;
  imageSource: string;
  talentIntroduction: string;
  vacationStatus: boolean;
  verifyStatus: boolean;
  vacationDaysOff: number | null;
  // solutionist: Solutionist;
  skills: Skill[];
  addresses: Address[];
  socialMedia: SocialMedia[];
  jobTitle: JobTitleTypes[];
  solutionistWorkSettings: SolutionistWorkSetting[];
}

export interface SolutionistTypes {
  talent: Talent;
}
