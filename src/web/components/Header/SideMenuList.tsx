import { talentProfile } from "../../lib";
import { Link } from "react-router-dom";

type Props = {
  isEditOrder?: boolean;
  setShowTalentDetailPage: React.Dispatch<React.SetStateAction<boolean>>;
};
export const SideMenuList: React.FC<Props> = ({
  isEditOrder,
  setShowTalentDetailPage,
}) => {
  // Show only customer orders
  return (
    <>
      {isEditOrder === false && (
        <div className="relative w-full md:w-60 md:py-8 py-5 px-5 flex flex-col rounded-lg shadow-">
          <Link
            to={`/order/hire-a-talent`}
            type="button"
            className="mb-1 bg-sky-950 py-4 px-4 inline-flex gap-x-2 rounded-lg text-lg font-medium text-white text-gray-600 shadow-sm hover:bg-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
          >
            Find More Solutions
          </Link>
          <Link
            type="button"
            className="mb-1 bg-sky-950 py-2 text-left px-4 gap-x-2 rounded-lg text-lg font-medium text-gray-600 shadow-sm text-white hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => setShowTalentDetailPage(true)}
            to={""}
          >
            <p>New Order Request</p>
            <span className="text-sm text-gray">
              Talent Name: {talentProfile.fullName}
            </span>
          </Link>
          <Link
            type="button"
            className="mb-1 bg-sky-950 py-4 px-4 inline-flex gap-x-2 rounded-lg text-lg font-medium text-gray-800 shadow-sm text-white hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none"
            to={`/view-order-history`}
          >
            Order History
          </Link>
          <Link
            type="button"
            className="mb-1 bg-sky-950 py-4 px-4 inline-flex gap-x-2 rounded-lg text-lg font-medium text-gray-800 shadow-sm text-white hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none"
            to={`favorite`}
          >
            Favorite
          </Link>
          <Link
            type="button"
            className="mb-1 bg-sky-950 py-2 px-4 inline-flex gap-x-2 text-lg rounded-lg font-medium text-gray-600 shadow-sm text-white hover:bg-purple-800 disabled:opacity-50 disabled:pointer-events-none"
            to={`/reviews`}
          >
            <p>Reviews</p>
          </Link>
          <Link
            type="button"
            className="mb-1 bg-sky-950 py-2 px-4 inline-flex gap-x-2 text-lg rounded-lg font-medium text-gray-600 shadow-sm text-white hover:bg-purple-800 disabled:opacity-50 disabled:pointer-events-none"
            to={`/post-a-job`}
          >
            <p>Post a Job</p>
          </Link>
        </div>
      )}
    </>
  );
};
