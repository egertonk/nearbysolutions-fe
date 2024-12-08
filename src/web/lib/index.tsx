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
import { ToolRentalListing } from "./types/DIYToolsListings";
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
  { name: "Youtube", icon: youtube },
  { name: "Whatsapp", icon: whatsapp },
];

export const getSocialMedia = (name: string) => {
  return socialNamesAndIcons.find(
    (socialMedia) => socialMedia.name.toLowerCase() === name.toLowerCase()
  );
};

// export const talentInformation = [
//   {
//     talent: {
//       talentId: 2,
//       imageSource: "talent2.jpg",
//       talentIntroduction: "Backend Developer with Java expertise",
//       vacationStatus: true,
//       verifyStatus: true,
//       vacationDaysOff: null,
//       user: {
//         id: 42,
//         name: "Bob Smith",
//         email: "bob.smith@example.com",
//         password: "password123",
//         role: "user",
//         username: "bobsmith",
//         passwordHash: "hashed_pw_2",
//         fullName: null,
//         phoneNumber: "234-567-8901",
//         profilePicture: "profile2.jpg",
//         dateOfBirth: "1985-11-12",
//         location: "Los Angeles",
//         communicationPreferences: '{"sms": true, "email": false}',
//         createdAt: "2024-11-01T20:17:47.877289",
//         updatedAt: "2024-11-01T20:17:47.877289",
//         termsAccepted: true,
//         privacyPolicyAccepted: true,
//         firstName: "Bob",
//         middleName: "Alan",
//         lastName: "Smith",
//       },
//       skills: [
//         {
//           id: 22,
//           name: "Java",
//           description: "Experienced with Java backend development",
//           proficiencyLevel: "Intermediate",
//         },
//       ],
//       addresses: [
//         {
//           id: 62,
//           userId: 42,
//           street: "456 Elm St",
//           city: "Los Angeles",
//           state: "CA",
//           postalCode: "90001",
//           country: "USA",
//           addressType: "work",
//           createdAt: "2024-11-01T20:23:09.767209",
//           updatedAt: "2024-11-01T20:23:09.767209",
//           permanent: false,
//         },
//       ],
//       socialMedia: [
//         {
//           id: 5,
//           name: "Facebook",
//           link: "https://facebook.com/talent2",
//           talent: null,
//         },
//         {
//           id: 6,
//           name: "Instagram",
//           link: "https://instagram.com/talent2",
//           talent: null,
//         },
//         {
//           id: 7,
//           name: "LinkedIn",
//           link: "https://linkedin.com/in/talent2",
//           talent: null,
//         },
//       ],
//       jobTitle: [
//         {
//           id: 22,
//           discount: 5,
//           fixPrice: 0,
//           isFixPrice: false,
//           ratePerHour: 50,
//           selectedStatus: true,
//           title: "Java Developer",
//           user: {
//             id: 42,
//             name: "Bob Smith",
//             email: "bob.smith@example.com",
//             password: "password123",
//             role: "user",
//             username: "bobsmith",
//             passwordHash: "hashed_pw_2",
//             fullName: null,
//             phoneNumber: "234-567-8901",
//             profilePicture: "profile2.jpg",
//             dateOfBirth: "1985-11-12",
//             location: "Los Angeles",
//             communicationPreferences: '{"sms": true, "email": false}',
//             createdAt: "2024-11-01T20:17:47.877289",
//             updatedAt: "2024-11-01T20:17:47.877289",
//             termsAccepted: true,
//             privacyPolicyAccepted: true,
//             firstName: "Bob",
//             middleName: "Alan",
//             lastName: "Smith",
//           },
//         },
//         {
//           id: 41,
//           discount: 8,
//           fixPrice: 20000,
//           isFixPrice: true,
//           ratePerHour: 45,
//           selectedStatus: true,
//           title: "Egerton During - Full stack",
//           user: {
//             id: 42,
//             name: "Bob Smith",
//             email: "bob.smith@example.com",
//             password: "password123",
//             role: "user",
//             username: "bobsmith",
//             passwordHash: "hashed_pw_2",
//             fullName: null,
//             phoneNumber: "234-567-8901",
//             profilePicture: "profile2.jpg",
//             dateOfBirth: "1985-11-12",
//             location: "Los Angeles",
//             communicationPreferences: '{"sms": true, "email": false}',
//             createdAt: "2024-11-01T20:17:47.877289",
//             updatedAt: "2024-11-01T20:17:47.877289",
//             termsAccepted: true,
//             privacyPolicyAccepted: true,
//             firstName: "Bob",
//             middleName: "Alan",
//             lastName: "Smith",
//           },
//         },
//       ],
//     },
//   },
// ];

