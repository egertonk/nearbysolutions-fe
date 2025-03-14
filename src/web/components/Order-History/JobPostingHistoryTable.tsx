import { SortData } from "../common-sections/SortData";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { JobPostingHistoryItemDetails } from "./JobPostingHistoryItemDetails";
import { HistorySharedProps } from "./ToolHistoryTable";
import { NoDataMessage } from "./Common/NoDataMessage";
import { historyItemDetails, historySort } from "./Common/Order-History-CSS";
import { hr } from "../../lib";
import { HomeSectionHeader } from "../Home/HomeSectionHeader";
import { JobListings } from "../Find-Work-Post-A-Job/JobListings";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";
import { sortList } from "../Find-Work-Post-A-Job/FindWorkPostAJob";

type Props = {
  jobPostingHistoryForPoster: JobPosting[] | undefined;
  historyProp: HistorySharedProps;
};

export const JobPostingHistoryTable: React.FC<Props> = ({
  jobPostingHistoryForPoster,
  historyProp,
}) => {
  const { filteredJobs } = useFindWorkPostAJob(sortList, "home-page");

  if (jobPostingHistoryForPoster === undefined) return null;

  const handleSort = (name: string) => historyProp.setFilterName(name);

  const isJobPostingAvailable =
    jobPostingHistoryForPoster && jobPostingHistoryForPoster.length > 0;

  return (
    <>
      <div className={historySort}>
        <SortData sortList={historyProp.sortList} handleSort={handleSort} />
      </div>

      <div className={isJobPostingAvailable ? historyItemDetails : ""}>
        {isJobPostingAvailable ? (
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
          <>
            <NoDataMessage name={historyProp.filterName} />

            {hr}

            <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
              <HomeSectionHeader
                sectionName={"Find Work"}
                path={"/find-work-post-a-job"}
                addedSection={{
                  name: "Post A Job",
                  linkPath: "/post-a-job",
                }}
              />
            </div>
            <JobListings customerJobsArray={filteredJobs} />
          </>
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
