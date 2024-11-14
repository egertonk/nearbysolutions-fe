import React, { useState } from "react";
import { SearchUI } from "./SearchUI";
import { SolutionistTypes } from "../all-types/solutionistTypes";

type Props = {
  searchResults: SolutionistTypes[] | [];
  fallBackData: SolutionistTypes[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<SolutionistTypes[]>>;
};

export const Search: React.FC<Props> = ({
  setSearchResults,
  searchResults,
  fallBackData,
}) => {
  const [userSearch, setUserSearch] = useState("");

  const getAllJobTitles = (talentInfo: SolutionistTypes[] = []) => {
    return Array.isArray(talentInfo)
      ? talentInfo.flatMap(
          (talent) => talent?.talent?.jobTitle?.map((job) => job?.title) || []
        )
      : [];
  };

  const jobTitlesArray = getAllJobTitles(searchResults);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserSearch(value);
    if (value.length === 0 && fallBackData) setSearchResults(fallBackData);
  };

  const handleSubmit = () => {
    if (userSearch.length > 0) {
      const matchJobs = searchResults.filter((talent) =>
        talent?.talent?.jobTitle?.some((job) => job.title.includes(userSearch))
      );
      setSearchResults(matchJobs);
    }
  };

  return (
    <>
      <SearchUI
        handleOnChange={handleOnChange}
        jobTitlesArray={jobTitlesArray}
        handleSubmit={handleSubmit}
      />
    </>
  );
};
