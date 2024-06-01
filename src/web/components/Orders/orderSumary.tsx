import { Orders } from "./Orders";

export const OrderSumary: React.FC = () => {
  // Show only customer orders
  return <Orders isOrderSumary={true} />;
};
