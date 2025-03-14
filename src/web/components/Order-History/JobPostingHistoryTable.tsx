import { SortData } from "../common-sections/SortData";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { JobPostingHistoryItemDetails } from "./JobPostingHistoryItemDetails";
import { HistorySharedProps } from "./ToolHistoryTable";
import { NoDataMessage } from "./Common/NoDataMessage";
import { historyItemDetails, historySort } from "./Common/Order-History-CSS";

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
      <div className={historySort}>
        <SortData sortList={historyProp.sortList} handleSort={handleSort} />
      </div>

      <div className={historyItemDetails}>
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
