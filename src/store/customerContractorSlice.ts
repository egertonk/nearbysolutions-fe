import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerFormData } from "../web/lib/types/OrderSolutionTypes";
import { orderStates } from "./defualtStates";

export interface CustomerContractorState {
  customerOrder: CustomerFormData;
  isEditOrder: boolean;
  isError: boolean;
}

const initialState: CustomerContractorState = {
  customerOrder: orderStates,
  isEditOrder: false,
  isError: false,
};

const customerContractorSlice = createSlice({
  name: "customerOrder",
  initialState,
  reducers: {
    setCustomerOrder(state, action: PayloadAction<CustomerFormData>) {
      state.customerOrder = action.payload;
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

export const { setCustomerOrder, setIsEditOrder, setIsError, setShowPayReady } =
  customerContractorSlice.actions;
export default customerContractorSlice.reducer;
