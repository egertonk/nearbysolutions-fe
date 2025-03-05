import { MainTitle } from "../common-sections/MainTitle";
import { SolutionHistoryTable } from "./SolutionHistoryTable";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { localHostURL } from "../../utils/fetchGet";

type Props = {
  isOrderSumary?: boolean;
};

export const SolutionOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const {
    items: toolsRentalHistory,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  } = useInfiniteScroll(`${localHostURL}/order-history/renter/${52}`);

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Solution Order History"} />

      <SolutionHistoryTable
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
