import React from "react";

import {
  discord,
  facebook,
  github,
  google,
  instagram,
  linkedin,
  messenger,
  pinterest,
  reddit,
  slack,
  snapchat,
  telegram,
  tikTok,
  twitch,
  x,
  youtube,
  whatsapp,
} from "../assets/svg/svgs";
import { JobTitlePricing } from "./types/orderTypes";
import { CustomerJobs } from "./types/findWorkPostAJobtypes";

export const priceWithComma = (price: string | number) => {
  const formattedPrice = price?.toLocaleString();

  return <span>{formattedPrice}</span>;
};

export const getCurrentTime = () => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // The hour '0' should be '12'
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  const strTime = hours + ":" + minutesStr + " " + ampm;
  return strTime;
};

export const parseTime = (timeStr: any) => {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (hours === 12) {
    hours = 0;
  }
  if (modifier === "PM") {
    hours += 12;
  }

  return { hours, minutes };
};

export const isTimeGreater = (time1: any, time2: any) => {
  const date1 = new Date();
  date1.setHours(time1.hours);
  date1.setMinutes(time1.minutes);

  const date2 = new Date();
  date2.setHours(time2.hours);
  date2.setMinutes(time2.minutes);

  return date1 > date2;
};

export const isTimeValid = (time: string) => {
  const currentParsed = parseTime(getCurrentTime());
  const targetParsed = parseTime(time);
  return isTimeGreater(targetParsed, currentParsed);
};

export const formatDate = (dateString: string | undefined) => {
  if (dateString === undefined) return null;
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};

export const compareDates = (oldDate: string, currentDate: string) => {
  const old = new Date(oldDate);
  const newDate = new Date(currentDate);

  if (old >= newDate) {
    return true;
  } else {
    return false;
  }
};

export const breakUpDate = (dateString: string | undefined) => {
  if (dateString === undefined) return null;

  const date = new Date(dateString);
  const [month, day, year] = date.toLocaleDateString().split("/");
  return { day, month, year };
};

export const isFixPriceValid = (jobTitlesPrice: JobTitlePricing[]) => {
  const foundValidPrice = jobTitlesPrice.find((data) => data.selectedStatus);

  if (
    foundValidPrice?.price.fixPrice !== undefined &&
    foundValidPrice?.price.fixPrice > 0
  )
    return true;
  return false;
};

export const socialNamesAndIcons = [
  { name: "Discord", icon: discord },
  { name: "Facebook", icon: facebook },
  { name: "Github", icon: github },
  { name: "Google", icon: google },
  { name: "Instagram", icon: instagram },
  { name: "Linkedin", icon: linkedin },
  { name: "Messenger", icon: messenger },
  { name: "Pinterest", icon: pinterest },
  { name: "Reddit", icon: reddit },
  { name: "Slack", icon: slack },
  { name: "Snapchat", icon: snapchat },
  { name: "Telegram", icon: telegram },
  { name: "TikTok", icon: tikTok },
  { name: "Twitch", icon: twitch },
  { name: "X", icon: x },
  { name: "Youtube", icon: youtube },
  { name: "Whatsapp", icon: whatsapp },
];

export const getSocialMedia = (name: string) => {
  return socialNamesAndIcons.find(
    (socialMedia) => socialMedia.name.toLowerCase() === name.toLowerCase()
  );
};

