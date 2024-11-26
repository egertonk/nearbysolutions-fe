import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postAJobFormDetails } from "./defualtStates";

export type PostAJobFormTypes = {
  id: string;
  jobName: string;
  jobTask: string;
  jobPrice: string;
  jobZip: string;
  jobCityLocation: string;
  date: string;
  time: string;
  email: string;
  jobCountry: string;
  jobState: string;
  urgencyLevel: string;
  phoneNumber: string;
  customerName: string;
  jobAddress: string;
};

export const urgencyLevels = [
  { value: "", label: "Select Level" },
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" },
];

export interface PostAJobFormDetailsState {
  postAJobFormDetails: PostAJobFormTypes;
}

const initialState: PostAJobFormDetailsState = {
  postAJobFormDetails: postAJobFormDetails,
};

const postAJobSlice = createSlice({
  name: "postAJobDetails",
  initialState,
  reducers: {
    setPostAJobDetails(state, action: PayloadAction<PostAJobFormTypes>) {
      state.postAJobFormDetails = action.payload;
    },
  },
});

export const { setPostAJobDetails } = postAJobSlice.actions;
export default postAJobSlice.reducer;
