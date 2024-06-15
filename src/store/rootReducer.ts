import { combineReducers } from "@reduxjs/toolkit";
import customerContractorSlice from "./customerContractorSlice";
import paymentSlice from "./paymentSlice";
import applicationModeSlice from "./applicationModeSlice";

const rootReducer = combineReducers({
  formData: customerContractorSlice,
  paymentCheckoutState: paymentSlice,
  applicationModeState: applicationModeSlice,
});

export default rootReducer;
