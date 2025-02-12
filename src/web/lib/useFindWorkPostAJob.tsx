import { useEffect, useState } from "react";
import { JobPosting } from "./types/FindWorkPostAJobtypesData";
import { useJobPosting } from "../utils/fetchEndpoints";
import { localHostURL } from "../utils/fetchGet";
import { isFeature } from "../components/common-sections/InfiniteScroll ";

export const useFindWorkPostAJob = (
  sortList: string[],
  featureName: string
) => {
  const isHomePage = isFeature(featureName);
  const { data: jobPostings, isFetching: isJobPostingFetching } = useJobPosting(
    isHomePage ? 0 : 0,
    isHomePage ? 5 : 10
  );

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  useEffect(() => {
    if (jobPostings && searchTerm.length === 0)
      setFilteredJobs(jobPostings ?? []);
  }, [isJobPostingFetching, searchTerm]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
  };

  const handleSubmit = async () => {
    if (searchTerm.length > 0) {
      if (!searchTerm.trim()) return; // Only search when there's input

      try {
        const response = await fetch(
          `${localHostURL}/job-postings/search?name=${encodeURIComponent(
            searchTerm
          )}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setFilteredJobs(data);
      } catch (err) {
        //   setError(err.message);
      } finally {
        // setLoading(false);
      }
    }
  };

  const handleSort = (sortType: string) => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;

    const sortByJobPrice = (jobs: JobPosting[]): JobPosting[] => {
      return [...jobs].sort((a, b) => {
        const priceA = parseFloat(String(a.jobPrice));
        const priceB = parseFloat(String(b.jobPrice));
        return (priceA - priceB) * sortOrder;
      });
    };

    const sortByDate = (jobs: JobPosting[]): JobPosting[] => {
      return [...jobs].sort(
        (a, b) =>
          (new Date(a.jobDate).getTime() - new Date(b.jobDate).getTime()) *
          sortOrder
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
    handleSubmit,
    handleSort,
    filteredJobs,
    setFilteredJobs,
    searchTerm,
    setSearchTerm,
    sortList,
    handleOnChange,
  };
};
