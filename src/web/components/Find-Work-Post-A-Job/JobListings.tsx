import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import jobSearchListImage from "../../assets/company-logos-icons/job-search-list.png";
import { useState } from "react";
import { ImagePopup } from "../common-sections/ImagePopup";
import { grayButtonCSS } from "../../assets/common-css/css";

type Props = {
  customerJobsArray: JobPosting[];
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
        {customerJobsArray.map((jobData, index) => (
          <div
            key={`job-${index}`}
            className="hover:bg-purple-50 bg-white shadow-[0_2px_15px_-6px_rgba(0,0,0,0.2)] w-full py-6 max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 flex-col"
          >
            <div className="flex items-center gap-2 px-6">
              <h3 className="text-2xl text-[#333] font-extrabold flex-1 mb-4">
                {jobData.jobName}
              </h3>
            </div>
            <div className="px-3 pb-5">
              <div className="mb-4 items-center">
                <a
                  href={`${jobSearchListImage}`}
                  onClick={(e) => {
                    e.preventDefault(); // Prevent the default behavior of navigating to the link
                    setOpenImage(true);
                    setJobDetails(jobData);
                  }}
                  rel="noreferrer"
                >
                  <img
                    src={`${
                      jobData?.image?.length > 0
                        ? jobData.image
                        : jobSearchListImage
                    }`}
                    className="h-48 max-w-full items-center rounded-full inline-flex"
                    alt="job"
                  />
                </a>
              </div>

              <p>Date: {jobData.date}</p>
              <p>Time: {jobData.time}</p>
              <p className="mb-4">
                Location: {jobData.jobCityLocation}, Zip: {jobData.jobZip}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${jobData.jobPrice}
                </span>
                <button type="button" className={grayButtonCSS}>
                  Accept Job
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
