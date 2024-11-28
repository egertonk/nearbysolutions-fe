import { useState } from "react";

export const useBooleans = () => {
  const [isAccept, setIsAccept] = useState(false);
  const [isShowTermsAndConditions, setIsShowTermsAndConditions] =
    useState(false);

  return {
    isAccept,
    setIsAccept,
    isShowTermsAndConditions,
    setIsShowTermsAndConditions,
  };
};
