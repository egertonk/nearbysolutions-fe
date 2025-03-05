import { orderSortList } from "../../lib/useOrders";
import { getPaymentOrderStatusClass } from "./CustomerJopPostingOrderHistory";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { ToolHistoryItemDetails } from "./ToolHistoryItemDetails";
import { SortData } from "../common-sections/SortData";
import { InfiniteScrollMessages } from "../common-sections/InfiniteScrollMessages";

type Props = {
  toolsRentalHistoryByCustomer: ToolOrderHistory[] | undefined;
  loading: boolean;
  hasMore: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
  showScrollButton: boolean;
  scrollToTop: () => void;
};

export const calculateOriginalPrice = (
  finalPrice: number,
  discount: number
): number => {
  if (discount >= 100) return 0; // Avoid division by zero
  return finalPrice / (1 - discount / 100);
};

export const calculateFinalPrice = (
  price: number,
  discount: number
): number => {
  return price * (1 - discount / 100);
};

export const ToolHistoryTable: React.FC<Props> = ({
  toolsRentalHistoryByCustomer,
  loading,
  hasMore,
  showScrollButton,
  scrollToTop,
  lastElementRef,
}) => {
  console.log(
    toolsRentalHistoryByCustomer?.length,
    "-------------",
    toolsRentalHistoryByCustomer
  );

  if (toolsRentalHistoryByCustomer === undefined) return null;

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
          toolsRentalHistoryByCustomer?.map((order) => (
            <ToolHistoryItemDetails
              index={toolsRentalHistoryByCustomer.indexOf(order)}
              arrayLength={toolsRentalHistoryByCustomer.length ?? 0}
              lastElementRef={lastElementRef}
              content={order}
              showViewDetailsButton={false}
            />
          ))}
      </div>

      <InfiniteScrollMessages
        loading={loading}
        hasMore={hasMore}
        showScrollButton={showScrollButton}
        scrollToTop={scrollToTop}
      />

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
        <div className="container px-6 py-8 mx-auto">
          <h3 className="text-3xl font-medium text-gray-700">Dashboard</h3>

          <div className="mt-4">
            <div className="flex flex-wrap -mx-6">
              <div className="w-full px-6 sm:w-1/2 xl:w-1/3">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-indigo-600 bg-opacity-75 rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18.2 9.08889C18.2 11.5373 16.3196 13.5222 14 13.5222C11.6804 13.5222 9.79999 11.5373 9.79999 9.08889C9.79999 6.64043 11.6804 4.65556 14 4.65556C16.3196 4.65556 18.2 6.64043 18.2 9.08889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M25.2 12.0444C25.2 13.6768 23.9464 15 22.4 15C20.8536 15 19.6 13.6768 19.6 12.0444C19.6 10.4121 20.8536 9.08889 22.4 9.08889C23.9464 9.08889 25.2 10.4121 25.2 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M19.6 22.3889C19.6 19.1243 17.0927 16.4778 14 16.4778C10.9072 16.4778 8.39999 19.1243 8.39999 22.3889V26.8222H19.6V22.3889Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M8.39999 12.0444C8.39999 13.6768 7.14639 15 5.59999 15C4.05359 15 2.79999 13.6768 2.79999 12.0444C2.79999 10.4121 4.05359 9.08889 5.59999 9.08889C7.14639 9.08889 8.39999 10.4121 8.39999 12.0444Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 26.8222V22.3889C22.4 20.8312 22.0195 19.3671 21.351 18.0949C21.6863 18.0039 22.0378 17.9556 22.4 17.9556C24.7197 17.9556 26.6 19.9404 26.6 22.3889V26.8222H22.4Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M6.64896 18.0949C5.98058 19.3671 5.59999 20.8312 5.59999 22.3889V26.8222H1.39999V22.3889C1.39999 19.9404 3.2804 17.9556 5.59999 17.9556C5.96219 17.9556 6.31367 18.0039 6.64896 18.0949Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      8,282
                    </h4>
                    <div className="text-gray-500">New Users</div>
                  </div>
                </div>
              </div>

              <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-orange-600 bg-opacity-75 rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      200,521
                    </h4>
                    <div className="text-gray-500">Total Orders</div>
                  </div>
                </div>
              </div>

              <div className="w-full px-6 mt-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
                <div className="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
                  <div className="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                    <svg
                      className="w-8 h-8 text-white"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                        stroke="currentColor"
                        strokeWidth="2"
                      ></path>
                    </svg>
                  </div>

                  <div className="mx-5">
                    <h4 className="text-2xl font-semibold text-gray-700">
                      215,542
                    </h4>
                    <div className="text-gray-500">Available Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8"></div>

          <body className="flex items-center justify-center">
            <div className="container">
              <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
                <thead className="text-white">
                  <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-center"> Tool Name/Category</th>
                    <th className="p-3 text-center">Email</th>
                    <th className="p-3 text-center">Tool Brand</th>
                    <th className="p-3 text-center">City</th>
                    <th className="p-3 text-center">Status</th>
                    <th className="p-3 text-center">Final Price</th>
                    <th className="p-3 text-center">Rent Start Date</th>
                    <th className="p-3 text-center">Rent Return Date</th>

                    <th className="p-3 text-left" style={{ width: "110px" }}>
                      Actions
                    </th>
                  </tr>
                  {/* <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left" style={{ width: "110px" }}>
                      Actions
                    </th>
                  </tr>
                  <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Tool Brand</th>
                    <th className="p-3 text-left">Tool Brand</th>
                    <th className="p-3 text-left">Tool Brand</th>
                    <th className="p-3 text-left">Tool Brand</th>
                    <th className="p-3 text-left">Tool Brand</th>
                    <th className="p-3 text-left" style={{ width: "110px" }}>
                      Actions
                    </th>
                  </tr> */}
                  {/* <tr className="bg-teal-400 flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Email</th>
                    <th className="p-3 text-left" style={{ width: "110px" }}>
                      Actions
                    </th>
                  </tr> */}
                </thead>
                <tbody className="flex-1 sm:flex-none">
                  {toolsRentalHistoryByCustomer &&
                    toolsRentalHistoryByCustomer?.map((order) => (
                      <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                        <td className="border-grey-light border hover:bg-gray-100 p-3">
                          {order.toolName}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          {order.toolCategory}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          {order.toolBrand}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          {order.toolCity}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          {order.orderStatus}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          ${order.finalPrice}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          {order.rentStartDate?.split("T")[0]}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                          {order.returnDate?.split("T")[0]}
                        </td>
                        <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                          View Details
                        </td>
                      </tr>
                    ))}
                  <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
                    <td className="border-grey-light border hover:bg-gray-100 p-3">
                      John Covv
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 truncate">
                      contato@johncovv.com
                    </td>
                    <td className="border-grey-light border hover:bg-gray-100 p-3 text-red-400 hover:text-red-600 hover:font-medium cursor-pointer">
                      Delete
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="mx-auto max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl sm:table-row flex-no ">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img
                      className="h-48 w-full object-cover md:h-full md:w-48"
                      src="/img/building.jpg"
                      alt="Modern building architecture"
                    />
                  </div>
                  <div className="p-8">
                    <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
                      Company retreats
                    </div>
                    <a
                      href="#"
                      className="mt-1 block text-lg leading-tight font-medium text-black hover:underline"
                    >
                      Incredible accommodation for your team
                    </a>
                    <p className="mt-2 text-gray-500">
                      Looking to take your team away on a retreat to enjoy
                      awesome food and take in some sunshine? We have a list of
                      places to do just that.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </body>

          <div className="flex flex-col mt-8">
            <div className="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Tool Name - Category
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Tool Brand
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        City
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Status
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Final Price
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Rent Start Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                        Rent Rturn Date
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                    </tr>
                  </thead>

                  {toolsRentalHistoryByCustomer &&
                    toolsRentalHistoryByCustomer?.map((order) => (
                      <tbody className="bg-white">
                        <tr>
                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 w-10 h-10">
                                <img
                                  className="w-10 h-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                                  alt=""
                                />
                              </div>

                              <div className="ml-4">
                                <div className="text-sm font-medium leading-5 text-gray-900">
                                  {order.toolName}
                                </div>
                                <div className="text-sm leading-5 text-gray-500">
                                  {order.toolCategory}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                              {order.toolBrand}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-500">
                              {order.toolCity}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span
                              className={`inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full${getPaymentOrderStatusClass(
                                order.orderStatus
                              )}`}
                            >
                              {order.orderStatus}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            ${order.finalPrice}
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {order.rentStartDate?.split("T")[0]}
                          </td>

                          <td className="px-6 py-4 text-sm leading-5 text-gray-500 whitespace-no-wrap border-b border-gray-200">
                            {order.returnDate?.split("T")[0]}
                          </td>

                          <td className="px-6 py-4 text-sm font-medium leading-5 text-right whitespace-no-wrap border-b border-gray-200">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
