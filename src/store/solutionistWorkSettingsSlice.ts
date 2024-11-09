import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SolutionistWorkSettingsStates } from "./defualtStates";

export interface SolutionistWorkSetting {
  id: number;
  businessStartTime: string; // Format: "HH:MM:SS"
  businessEndTime: string; // Format: "HH:MM:SS"
  oneBlockedStatus: boolean;
  jobASAPStatus: boolean;
  bandStatus: boolean;
  availableDays: string; // JSON string representing an array of days
  vacationStatus: boolean;
  vacationStartDate: string; // Format: "YYYY-MM-DD"
  vacationEndDate: string; // Format: "YYYY-MM-DD"
  twentyFourHoursStatus: boolean;
  twelveHoursStatus: boolean;
}

export const initialState: SolutionistWorkSetting =
  SolutionistWorkSettingsStates;

const solutionistWorkSettingsSlice = createSlice({
  name: "solutionistWorkSettingsSlice",
  initialState,
  reducers: {
    setId(state, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    setBusinessStartTime(state, action: PayloadAction<string>) {
      state.businessStartTime = action.payload;
    },
    setBusinessEndTime(state, action: PayloadAction<string>) {
      state.businessEndTime = action.payload;
    },
    setOneBlockedStatus(state, action: PayloadAction<boolean>) {
      state.oneBlockedStatus = action.payload;
    },
    setJobASAPStatus(state, action: PayloadAction<boolean>) {
      state.jobASAPStatus = action.payload;
    },
    setBandStatus(state, action: PayloadAction<boolean>) {
      state.bandStatus = action.payload;
    },
    setAvailableDays(state, action: PayloadAction<string>) {
      state.availableDays = action.payload;
    },
    setVacationStatus(state, action: PayloadAction<boolean>) {
      state.vacationStatus = action.payload;
    },
    setVacationStartDate(state, action: PayloadAction<string>) {
      state.vacationStartDate = action.payload;
    },
    setVacationEndDate(state, action: PayloadAction<string>) {
      state.vacationEndDate = action.payload;
    },
    setTwentyFourHoursStatus(state, action: PayloadAction<boolean>) {
      state.twentyFourHoursStatus = action.payload;
    },
    setTwelveHoursStatus(state, action: PayloadAction<boolean>) {
      state.twelveHoursStatus = action.payload;
    },
    setAllSolutionistWorkSettings(
      state,
      action: PayloadAction<SolutionistWorkSetting>
    ) {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setId,
  setBusinessStartTime,
  setBusinessEndTime,
  setOneBlockedStatus,
  setJobASAPStatus,
  setBandStatus,
  setAvailableDays,
  setVacationStatus,
  setVacationStartDate,
  setVacationEndDate,
  setTwentyFourHoursStatus,
  setTwelveHoursStatus,
  setAllSolutionistWorkSettings,
} = solutionistWorkSettingsSlice.actions;
export default solutionistWorkSettingsSlice.reducer;
