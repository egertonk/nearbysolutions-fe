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
import { imageDetailsTypes } from "./types/FindWorkPostAJobtypesData";
import { JobTitleTypes } from "./types/solutionistTypes";

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthNameToNumberMarch: { [key: string]: number } = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dayTitles = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const monthNameToNumber: { [key: string]: number } = {
  Jan: 1,
  Feb: 2,
  Mar: 3,
  Apr: 4,
  May: 5,
  Jun: 6,
  Jul: 7,
  Aug: 8,
  Sep: 9,
  Oct: 10,
  Nov: 11,
  Dec: 12,
};

export const priceWithComma = (price: string | number) => {
  const formattedPrice = price?.toLocaleString();

  return <span>{formattedPrice}</span>;
};

export const getImageArray = (imageUrl: string[]): string[] => {
  return imageUrl ? JSON.parse(`${imageUrl}`) : [];
};

export const compareDatesAreEqual = (previousDate: string) => {
  const nowDate = new Date();
  const pastDate = new Date(previousDate);

  // Check if the dates are the same
  if (
    nowDate.getFullYear() === pastDate.getFullYear() &&
    nowDate.getMonth() === pastDate.getMonth() &&
    nowDate.getDate() === pastDate.getDate()
  ) {
    return true;
  } else {
    return false;
  }
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

export const isFixPriceValid = (jobTitlesPrice: JobTitleTypes[]) => {
  const foundValidPrice = jobTitlesPrice?.find((data) => data.selectedStatus);

  if (foundValidPrice?.fixPrice !== undefined && foundValidPrice?.fixPrice > 0)
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
  { name: "Twitter", icon: x },
  { name: "Youtube", icon: youtube },
  { name: "Whatsapp", icon: whatsapp },
];

export const getSocialMedia = (name: string) => {
  return socialNamesAndIcons.find(
    (socialMedia) => socialMedia.name.toLowerCase() === name.toLowerCase()
  );
};

export const calculateOriginalPrice = (
  finalPrice: number,
  discount: number
): number => {
  if (discount >= 100) return 0; // Avoid division by zero
  return finalPrice / (1 - discount / 100);
};

export const calculateFinalPrice = (
  price: number,
  discount: number
): number => {
  return price * (1 - discount / 100);
};

/**
 * Extracts and parses image data safely from the imageDetails object.
 * Handles both array and JSON string formats.
 */
export const parseImageArray = (imageDetails?: imageDetailsTypes): string[] => {
  const imageArray: string[] = imageDetails?.image ?? [];

  // Convert array to string if necessary
  const jsonString = Array.isArray(imageArray)
    ? JSON.stringify(imageArray)
    : imageArray;

  // Safely parse JSON string to array
  const extractedImageData: string[] =
    typeof jsonString === "string" ? JSON.parse(jsonString) : [];

  return extractedImageData;
};

export const hr = (
  <hr className="w-full h-1 mx-auto  bg-purple-300 border-0 rounded-sm dark:bg-purple-800 mt-4"></hr>
);
