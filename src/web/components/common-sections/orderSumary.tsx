import { useNavigate } from "react-router";
import { talentProfile } from "../../lib";
import { WorkOrderList } from "./workOrderList";
import { useState } from "react";
import { TalentDetailPage } from "../Hire-A-Talent/talentDetailPage";

export const OrderSumary: React.FC = () => {
  const [isEditOrder, setIsEditOrder] = useState(false);
  const [showTalentDetailPage, setShowTalentDetailPage] = useState(false);
  const navigate = useNavigate();

  // Show only customer orders
  return (
    <>
      {showTalentDetailPage ? (
        <TalentDetailPage talentID={talentProfile.talentID} />
      ) : (
        <div className="py-5 px-4 justify-center dark:bg-gray-700 rounded-b">
          <div className="text-center pb-1">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
              {isEditOrder ? "Editing Order" : "Order Summary"}
            </h1>
          </div>

          <div className="flex flex-col lg:flex-row justify-center">
            {isEditOrder === false && (
              <div className="relative w-full md:py-8 py-5 px-5  max-w-xs flex flex-col rounded-lg shadow-sm">
                <button
                  type="button"
                  className="py-4 px-4 inline-flex items-center gap-x-2 rounded-t-md text-lg font-medium focus:z-10 border border-gray-200 bg-white hover:text-white text-gray-600 shadow-sm hover:bg-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                  onClick={() => navigate("/hire-a-talent")}
                >
                  Find More Solutions
                </button>
                <button
                  type="button"
                  className="-mt-px py-2 text-left px-4 gap-x-2 text-lg font-medium focus:z-10 border border-gray-200 bg-white text-gray-600 shadow-sm hover:text-white hover:bg-purple-800 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                  onClick={() => setShowTalentDetailPage(true)}
                >
                  <p>New Order Request</p>
                  <span className="text-sm text-gray">
                    Talent Name: {talentProfile.fullName}
                  </span>
                </button>
                <button
                  type="button"
                  className="-mt-px py-4 px-4 inline-flex items-center gap-x-2 rounded-b-md text-lg font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:text-white hover:bg-purple-600 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                >
                  View History
                </button>
              </div>
            )}
            <WorkOrderList
              setIsEditOrder={setIsEditOrder}
              isEditOrder={isEditOrder}
            />
          </div>
        </div>
      )}
    </>
  );
};
