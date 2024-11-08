import {
  ViewfinderCircleIcon,
  CursorArrowRaysIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";
import { PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import { Reviews } from "./lib/types/ReviewTypes";

export const userAccountProfile = {
  account: { customerAccount: false, contractorAccount: false },
};

export const companyProfile = {
  companyName: "FAQs",
  companyEmail: "john@doe.com",
  companyPhoneNumber: "0123456789",
  companyStreetAddress: "213 Lane",
  companyCity: "London",
  companyState: "",
  companyCountry: "United Kingdom",
};

export const companySocialData = [
  { name: "Facebook", link: "#" },
  { name: "X", link: "#" },
  { name: "Youtube", link: "#" },
  { name: "Linkedin", link: "#" },
];

export const products = [
  {
    name: "Hire a Talent",
    description: "Get a better understanding of your traffic",
    href: "hire-a-talent",
    icon: ViewfinderCircleIcon,
    routeName: "hire-a-talent",
  },
  {
    name: "Gift a Solution",
    description: "Speak directly to your customers",
    href: "gift-a-solution",
    icon: SquaresPlusIcon,
    routeName: "gift-a-solution",
  },
  //Todo later
  // {
  //   name: "BulK Hire",
  //   description: "Speak directly to your customers",
  //   href: "#",
  //   icon: SquaresPlusIcon,
  //   routeName: "bulk-hire",
  // },
  {
    name: "Find Work / Post a Job",
    description: "Your customers’ data will be safe and secure",
    href: "find-work-post-a-job",
    icon: CursorArrowRaysIcon,
    routeName: "find-work-post-a-job",
  },
  {
    name: "DIY Tools Rental",
    description: "Your customers’ data will be safe and secure",
    href: "rent-tools",
    icon: CursorArrowRaysIcon,
    routeName: "rent-tools",
  },
];

export const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

export const reviews: Reviews[] = [
  {
    customerReviewDate: "05/25/2024",
    customerFirstName: "Kanye",
    customerLastName: "West",
    customerReviewComment: "Rapper Entrepreneur",
    customerCity: "Woodbridge",
    customerStarsRating: 4,
    customerImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    customerJobRequest: "Software Engineer",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Jessa During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "06/25/2024",
    customerFirstName: "Tim",
    customerLastName: "Cook",
    customerReviewComment:
      "Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.",
    customerCity: "Dallas",
    customerStarsRating: 4,
    customerImage:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    customerJobRequest: "Software EEEEE",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Egerton During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "04/25/2024",
    customerFirstName: "Jessa",
    customerLastName: "During",
    customerReviewComment:
      "Enim neque volutpat ac tincidunt vitae semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam pellentesque nec. Turpis cursus in hac habitasse platea dictumst.",
    customerCity: "Dallas",
    customerStarsRating: 5,
    customerImage:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    customerJobRequest: "Software AAAA",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Jessa During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "05/26/2024",
    customerFirstName: "Egerton",
    customerLastName: "During",
    customerReviewComment: "Rapper Entrepreneur",
    customerCity: "Stafford",
    customerStarsRating: 3,
    customerImage:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    customerJobRequest: "Software DDDD",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Jessa During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "06/26/2024",
    customerFirstName: "Kanye",
    customerLastName: "West",
    customerReviewComment: "Rapper Entrepreneur",
    customerCity: "Stafford",
    customerStarsRating: 4,
    customerImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    customerJobRequest: "Software DDDD",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Brigton During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "06/25/2024",
    customerFirstName: "Tim",
    customerLastName: "Cook",
    customerReviewComment:
      "Diam quis enim lobortis scelerisque fermentum dui faucibus in ornare. Donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum.",
    customerCity: "Stafford",
    customerStarsRating: 4,
    customerImage:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    customerJobRequest: "Software wwwwww",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Brigton During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "05/20/2024",
    customerFirstName: "Jessa",
    customerLastName: "During",
    customerReviewComment:
      "Enim neque volutpat ac tincidunt vitae semper. Mattis aliquam faucibus purus in massa tempor. Neque vitae tempus quam pellentesque nec. Turpis cursus in hac habitasse platea dictumst.",
    customerCity: "Stafford",
    customerStarsRating: 5,
    customerImage:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    customerJobRequest: "Software qqqqq",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Brigton During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
  {
    customerReviewDate: "06/20/2024",
    customerFirstName: "Egerton",
    customerLastName: "During",
    customerReviewComment: "Rapper Entrepreneur",
    customerCity: "Richmond",
    customerStarsRating: 3,
    customerImage:
      "https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg",
    customerJobRequest: "Software rrrrr",
    contractorImage:
      "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
    contractorFullName: "Brigton During",
    socialMedias: [
      { name: "twitter", link: "https://twitter.com/satyanadella" },
    ],
  },
];
