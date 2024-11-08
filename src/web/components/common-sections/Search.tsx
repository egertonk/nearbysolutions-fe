import React, { useState } from "react";
import { SearchUI } from "./SearchUI";
import { TalentTypes } from "../talent/talentTypes";

type Props = {
  searchResults: TalentTypes[] | [];
  fallBackData: TalentTypes[] | undefined;
  setSearchResults: React.Dispatch<React.SetStateAction<TalentTypes[]>>;
};

export const Search: React.FC<Props> = ({
  setSearchResults,
  searchResults,
  fallBackData,
}) => {
  const [userSearch, setUserSearch] = useState("");

  const getAllJobTitles = (talentInfo: TalentTypes[] | []) => {
    return talentInfo.flatMap((talent) =>
      talent?.talent?.jobTitle?.map((job) => job?.title)
    );
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
