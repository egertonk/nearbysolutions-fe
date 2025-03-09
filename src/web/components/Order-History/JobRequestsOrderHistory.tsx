import { MainTitle } from "../common-sections/MainTitle";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { localHostURL } from "../../utils/fetchGet";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { JobPostingHistoryTable } from "./JobPostingHistoryTable";
import { useState } from "react";

type Props = {
  isOrderSumary?: boolean;
};

export const JobRequestsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const [filterName, setFilterName] = useState<string>();
  const uniqueJobStatuses = [
    "All",
    "Listed",
    "Pending",
    "Under Review",
    "Completed",
    "Cancelled",
    "Solutionist Assigned",
  ];

  const getNmae = (name: string) => {
    switch (name) {
      case "Under Review":
        return "UnderReview";
      case "Solutionist Assigned":
        return "SolutionistAssigned";
      default:
        return name;
    }
  };

  const {
    items: jobOrderHistory,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  } = useInfiniteScroll(
    `${localHostURL}/job-postings/history/${53}/${getNmae(
      filterName ?? "All"
    )}`,
    filterName
  ); //use customer in after login in

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Job Requests Order History"} />

      <JobPostingHistoryTable
        jobPostingHistoryForPoster={jobOrderHistory as unknown as JobPosting[]}
        historyProp={{
          loading,
          hasMore,
          lastElementRef,
          showScrollButton,
          scrollToTop,
          sortList: uniqueJobStatuses,
          filterName: filterName ?? "",
          setFilterName,
        }}
      />
    </div>
  );
};
