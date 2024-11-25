import { combineReducers } from "@reduxjs/toolkit";
import customerContractorSlice from "./customerContractorSlice";
import paymentSlice from "./paymentSlice";
import applicationModeSlice from "./applicationModeSlice";
import solutionistWorkSettingsSlice from "./solutionistWorkSettingsSlice";
import customerDetailsSlice from "./customerDetailsSlice";
import postAJobSlice from "./postAJobSlice";

const rootReducer = combineReducers({
  customerDetailsState: customerDetailsSlice,
  solutionistWorkSettingsState: solutionistWorkSettingsSlice,
  postAJobFormDetailsState: postAJobSlice,
  formData: customerContractorSlice,
  paymentCheckoutState: paymentSlice,
  applicationModeState: applicationModeSlice,
});

export default rootReducer;
