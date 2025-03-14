import { MainTitle } from "../common-sections/MainTitle";
import { ToolHistoryTable } from "./ToolHistoryTable";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { localHostURL } from "../../utils/fetchGet";
import { useState } from "react";
import { historyMainPage } from "./Common/Order-History-CSS";
import { SearchUI } from "../search/SearchUI";

type Props = {
  isOrderSumary?: boolean;
};

export const ToolsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const [filterName, setFilterName] = useState<string>();
  const uniqueToolRentalStatuses = [
    "All",
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
    handleSubmit,
    searchTerm,
    handleOnChange,
  } = useInfiniteScroll(
    `${localHostURL}/tools-order-history/renter/${52}/${filterName ?? "All"}`,
    filterName
  ); //use customer in after login in

  return (
    <div className={historyMainPage}>
      <MainTitle title={"Tools Order History"} />

      <SearchUI
        handleOnChange={handleOnChange}
        handleSubmit={() =>
          handleSubmit(
            searchTerm,
            `${localHostURL}/tools-order-history/renter-search/${searchTerm}/${53}`
          )
        }
      />

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
