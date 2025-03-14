import { format } from "date-fns";
import { useLocation } from "react-router";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { MainTitle } from "../common-sections/MainTitle";
import { useToolsOrderDetailsBuCustomer } from "../../utils/fetchEndpoints";
import { ToolHistoryItemDetails } from "./ToolHistoryItemDetails";
import { Address } from "../common-sections/Address";
import { emailSVG } from "../../assets/svg/svgs";

export const ToolRentalOrderDetails: React.FC = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");
  const userId = searchParams.get("id");
  const posterId = searchParams.get("poster");

  const { data: orderDetails } = useToolsOrderDetailsBuCustomer(
    Number(userId),
    Number(orderId),
    Number(posterId)
  );

  const formatDate = orderDetails?.toolOrderHistory?.createdAt
    ? format(
        new Date(orderDetails.toolOrderHistory.createdAt),
        "dd MMMM yyyy 'at' hh:mm a"
      )
    : "Date not available";

  return (
    <>
      <MainTitle title={`Order #${orderId}`} />
      <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
        {formatDate}
      </p>

      <div className="px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-purple-800">
                Tool Details
              </p>

              <ToolHistoryItemDetails
                content={
                  orderDetails?.toolOrderHistory ?? ({} as ToolOrderHistory)
                }
                showViewDetailsButton
              />
            </div>

            <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-purple-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      {orderDetails?.toolOrderHistory?.toolName} Total
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      ${orderDetails?.toolOrderHistory?.finalPrice?.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium dark:bg-white dark:text-gray-800 leading-3 text-gray-800">
                        Customer
                      </span>
                    </p>
                    <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                      -$
                      {orderDetails?.toolOrderHistory?.discountPrice?.toFixed(
                        2
                      )}{" "}
                      (
                      {orderDetails?.toolOrderHistory?.discountPercent?.toFixed()}
                      %)
                    </p>
                  </div>

                  {orderDetails?.toolOrderHistory?.shippingStatus !==
                    "Not_Required" && (
                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Shipping
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        $
                        {orderDetails?.toolOrderHistory?.shippingCost?.toFixed(
                          2
                        )}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Subtotal
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    ${orderDetails?.toolOrderHistory?.subtotal?.toFixed(2) ?? 0}
                  </p>
                </div>

                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Tax
                  </p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    ${orderDetails?.toolOrderHistory?.tax?.toFixed(2)}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                    Grand Total
                  </p>
                  <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                    ${orderDetails?.toolOrderHistory?.totalPrice?.toFixed(2)}
                  </p>
                </div>
              </div>
              {/* <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">
                    $8.00
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">
                    View Carrier Details
                  </button>
                </div>
              </div> */}
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 w-full h-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
            <h3 className="text-xl dark:text-white font-semibold leading-5 text-purple-800">
              Customer
            </h3>
            <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className="flex justify-start items-start flex-col space-y-2">
                    <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                      {orderDetails?.customerInformation?.firstName}{" "}
                      {orderDetails?.customerInformation?.lastName}
                    </p>
                    <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
                      10 Previous Orders (TODO)
                    </p>
                  </div>
                </div>

                <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <p className="flex items-center gap-2">
                    <span className="bg-black">{emailSVG}</span>
                    <span className="cursor-pointer text-sm leading-5">
                      {orderDetails?.customerInformation?.email}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Tool Address
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                      <Address
                        country={
                          orderDetails?.toolOrderHistory?.toolCountry ?? ""
                        }
                        address={
                          orderDetails?.toolOrderHistory?.toolAddress ?? ""
                        }
                        city={orderDetails?.toolOrderHistory?.toolCity ?? ""}
                        state={orderDetails?.toolOrderHistory?.toolState ?? ""}
                        zip={orderDetails?.toolOrderHistory?.toolZipcode ?? ""}
                      />
                    </p>
                  </div>
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
                    <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                      Billing Address (--todo--from payment)
                    </p>
                    <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      <Address
                        country={
                          orderDetails?.toolOrderHistory?.toolCountry ?? ""
                        }
                        address={
                          orderDetails?.toolOrderHistory?.toolAddress ?? ""
                        }
                        city={orderDetails?.toolOrderHistory?.toolCity ?? ""}
                        state={orderDetails?.toolOrderHistory?.toolState ?? ""}
                        zip={orderDetails?.toolOrderHistory?.toolZipcode ?? ""}
                      />
                    </p>
                  </div>
                </div>
                {/* <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                  <button className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base font-medium leading-4 text-gray-800">
                    Edit Details
                  </button>
                </div> */}
              </div>
            </div>

            <hr className="w-full h-1 mx-auto my-2 bg-purple-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

            <h3 className="text-xl dark:text-white font-semibold leading-5 text-purple-800">
              Tool Provider
            </h3>
            <div className="flex flex-col justify-start items-start flex-shrink-0 w-full">
              <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                <img
                  src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                  alt="avatar"
                />
                <div className="flex justify-start items-start flex-col space-y-2">
                  <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
                    {orderDetails?.posterDetails?.firstName}{" "}
                    {orderDetails?.posterDetails?.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
