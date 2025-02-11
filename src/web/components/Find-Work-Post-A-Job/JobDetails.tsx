import React from "react";
import { grayButtonCSS } from "../../assets/common-css/css";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import customerJobReuests from "../../assets/images/customer-job-requests.jpeg";
import { PostAJobFormTypes } from "../../../store/postAJobSlice";
import { useNavigate } from "react-router";
import { isUSCanadaAddress } from "../common-sections/Address";

type Props = {
  isJob: boolean;
  jobDetails: PostAJobFormTypes | JobPosting;
  jobImage?: File;
  setOpenImage?: (value: React.SetStateAction<boolean>) => void;
  setImageDetails?: (
    value: React.SetStateAction<JobPosting | undefined>
  ) => void;
};

export const JobDetails: React.FC<Props> = ({
  jobDetails,
  isJob,
  jobImage,
  setOpenImage,
  setImageDetails,
}) => {
  const navigate = useNavigate();

  return (
    <>
      {!isJob && (
        <>
          <p className="items-center justify-center grid text-red-500">
            Visible to Solutionists!
          </p>
        </>
      )}
      <div className="flex items-center justify-between m-4">
        <span className="text-3xl font-bold text-gray-900 dark:text-white">
          ${jobDetails.jobPrice}
        </span>
        <button
          type="button"
          className={`cursor-pointer ${grayButtonCSS}`}
          disabled={!isJob}
          onClick={() =>
            navigate(`/job-accepted?acceptJob=${jobDetails.id}&solutionist=1`)
          }
        >
          Accept Job
        </button>
      </div>

      <div className="flex items-center gap-2 px-6">
        <h3 className="text-2xl text-[#333] font-extrabold flex-1 mb-4 grid center-text">
          {jobDetails.jobName}
        </h3>
      </div>

      <div className="px-3 pb-5">
        <div className="items-center justify-center grid mb-4">
          {isJob && setOpenImage && setImageDetails ? (
            <a
              href={`${customerJobReuests}`}
              onClick={(e) => {
                e.preventDefault(); // Prevent the default behavior of navigating to the link
                setOpenImage(true);
                setImageDetails(jobDetails as JobPosting);
              }}
              rel="noreferrer"
            >
              <img
                src={`${
                  (jobDetails as JobPosting)?.images?.length > 0
                    ? (jobDetails as JobPosting)?.images[0] //Do Slider for multiple images
                    : customerJobReuests
                }`}
                className="h-48 max-w-full items-center rounded-full inline-flex"
                alt="job"
              />
            </a>
          ) : (
            <img
              src={`${
                jobImage ? URL?.createObjectURL(jobImage) : customerJobReuests
              }`}
              className="h-48 max-w-full items-center rounded-full inline-flex"
              alt="job"
            />
          )}
        </div>

        <p className="items-center justify-center grid">
          Work Date: {jobDetails.jobDate}
        </p>
        <p className="items-center justify-center grid">
          Time: {jobDetails.time}
        </p>
        <p className="items-center justify-center grid mb-4">
          Location: {jobDetails.jobCityLocation},{" "}
          {isUSCanadaAddress(jobDetails.jobCountry) && (
            <>Zip: {jobDetails.jobZip}</>
          )}{" "}
          {jobDetails.jobCountry}
        </p>
      </div>
    </>
  );
};
