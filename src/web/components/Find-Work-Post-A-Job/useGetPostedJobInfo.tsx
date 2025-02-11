import { useLocation } from "react-router";
import { useJobPostingByJobId } from "../../utils/fetchEndpoints";

export const useGetPostedJobInfo = (paramName: string) => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const acceptJobId = searchParams.get(paramName);
  const { data: jobOrderDetails } = useJobPostingByJobId(Number(acceptJobId));

  return {
    jobOrderDetails,
  };
};
