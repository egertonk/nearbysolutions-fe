import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  PostAJobFormTypes,
  setPostAJobDetails,
} from "../../../store/postAJobSlice";

export const isAllPostAJobOrderEmpty = (
  postAJobOrder: PostAJobFormTypes
): boolean => {
  return postAJobOrder
    ? Object?.values(postAJobOrder)?.every((value) => value === "")
    : false;
};

export const useResetPostAJob = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state);

  const postAJobOrder = states.postAJobFormDetailsState.postAJobFormDetailsData;
  // Reset State due to payment
  const resetPostAJob = () => {
    const resetData = Object.keys(postAJobOrder).reduce((acc, key) => {
      acc[key as keyof PostAJobFormTypes] = ""; // Reset each field to an empty string
      return acc;
    }, {} as PostAJobFormTypes);

    dispatch(setPostAJobDetails(resetData));
  };

  return {
    resetPostAJob,
  };
};
