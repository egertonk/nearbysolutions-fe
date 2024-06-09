import { combineReducers } from "@reduxjs/toolkit";
import customerContractorSlice from "./customerContractorSlice";
import paymentSlice from "./paymentSlice";

const rootReducer = combineReducers({
  formData: customerContractorSlice,
  paymentCheckoutState: paymentSlice,
});

export default rootReducer;
