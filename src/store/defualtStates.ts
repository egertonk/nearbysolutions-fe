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
  giftInformationFor: {
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
};

export const SolutionistWorkSettingsStates = {
  id: 0,
  businessStartTime: "", // Format: "HH:MM:SS"
  businessEndTime: "", // Format: "HH:MM:SS"
  oneBlockedStatus: false,
  jobASAPStatus: false,
  onlineStatus: false,
  availableDays: "", // JSON string representing an array of days
  vacationStatus: false,
  vacationStartDate: "", // Format: "YYYY-MM-DD"
  vacationEndDate: "", // Format: "YYYY-MM-DD"
  twentyFourHoursStatus: false,
  twelveHoursStatus: false,
};

export const customerDetails = {
  customerId: 0, // NOT NULL, primary key
  firstName: "", // Up to 50 characters
  lastName: "", // Up to 50 characters
  dateOfBirth: new Date(), // Date type
  gender: "", // 1 character (e.g., "M" or "F")
  country: "", // Up to 50 characters
  address: "", // Up to 100 characters
  city: "", // Up to 50 characters
  state: "", // Up to 50 characters
  zip: "", // Up to 20 characters
  phoneNumber: "", // Up to 15 characters
  email: "", // Up to 100 characters
  accountCreationDate: new Date(), // Defaults to CURRENT_TIMESTAMP
  lastUpdatedDate: new Date(), // Defaults to CURRENT_TIMESTAMP
  customerType: "Regular", // Defaults to 'Regular', max 20 characters
  preferredContactMethod: "", // Up to 10 characters (e.g., "Email" or "Phone")
  status: true, // Defaults to true
  notes: "", // Text field for additional notes
};

export const postAJobFormDetails = {
  jobName: "",
  jobTask: "",
  jobPrice: "",
  jobZip: "",
  jobCityLocation: "",
  date: "",
  time: "",
  email: "",
  jobCountry: "",
  jobState: "",
  urgencyLevel: "",
  phoneNumber: "",
  customerName: "",
  jobAddress: "",
};
