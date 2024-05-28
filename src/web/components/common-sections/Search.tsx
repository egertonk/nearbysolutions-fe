import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchResults } from "../../lib/types/orderTypes";

type Props = {
  searchResults: SearchResults;
  fallBackData: SearchResults;
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResults>>;
};

export const Search: React.FC<Props> = ({
  setSearchResults,
  searchResults,
  fallBackData,
}) => {
  const [userSearch, setUserSearch] = useState("");

  const jobTitles = [
    "Fullstack developer",
    "car mechanic",
    "Bicycle mechanic",
    "House cleaner",
    "Chief",
    "Filipino Chief",
    "Help Desk",
    "Graphic Designer",
  ]; // from a api supported jobs

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserSearch(value);
    console.log(value.length);
    if (value.length === 0) setSearchResults(fallBackData);
  };

  const handleSubmit = () => {
    if (userSearch.length > 0) {
      const result = searchResults.filter((talent) =>
        talent.jobTitles.includes(userSearch)
      );
      setSearchResults(result || searchResults);
    }
  };

  return (
    <>
      <div className="flex justify-center rounded mb-2.5">
        <input
          type="text"
          className="block w-80 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          list="frameworks"
          onChange={handleOnChange}
        />
        <datalist id="frameworks">
          {jobTitles.map((title) => (
            <option key={title} value={title}></option>
          ))}
        </datalist>

        <button
          className="ml-1.5 relative align-middle select-none bg-purple-400 font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handleSubmit}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <MagnifyingGlassIcon className="h-5 w-5 flex-none text-white-400 btn" />
          </span>
        </button>
      </div>
    </>
  );
};
