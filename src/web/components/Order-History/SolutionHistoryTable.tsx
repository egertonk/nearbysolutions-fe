import { SortData } from "../common-sections/SortData";
import { SolutionHistoryItemDetails } from "./SolutionHistoryItemDetails";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";
import { HistorySharedProps } from "./ToolHistoryTable";
import { NoDataMessage } from "./Common/NoDataMessage";
import { SolutionJobOrderHistory } from "../../lib/types/OrderSolutionTypes";
import { historyItemDetails, historySort } from "./Common/Order-History-CSS";

type Props = {
  SolutionHistoryByCustomer: SolutionJobOrderHistory[] | undefined;
  historyProp: HistorySharedProps;
};

export const SolutionHistoryTable: React.FC<Props> = ({
  SolutionHistoryByCustomer,
  historyProp,
}) => {
  if (SolutionHistoryByCustomer === undefined) return null;

  const handleSort = (name: string) => historyProp.setFilterName(name);

  return (
    <>
      <div className={historySort}>
        <SortData sortList={historyProp.sortList} handleSort={handleSort} />
      </div>

      <div className={historyItemDetails}>
        {SolutionHistoryByCustomer && SolutionHistoryByCustomer.length > 0 ? (
          SolutionHistoryByCustomer?.map((order) => (
            <SolutionHistoryItemDetails
              index={SolutionHistoryByCustomer.indexOf(order)}
              arrayLength={SolutionHistoryByCustomer.length ?? 0}
              lastElementRef={historyProp.lastElementRef}
              content={order}
              showViewDetailsButton={false}
            />
          ))
        ) : (
          <NoDataMessage name={historyProp.filterName} />
        )}
      </div>

      <InfiniteScrollMessages
        loading={historyProp.loading}
        hasMore={historyProp.hasMore}
        showScrollButton={historyProp.showScrollButton}
        scrollToTop={historyProp.scrollToTop}
      />
    </>
  );
};
