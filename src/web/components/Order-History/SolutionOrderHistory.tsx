import { SideMenuList } from "../Header/SideMenuList";
import { MainTitle } from "../common-sections/MainTitle";
import { SearchUI } from "../search/SearchUI";
import { useOrders } from "../../lib/useOrders";
import { RentalToolsOrderHistory } from "./RentalToolsOrderHistory";
import {
  FullPaymentDetailsDTO,
  RentalOrderHistory,
} from "../../lib/types/DIYToolsListings copy";
import { useToolsRentalHistoryByCustomerId } from "../../utils/fetchEndpoints";
import { ToolHistoryTable } from "./ToolHistoryTable";
import { SolutionHistoryTable } from "./SolutionHistoryTable";

type Props = {
  isOrderSumary?: boolean;
};

export const SolutionOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const { data: toolsRentalHistoryByCustomer } =
    useToolsRentalHistoryByCustomerId(52); //use customer in after login in
  console.log("toolsRentalHistoryByCustomer", toolsRentalHistoryByCustomer);
  // const orderList =
  //   toolsRentalHistoryByCustomer !== undefined
  //     ? toolsRentalHistoryByCustomer
  //     : ([] as FullPaymentDetailsDTO[]);

  const {
    handleSubmit,
    handleSort,
    filteredOrders,
    handleOnChange,
    handleEdit,
  } = useOrders();

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Solution Order History"} />

      <SolutionHistoryTable
        toolsRentalHistoryByCustomer={toolsRentalHistoryByCustomer}
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
