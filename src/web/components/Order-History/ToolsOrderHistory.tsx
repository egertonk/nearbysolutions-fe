import { MainTitle } from "../common-sections/MainTitle";
import { ToolHistoryTable } from "./ToolHistoryTable";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { localHostURL } from "../../utils/fetchGet";
import { useState } from "react";

type Props = {
  isOrderSumary?: boolean;
};

export const ToolsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
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
    `${localHostURL}/order-history/renter/${52}/${filterName ?? "All"}`,
    filterName
  ); //use customer in after login in

  console.log("toolsRentalHistory", toolsRentalHistory);

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Tools Order History"} />
      <ToolHistoryTable
        toolsRentalHistoryByCustomer={
          toolsRentalHistory as unknown as ToolOrderHistory[]
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
    </div>
  );
};
