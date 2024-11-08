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
  },
  solutionTask: "",
  solutionJob: "",
  solutionStartTime: "",
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
