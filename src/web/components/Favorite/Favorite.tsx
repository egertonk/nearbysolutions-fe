import { useState } from "react";
import { TalentCard } from "../Hire-A-Talent/talentCard";
import { talentInformation } from "../../lib";
import { TalentDetailPage } from "../Hire-A-Talent/talentDetailPage";
import { TalentInformation } from "../../lib/types/orderTypes";

export const Favorite: React.FC = () => {
  const [talentID, setTalentID] = useState(0);
  const [searchResults, setSearchResults] = useState(talentInformation); // api call to get user Favorite
  const [showTalentDetailPage, setShowTalentDetailPage] = useState(false);
  const [sortType, setSortType] = useState("");
  const [talentInformationCard, setTalentInformationCard] =
    useState<TalentInformation[]>(searchResults);

  // use sortType to fetch data and send it to orders
  // Show only customer orders
  return (
    <>
      {showTalentDetailPage ? (
        <TalentDetailPage talentID={talentID} />
      ) : (
        <>
          <div className="text-center pb-12">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
              Favorite Solutionists
            </h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <TalentCard
              setTalentID={setTalentID}
              talentInformationCard={talentInformationCard}
              setTalentInformationCard={setTalentInformationCard}
              setShowTalentDetailPage={setShowTalentDetailPage}
              isFavoriteValid={true}
            />
          </div>
        </>
      )}
    </>
  );
};
