import { SortData } from "../common-sections/SortData";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { JobPostingHistoryItemDetails } from "./JobPostingHistoryItemDetails";
import { HistorySharedProps } from "./ToolHistoryTable";
import { NoDataMessage } from "./Common/NoDataMessage";

type Props = {
  jobPostingHistoryForPoster: JobPosting[] | undefined;
  historyProp: HistorySharedProps;
};

export const JobPostingHistoryTable: React.FC<Props> = ({
  jobPostingHistoryForPoster,
  historyProp,
}) => {
  if (jobPostingHistoryForPoster === undefined) return null;

  const handleSort = (name: string) => historyProp.setFilterName(name);

  return (
    <>
      <div className="flex justify-center space-x-8 items-start w-full ">
        <SortData sortList={historyProp.sortList} handleSort={handleSort} />
      </div>

      <div className="flex-row min-h-screen justify-center items-center md:mx-8 md:px-64">
        {jobPostingHistoryForPoster && jobPostingHistoryForPoster.length > 0 ? (
          jobPostingHistoryForPoster?.map((order) => (
            <JobPostingHistoryItemDetails
              index={jobPostingHistoryForPoster.indexOf(order)}
              arrayLength={jobPostingHistoryForPoster.length ?? 0}
              lastElementRef={historyProp.lastElementRef}
              content={order}
              showViewDetailsButton={false}
            />
          ))
        ) : (
          <NoDataMessage name={historyProp.filterName} />
        )}
      </div>

      <InfiniteScrollMessages
        loading={historyProp.loading}
        hasMore={historyProp.hasMore}
        showScrollButton={historyProp.showScrollButton}
        scrollToTop={historyProp.scrollToTop}
      />
    </>
  );
};
