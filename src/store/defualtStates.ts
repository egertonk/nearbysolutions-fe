export const paymentStatusStates = {
  showPaymentInputs: true,
  showCreditCard: false,
  showPaypal: false,
  showPaymentSelection: true,
  showPaymentInfo: false,
  showPayment: true,
  showSelectPayment: true,
};

export const orderStates = {
  orderID: 0,
  customerInfo: {
    customerID: 0, // we can generated it later and it should never be null
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    email: "",
  },
  solutionDateContract: {
    solutionDate: "",
    longTermContract: "",
    longTermstartDate: "",
    longTermEndDate: "",
    solutionFormattedDate: "",
    solutionStartTime: "",
  },
  solutionTask: "",
  solutionJob: "",
  selectedTalent: "",
  talentID: 0, // it should never be null
  talentFirstName: "",
  talentLastName: "",
  solutionPrice: 0,
  fixPriceStatus: false,
  solutionPriceDiscountPercentage: 0,
  orderDate: "",
  orderStatus: false,
  giftStatus: false,
  giftFor_fullName: "",
};

export const SolutionistWorkSettingsStates = {
  id: 0,
  businessStartTime: "", // Format: "HH:MM:SS"
  businessEndTime: "", // Format: "HH:MM:SS"
  oneBlockedStatus: false,
  jobASAPStatus: false,
  bandStatus: false,
  availableDays: "", // JSON string representing an array of days
  vacationStatus: false,
  vacationStartDate: "", // Format: "YYYY-MM-DD"
  vacationEndDate: "", // Format: "YYYY-MM-DD"
  twentyFourHoursStatus: false,
  twelveHoursStatus: false,
};
