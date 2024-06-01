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

export type SearchResults = {
  talentID: number;
  imageSource: string;
  fullName: string;
  jobTitles: string[];
  talentIntroduction: string;
  socialMediaDetails: {
    name: string;
    link: string;
  }[];
  solutionPricing: {
    fixPrice: number;
    ratePerHour: number;
  };
  verifyStatus: boolean;
}[];

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
  };
};

export type TalentInformation = {
  talentID: number;
  imageSource: string;
  fullName: string;
  jobTitlesPrice: JobTitlePricing[];
  talentIntroduction: string;
  socialMediaDetails: SocialMediaDetail[];
  verifyStatus: boolean;
  vacationStatus: boolean;
  vacationDaysOff: VacationDaysOff;
};
