import { useState } from "react";
import { TalentCard } from "../Hire-A-Talent/talentCard";
import { talentInformation } from "../../lib";
import { TalentInformation } from "../../lib/types/orderTypes";
import { MainTitle } from "../common-sections/MainTitle";

export const Favorite: React.FC = () => {
  const [searchResults, setSearchResults] = useState(talentInformation); // api call to get user Favorite

  const [talentInformationCard, setTalentInformationCard] =
    useState<TalentInformation[]>(searchResults);

  // use sortType to fetch data and send it to orders
  // Show only customer orders
  return (
    <>
      <MainTitle title="Favorite Solutionists" />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <TalentCard
          talentInformationCard={talentInformationCard}
          setTalentInformationCard={setTalentInformationCard}
          isFavoriteValid={true}
        />
      </div>
    </>
  );
};
