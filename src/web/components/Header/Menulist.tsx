import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { OrderHistory, products, toolsRentalLMenu } from "../..";
import { PopoverMenu } from "./PopoverMenu";

export const Menulist: React.FC = () => {
  return (
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      <PopoverMenu title="Find Solution" items={products} />
      <PopoverMenu title="Tool Rentals" items={toolsRentalLMenu} />
      <Link
        to="/Marketplace"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Marketplace
      </Link>
      <PopoverMenu title="Order History" items={OrderHistory} />
      <Link
        to="/favorite"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Favorite
      </Link>
      <Link
        to="/account"
        className="text-sm font-semibold leading-6 text-gray-900"
      >
        Account
      </Link>
    </Popover.Group>
  );
};
