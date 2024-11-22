import { PostAJobHeader } from "./PostAJobHeader";
import { MainTitle } from "../common-sections/MainTitle";
import { JobListings } from "./JobListings";
import { SearchUI } from "../search/SearchUI";
import { SortData } from "../common-sections/SortData";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";

export const FindWorkPostAJob: React.FC = () => {
  const sortList = ["Date", "Time", "Amount"];
  const { handleOnChange, handleSubmit, handleSort, filteredJobs } =
    useFindWorkPostAJob(sortList);

  return (
    <>
      <MainTitle title={"Customer Job Requests"} />
      <SearchUI
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        filteredJobs={filteredJobs}
      />
      <PostAJobHeader />
      <SortData sortList={sortList} handleSort={handleSort} />
      <JobListings customerJobsArray={filteredJobs} />
    </>
  );
};
