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

type Props = {
  isOrderSumary?: boolean;
};

export const ToolsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
  const { data: toolsRentalHistoryByCustomer } =
    useToolsRentalHistoryByCustomerId(1); //use customer in after login in

  const orderList =
    toolsRentalHistoryByCustomer !== undefined
      ? toolsRentalHistoryByCustomer
      : ([] as FullPaymentDetailsDTO[]);

  const {
    handleSubmit,
    handleSort,
    filteredOrders,
    handleOnChange,
    handleEdit,
  } = useOrders();

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={"Tools Order History"} />

      <SearchUI
        handleOnChange={handleOnChange}
        filteredOrders={filteredOrders}
        handleSubmit={handleSubmit}
      />

      <RentalToolsOrderHistory orderList={orderList as RentalOrderHistory[]} />

      <SideMenuList />
    </div>
  );
};
