import { useState } from "react";
import { Orders } from "./Orders";

export const ViewOrderHistory: React.FC = () => {
  const [sortType, setSortType] = useState("");
  const [isOrderHistory, setIsOrderHistory] = useState(true);

  // use sortType to fetch data and send it to orders
  // Show only customer orders
  return (
    <Orders
      isOrderHistory={isOrderHistory}
      setIsOrderHistory={setIsOrderHistory}
      setSortType={setSortType}
    />
  );
};
