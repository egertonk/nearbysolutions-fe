import React from "react";
import { grayButtonCSS, purpleButtonCSS } from "../../assets/common-css/css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { JobAlertMessage } from "./JobAlertMessage";
import { JobDetails } from "./JobDetails";
import { PaymentJobDetails } from "../Payment-Process/PaymentJobDetails";
import { PaymentCardDetails } from "../Payment-Process/PaymentCardDetails";
import { PaymentCustomerDetails } from "../Payment-Process/PaymentCustomerDetails";
import { MainTitle } from "../common-sections/MainTitle";
import { JobDetailTypes } from "../../lib/types/FindWorkPostAJobtypesData";

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
  ); // Use `customerOrder` directly to send data to the server

  return (
    <>
      <div>
        <MainTitle title={"Submit Job"} />

        <div className="container mx-auto mb-4">
          <div className="flex flex-col md:flex-row md:-mx-3 mb-4">
            <div
              key="job-review"
              className="hover:bg-purple-50 bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto flex-col"
            >
              <JobAlertMessage jobDate={formData.jobDate} />
              <JobDetails
                isJob={false}
                jobDetails={formData}
                jobImage={jobImage}
              />
            </div>
            <PaymentJobDetails />
          </div>
          <div className="flex flex-col md:flex-row md:-mx-3">
            <PaymentCardDetails /> <PaymentCustomerDetails />
          </div>
        </div>

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
          Submit Job Post
        </button>
      </div>
    </>
  );
};
