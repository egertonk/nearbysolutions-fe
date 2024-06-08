import { useState } from "react";
import { priceWithComma, customerOderHistory } from "../../lib";
import { editIconSVG } from "../../assets/svg/svgs";
import { EditOrder } from "../Orders/EditOrder";

type Props = {
  isEditOrder?: boolean;
  showEdits?: boolean;
  setIsEditOrder?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOrderHistory?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkOrderList: React.FC<Props> = ({
  setIsEditOrder,
  isEditOrder,
  showEdits,
  setIsOrderHistory,
}) => {
  const [orderNumber, setOrderNumber] = useState(0);
  const customerProfileID = 12345; // api

  const handleEdit = (orderNumber: number) => {
    setOrderNumber(orderNumber);
    if (setIsEditOrder) setIsEditOrder(true);
    if (setIsOrderHistory) setIsOrderHistory(false);
    
    console.log("isEditOrder----------- ", orderNumber);
  };

  return (
    <>
      {isEditOrder ? (
        <EditOrder orderNumber={orderNumber} />
      ) : (
        <div className="md:py-8 py-5 px-5 justify-center rounded-b">
          <div className="px-4">
            {customerOderHistory.map((order) => (
              <>
                <div
                  className="mx-auto border-gray-500 border rounded-sm mb-0.5 h-30"
                  key={order.orderID}
                >
                  <div
                    className="bg-white rounded-t auto-cols-max items-center"
                    key={`2-${order.orderID}`}
                  >
                    <div
                      className="px-4 md:flex flex-row items-center border-l-8 border-purple-600"
                      key={`3-${order.orderID}`}
                    >
                      <div className="w-60 m-1">
                        <div className="text-sm font-semibold">
                          <span className="text-xs leading-4 font-normal text-gray-500">
                            Order Date:
                          </span>{" "}
                          {order.orderDate}
                        </div>
                        <div className="text-sm font-semibold">
                          <span className="text-xs leading-4 font-normal text-gray-500 pr">
                            Start Time:
                          </span>{" "}
                          {order.solutionStartTime}
                        </div>
                      </div>

                      <div className="w-60 text-center m-1 md:text-left">
                        <div className="text-base font-semibold">
                          Talent: {order.solutionJob}
                        </div>
                        {customerProfileID === order.customerID && (
                          <>
                            <div className="text-sm">
                              <span className="text-purple font-semibold">
                                Order Number:
                              </span>{" "}
                              {order.orderID}
                            </div>

                            <div className="text-sm">
                              <span className="text-emerald font-semibold">
                                Total Cost:
                              </span>
                              {" $"}
                              {priceWithComma(order.solutionPrice || "")}
                            </div>

                            <div className="text-sm text-wrap">
                              <span className="text-purple font-semibold">
                                Task Description:
                              </span>{" "}
                              {order.solutionTask}
                            </div>
                          </>
                        )}
                      </div>

                      <div className="ml-3 space-y-1 pr-3 h-30 w-60 m-1">
                        <div className="text-xs font-medium">
                          <svg
                            className="w-5 h-5 text-purple me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M11.906 1.994a8.002 8.002 0 0 1 8.09 8.421 7.996 7.996 0 0 1-1.297 3.957.996.996 0 0 1-.133.204l-.108.129c-.178.243-.37.477-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18.146 18.146 0 0 1-.309-.38l-.133-.163a.999.999 0 0 1-.13-.202 7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0 3 3 0 0 1 5.999 0Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Task Location
                        </div>
                        <div className="text-center text-sm font-semibold text-blue-800">
                          {order.city}, {order.state}
                        </div>
                      </div>

                      <div className="flex justify-center">
                        <div
                          className={`p-1 w-20 ml-3 my-5 ${
                            order.orderStatus ? "bg-green-600" : "bg-purple-600"
                          }`}
                        >
                          {" "}
                          {/* {todo - show cancel orders only for the customer that order the items} */}
                          <div className="uppercase text-xs font-semibold text-center text-yellow-100">
                            {`${order.orderStatus ? "Active" : "Completed"}`}
                          </div>
                        </div>
                        {showEdits && order.orderStatus && (
                          <button
                            onClick={() => handleEdit(order.orderID || 0)}
                            className="hover:text-purple-500 text-base w-5 flex items-center justify-center font-medium text-gray rounded-full ml-4"
                          >
                            {editIconSVG}
                          </button>
                        )}
                      </div>

                      {/* <div className="ml-3 space-y-1 border-r-2 pr-3 w-16 md:w-32 lg:w-48">
                        <button className="text-gray-100 rounded-sm my-5 ml-2 focus:outline-none bg-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
                {/* end */}
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
