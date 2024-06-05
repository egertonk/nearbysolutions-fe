export const talentInformationPlaceHolder = [
  {
    talentID: 0,
    imageSource: "",
    fullName: "",
    firstName: "",
    lastName: "",
    jobTitlesPrice: [
      {
        isFixPrice: true, // only one can be have an amout - fixPrice: 10000, ratePerHour: 0
        selectedStatus: false, // required - only on can be true and rest false
        title: "",
        price: { fixPrice: 0, ratePerHour: 0, discount: 0 },
      },
      {
        isFixPrice: false,
        selectedStatus: true,
        title: "",
        price: { fixPrice: 0, ratePerHour: 0, discount: 0 },
      },
    ],
    talentIntroduction: "",
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
];
