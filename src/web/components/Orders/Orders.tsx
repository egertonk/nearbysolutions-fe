import { talentProfile } from "../../lib";
import { WorkOrderList } from "../common-sections/workOrderList";
import { useState } from "react";
import { TalentDetailPage } from "../Hire-A-Talent/talentDetailPage";
import { SideMenuList } from "../Header/SideMenuList";
import { SortBy } from "../common-sections/SortBy";

type Props = {
  isOrderHistory?: boolean;
  isOrderSumary?: boolean;
  setSortType?: React.Dispatch<React.SetStateAction<string>>;
};

export const Orders: React.FC<Props> = ({
  isOrderHistory,
  isOrderSumary,
  setSortType,
}) => {
  let pageTile = "";
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [showTalentDetailPage, setShowTalentDetailPage] = useState(false);

  if (isOrderSumary) pageTile = "Order Summary";
  if (isEditOrder) pageTile = "Editing Order";
  if (isOrderHistory) pageTile = "Order History";

  // Show only customer orders
  return (
    <>
      {showTalentDetailPage ? (
        <TalentDetailPage talentID={talentProfile.talentID} />
      ) : (
        <div className="py-3 px-4 justify-center dark:bg-gray-700 rounded-b">
          <div className="text-center pb-1 mb-3">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
              {pageTile}
            </h1>
          </div>

          {isOrderHistory && setSortType && (
            <SortBy setSortType={setSortType} />
          )}

          <div className="flex flex-col lg:flex-row justify-center">
            <SideMenuList
              setIsEditOrder={setIsEditOrder}
              isEditOrder={isEditOrder}
              setShowTalentDetailPage={setShowTalentDetailPage}
            />

            <WorkOrderList
              setIsEditOrder={setIsEditOrder}
              isEditOrder={isEditOrder}
              showEdits
            />
          </div>
        </div>
      )}
    </>
  );
};
