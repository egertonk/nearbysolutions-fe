import { MainTitle } from "../common-sections/MainTitle";
import { SolutionHistoryTable } from "./SolutionHistoryTable";
import { useInfiniteScroll } from "../common-sections/InfiniteScroll ";
import { localHostURL } from "../../utils/fetchGet";
import { useState } from "react";
import { SolutionJobOrderHistory } from "../../lib/types/OrderSolutionTypes";
import ImageUploader from "../common-sections/ImageUploader ";
import { historyMainPage } from "./Common/Order-History-CSS";

type Props = {
  isOrderSumary?: boolean;
};

export const SolutionOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const [filterName, setFilterName] = useState<string>();
  const uniqueSolutionStatuses = [
    "All",
    "Pending",
    "Completed",
    "Cancelled",
    "Processing",
  ];

  const {
    items: solutionHistory,
    loading,
    hasMore,
    lastElementRef,
    showScrollButton,
    scrollToTop,
  } = useInfiniteScroll(
    `${localHostURL}/solution-job-order-history/customer/${53}/${
      filterName ?? "All"
    }`,
    filterName
  ); //use customer in after login in

  return (
    <div className={historyMainPage}>
      <MainTitle title={"Solution Order History"} />

      <SolutionHistoryTable
        SolutionHistoryByCustomer={
          solutionHistory as unknown as SolutionJobOrderHistory[]
        }
        historyProp={{
          loading,
          hasMore,
          lastElementRef,
          showScrollButton,
          scrollToTop,
          sortList: uniqueSolutionStatuses,
          filterName: filterName ?? "",
          setFilterName,
        }}
      />
      <ImageUploader />
    </div>
  );
};
