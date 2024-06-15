import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TalentInformation } from "../../lib/types/orderTypes";
import { SearchUI } from "./SearchUI";

type Props = {
  searchResults: TalentInformation[] | [];
  fallBackData: TalentInformation[];
  setSearchResults: React.Dispatch<React.SetStateAction<TalentInformation[]>>;
};

export const Search: React.FC<Props> = ({
  setSearchResults,
  searchResults,
  fallBackData,
}) => {
  const [userSearch, setUserSearch] = useState("");

  const getAllJobTitles = (talentInfo: TalentInformation[] | []) => {
    return talentInfo.flatMap((talent) =>
      talent.jobTitlesPrice.map((job) => job.title)
    );
  };

  const jobTitlesArray = getAllJobTitles(searchResults); // from a api supported jobs

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserSearch(value);
    if (value.length === 0) setSearchResults(fallBackData);
  };

  const handleSubmit = () => {
    if (userSearch.length > 0) {
      const matchJobs = searchResults.filter((talent) =>
        talent.jobTitlesPrice.some((job) => job.title.includes(userSearch))
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
