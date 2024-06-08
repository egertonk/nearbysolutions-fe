import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerFormData, CustomerOrder } from "../web/lib/types/orderTypes";

interface CustomerContractorState {
  customerOrder: CustomerFormData;
  isEditOrder: boolean;
  order: CustomerOrder;
  isError: boolean;
}

const initialState: CustomerContractorState = {
  customerOrder: {
    orderID: 0,
    customerID: 0,
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    solutionFormattedDate: "",
    solutionDate: "",
    solutionTask: "",
    solutionJob: "",
    solutionStartTime: "",
    selectedTalent: "",
    talentID: 0,
    talentFirstName: "",
    talentLastName: "",
    solutionPrice: 0,
    solutionPricePerHourStatus: false,
    solutionPriceDiscountPercentage: 0,
    orderDate: "",
    orderStatus: false,
  },
  isEditOrder: false,
  isError: false,
  order: {
    orderID: 0,
    customerID: 0,
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "",
    solutionFormattedDate: "",
    solutionDate: "",
    solutionTask: "",
    solutionJob: "",
    solutionStartTime: "",
    selectedTalent: "",
    talentID: 0,
    talentFirstName: "",
    talentLastName: "",
    solutionPrice: 0,
    solutionPricePerHourStatus: false,
    solutionPriceDiscountPercentage: 0,
    orderDate: "",
    orderStatus: false,
  },
};

const customerContractorSlice = createSlice({
  name: "customerOrder",
  initialState,
  reducers: {
    setCustomerOrder(state, action: PayloadAction<CustomerFormData>) {
      state.customerOrder = action.payload;
    },
    setOrder(state, action: PayloadAction<CustomerOrder>) {
      state.order = action.payload;
    },
    setIsEditOrder(state, action: PayloadAction<boolean>) {
      state.isEditOrder = action.payload;
    },
    setIsError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setShowPayReady(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
  },
});

export const {
  setCustomerOrder,
  setOrder,
  setIsEditOrder,
  setIsError,
  setShowPayReady,
} = customerContractorSlice.actions;
export default customerContractorSlice.reducer;
