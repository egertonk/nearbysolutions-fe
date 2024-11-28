import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { useState } from "react";
import { ImagePopup } from "../common-sections/ImagePopup";
import { JobAlertMessage } from "./JobAlertMessage";
import { JobDetails } from "./JobDetails";

type Props = {
  customerJobsArray: JobPosting[];
};

export const daysUntil = (targetDate: string) => {
  const today = new Date(); // Get today's date
  const target = new Date(targetDate); // Parse the target date

  // Calculate the difference in time (milliseconds)
  const diffTime = target.getTime() - today.getTime();

  // Convert milliseconds to days
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const JobListings: React.FC<Props> = ({ customerJobsArray }) => {
  const [openImage, setOpenImage] = useState(false);
  const [jobDetails, setJobDetails] = useState<JobPosting>();

  return (
    <>
      {openImage && (
        <ImagePopup
          openImage={openImage}
          setOpenImage={setOpenImage}
          jobDetails={jobDetails}
        />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 ">
        {customerJobsArray.map(
          (jobData, index) =>
            jobData.jobAcceptedByCustomer &&
            jobData.jobStatus && (
              <div
                key={`job-${index}`}
                className="hover:bg-purple-50 bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto flex-col"
              >
                <JobAlertMessage jobDate={jobData.date} />
                <JobDetails
                  isJob
                  jobDetails={jobData}
                  setOpenImage={setOpenImage}
                  setJobDetails={setJobDetails}
                />
              </div>
            )
        )}
      </div>
    </>
  );
};
