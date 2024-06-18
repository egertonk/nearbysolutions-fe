import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CustomerFormData,
  CustomerOrder,
} from "../web/lib/types/OrderSolutionTypes";
import { customerOrderStatess, orderStates } from "./defualtStates";

interface CustomerContractorState {
  customerOrder: CustomerFormData;
  isEditOrder: boolean;
  order: CustomerOrder;
  isError: boolean;
}

const initialState: CustomerContractorState = {
  customerOrder: customerOrderStatess,
  isEditOrder: false,
  isError: false,
  order: orderStates,
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
