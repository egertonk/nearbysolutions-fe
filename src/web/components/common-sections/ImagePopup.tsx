import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import jobSearchListImage from "../../assets/company-logos-icons/job-search-list.png";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { grayButtonCSS } from "../../assets/common-css/css";

type Props = {
  openImage: boolean;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  jobDetails: JobPosting | undefined;
};

export const ImagePopup: React.FC<Props> = ({
  openImage,
  setOpenImage,
  jobDetails,
}) => {
  return (
    <>
      {jobDetails && (
        <Dialog
          open={openImage}
          onClose={() => setOpenImage(false)}
          className="relative z-50"
          key={Math.random()}
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-45"
            aria-hidden="true"
          />

          {/* Dialog Panel */}
          <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full items-center max-w-md rounded bg-white p-6">
              <DialogTitle className="text-lg font-medium w-full">
                <h3 className="text-2xl text-[#333] font-extrabold flex-1 mb-4">
                  {jobDetails?.jobName}
                </h3>
              </DialogTitle>
              <Description className="mt-2 text-sm text-gray-500">
                <img
                  src={`${
                    jobDetails?.image?.length > 0
                      ? jobDetails.image
                      : jobSearchListImage
                  }`}
                  className="h-auto w-full items-center rounded-full"
                  alt="job"
                />
                <button
                  className={grayButtonCSS}
                  onClick={() => setOpenImage(false)}
                >
                  Close
                </button>
              </Description>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </>
  );
};
