import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";
import {
  imageDetailsTypes,
  JobPosting,
} from "../../lib/types/FindWorkPostAJobtypesData";
import { grayButtonCSS } from "../../assets/common-css/css";

type Props = {
  openImage: boolean;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  imageDetails: JobPosting | imageDetailsTypes | undefined;
  featureName: string;
};

export const ImagePopup: React.FC<Props> = ({
  openImage,
  setOpenImage,
  imageDetails,
  featureName,
}) => {
  const imageArray: string[] = (imageDetails as imageDetailsTypes)?.image;

  return (
    <>
      {imageDetails && (
        <Dialog
          open={openImage}
          onClose={() => setOpenImage(false)}
          className="relative z-50"
          key={Math.random()}
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-45"
            aria-hidden="true"
          />

          <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
            <div className="w-full items-center max-w-md rounded bg-white p-6">
              <DialogTitle className="text-lg font-medium w-full">
                <h3 className="text-2xl text-[#333] font-extrabold flex-1 mb-4">
                  {(imageDetails as JobPosting)?.jobName
                    ? (imageDetails as JobPosting)?.jobName
                    : (imageDetails as imageDetailsTypes).name}
                </h3>
              </DialogTitle>
              <Description className="mt-2 text-sm text-gray-500">
                {imageArray.length > 0 ? (
                  <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={20}
                    slidesPerView={1} // Only one image per view
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    className="rounded-lg"
                  >
                    {imageArray.map((image, index) => (
                      <SwiperSlide
                        key={`${featureName}--${index}`}
                        className="p-4"
                      >
                        <img
                          className="w-full h-60 object-cover rounded-lg"
                          src={image}
                          alt={`${featureName}-${index}`}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                ) : (
                  <img
                    className="h-auto w-full items-center rounded-full"
                    src={jobSearchListImage}
                    alt={featureName + ` image`}
                  />
                )}

                <div className="button-container">
                  <button
                    className={`cursor-pointer ${grayButtonCSS}`}
                    onClick={() => setOpenImage(false)}
                  >
                    Close
                  </button>
                </div>
              </Description>
            </div>
          </DialogPanel>
        </Dialog>
      )}
    </>
  );
};
