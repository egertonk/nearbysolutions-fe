import React, { useState } from "react";
import { useToolsRentalHistoryByCustomerId } from "../../utils/fetchEndpoints";

// status: "Order-Confirmed" | "Picked-Up" | "Dropped-Off" | "Completed";

export const OrderList: React.FC = () => {
  const { data: toolsRentalHistoryByCustomer } =
    useToolsRentalHistoryByCustomerId(1); //use customer in after login in
  const [statusFilter, setStatusFilter] = useState<string>("All orders");
  const [sortBy, setSortBy] = useState<string>("date");

  console.log("toolsRentalHistoryByCustomer = ", toolsRentalHistoryByCustomer);
  // Filter and sort orders
  const filteredOrders = toolsRentalHistoryByCustomer
    ?.filter((order) =>
      statusFilter === "All orders" ? true : order?.orderStatus === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === "price") return b.amountPaid - a.amountPaid; // Sort by price descending
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Default: sort by date descending
    });

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto  bg-gray-50 p-4">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>

            {/* Filters */}
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="block w-full min-w-[8rem] rounded-lg border border-gray-p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              >
                <option value="All orders">All orders</option>
                <option value="Order-Confirmed">Order-Confirmed</option>
                <option value="Picked-Up">Picked-Up</option>
                <option value="Dropped-Off">Dropped-Off</option>
                <option value="Completed">Completed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              >
                <option value="date">Sort by Date</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders?.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-wrap items-center gap-y-4 py-6"
                >
                  {/* Order Details */}

                  <div className="w-full sm:w-1/2 lg:w-1/3">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Order ID:
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {order.id}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/4 lg:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date:
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(order?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/4 lg:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Price:
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      ${order.amountPaid}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/4 lg:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Status:
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded text-sm font-medium ${
                        order.orderStatus === "Order-Confirmed"
                          ? "bg-purple-900 text-white"
                          : order.orderStatus === "Picked-Up"
                          ? "bg-blue-900 text-white"
                          : order.orderStatus === "Dropped-Off"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.orderStatus === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                  {/* Action Buttons */}
                  <div className="mt-4 w-full flex justify-end gap-4 lg:mt-0 lg:w-1/6">
                    {order.orderStatus === "Order-Confirmed" && (
                      <button className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto">
                        Cancel Order
                      </button>
                    )}
                    <button className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
