import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FullJobPostingDetails } from "../../lib/types/FindWorkPostAJobtypesData";

export const jobOrderStatusNames = [
  "Listed",
  "Solutionist Assigned",
  "Completed",
  "Under Review",
];

type JobOrderStatus =
  | "Listed"
  | "Solutionist Assigned"
  | "Completed"
  | "Under Review";

export const getOrderStatusClass = (
  orderStatus: JobOrderStatus | string
): string => {
  const statusClasses: Record<JobOrderStatus | "default", string> = {
    Listed: "bg-purple-900 text-white",
    "Solutionist Assigned": "bg-blue-900 text-white",
    "Under Review": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    default: "bg-red-100 text-red-800",
  };

  return (
    statusClasses[orderStatus as JobOrderStatus] || statusClasses["default"]
  );
};

export const paymentStatusNames = [
  "On-Hold",
  "Pending",
  "Processing",
  "Paid",
  "Refunded",
  "Cancelled",
];

type PaymentOrderStatus =
  | "On-Hold"
  | "Pending"
  | "Processing"
  | "Paid"
  | "Refunded"
  | "Cancelled"
  | "Completed";

// Pending > default
// Failed > default

export const getPaymentOrderStatusClass = (
  orderStatus: PaymentOrderStatus | string
): string => {
  const statusClasses: Record<PaymentOrderStatus | "default", string> = {
    "On-Hold": "bg-purple-900 text-white",
    Pending: "bg-purple-900 text-white",
    Refunded: "bg-blue-900 text-white",
    Processing: "bg-yellow-100 text-yellow-800",
    Paid: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
    Completed: "bg-green-100 text-green-800",
    default: "bg-red-100 text-red-800",
  };

  return (
    statusClasses[orderStatus as PaymentOrderStatus] || statusClasses["default"]
  );
};

type OrderListProps = {
  orderList: FullJobPostingDetails[] | undefined;
};

export const CustomerJopPostingOrderHistory: React.FC<OrderListProps> = ({
  orderList,
}) => {
  const navigate = useNavigate();
  const [statusPaymentFilter, setStatusPaymentFilter] =
    useState<string>("All payments");
  const [statusJobFilter, setStatusJobFilter] = useState<string>("All jobs");
  const [sortBy, setSortBy] = useState<string>("date");
  const [isPaymentFiltered, setIsPaymentFiltered] = useState<boolean>(true);

  console.log("orderList = ", orderList);
  // Filter and sort orders
  const filteredPaymentOrders = orderList
    ?.filter((order) =>
      statusPaymentFilter === "All payments"
        ? true
        : order?.paymentDetails.paymentStatus === statusPaymentFilter
    )
    .sort((a, b) => {
      if (sortBy === "price")
        return b.paymentDetails.amountDue - a.paymentDetails.amountDue; // Sort by price descending
      return (
        new Date(b.paymentDetails.createdAt).getTime() -
        new Date(a.paymentDetails.createdAt).getTime()
      ); // Default: sort by date descending
    });

  const filteredJobOrders = orderList
    ?.filter((order) =>
      statusJobFilter === "All jobs"
        ? true
        : order?.jobPosting.jobStatus === statusJobFilter
    )
    .sort((a, b) => {
      if (sortBy === "price")
        return b.paymentDetails.amountDue - a.paymentDetails.amountDue; // Sort by price descending
      return (
        new Date(b.paymentDetails.createdAt).getTime() -
        new Date(a.paymentDetails.createdAt).getTime()
      ); // Default: sort by date descending
    });

  const filteredOrders = isPaymentFiltered
    ? filteredPaymentOrders
    : filteredJobOrders;

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto  bg-[#ddcfe0] p-4">
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Job orders
            </h2>

            {/* Filters */}
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <select
                value={statusPaymentFilter}
                onChange={(e) => {
                  setIsPaymentFiltered(true);
                  setStatusPaymentFilter(e.target.value);
                }}
                className="block w-full min-w-[8rem] rounded-lg border border-gray-p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              >
                <option value="All payments">All payments</option>
                {paymentStatusNames.map((name) => (
                  <option value={`${name}`}>{name}</option>
                ))}
              </select>

              <select
                value={statusJobFilter}
                onChange={(e) => {
                  setIsPaymentFiltered(false);
                  setStatusJobFilter(e.target.value);
                }}
                className="block w-full min-w-[8rem] rounded-lg border border-gray-p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
              >
                <option value="All jobs">All jobs</option>
                {jobOrderStatusNames.map((name) => (
                  <option value={`${name}`}>{name}</option>
                ))}
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
                  key={order.jobPosting?.id}
                  className="flex flex-wrap items-center gap-y-4 py-6"
                >
                  {/* Order Details */}

                  <div className="w-full sm:w-1/4 sm:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Job Name:
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {order.jobPosting?.jobName}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/4 sm:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Date:
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {new Date(
                        order?.paymentDetails.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="w-full sm:w-1/4 sm:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Price:
                    </p>
                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      $
                      {order.paymentDetails.paymentStatus === "Pending"
                        ? order.paymentDetails.amountDue
                        : order.paymentDetails.amountPaid}
                    </p>
                  </div>

                  <div className="w-full sm:w-1/4 sm:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Payment Status:
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded text-sm font-medium ${getPaymentOrderStatusClass(
                        order.paymentDetails.paymentStatus
                      )}`}
                    >
                      {order.paymentDetails.paymentStatus}
                    </span>
                  </div>

                  <div className="w-full sm:w-1/4 sm:w-1/6">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Job Status:
                    </p>
                    <span
                      className={`inline-block px-3 py-1 rounded text-sm font-medium ${getOrderStatusClass(
                        order.jobPosting.jobStatus
                      )}`}
                    >
                      {order.jobPosting.jobStatus}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 w-full flex justify-end gap-4 sm:mt-0 sm:w-1/6">
                    {order.paymentDetails.paymentStatus ===
                      "Order-Confirmed" && (
                      <button
                        onClick={() =>
                          console.log(
                            "update database, process refund, email owner and renter, update UI data to reflect change",
                            order.jobPosting?.id
                          )
                        }
                        className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                      >
                        Cancel Order
                      </button>
                    )}
                    <button
                      onClick={() =>
                        navigate(
                          `/history/job-requests-order/view-order-details?jobId=${order.jobPosting?.id}`
                        )
                      }
                      className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                    >
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
