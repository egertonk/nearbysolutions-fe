// Our Solutionist talent types

import { SolutionistWorkSetting } from "../../../store/solutionistWorkSettingsSlice";

// Define interfaces for the structure
export interface Solutionist {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  username: string;
  passwordHash: string;
  fullName: string | null;
  phoneNumber: string;
  profilePicture: string;
  dateOfBirth: string;
  location: string;
  communicationPreferences: string; // Consider parsing this JSON string later
  createdAt: string;
  updatedAt: string;
  termsAccepted: boolean;
  privacyPolicyAccepted: boolean;
  firstName: string;
  middleName: string;
  lastName: string;
}

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
  solutionist: Solutionist;
  skills: Skill[];
  addresses: Address[];
  socialMedia: SocialMedia[];
  jobTitle: JobTitleTypes[];
  solutionistWorkSettings: SolutionistWorkSetting[];
}

export interface SolutionistTypes {
  talent: Talent;
}

// Placeholder data
export const talentPlaceHolderData = [
  {
    talentId: null,
    imageSource: null,
    talentIntroduction: null,
    vacationStatus: false,
    verifyStatus: false,
    vacationDaysOff: null,
    user: {
      id: null,
      name: null,
      email: null,
      password: null,
      role: null,
      username: null,
      passwordHash: null,
      fullName: null,
      phoneNumber: null,
      profilePicture: null,
      dateOfBirth: null,
      location: null,
      communicationPreferences: null,
      createdAt: null,
      updatedAt: null,
      termsAccepted: false,
      privacyPolicyAccepted: false,
      firstName: null,
      middleName: null,
      lastName: null,
    },
    skills: [
      {
        id: null,
        name: null,
        description: null,
        proficiencyLevel: null,
      },
    ],
    addresses: [
      {
        id: null,
        userId: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        addressType: null,
        createdAt: null,
        updatedAt: null,
        permanent: false,
      },
    ],
    socialMedia: [
      {
        id: null,
        name: null,
        link: null,
        talent: null,
      },
    ],
    jobTitle: [
      {
        id: null,
        discount: null,
        fixPrice: null,
        isFixPrice: false,
        ratePerHour: 0,
        selectedStatus: false,
        title: null,
      },
    ],
  },
] as unknown as SolutionistTypes[];
