import { Link } from "react-router-dom";
import { Popover } from "@headlessui/react";
import { OrderHistory, products, toolsRentalLMenu } from "../..";
import { PopoverMenu } from "./PopoverMenu";

export const Menulist: React.FC = () => {
  const menuItems = [
    { title: "Find Solution", items: products },
    { title: "Tool Rentals", items: toolsRentalLMenu },
    { title: "Order History", items: OrderHistory },
  ];

  const links = [
    { to: "/Marketplace", label: "Marketplace" },
    { to: "/favorite", label: "Favorite" },
    { to: "/account", label: "Account" },
  ];

  return (
    <Popover.Group className="hidden lg:flex lg:gap-x-12">
      {menuItems.map((menu, index) => (
        <PopoverMenu key={index} title={menu.title} items={menu.items} />
      ))}

      {links.map((link, index) => (
        <Link
          key={index}
          to={link.to}
          className="text-sm font-semibold leading-6 text-gray-900 hover:text-purple-600 transition"
          aria-label={link.label}
        >
          {link.label}
        </Link>
      ))}
    </Popover.Group>
  );
};
