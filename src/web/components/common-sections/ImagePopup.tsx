import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";
import {
  imageDetailsTypes,
  JobPosting,
} from "../../lib/types/FindWorkPostAJobtypesData";
import { grayButtonCSS } from "../../assets/common-css/css";

type Props = {
  openImage: boolean;
  setOpenImage: React.Dispatch<React.SetStateAction<boolean>>;
  imageDetails?: JobPosting | imageDetailsTypes;
  featureName: string;
};

export const ImagePopup: React.FC<Props> = ({
  openImage,
  setOpenImage,
  imageDetails,
  featureName,
}) => {
  if (!imageDetails) return null; // Prevents rendering if no details are provided

  const imageArray = (imageDetails as imageDetailsTypes)?.image || [];
  const title =
    (imageDetails as JobPosting)?.jobName ||
    (imageDetails as imageDetailsTypes)?.name ||
    "Image Viewer";

  return (
    <Dialog
      open={openImage}
      onClose={() => setOpenImage(false)}
      className="relative z-50"
    >
      {/* Background Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-45"
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <DialogPanel className="fixed inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
          {/* Title */}
          <DialogTitle className="text-2xl text-[#333] font-extrabold mb-4">
            {title}
          </DialogTitle>

          {/* Image Display */}
          {imageArray.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              className="rounded-lg"
            >
              {imageArray.map((image, index) => (
                <SwiperSlide key={`${featureName}-${index}`} className="p-4">
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
              className="h-auto w-full items-center rounded-lg"
              src={jobSearchListImage}
              alt={`${featureName} image`}
            />
          )}

          {/* Close Button */}
          <div className="mt-4 flex justify-center">
            <button
              className={`cursor-pointer ${grayButtonCSS}`}
              onClick={() => setOpenImage(false)}
            >
              Close
            </button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
