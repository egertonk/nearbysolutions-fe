import { orderSortList } from "../../lib/useOrders";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { SortData } from "../common-sections/SortData";
import { SolutionHistoryItemDetails } from "./SolutionHistoryItemDetails";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";

type Props = {
  toolsRentalHistoryByCustomer: ToolOrderHistory[] | undefined;
  loading: boolean;
  hasMore: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
  showScrollButton: boolean;
  scrollToTop: () => void;
};

export const SolutionHistoryTable: React.FC<Props> = ({
  toolsRentalHistoryByCustomer,
  loading,
  hasMore,
  lastElementRef,
  showScrollButton,
  scrollToTop,
}) => {
  if (toolsRentalHistoryByCustomer === undefined) return null;

  function handleSort(sortType: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="flex justify-center space-x-8 items-start w-full ">
        <SortData sortList={orderSortList} handleSort={handleSort} />
      </div>

      <div className="flex-row min-h-screen justify-center items-center md:mx-8 md:px-64">
        {toolsRentalHistoryByCustomer &&
          toolsRentalHistoryByCustomer?.map((order) => (
            <SolutionHistoryItemDetails
              index={toolsRentalHistoryByCustomer.indexOf(order)}
              arrayLength={toolsRentalHistoryByCustomer.length ?? 0}
              content={order}
              showViewDetailsButton={false}
              lastElementRef={lastElementRef}
            />
          ))}
      </div>

      <InfiniteScrollMessages
        loading={loading}
        hasMore={hasMore}
        showScrollButton={showScrollButton}
        scrollToTop={scrollToTop}
      />
    </>
  );
};
