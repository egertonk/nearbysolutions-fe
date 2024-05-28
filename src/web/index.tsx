import {
  ViewfinderCircleIcon,
  CursorArrowRaysIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";

export const products = [
  {
    name: "Hire a Talent",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ViewfinderCircleIcon,
    routeName: "hire-a-talent",
  },
  {
    name: "BulK Hire",
    description: "Speak directly to your customers",
    href: "#",
    icon: SquaresPlusIcon,
    routeName: "bulk-hire",
  },
  {
    name: "Find Work",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: CursorArrowRaysIcon,
    routeName: "find-work",
  },
];

export const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];
