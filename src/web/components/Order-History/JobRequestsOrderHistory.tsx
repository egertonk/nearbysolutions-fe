import { SideMenuList } from "../Header/SideMenuList";
import { MainTitle } from "../common-sections/MainTitle";
import { SearchUI } from "../search/SearchUI";
import { useOrders } from "../../lib/useOrders";
import { RentalOrderHistory } from "../../lib/types/DIYToolsListings copy";
import {
  useJobPostingByCustomerId,
  useToolsRentalHistoryByCustomerId,
} from "../../utils/fetchEndpoints";
import { CustomerJopPostingOrderHistory } from "./CustomerJopPostingOrderHistory";

type Props = {
  isOrderSumary?: boolean;
};

export const JobRequestsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const { data: toolsRentalHistoryByCustomer } =
    useToolsRentalHistoryByCustomerId(1); //use customer in after login in
  const { data: customerRequestedJobList } = useJobPostingByCustomerId(1);
  console.log("-------------", customerRequestedJobList);
  const orderList =
    toolsRentalHistoryByCustomer !== undefined
      ? toolsRentalHistoryByCustomer
      : ([] as RentalOrderHistory[]);

  const {
    handleSubmit,
    handleSort,
    filteredOrders,
    handleOnChange,
    handleEdit,
  } = useOrders();

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Job Requests Order History"} />

      <SearchUI
        handleOnChange={handleOnChange}
        filteredOrders={filteredOrders}
        handleSubmit={handleSubmit}
      />

      <CustomerJopPostingOrderHistory orderList={customerRequestedJobList} />

      <SideMenuList />
    </div>
  );
};
