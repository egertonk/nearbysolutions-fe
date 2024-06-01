import { useState } from "react";
import { Orders } from "./Orders";

export const ViewOrderHistory: React.FC = () => {
  const [sortType, setSortType] = useState("");

  // use sortType to fetch data and send it to orders
  // Show only customer orders
  return <Orders isOrderHistory={true} setSortType={setSortType} />;
};
