import { MainTitle } from "../common-sections/MainTitle";
import { ToolHistoryTable } from "./ToolHistoryTable";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { localHostURL } from "../../utils/fetchGet";

type Props = {
  isOrderSumary?: boolean;
};

export const ToolsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const {
    items: toolsRentalHistory,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  } = useInfiniteScroll(`${localHostURL}/order-history/renter/${52}`); //use customer in after login in

  console.log("toolsRentalHistory", toolsRentalHistory);

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Tools Order History"} />

      <ToolHistoryTable
        toolsRentalHistoryByCustomer={
          toolsRentalHistory as unknown as ToolOrderHistory[]
        }
        loading={loading}
        hasMore={hasMore}
        lastElementRef={lastElementRef}
        showScrollButton={showScrollButton}
        scrollToTop={scrollToTop}
      />
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
