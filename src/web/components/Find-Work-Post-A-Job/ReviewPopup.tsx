import React from "react";
import { grayButtonCSS, purpleButtonCSS } from "../../assets/common-css/css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { JobAlertMessage } from "./JobAlertMessage";
import { JobDetails, JobDetailTypes } from "./JobDetails";
import { HiddenJobDetails } from "./HiddenJobDetails";

type Props = {
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  formData: JobDetailTypes;
  jobImage: File | undefined;
  handleSubmit: (e: React.FormEvent) => void;
};

export const ReviewPopup: React.FC<Props> = ({
  setOpenReview,
  formData,
  jobImage,
  handleSubmit,
}) => {
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  return (
    <>
      <div>
        <div
          key="job-review"
          className="hover:bg-purple-50 bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto flex-col"
        >
          <JobAlertMessage jobDate={formData.date} />
          <JobDetails isJob={false} jobDetails={formData} jobImage={jobImage} />
        </div>

        <HiddenJobDetails formData={formData} customerOrder={customerOrder} />

        <button
          className={`cursor-pointer m-2 w-48 ${purpleButtonCSS}`}
          onClick={() => setOpenReview(false)}
        >
          Go Back
        </button>
        <button
          className={`cursor-pointer m-2 w-48 ${grayButtonCSS}`}
          onClick={(e) => handleSubmit(e)}
        >
          Setup Payment
        </button>
      </div>
    </>
  );
};
