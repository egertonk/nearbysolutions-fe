import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customerDetails } from "./defualtStates";
import { UserTypes } from "../web/lib/types/solutionistTypes";

export interface CustomerDetailsState {
  customerDetails: UserTypes;
}

const initialState: CustomerDetailsState = {
  customerDetails: customerDetails,
};

const customerDetailsSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {
    setCustomerDetails(state, action: PayloadAction<UserTypes>) {
      state.customerDetails = action.payload;
    },
  },
});

export const { setCustomerDetails } = customerDetailsSlice.actions;
export default customerDetailsSlice.reducer;
