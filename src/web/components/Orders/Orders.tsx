import { WorkOrderList } from "../common-sections/workOrderList";
import { useState } from "react";
import { SideMenuList } from "../Header/SideMenuList";
import { SortBy } from "../common-sections/SortBy";
import { MainTitle } from "../common-sections/MainTitle";

type Props = {
  isOrderHistory?: boolean;
  isOrderSumary?: boolean;
  setSortType?: React.Dispatch<React.SetStateAction<string>>;
  setIsOrderHistory?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Orders: React.FC<Props> = ({
  isOrderHistory,
  isOrderSumary,
  setSortType,
  setIsOrderHistory,
}) => {
  let pageTile = "";
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [showTalentDetailPage, setShowTalentDetailPage] = useState(false);

  if (isOrderSumary) pageTile = "Order Summary";
  else if (isEditOrder) pageTile = "Editing Order";
  else pageTile = "Order History";

  // Show only customer orders
  return (
    <>
      <div className="py-3 px-4 justify-center dark:bg-gray-700 rounded-b">
        <MainTitle title={pageTile} />

        {isOrderHistory && setSortType && <SortBy setSortType={setSortType} />}

        <div className="flex flex-col lg:flex-row justify-center">
          <SideMenuList
            isEditOrder={isEditOrder}
            setShowTalentDetailPage={setShowTalentDetailPage}
          />

          <WorkOrderList
            setIsEditOrder={setIsEditOrder}
            isEditOrder={isEditOrder}
            showEdits
            setIsOrderHistory={setIsOrderHistory}
          />
        </div>
      </div>
    </>
  );
};
