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

export const priceWithComma = (price: string | number) => {
  const formattedPrice = price.toLocaleString();

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
    jobTitles: ["Graphic Designer", "Nurse"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "Google", link: "https://www.Google.com/" },
      { name: "TikTok", link: "https://www.TikTok.com/" },
      { name: "x", link: "https://www.x.com/" },
      { name: "Youtube", link: "https://www.Youtube.com/" },
      { name: "Whatsapp", link: "https://www.Whatsapp.com/" },
    ],
    solutionPricing: { fixPrice: 30000, ratePerHour: 47 },
    verifyStatus: true,
  },
  {
    talentID: 222,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Egerton During",
    jobTitles: ["Software Engineer", "Fullstack Developer"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 1133333,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jade Bradley",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 44141,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Dany Bailey",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 75896,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jessa During",
    jobTitles: ["Graphic Designer", "Nurse"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "Google", link: "https://www.Google.com/" },
      { name: "TikTok", link: "https://www.TikTok.com/" },
      { name: "x", link: "https://www.x.com/" },
      { name: "Youtube", link: "https://www.Youtube.com/" },
      { name: "Whatsapp", link: "https://www.Whatsapp.com/" },
    ],
    solutionPricing: { fixPrice: 30000, ratePerHour: 47 },
    verifyStatus: true,
  },
  {
    talentID: 33333,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Egerton During",
    jobTitles: ["Software Engineer", "Fullstack Developer"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 43456321,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jade Bradley",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 121211,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Dany Bailey",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 131313,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jessa During",
    jobTitles: ["Graphic Designer", "Nurse"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "Google", link: "https://www.Google.com/" },
      { name: "TikTok", link: "https://www.TikTok.com/" },
      { name: "x", link: "https://www.x.com/" },
      { name: "Youtube", link: "https://www.Youtube.com/" },
      { name: "Whatsapp", link: "https://www.Whatsapp.com/" },
    ],
    solutionPricing: { fixPrice: 30000, ratePerHour: 47 },
    verifyStatus: false,
  },
  {
    talentID: 141414,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Egerton During",
    jobTitles: ["Software Engineer", "Fullstack Developer"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 15151,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jade Bradley",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 161616,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Dany Bailey",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 171717,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jessa During",
    jobTitles: ["Graphic Designer", "Nurse"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "Google", link: "https://www.Google.com/" },
      { name: "TikTok", link: "https://www.TikTok.com/" },
      { name: "x", link: "https://www.x.com/" },
      { name: "Youtube", link: "https://www.Youtube.com/" },
      { name: "Whatsapp", link: "https://www.Whatsapp.com/" },
    ],
    solutionPricing: { fixPrice: 30000, ratePerHour: 47 },
    verifyStatus: true,
  },
  {
    talentID: 181818,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Egerton During",
    jobTitles: ["Software Engineer", "Fullstack Developer"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 191919,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jade Bradley",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 171757,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Dany Bailey",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 1363636,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jessa During",
    jobTitles: ["Graphic Designer", "Nurse"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "Google", link: "https://www.Google.com/" },
      { name: "TikTok", link: "https://www.TikTok.com/" },
      { name: "x", link: "https://www.x.com/" },
      { name: "Youtube", link: "https://www.Youtube.com/" },
      { name: "Whatsapp", link: "https://www.Whatsapp.com/" },
    ],
    solutionPricing: { fixPrice: 30000, ratePerHour: 47 },
    verifyStatus: false,
  },
  {
    talentID: 145756555,
    imageSource:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Egerton During",
    jobTitles: ["Software Engineer", "Fullstack Developer"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
  {
    talentID: 321456,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Jade Bradley",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: false,
  },
  {
    talentID: 785451125,
    imageSource:
      "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
    fullName: "Dany Bailey",
    jobTitles: ["Help Desk"],
    talentIntroduction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    socialMediaDetails: [
      { name: "facebook", link: "https://www.facebook.com/" },
      { name: "Instagram", link: "https://www.Instagram.com/" },
      { name: "X", link: "https://www.x.com/" },
      { name: "Linkedin", link: "https://www.linkedin.com/" },
      { name: "youtube", link: "https://www.youtube.com/" },
    ],
    solutionPricing: { fixPrice: 10000, ratePerHour: 0 },
    verifyStatus: true,
  },
];

export const talentScheduleData = [
  {
    time: "8 AM",
    orderDate: "5/30/2024",
    locationCity: "Woodbridge",
    locationState: "VA",
    orderStatus: true,
    orderTaskDate: "5/30/2024",
    fullName: "Jessa During",
    userTaskDescription: "Take my blood pressure",
    JobTitlesSection: "Nurse",
    orderNumber: 1111111,
    customerID: 12534,
    talentID: 785451125,
    customerStartTime: "08:00 AM",
    customerFirstName: "A",
    customerLastName: "A",
    customerTaskNote: "mmmmmmmmmmmmmmmm vvvvv gfgggg jjjjkkm.",
    jobTitle: "Fullstack Developer",
  },
  {
    time: "11 AM",
    orderDate: "6/30/2024",
    locationCity: "Woodbridge",
    locationState: "VA",
    orderStatus: true,
    orderTaskDate: "5/25/2024",
    fullName: "Dany Bailey",
    userTaskDescription: "Take my blood pressure",
    JobTitlesSection: "Nurse",
    orderNumber: 222222,
    customerID: 222212,
    talentID: 785451125,
    customerStartTime: "09:00 AM",
    customerFirstName: "B",
    customerLastName: "B",
    customerTaskNote: "mmmmmmmmmmmmmmmm vvvvv gfgggg jjjjkkm.",
    jobTitle: "SoSoftware Engineerf 2",
  },
  {
    time: "1 PM",
    orderDate: "5/31/2024",
    locationCity: "Fredericksburg",
    locationState: "VA",
    orderStatus: false,
    orderTaskDate: "5/25/2024",
    fullName: "Egeton During",
    userTaskDescription: "Take my blood pressure",
    JobTitlesSection: "Nurse",
    orderNumber: 333333,
    customerID: 4447474,
    talentID: 145756555,
    customerStartTime: "10:00 AM",
    customerFirstName: "C",
    customerLastName: "C",
    customerTaskNote: "mmmmmmmmmmmmmmmm vvvvv gfgggg jjjjkkm.",
    jobTitle: "SoSoftware Engineerf 3",
  },
  {
    time: "3 PM",
    orderDate: "5/24/2024",
    locationCity: "Stafford",
    locationState: "VA",
    orderStatus: false,
    orderTaskDate: "5/25/2024",
    fullName: "Jessa During",
    userTaskDescription: "Take my blood pressure",
    JobTitlesSection: "Nurse",
    orderNumber: 44444,
    customerID: 857542,
    talentID: 111111,
    customerStartTime: "11:00 AM",
    customerFirstName: "H",
    customerLastName: "H",
    customerTaskNote: "mmmmmmmmmmmmmmmm vvvvv gfgggg jjjjkkm.",
    jobTitle: "SoSoftware Engineerf 4",
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
  vacationStartDate: "",
  vacationEndDate: "",
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