// // Done
// export const customerOrderHistory = [
//   {
//     orderID: 5353,
//     customerInfo: {
//       customerID: 12345,
//       firstName: "Jessa",
//       lastName: "During",
//       country: "United States",
//       address: "13296 Oakham Ct",
//       city: "Woodbridge",
//       state: "Virginia",
//       zip: "22193",
//       phoneNumber: "5713301230",
//       email: "jessaduring@yahoo.com",
//     },
//     solutionDateContract: {
//       solutionDate: "July/27/2024",
//       longTermContract: "",
//       longTermstartDate: "",
//       longTermEndDate: "",
//       solutionFormattedDate: "Saturday 27 july 2024",
//       solutionStartTime: "11:00 AM",
//     },
//     solutionTask: "Take my blood pressure",
//     solutionJob: "Nurse",
//     selectedTalent: "Nurse",
//     talentID: 785451125,
//     talentFirstName: "John",
//     talentLastName: "Doe",
//     solutionPrice: 5000,
//     fixPriceStatus: false,
//     solutionPriceDiscountPercentage: 5,
//     orderDate: "4/30/2024",
//     orderStatus: true,
//     giftStatus: false,
//     giftInformationFor: {
//       firstName: "",
//       lastName: "",
//       country: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: "",
//       phoneNumber: "",
//       email: "",
//     },
//   },
//   {
//     orderID: 54666,
//     customerInfo: {
//       customerID: 12345,
//       firstName: "Brighton",
//       lastName: "During",
//       country: "United States",
//       address: "10308 Gazelle Ct",
//       city: "Fredericksburg",
//       state: "Virginia",
//       zip: "22408",
//       phoneNumber: "5713301230",
//       email: "jessaduring@yahoo.com",
//     },
//     solutionDateContract: {
//       longTermContract: "3Months",
//       longTermEndDate: "September/25/2024",
//       longTermstartDate: "June/25/2024",
//       solutionDate: "July/25/2024",
//       solutionFormattedDate: "Tuesday 25 July 2024",
//       solutionStartTime: "08:00 AM",
//     },
//     solutionTask: "Take my blood pressure",
//     solutionJob: "Nurse",
//     selectedTalent: "Nurse",
//     talentID: 785451125,
//     talentFirstName: "John",
//     talentLastName: "Doe",
//     solutionPrice: 100,
//     fixPriceStatus: true,
//     solutionPriceDiscountPercentage: 5,
//     orderDate: "4/29/2024",
//     orderStatus: true,
//     giftStatus: false,
//     giftInformationFor: {
//       firstName: "",
//       lastName: "",
//       country: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: "",
//       phoneNumber: "",
//       email: "",
//     },
//   },
//   {
//     orderID: 98765,
//     customerInfo: {
//       customerID: 67890,
//       firstName: "Samuel",
//       lastName: "Jackson",
//       country: "United States",
//       address: "742 Evergreen Terrace",
//       city: "Springfield",
//       state: "Illinois",
//       zip: "62704",
//       phoneNumber: "5551234567",
//       email: "samuel.jackson@example.com",
//     },
//     solutionDateContract: {
//       solutionDate: "July/28/2024",
//       longTermContract: "",
//       longTermstartDate: "",
//       longTermEndDate: "",
//       solutionFormattedDate: "Monday 7 July 2024",
//       solutionStartTime: "09:00 AM",
//     },
//     solutionTask: "Physical Therapy",
//     solutionJob: "Therapist",
//     selectedTalent: "Therapist",
//     talentID: 987654321,
//     talentFirstName: "Jane",
//     talentLastName: "Smith",
//     solutionPrice: 200,
//     fixPriceStatus: true,
//     solutionPriceDiscountPercentage: 10,
//     orderDate: "July/01/2024",
//     orderStatus: true,
//     giftStatus: false,
//     giftInformationFor: {
//       firstName: "",
//       lastName: "",
//       country: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: "",
//       phoneNumber: "",
//       email: "",
//     },
//   },
//   {
//     orderID: 11223,
//     customerInfo: {
//       customerID: 34567,
//       firstName: "Emily",
//       lastName: "Blunt",
//       country: "United States",
//       address: "1600 Pennsylvania Ave NW",
//       city: "Washington",
//       state: "DC",
//       zip: "20500",
//       phoneNumber: "2024567890",
//       email: "emily.blunt@example.com",
//     },
//     solutionDateContract: {
//       solutionDate: "July/30/2024",
//       longTermContract: "",
//       longTermstartDate: "",
//       longTermEndDate: "",
//       solutionFormattedDate: "Friday 30 July 2024",
//       solutionStartTime: "02:00 PM",
//     },
//     solutionTask: "Massage Therapy",
//     solutionJob: "Masseuse",
//     selectedTalent: "Masseuse",
//     talentID: 123456789,
//     talentFirstName: "Michael",
//     talentLastName: "Jordan",
//     solutionPrice: 150,
//     fixPriceStatus: false,
//     solutionPriceDiscountPercentage: 15,
//     orderDate: "5/02/2024",
//     orderStatus: true,
//     giftStatus: true,
//     giftInformationFor: {
//       firstName: "",
//       lastName: "",
//       country: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: "",
//       phoneNumber: "",
//       email: "",
//     },
//   },
//   {
//     orderID: 44556,
//     customerInfo: {
//       customerID: 78901,
//       firstName: "Robert",
//       lastName: "Downey",
//       country: "United States",
//       address: "350 Fifth Ave",
//       city: "New York",
//       state: "New York",
//       zip: "10118",
//       phoneNumber: "2127363100",
//       email: "robert.downey@example.com",
//     },
//     solutionDateContract: {
//       solutionDate: "July/01/2024",
//       longTermContract: "",
//       longTermstartDate: "",
//       longTermEndDate: "",
//       solutionFormattedDate: "Monday 1 July 2024",
//       solutionStartTime: "09:00 AM",
//     },
//     solutionTask: "Personal Training",
//     solutionJob: "Trainer",
//     selectedTalent: "Trainer",
//     talentID: 192837465,
//     talentFirstName: "Chris",
//     talentLastName: "Evans",
//     solutionPrice: 300,
//     fixPriceStatus: true,
//     solutionPriceDiscountPercentage: 20,
//     orderDate: "5/03/2024",
//     orderStatus: true,
//     giftStatus: false,
//     giftInformationFor: {
//       firstName: "",
//       lastName: "",
//       country: "",
//       address: "",
//       city: "",
//       state: "",
//       zip: "",
//       phoneNumber: "",
//       email: "",
//     },
//   },
// ];

