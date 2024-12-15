import { SideMenuList } from "../Header/SideMenuList";
import { MainTitle } from "../common-sections/MainTitle";
import { SearchUI } from "../search/SearchUI";
import { useOrders } from "../../lib/useOrders";
import { OrderList } from "./OrderList";

type Props = {
  isOrderSumary?: boolean;
};

export const ToolsOrderHistory: React.FC<Props> = ({ isOrderSumary }) => {
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

      <OrderList />

      <SideMenuList />
    </div>
  );
};