// temp
export const talentInformation = [
  {
    talentID: 111111,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jessa During",
    firstName: "Jessa",
    lastName: "During",
    jobTitlesPrice: [
      {
        isFixPrice: true, // only one can be have an amout - fixPrice: 10000, ratePerHour: 0
        selectedStatus: false, // required - only on can be true and rest false
        title: "Graphic Designer",
        price: { fixPrice: 10000, ratePerHour: 0, discount: 15 },
      },
      {
        isFixPrice: false,
        selectedStatus: true,
        title: "Nurse",
        price: { fixPrice: 0, ratePerHour: 100, discount: 15 },
      },
    ],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "Google", link: "https://www.Google.com/" },
      { name: "TikTok", link: "https://www.TikTok.com/" },
      { name: "x", link: "https://www.x.com/" },
      { name: "Youtube", link: "https://www.Youtube.com/" },
      { name: "Whatsapp", link: "https://www.Whatsapp.com/" },
    ],
    verifyStatus: true,
    vacationStatus: true,
    vacationDaysOff: {
      startDate: "06/10/2024",
      endDate: "06/10/2024",
    },
  },
  {
    talentID: 343434,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Egerton During",
    firstName: "Egerton",
    lastName: "During",
    jobTitlesPrice: [
      {
        isFixPrice: true,
        selectedStatus: true,
        title: "Software Engineer",
        price: { fixPrice: 10000, ratePerHour: 0, discount: 15 },
      },
      {
        isFixPrice: false,
        selectedStatus: false,
        title: "Fullstack Developer",
        price: { fixPrice: 0, ratePerHour: 200, discount: 15 },
      },
    ],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    verifyStatus: true,
    vacationStatus: false,
    vacationDaysOff: {
      startDate: "06/10/2024",
      endDate: "06/10/2024",
    },
  },
  {
    talentID: 1133333,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jade Bradley",
    firstName: "Jade",
    lastName: "Bradley",
    jobTitlesPrice: [
      {
        isFixPrice: true,
        selectedStatus: false,
        title: "Help Desk",
        price: { fixPrice: 10000, ratePerHour: 0, discount: 15 },
      },
      {
        isFixPrice: false,
        selectedStatus: true,
        title: "bbbbbbbb Desk",
        price: { fixPrice: 0, ratePerHour: 300, discount: 15 },
      },
    ],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    verifyStatus: false,
    vacationStatus: true,
    vacationDaysOff: {
      startDate: "06/10/2024",
      endDate: "06/10/2024",
    },
  },
  {
    talentID: 44141,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Dany Bailey",
    firstName: "Dany",
    lastName: "Bailey",
    jobTitlesPrice: [
      {
        isFixPrice: true,
        selectedStatus: true,
        title: "Nurse s",
        price: { fixPrice: 100, ratePerHour: 0, discount: 15 },
      },
    ],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    verifyStatus: true,
    vacationStatus: false,
    vacationDaysOff: {
      startDate: "06/10/2024",
      endDate: "06/10/2024",
    },
  },
];

export const customerOrderHistory = [
  {
    orderID: 5353,
    customerID: 12345,
    firstName: "Jessa",
    lastName: "During",
    country: "United States",
    address: "13296 Oakham Ct",
    city: "Woodbridge",
    state: "Virginia",
    zip: "22193",
    phoneNumber: "5713301230",
    email: "jessaduring@yahoo.com",
    solutionFormattedDate: "Saturday 8 June 2024",
    solutionDate: "6/18/2024",
    solutionTask: "Take my blood pressure",
    solutionJob: "Nurse",
    solutionStartTime: "11:00 AM",
    selectedTalent: "Nurse",
    talentID: 785451125,
    talentFirstName: "John",
    talentLastName: "Doe",
    solutionPrice: 5000,
    solutionPricePerHourStatus: false,
    solutionPriceDiscountPercentage: 5,
    orderDate: "4/30/2024",
    orderStatus: true,
    giftStatus: false,
    giftFor_fullName: "Brighton During",
  },
  {
    orderID: 54666,
    customerID: 12345,
    firstName: "Brighton",
    lastName: "During",
    country: "United States",
    address: "10308 Gazelle Ct",
    city: "Fredericksburg",
    state: "Virginia",
    zip: "22408",
    phoneNumber: "5713301230",
    email: "jessaduring@yahoo.com",
    solutionFormattedDate: "Thursday 6 June 2024",
    solutionDate: "6/16/2024",
    solutionTask: "Take my blood pressure",
    solutionJob: "Nurse",
    solutionStartTime: "08:00 AM",
    selectedTalent: "Nurse",
    talentID: 785451125,
    talentFirstName: "John",
    talentLastName: "Doe",
    solutionPrice: 100,
    solutionPricePerHourStatus: true,
    solutionPriceDiscountPercentage: 5,
    orderDate: "4/29/2024",
    orderStatus: true,
    giftStatus: false,
    giftFor_fullName: "",
  },
  {
    orderID: 98765,
    customerID: 67890,
    firstName: "Samuel",
    lastName: "Jackson",
    country: "United States",
    address: "742 Evergreen Terrace",
    city: "Springfield",
    state: "Illinois",
    zip: "62704",
    phoneNumber: "5551234567",
    email: "samuel.jackson@example.com",
    solutionFormattedDate: "Monday 10 June 2024",
    solutionDate: "6/10/2024",
    solutionTask: "Physical Therapy",
    solutionJob: "Therapist",
    solutionStartTime: "09:00 AM",
    selectedTalent: "Therapist",
    talentID: 987654321,
    talentFirstName: "Jane",
    talentLastName: "Smith",
    solutionPrice: 200,
    solutionPricePerHourStatus: true,
    solutionPriceDiscountPercentage: 10,
    orderDate: "5/01/2024",
    orderStatus: true,
    giftStatus: false,
    giftFor_fullName: "",
  },
  {
    orderID: 11223,
    customerID: 34567,
    firstName: "Emily",
    lastName: "Blunt",
    country: "United States",
    address: "1600 Pennsylvania Ave NW",
    city: "Washington",
    state: "DC",
    zip: "20500",
    phoneNumber: "2024567890",
    email: "emily.blunt@example.com",
    solutionFormattedDate: "Friday 14 June 2024",
    solutionDate: "6/14/2024",
    solutionTask: "Massage Therapy",
    solutionJob: "Masseuse",
    solutionStartTime: "02:00 PM",
    selectedTalent: "Masseuse",
    talentID: 123456789,
    talentFirstName: "Michael",
    talentLastName: "Jordan",
    solutionPrice: 150,
    solutionPricePerHourStatus: false,
    solutionPriceDiscountPercentage: 15,
    orderDate: "5/02/2024",
    orderStatus: true,
    giftStatus: true,
    giftFor_fullName: "Emily Blunt",
  },
  {
    orderID: 44556,
    customerID: 78901,
    firstName: "Robert",
    lastName: "Downey",
    country: "United States",
    address: "350 Fifth Ave",
    city: "New York",
    state: "New York",
    zip: "10118",
    phoneNumber: "2127363100",
    email: "robert.downey@example.com",
    solutionFormattedDate: "Sunday 9 June 2024",
    solutionDate: "6/09/2024",
    solutionTask: "Personal Training",
    solutionJob: "Trainer",
    solutionStartTime: "06:00 AM",
    selectedTalent: "Trainer",
    talentID: 192837465,
    talentFirstName: "Chris",
    talentLastName: "Evans",
    solutionPrice: 300,
    solutionPricePerHourStatus: true,
    solutionPriceDiscountPercentage: 20,
    orderDate: "5/03/2024",
    orderStatus: true,
    giftStatus: false,
    giftFor_fullName: "",
  },
];

