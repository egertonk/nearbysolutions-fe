import { useState } from "react";
import { SideMenuList } from "../Header/SideMenuList";
import { MainTitle } from "../common-sections/MainTitle";
import { SortData } from "../common-sections/SortData";
import { priceWithComma } from "../../lib";
import { TableHeader } from "../common-sections/TableHeader";
import { SearchUI } from "../common-sections/SearchUI";
import { orderSortList, useOrders } from "../../lib/useOrders";

type Props = {
  isOrderSumary?: boolean;
};

export const Orders: React.FC<Props> = ({ isOrderSumary }) => {
  const {
    handleSubmit,
    handleSort,
    filteredOrders,
    handleOnChange,
    handleEdit,
  } = useOrders();

  let pageTile = "";
  const [isEditOrder, setIsEditOrder] = useState(false);

  if (isOrderSumary) pageTile = "Order Summary";
  else if (isEditOrder) pageTile = "Editing Order";
  else pageTile = "Order History";

  return (
    <div className="px-4 justify-center dark:bg-gray-700 rounded-b">
      <MainTitle title={pageTile} />

      <SearchUI
        handleOnChange={handleOnChange}
        filteredOrders={filteredOrders}
        handleSubmit={handleSubmit}
      />

      <div className="flex flex-col lg:flex-row justify-center">
        <SideMenuList />

        <div className="px-2 rounded-b">
          <SortData sortList={orderSortList} handleSort={handleSort} />
          <div className="justify-center ">
            {filteredOrders.map((order, index) => (
              <>
                <div
                  className="mx-auto border-purple-500 border rounded-sm mb-2 h-30 "
                  key={`1-${index}`}
                >
                  <div
                    className="rounded-t auto-cols-max items-center"
                    key={`2-${index}`}
                  >
                    <TableHeader
                      itemindex={index}
                      itemStatus={order.orderStatus}
                      isOrder={true}
                      itemsTotal={filteredOrders.length}
                      handleEdit={handleEdit}
                    />

                    <div
                      className="px-4 md:flex flex-row items-center border-t-8 border-purple-600"
                      key={`3-${index}`}
                    >
                      <div className="w-full md:w-60 text-center md:text-left mr-2">
                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Order Id:
                          </span>{" "}
                          {order.orderID}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Customer Name:
                          </span>{" "}
                          {`${order.firstName} ${order.lastName}`}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Start Time:
                          </span>{" "}
                          {order.solutionStartTime}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Location:
                          </span>{" "}
                          {`${order.address}`}
                          <p>{`${order.city}, ${order.state}, ${order.zip}.`}</p>
                        </div>
                      </div>

                      <div className="w-full md:w-60  text-center m-1 md:text-left">
                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Talent Job:
                          </span>{" "}
                          {order.solutionJob}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Solutionist Name:
                          </span>{" "}
                          {order.selectedTalent}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Order Date:
                          </span>{" "}
                          {order.orderDate}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">
                            Task Description:
                          </span>{" "}
                          {order.solutionTask}
                        </div>

                        <div className="text-sm">
                          <span className="text-base font-semibold">Price</span>{" "}
                          {priceWithComma(order.solutionPrice || "")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
