import { useState } from "react";
import { customerJobsArray } from ".";
import { JobPosting } from "./types/FindWorkPostAJobtypesData";

export const useFindWorkPostAJob = (sortList: string[]) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredJobs, setFilteredJobs] =
    useState<JobPosting[]>(customerJobsArray);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchTerm(value);
    if (value.length === 0) setFilteredJobs(customerJobsArray);
  };

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

    const sortByJobPrice = (jobs: JobPosting[]): JobPosting[] => {
      return [...jobs].sort((a, b) => {
        const priceA = parseFloat(a.jobPrice.replace("$", ""));
        const priceB = parseFloat(b.jobPrice.replace("$", ""));
        return (priceA - priceB) * sortOrder;
      });
    };

    const sortByDate = (jobs: JobPosting[]): JobPosting[] => {
      return [...jobs].sort(
        (a, b) =>
          (new Date(a.date).getTime() - new Date(b.date).getTime()) * sortOrder
      );
    };

    const sortByTime = (jobs: JobPosting[]): JobPosting[] => {
      return [...jobs].sort(
        (a, b) =>
          (new Date(`1970/01/01 ${a.time}`).getTime() -
            new Date(`1970/01/01 ${b.time}`).getTime()) *
          sortOrder
      );
    };

    const sortByStatus = (jobs: JobPosting[]): JobPosting[] => {
      return [...jobs].sort((a, b) => {
        if (a.jobStatus === b.jobStatus) return 0;
        return (a.jobStatus ? -1 : 1) * sortOrder;
      });
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
    if (sortType === "Status") {
      setFilteredJobs(sortByStatus(filteredJobs));
    }

    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return {
    handleSearch,
    handleSubmit,
    handleSort,
    customerJobsArray,
    filteredJobs,
    setFilteredJobs,
    searchTerm,
    setSearchTerm,
    sortList,
    handleOnChange,
  };
};
