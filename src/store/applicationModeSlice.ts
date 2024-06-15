import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ApplicationrState {
  isGiftASolution: boolean;
}


export const initialState: ApplicationrState = {
  isGiftASolution: false,
};

const applicationModeSlice = createSlice({
  name: "applicationModeSlice",
  initialState,
  reducers: {
    setApplicationMode(state, action: PayloadAction<boolean>) {
      state.isGiftASolution = action.payload;
    },
  },
});

export const { setApplicationMode } = applicationModeSlice.actions;
export default applicationModeSlice.reducer;
