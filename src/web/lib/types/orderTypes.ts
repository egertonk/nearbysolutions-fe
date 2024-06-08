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
  customerID: number;
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  solutionFormattedDate: string;
  solutionDate: string;
  solutionTask: string;
  solutionJob: string;
  solutionStartTime: string;
  selectedTalent: string;
  talentID: number;
  talentFirstName: string;
  talentLastName: string;
  solutionPrice: number;
  solutionPricePerHourStatus: boolean;
  solutionPriceDiscountPercentage: number;
  orderDate: string;
  orderStatus: boolean;
};

export type CustomerOrder = {
  orderID: number;
  customerID: number;
  firstName: string;
  lastName: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phoneNumber: string;
  solutionFormattedDate: string;
  solutionDate: string;
  solutionTask: string;
  solutionJob: string;
  solutionStartTime: string;
  selectedTalent: string;
  talentID: number;
  talentFirstName: string;
  talentLastName: string;
  solutionPrice: number;
  solutionPricePerHourStatus: boolean;
  solutionPriceDiscountPercentage: number;
  orderDate: string;
  orderStatus: boolean;
};
