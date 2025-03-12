import { MainTitle } from "../common-sections/MainTitle";
import { SolutionHistoryTable } from "./SolutionHistoryTable";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { localHostURL } from "../../utils/fetchGet";
import { useState } from "react";
import {
  SolutionJobOrderHistory,
  SolutionJobOrderHistoryWithPagination,
} from "../../lib/types/OrderSolutionTypes";
import ImageUploader from "../common-sections/ImageUploader ";

type Props = {
  isOrderSumary?: boolean;
};

export const SolutionOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const [filterName, setFilterName] = useState<string>();
  const uniqueToolRentalStatuses = [
    "Pending",
    "Completed",
    "Cancelled",
    "Processing",
  ];

  const {
    items: toolsRentalHistory,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  } = useInfiniteScroll(
    `${localHostURL}/solution-job-order-history/solutionist/${52}`,
    filterName
  ); //use customer in after login in

  console.log("toolsRentalHistory", toolsRentalHistory);

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Solution Order History"} />

      <SolutionHistoryTable
        SolutionHistoryByCustomer={
          toolsRentalHistory as unknown as SolutionJobOrderHistory[]
        }
        historyProp={{
          loading,
          hasMore,
          lastElementRef,
          showScrollButton,
          scrollToTop,
          sortList: uniqueToolRentalStatuses,
          filterName: filterName ?? "",
          setFilterName,
        }}
      />
      <ImageUploader />
      {/* <SearchUI
        handleOnChange={handleOnChange}
        filteredOrders={filteredOrders}
        handleSubmit={handleSubmit}
      />

      <RentalToolsOrderHistory orderList={orderList as RentalOrderHistory[]} />

      <SideMenuList /> */}
    </div>
  );
};