export const cSettings = {
  businessStartTime: "08:00 AM",
  businessEndTime: "20:00 Pm",
  oneBlockedStatus: true,
  jobASAPStatus: false,
  bandStatus: false,
  availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  vacationStatus: false,
  vacationStartDate: "06/20/2024",
  vacationEndDate: "06/24/2024",
  twentyFourHoursStatus: false,
  twelveHoursStatus: true,
};

export const talentProfile = {
  talentID: 111111,
  fullName: "Jessa During",
  jobTitles: ["Software Engineer", "Fullstack Developer"],
};

export const talentProjectImages = {
  jobTitles: [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  ],
};

export const customerJobsArray: CustomerJobs[] = [
  {
    jobName: "Plumbing Fix",
    jobTask: "Fix leaky faucet",
    jobPrice: "$120",
    jobZip: "10001",
    jobCityLocation: "New York",
    date: "2024-06-14",
    time: "10:00 AM",
    email: "customer1@example.com",
  },
  {
    jobName: "Garden Maintenance",
    jobTask: "Mow the lawn and trim hedges",
    jobPrice: "$80",
    jobZip: "90001",
    jobCityLocation: "Los Angeles",
    date: "2024-06-15",
    time: "08:00 AM",
    email: "customer2@example.com",
  },
  {
    jobName: "House Cleaning",
    jobTask: "Deep clean the house",
    jobPrice: "$150",
    jobZip: "60601",
    jobCityLocation: "Chicago",
    date: "2024-06-16",
    time: "12:00 PM",
    email: "customer3@example.com",
  },
  {
    jobName: "Electrical Repair",
    jobTask: "Fix electrical wiring",
    jobPrice: "$200",
    jobZip: "94101",
    jobCityLocation: "San Francisco",
    date: "2024-06-17",
    time: "09:00 AM",
    email: "customer4@example.com",
  },
  {
    jobName: "Painting",
    jobTask: "Paint the living room",
    jobPrice: "$180",
    jobZip: "33101",
    jobCityLocation: "Miami",
    date: "2024-06-18",
    time: "11:00 AM",
    email: "customer5@example.com",
  },
];
