export type OrderStatus =
  | "Order-Confirmed"
  | "Picked-Up"
  | "Dropped-Off"
  | "Completed";

export const getOrderStatusClass = (orderStatus: string): string => {
  const statusClasses: Record<string, string> = {
    "Order-Confirmed": "bg-purple-900 text-white",
    "Picked-Up": "bg-blue-900 text-white",
    "Dropped-Off": "bg-yellow-100 text-yellow-800",
    Listed: "bg-purple-900 text-white",
    "Solutionist Assigned": "bg-blue-900 text-white",
    "Under Review": "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    default: "bg-red-100 text-red-800",
  };

  return statusClasses[orderStatus as string] || statusClasses["default"];
};

export const toolRentalOrderStatuses = [
  "All orders",
  "Order-Confirmed",
  "Picked-Up",
  "Dropped-Off",
  "Completed",
];

export const uniqueJobStatuses = [
  "All",
  "Listed",
  "Pending",
  "Under Review",
  "Completed",
  "Cancelled",
  "Solutionist Assigned",
];

export const paymentStatusNames = [
  "On-Hold",
  "Pending",
  "Processing",
  "Paid",
  "Refunded",
  "Cancelled",
];

export const jobOrderStatusNames = [
  "Listed",
  "Solutionist Assigned",
  "Completed",
  "Under Review",
];

export type JobOrderStatus =
  | "Listed"
  | "Solutionist Assigned"
  | "Completed"
  | "Under Review";

export type PaymentOrderStatus =
  | "On-Hold"
  | "Pending"
  | "Processing"
  | "Paid"
  | "Refunded"
  | "Cancelled"
  | "Completed"
  | "Accepted"
  | "Solutionist Assigned"
  | "Listed"
  | "In Progress";

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
    Accepted: "bg-green-100 text-green-800",
    "Solutionist Assigned": "bg-green-100 text-green-800",
    Listed: "bg-cyan-100 text-green-800",
    "In Progress": "bg-gray-100 text-green-800",
  };

  return (
    statusClasses[orderStatus as PaymentOrderStatus] || statusClasses["default"]
  );
};
