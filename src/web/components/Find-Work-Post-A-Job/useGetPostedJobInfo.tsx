import { useLocation } from "react-router";
import { useJobPostingById } from "../../utils/fetchEndpoints";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";

export const useGetPostedJobInfo = (paramName: string) => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const acceptJobId = searchParams.get(paramName);
  const { data: postAJobOrder } = useJobPostingById(Number(acceptJobId));

  return {
    postAJobOrder: postAJobOrder ? postAJobOrder : ({} as JobPosting),
  };
};
