import { combineReducers } from "@reduxjs/toolkit";
import customerContractorSlice from "./customerContractorSlice";
import paymentSlice from "./paymentSlice";
import applicationModeSlice from "./applicationModeSlice";
import solutionistWorkSettingsSlice from "./solutionistWorkSettingsSlice";

const rootReducer = combineReducers({
  solutionistWorkSettingsState: solutionistWorkSettingsSlice,
  formData: customerContractorSlice,
  paymentCheckoutState: paymentSlice,
  applicationModeState: applicationModeSlice,
});

export default rootReducer;
