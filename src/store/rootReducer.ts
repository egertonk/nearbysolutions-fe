import { combineReducers } from "@reduxjs/toolkit";
import customerContractorSlice from "./customerContractorSlice";

const rootReducer = combineReducers({
  formData: customerContractorSlice,
});

export default rootReducer;
