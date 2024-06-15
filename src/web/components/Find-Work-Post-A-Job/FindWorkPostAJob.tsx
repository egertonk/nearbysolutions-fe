import { customerJobsArray } from "../../lib";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PostAJobHeader } from "./PostAJobHeader";
import { MainTitle } from "../common-sections/MainTitle";
import { JobListings } from "./JobListings";
import { CustomerJobs } from "../../lib/types/findWorkPostAJobtypes";
import { SearchUI } from "../common-sections/SearchUI";
import { SortData } from "../common-sections/SortData";

export const FindWorkPostAJob: React.FC = () => {
  const sortList = ["Date", "Time", "Amount"];
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredJobs, setFilteredJobs] =
    useState<CustomerJobs[]>(customerJobsArray);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredJobs(customerJobsArray);
    } else {
      const filtered = customerJobsArray.filter((job) =>
        job.jobName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredJobs(filtered);
    }
  };

  const handleSubmit = () => {
    if (customerJobsArray.length > 0) {
      const matchJobs = customerJobsArray.filter((job) =>
        job.jobName.includes(searchTerm)
      );

      setFilteredJobs(matchJobs);
    }
  };

  const handleSort = (sortType: string) => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;

    const sortByJobPrice = (jobs: CustomerJobs[]): CustomerJobs[] => {
      return [...jobs].sort((a, b) => {
        const priceA = parseFloat(a.jobPrice.replace("$", ""));
        const priceB = parseFloat(b.jobPrice.replace("$", ""));
        return (priceA - priceB) * sortOrder;
      });
    };

    const sortByDate = (jobs: CustomerJobs[]): CustomerJobs[] => {
      return [...jobs].sort(
        (a, b) =>
          (new Date(a.date).getTime() - new Date(b.date).getTime()) * sortOrder
      );
    };

    const sortByTime = (jobs: CustomerJobs[]): CustomerJobs[] => {
      return [...jobs].sort(
        (a, b) =>
          (new Date(`1970/01/01 ${a.time}`).getTime() -
            new Date(`1970/01/01 ${b.time}`).getTime()) *
          sortOrder
      );
    };

    if (sortType === "Date") {
      setFilteredJobs(sortByDate(filteredJobs));
    }
    if (sortType === "Time") {
      setFilteredJobs(sortByTime(filteredJobs));
    }
    if (sortType === "Amount") {
      setFilteredJobs(sortByJobPrice(filteredJobs));
    }

    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

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