// export const talentProjectImages = {
//   jobTitles: [
//     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
//     "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
//   ],
// };

// export const diyToolListings: ToolRentalListing[] = [
//   {
//     toolId: "19283",
//     posterId: 5,
//     toolName: "Welding Machine",
//     description: "A portable arc welder for small welding jobs.",
//     toolCategory: "Welding Tools",
//     toolBrand: "WeldMaster",
//     toolAddress: "",
//     toolCity: "",
//     toolState: "",
//     toolZipcode: "",
//     toolCountry: "",
//     pricePerDay: 4.49,
//     available: true,
//     nextAvailableDate: "",
//     rating: 4.2,
//     numberOfReviews: 65,
//     powerSource: "Electric",
//     imageUrls: [
//       "https://media.istockphoto.com/id/1413456962/photo/welding-machine.jpg?s=2048x2048&w=is&k=20&c=Bo-P1lY8WxB9rJbUupvdDArb6qzM_zPOEt_FXKXD_DQ=",
//     ],
//     customerId: "",
//     renterId: "",
//     isShippingValid: true,
//     shippingInformation: {
//       shippingCost: 12.99,
//       estimatedDelivery: "5-7 business days",
//     },
//     discountPercent: 0,
//     returnDate: "",
//     usageInstructions: "Ensure proper grounding before starting welding.",
//     safetyInformation: "Wear a welding helmet and fire-resistant gloves.",
//   },
// ];

