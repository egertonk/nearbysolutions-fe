import { orderSortList } from "../../lib/useOrders";
import { ToolOrderHistoryWithPagination } from "../../lib/types/DIYToolsListings";
import { SortData } from "../common-sections/SortData";
import { SolutionHistoryItemDetails } from "./SolutionHistoryItemDetails";

type Props = {
  toolsRentalHistoryByCustomer: ToolOrderHistoryWithPagination | undefined;
};

export const SolutionHistoryTable: React.FC<Props> = ({
  toolsRentalHistoryByCustomer,
}) => {
  console.log(
    toolsRentalHistoryByCustomer?.content?.length,
    "-------------",
    toolsRentalHistoryByCustomer?.content
  );

  if (toolsRentalHistoryByCustomer?.content === undefined) return null;

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
          toolsRentalHistoryByCustomer?.content?.map((order) => (
            <SolutionHistoryItemDetails
              content={order}
              showViewDetailsButton={false}
            />
          ))}
      </div>
    </>
  );
};
