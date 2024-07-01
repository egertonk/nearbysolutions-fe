import { useSelector } from "react-redux";
import { TimeProps } from "../../lib/types/CalenderTypes";
import { TimeList } from "../common-sections/timeList";
import { RootState } from "../../../store";

export const DatePicker: React.FC<TimeProps> = ({
  requiredData,
  previousDateCheck,
  isTimeChangeAllow,
  filteredOrders,
}) => {
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  return (
    <>
      <div className="pt-5 sm:space-x-5 rtl:space-x-reverse auto-cols-max w-full">
        <div>
          <h3 className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
            {customerOrder?.solutionDateContract.solutionFormattedDate}
          </h3>
          <button
            type="button"
            data-collapse-toggle="timetable"
            className="inline-flex items-center w-full py-2 px-5 me-2 justify-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-purple-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <svg
              className="w-4 h-4 text-gray-800 dark:text-white me-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                clipRule="evenodd"
              />
            </svg>
            {customerOrder.solutionStartTime.length > 0
              ? customerOrder.solutionStartTime
              : "Pick a time"}
          </button>
          <label className="sr-only">Pick a time</label>
          <TimeList
            requiredData={requiredData}
            previousDateCheck={previousDateCheck}
            isTimeChangeAllow={isTimeChangeAllow}
            filteredOrders={filteredOrders}
          />
        </div>
      </div>
    </>
  );
};
