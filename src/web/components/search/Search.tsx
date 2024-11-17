import React, { useState } from "react";
import { SearchUI } from "./SearchUI";
import { SolutionistTypes } from "../../lib/types/solutionistTypes";
import { localHostURL } from "../../utils/fetchGet";

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
  const [searchTerm, setSearchTerm] = useState("");

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

    setSearchTerm(value);
    if (value.length === 0 && fallBackData) setSearchResults(fallBackData);
  };

  const handleSubmit = async () => {
    if (searchTerm.length > 0) {
      if (!searchTerm.trim()) return; // Only search when there's input

      try {
        const response = await fetch(
          `${localHostURL}/skills/search?name=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.length === 0 && fallBackData) setSearchResults(fallBackData);
        else setSearchResults(data);
      } catch (err) {
        //   setError(err.message);
      } finally {
        // setLoading(false);
      }
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
