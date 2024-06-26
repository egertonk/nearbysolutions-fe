import { PostAJobHeader } from "./PostAJobHeader";
import { MainTitle } from "../common-sections/MainTitle";
import { JobListings } from "./JobListings";
import { SearchUI } from "../common-sections/SearchUI";
import { SortData } from "../common-sections/SortData";
import { useFindWorkPostAJob } from "../../lib/useFindWorkPostAJob";

export const FindWorkPostAJob: React.FC = () => {
  const sortList = ["Date", "Time", "Amount"];
  const { handleSearch, handleSubmit, handleSort, filteredJobs } =
    useFindWorkPostAJob(sortList);

  return (
    <>
      <MainTitle title={"Customer Job Requests"} />
      <SearchUI
        handleOnChange={handleSearch}
        handleSubmit={handleSubmit}
        filteredJobs={filteredJobs}
      />
      <PostAJobHeader />
      <SortData sortList={sortList} handleSort={handleSort} />
      <JobListings customerJobsArray={filteredJobs} />
    </>
  );
};
