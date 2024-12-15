import { useState } from "react";

export const hasDatePassed = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Remove time from today's date for an accurate comparison
  today.setHours(0, 0, 0, 0);

  return inputDate > today;
};

export const useImagePopup = () => {
  const [openImage, setOpenImage] = useState(false);
  const [imageDetails, setImageDetails] = useState<{
    name: string | "";
    image: string | "";
  }>();

  return {
    openImage,
    setOpenImage,
    imageDetails,
    setImageDetails,
  };
};