// {
//     toolId: "67890",
//     toolName: "Electric Sander",
//     description: "An efficient electric sander for smooth finishing.",
//     toolCategory: "Power Tools",
//     toolBrand: "SandMaster",
//     modelNumber: "SM-SND-2024",
//     pricePerday: 7.99,
//     availability: false,
//     rating: 4.3,
//     numberOfReviews: 200,
//     specifications: {
//       dimensions: "12 x 7 x 5 inches",
//       weight: "3.2 lbs",
//       material: "Metal and Plastic",
//       powerSource: "Corded Electric",
//     },
//     imageUrls: [
//       "https://media.istockphoto.com/id/1180236492/photo/a-professional-master-cleans-the-floor-with-a-polishing-machine.jpg?s=2048x2048&w=is&k=20&c=fPexIqTq9n_HFh9QdAQ2Xg_Tohwile5x4CTf46Js-SY=",
//     ],
//     features: [
//       "High-speed motor",
//       "Dust collection bag",
//       "Ergonomic design",
//       "Variable speed control",
//     ],
//     warrantyInformation: "1-year limited warranty",
//     sellerInformation: {
//       sellerName: "SanderStore LLC",
//       contactInfo: "info@sanderstore.com",
//     },
//     shippingInformation: {
//       shippingCost: 7.99,
//       estimatedDelivery: "4-6 business days",
//     },
//     returnDate: "",
//     rentalTotalDays: 0,
//     usageInstructions: "Refer to the manual for usage instructions.",
//     safetyInformation: "Always wear a dust mask when using the sander.",
//     discountsOffers: "15% off on orders over $100",
//   },
//   {
//     toolId: "54321",
//     toolName: "Circular Saw",
//     description: "A heavy-duty circular saw with a laser guide.",
//     toolCategory: "Power Tools",
//     toolBrand: "CutMaster",
//     modelNumber: "CM-CS-2024",
//     pricePerday: 5.99,
//     availability: true,
//     rating: 4.7,
//     numberOfReviews: 180,
//     specifications: {
//       dimensions: "15 x 10 x 8 inches",
//       weight: "7 lbs",
//       material: "Metal and Plastic",
//       powerSource: "Corded Electric",
//     },
//     imageUrls: [
//       "https://media.istockphoto.com/id/470862472/photo/circular-saw.jpg?s=2048x2048&w=is&k=20&c=4H6rUZH8WZ5bvWBGv7N-oyH5jwfq0BIPLj_8jY5D-2s=",
//     ],
//     features: [
//       "Laser guide for precision cutting",
//       "Powerful 15-amp motor",
//       "Ergonomic handle",
//       "Dust blower",
//     ],
//     warrantyInformation: "3-year limited warranty",
//     sellerInformation: {
//       sellerName: "CuttingEdge Tools",
//       contactInfo: "support@cuttingedge.com",
//     },
//     shippingInformation: {
//       shippingCost: 9.99,
//       estimatedDelivery: "2-4 business days",
//     },
//     returnDate: "11/15/2024",
//     rentalTotalDays: 5,
//     usageInstructions: "Refer to the manual for usage instructions.",
//     safetyInformation:
//       "Always wear safety goggles and gloves when using the saw.",
//     discountsOffers: "20% off on your first purchase",
//   },
//   {
//     toolId: "98765",
//     toolName: "Hammer Drill",
//     description: "A versatile hammer drill with multiple speed settings.",
//     toolCategory: "Power Tools",
//     toolBrand: "DrillPro",
//     modelNumber: "DP-HD-2024",
//     pricePerday: 1,
//     availability: false,
//     rating: 4.6,
//     numberOfReviews: 120,
//     specifications: {
//       dimensions: "14 x 9 x 7 inches",
//       weight: "5.5 lbs",
//       material: "Metal and Plastic",
//       powerSource: "Corded Electric",
//     },
//     imageUrls: [
//       "https://media.istockphoto.com/id/186870823/photo/powertools-hammer-drill.jpg?s=2048x2048&w=is&k=20&c=RKLGzcX4uaFviNBy7-h-JIN3GBMk-wEwUqTR27vKxns=",
//     ],
//     features: [
//       "Multiple speed settings",
//       "Impact mechanism",
//       "Ergonomic handle",
//       "LED light",
//     ],
//     warrantyInformation: "2-year limited warranty",
//     sellerInformation: {
//       sellerName: "ProTools Ltd.",
//       contactInfo: "info@protools.com",
//     },
//     shippingInformation: {
//       shippingCost: 6.99,
//       estimatedDelivery: "3-5 business days",
//     },
//     returnDate: "",
//     rentalTotalDays: 0,
//     usageInstructions: "Refer to the manual for usage instructions.",
//     safetyInformation:
//       "Always wear safety goggles when using the hammer drill.",
//     discountsOffers: "15% off on your first purchase",
//   },
//   {
//     toolId: "13579",
//     toolName: "Jigsaw",
//     description: "A compact jigsaw for precision cutting.",
//     toolCategory: "Power Tools",
//     toolBrand: "CutMaster",
//     modelNumber: "CM-JS-2024",
//     pricePerday: 49.99,
//     availability: false,
//     rating: 4.2,
//     numberOfReviews: 90,
//     specifications: {
//       dimensions: "11 x 8 x 5 inches",
//       weight: "3 lbs",
//       material: "Metal and Plastic",
//       powerSource: "Corded Electric",
//     },
//     imageUrls: [
//       "https://media.istockphoto.com/id/1372970821/photo/female-carpenter-sawing-wood-with-an-electric-jigsaw-woman-in-apron-doing-some-carpentry-work.jpg?s=2048x2048&w=is&k=20&c=YF8k7pm-Fs-CbrFKaKZAtSn4n28kMQYZunZ5B_vK1oM=",
//     ],
//     features: [
//       "Precision cutting",
//       "Variable speed control",
//       "Ergonomic design",
//       "Dust blower",
//     ],
//     warrantyInformation: "1-year limited warranty",
//     sellerInformation: {
//       sellerName: "ToolExperts",
//       contactInfo: "support@toolexperts.com",
//     },
//     shippingInformation: {
//       shippingCost: 4.99,
//       estimatedDelivery: "3-5 business days",
//     },
//     returnDate: "",
//     rentalTotalDays: 5,
//     usageInstructions: "Refer to the manual for usage instructions.",
//     safetyInformation: "Always wear safety goggles when using the jigsaw.",
//     discountsOffers: "10% off on your first purchase",
//   },
//   {
//     toolId: "24680",
//     toolName: "Angle Grinder",
//     description: "A powerful angle grinder for heavy-duty grinding.",
//     toolCategory: "Power Tools",
//     toolBrand: "GrindMaster",
//     modelNumber: "GM-AG-2024",
//     pricePerday: 0.99,
//     availability: true,
//     rating: 4.4,
//     numberOfReviews: 110,
//     specifications: {
//       dimensions: "16 x 7 x 5 inches",
//       weight: "6 lbs",
//       material: "Metal and Plastic",
//       powerSource: "Corded Electric",
//     },
//     imageUrls: [
//       "https://media.istockphoto.com/id/1037604530/photo/heavy-industry-worker-cutting-steel-with-an-angle-grinder.jpg?s=2048x2048&w=is&k=20&c=iz5CbtSIeR8GfaLcJeegPjMm33JMMO4wTeb8g4RUfRI=",
//     ],
//     features: [
//       "High power motor",
//       "Adjustable guard",
//       "Ergonomic handle",
//       "Variable speed control",
//     ],
//     warrantyInformation: "2-year limited warranty",
//     sellerInformation: {
//       sellerName: "GrinderPro",
//       contactInfo: "info@grinderpro.com",
//     },
//     shippingInformation: {
//       shippingCost: 8.99,
//       estimatedDelivery: "3-5 business days",
//     },
//     returnDate: "12/15/2024",
//     rentalTotalDays: 30,
//     usageInstructions: "Refer to the manual for usage instructions.",
//     safetyInformation:
//       "Always wear safety goggles and gloves when using the grinder.",
//     discountsOffers: "20% off on your first purchase",
//   },
