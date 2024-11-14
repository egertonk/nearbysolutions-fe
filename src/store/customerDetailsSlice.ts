import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customerDetails } from "./defualtStates";

export interface CustomerDetailsTypes {
    customerId: number; // NOT NULL, primary key
    firstName?: string; // Up to 50 characters
    lastName?: string; // Up to 50 characters
    dateOfBirth?: Date; // Date type
    gender?: string; // 1 character (e.g., "M" or "F")
    country?: string; // Up to 50 characters
    address?: string; // Up to 100 characters
    city?: string; // Up to 50 characters
    state?: string; // Up to 50 characters
    zip?: string; // Up to 20 characters
    phoneNumber?: string; // Up to 15 characters
    email?: string; // Up to 100 characters
    accountCreationDate?: Date; // Defaults to CURRENT_TIMESTAMP
    lastUpdatedDate?: Date; // Defaults to CURRENT_TIMESTAMP
    customerType?: string; // Defaults to 'Regular', max 20 characters
    preferredContactMethod?: string; // Up to 10 characters (e.g., "Email" or "Phone")
    status?: boolean; // Defaults to true
    notes?: string; // Text field for additional notes
  }

export interface CustomerDetailsState {
  customerDetails: CustomerDetailsTypes;
}

const initialState: CustomerDetailsState = {
  customerDetails: customerDetails,
};

const customerDetailsSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {
    setCustomerDetails(state, action: PayloadAction<CustomerDetailsTypes>) {
      state.customerDetails = action.payload;
    },
  },
});

export const { setCustomerDetails } = customerDetailsSlice.actions;
export default customerDetailsSlice.reducer;
