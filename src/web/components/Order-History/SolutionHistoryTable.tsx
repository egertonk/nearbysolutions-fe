import { SortData } from "../common-sections/SortData";
import { SolutionHistoryItemDetails } from "./SolutionHistoryItemDetails";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";
import { HistorySharedProps } from "./ToolHistoryTable";
import { NoDataMessage } from "./Common/NoDataMessage";
import { SolutionJobOrderHistory } from "../../lib/types/OrderSolutionTypes";
import { historyItemDetails, historySort } from "./Common/Order-History-CSS";
import { HomeSectionHeader } from "../Home/HomeSectionHeader";
import { SolutionistCard } from "../solutionist/SolutionistCard";
import { useGetUsers } from "../../utils/fetchEndpoints";
import { hr } from "../../lib";

type Props = {
  SolutionHistoryByCustomer: SolutionJobOrderHistory[] | undefined;
  historyProp: HistorySharedProps;
};

export const SolutionHistoryTable: React.FC<Props> = ({
  SolutionHistoryByCustomer,
  historyProp,
}) => {
  const { data: users } = useGetUsers();

  if (SolutionHistoryByCustomer === undefined) return null;

  const handleSort = (name: string) => historyProp.setFilterName(name);
  const isOrderAvailable =
    SolutionHistoryByCustomer && SolutionHistoryByCustomer.length > 0;

  return (
    <>
      <div className={historySort}>
        <SortData sortList={historyProp.sortList} handleSort={handleSort} />
      </div>

      <div className={isOrderAvailable ? historyItemDetails : ""}>
        {isOrderAvailable ? (
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
          <>
            <NoDataMessage name={historyProp.filterName} />

            {hr}

            <div className="grid grid-flow-col grid-rows-2 gap-4 px-4 m-1">
              <HomeSectionHeader
                sectionName={"Our Solutionists"}
                path={"/hire-a-talent"}
                addedSection={null}
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 mb-4">
              <SolutionistCard data={users || []} lastElementRef={() => {}} />
            </div>
          </>
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
