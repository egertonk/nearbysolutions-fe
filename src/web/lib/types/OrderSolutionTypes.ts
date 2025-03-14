import { emptyUser } from "../default-data/SolutionistEmtyData";
import { CustomerAddressTypes, UserTypes } from "./solutionistTypes";

export type Order =
  | {
      time: string;
      orderDate: string;
      locationCity: string;
      locationState: string;
      orderStatus: boolean;
      orderTaskDate: string;
      fullName: string;
      userTaskDescription: string;
      JobTitlesSection: string;
      orderNumber: number;
      customerID: number;
      talentID: number;
      customerStartTime: string;
      customerFirstName: string;
      customerLastName: string;
      customerTaskNote: string;
      jobTitle: string;
    }
  | undefined;

type SocialMediaDetail = {
  name: string;
  link: string;
};

type VacationDaysOff = {
  startDate: string;
  endDate: string;
};

export type JobTitlePricing = {
  isFixPrice: boolean;
  selectedStatus: boolean;
  title: string;
  price: {
    fixPrice: number;
    ratePerHour: number;
    discount: number;
  };
};

export type TalentInformation = {
  talentID: number;
  imageSource: string;
  fullName: string;
  firstName: string;
  lastName: string;
  jobTitlesPrice: JobTitlePricing[];
  talentIntroduction: string;
  socialMediaDetails: SocialMediaDetail[];
  verifyStatus: boolean;
  vacationStatus: boolean;
  vacationDaysOff: VacationDaysOff;
};

export type CustomerFormData = {
  orderID: number;
  customerInfo: UserTypes;
  customerAddress: CustomerAddressTypes;
  paymentInfo: {
    nameOnCard: string;
    cardNumber: string;
    cardType: string;
    expirationDate: string;
    securityCode: string;
    postalCode: string;
  };
  solutionDateContract: {
    solutionDate: string;
    longTermContract?: string;
    longTermstartDate?: string;
    longTermEndDate?: string;
    solutionFormattedDate: string;
    solutionStartTime: string;
  };
  solutionTask: string;
  solutionJob: string;
  selectedTalent: string;
  talentID: number;
  talentFirstName: string;
  talentLastName: string;
  solutionPrice: number;
  fixPriceStatus: boolean;
  solutionPriceDiscountPercentage: number;
  orderDate: string;
  orderStatus: boolean;
  giftStatus: boolean;
  giftInformationFor: {
    firstName: string;
    lastName: string;
    country: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    phoneNumber: string;
    email: string;
  };
  longTermSubscriptionAllow: boolean;
};

export type SolutionJobOrderHistory = {
  orderId: number;
  solutionistId: number;
  solutionistName: string;
  solutionistEmail: string;
  solutionistPhone: string;
  solutionistImageUrl: string;
  solutionistRoleLevel: string;
  solutionistExperience: string;
  appointmentDate: string; // ISO Date string: "YYYY-MM-DD"
  scheduleTime: string; // ISO Time string: "HH:mm:ss"
  jobSelection: string;
  jobTask: string | null;
  jobAddress: string;

  solutionCountry: string;
  solutionCity: string;
  solutionAddress: string;
  solutionState: string;
  solutionZipcode: string;

  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerPreferredCommunication: string;
  customerSubscriptionStatus: string;

  cardholderName: string;
  cardType: string;
  lastFourDigits: string;
  paymentStatus: "Pending" | "Completed" | "On Hold";

  jobPrice: number;
  tax: number;
  subtotal: number;
  total: number;
  status: "Placed" | "Processing" | "Completed" | "Cancelled";
  discountPercent: number;
  discountPrice: number;
  totalPrice: number;
  grandTotal: number;

  createdAt: string; // ISO DateTime string
  updatedAt: string; // ISO DateTime string
};

export type SolutionJobOrderHistoryWithPagination = {
  content: SolutionJobOrderHistory[];
};

export const defaultSolutionJobOrderHistory: SolutionJobOrderHistory = {
  orderId: 0,
  solutionistId: 0,
  solutionistName: "",
  solutionistEmail: "",
  solutionistPhone: "",
  solutionistRoleLevel: "",
  solutionistExperience: "",
  solutionistImageUrl: "",
  appointmentDate: "",
  scheduleTime: "",
  jobSelection: "",
  jobTask: null,
  jobAddress: "",

  solutionCountry: "",
  solutionCity: "",
  solutionAddress: "",
  solutionState: "",
  solutionZipcode: "",

  customerId: 0,
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  customerAddress: "",
  customerPreferredCommunication: "",
  customerSubscriptionStatus: "",

  cardholderName: "",
  cardType: "",
  lastFourDigits: "",
  paymentStatus: "Pending",

  jobPrice: 0,
  tax: 0,
  subtotal: 0,
  total: 0,
  status: "Placed",
  discountPercent: 0,
  discountPrice: 0,
  totalPrice: 0,
  grandTotal: 0,

  createdAt: "",
  updatedAt: "",
};

export type SolutionOrderHistoryDetails = {
  customerDetails: UserTypes;
  solutionOrderDetails: SolutionJobOrderHistory;
  solutionistDetails: UserTypes;
};

export const emptySolutionOrderHistoryDetails: SolutionOrderHistoryDetails = {
  customerDetails: emptyUser,
  solutionOrderDetails: defaultSolutionJobOrderHistory,
  solutionistDetails: emptyUser,
};
