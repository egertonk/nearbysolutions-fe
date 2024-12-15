import { ToolsOrderHistory } from "./ToolsOrderHistory";

export const OrderSumary: React.FC = () => {
  // Show only customer orders
  return <ToolsOrderHistory isOrderSumary={true} />;
};
