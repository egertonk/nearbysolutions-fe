import { MainTitle } from "../common-sections/MainTitle";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { localHostURL } from "../../utils/fetchGet";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { JobPostingHistoryTable } from "./JobPostingHistoryTable";
import { useState } from "react";
import { uniqueJobStatuses } from "./Common/Index";
import { historyMainPage } from "./Common/Order-History-CSS";
import { SearchUI } from "../search/SearchUI";

type Props = {
  isOrderSumary?: boolean;
};

export const JobRequestsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const [filterName, setFilterName] = useState<string>();

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
    handleSubmit,
    searchTerm,
    handleOnChange,
  } = useInfiniteScroll(
    `${localHostURL}/job-postings-order-history/${53}/${getNmae(
      filterName ?? "All"
    )}`,
    filterName
  ); //use customer in after login in

  return (
    <div className={historyMainPage}>
      <MainTitle title={"Job Requests Order History"} />

      <SearchUI
        handleOnChange={handleOnChange}
        handleSubmit={() =>
          handleSubmit(
            searchTerm,
            `${localHostURL}/job-postings-order-history/job-request-search/${searchTerm}/${53}`
          )
        }
      />

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
