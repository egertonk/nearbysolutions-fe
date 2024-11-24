import React, { useEffect, useState } from "react";
import { grayButtonCSS, purpleButtonCSS } from "../../assets/common-css/css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { JobAlertMessage } from "./JobAlertMessage";
import { JobDetails, JobDetailTypes } from "./JobDetails";
import { HiddenJobDetails } from "./HiddenJobDetails";

type Props = {
  openReview: boolean;
  setOpenReview: React.Dispatch<React.SetStateAction<boolean>>;
  formData: JobDetailTypes;
  jobImage: File | undefined;
};

export const ReviewPopup: React.FC<Props> = ({
  openReview,
  setOpenReview,
  formData,
  jobImage,
}) => {
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );
  console.log("formData.jobImage = ", jobImage);

  // duplicate
  const address = "10308 Gazelle Ct, Fredericksburg, VA 22408";
  const [imageUrl, setImageUrl] = useState("");

  const googleMapURL = "https://maps.googleapis.com/maps/api/staticmap";
  const apiKey = "AIzaSyCkpoGe0dJZVeOo6Rq0k22WS6gPOHsDuuA";
  const signature = "YQLhWfyFuKgCykLi7ynJv2gAjTE=";

  const fetchMap = () => {
    const baseUrl = `${googleMapURL}?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7C${address},CA&key=${apiKey}`;
    setImageUrl(baseUrl);
  };

  useEffect(() => {
    fetchMap();
  }, [customerOrder]);

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

        <HiddenJobDetails
          formData={formData}
          imageUrl={imageUrl}
          customerOrder={customerOrder}
        />

        <button
          className={`cursor-pointer m-2 w-48 ${purpleButtonCSS}`}
          onClick={() => setOpenReview(false)}
        >
          Go Back
        </button>
        <button
          className={`cursor-pointer m-2 w-48 ${grayButtonCSS}`}
          onClick={() => setOpenReview(false)}
        >
          Setup Payment
        </button>
      </div>
    </>
  );
};
