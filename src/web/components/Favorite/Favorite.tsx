import { useState } from "react";
import { SolutionistCard } from "../solutionist/SolutionistCard";
import { talentInformation } from "../../lib";
import { MainTitle } from "../common-sections/MainTitle";
import { Search } from "../search/Search";

export const Favorite: React.FC = () => {
  const [searchResults, setSearchResults] = useState(talentInformation); // api call to get user Favorite

  // use sortType to fetch data and send it to orders
  // Show only customer orders
  return (
    <>
      <MainTitle title="Favorite Solutionists" />

      {/* <Search
        setSearchResults={setSearchResults}
        searchResults={searchResults}
        fallBackData={talentInformation}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TalentCard searchResults={searchResults} isFavoriteValid={true} />
      </div> */}
    </>
  );
};
