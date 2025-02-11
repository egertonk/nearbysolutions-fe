import { useSelector } from "react-redux";
import { greaterThanArrowSVG, lessThanArrowSVG } from "../../assets/svg/svgs";
import { useCalender } from "../../lib/useCalender";
import { RootState } from "../../../store";
import { useEffect } from "react";
import { isVacationValid } from "../../lib/useVacationCheck";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { monthNameToNumber } from "../../lib";
import { getDateStyle } from "../../assets/common-css/css";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";
import { DateSelection, WeeksData } from "../../lib/types/CalenderTypes";

type Props = {
  currentMonthYear: {
    showMonth: string;
    showYear: number;
  };
  showNextMonth: boolean;
  userSelectedDate: DateSelection;
  updateDateSelection: (day: number, month: string, year: number) => void;
  updateStore: (defaultValueDate?: {
    month: string;
    day: number;
    year: number;
  }) => void;
  customerSolutionistDetails: SolutionistResponseTypes;
  weeksArray: WeeksData;
  setWeeksArray: React.Dispatch<React.SetStateAction<WeeksData>>;
};

export const Calender: React.FC<Props> = ({
  currentMonthYear,
  updateStore,
  customerSolutionistDetails,
  weeksArray,
  setWeeksArray,
}) => {
  const {
    showNextMonth,
    userSelectedDate,
    updateDaySelection,
    getVacationStatus,
    handleCalenderArrows,
  } = useCalenderStates(customerSolutionistDetails);
  const { date, dayTitles, getMappedDays } = useCalender();

  const { month, year, day } = userSelectedDate;

  const solutionistWorkSettings = useSelector(
    (state: RootState) => state.solutionistWorkSettingsState
  );
  const states = useSelector((state: RootState) => state.formData);
  const customerOrder = states.customerOrder;
  const isEditOrder = states.isEditOrder;

  // Initial load for current calender
  useEffect(() => {
    if (month) {
      setWeeksArray({
        weeksArray: getMappedDays(
          monthNameToNumber[month.substring(0, 3)],
          year
        ),
        month: month,
        year: year,
      });
    }
  }, []);

  return (
    <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t auto-cols-max">
      <div className="px-4 flex items-center justify-between">
        <span
          tabIndex={0}
          className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
        >
          {`${weeksArray?.month} ${weeksArray?.year}`}
        </span>
        <div className="flex items-center">
          <button
            aria-label="calendar backward"
            className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
            onClick={() =>
              handleCalenderArrows(weeksArray, setWeeksArray, "previous")
            }
          >
            {lessThanArrowSVG}
          </button>
          <button
            aria-label="calendar forward"
            onClick={() => handleCalenderArrows(weeksArray, setWeeksArray)}
            className="focus:text-gray-400 hover:text-gray-400 ml-3 text-gray-800 dark:text-gray-100"
          >
            {greaterThanArrowSVG}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between pt-12 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {dayTitles.map((day) => (
                <th key={day}>
                  <div className="w-full flex justify-center">
                    <p className="text-base font-medium text-center text-gray-800 dark:text-gray-100">
                      {day}
                    </p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeksArray?.weeksArray.map((weeks, index) => (
              <tr key={`week-${index}`}>
                {weeks.map((days) =>
                  days.day === null ? (
                    <td
                      className="pt-6"
                      key={`previous-month-${days.dayTitle}`}
                    >
                      <div className="px-2 py-2 flex w-full justify-center" />
                    </td>
                  ) : days.day === date && showNextMonth === false ? (
                    <td
                      className="pt-6"
                      key={`previous-month-${days.dayTitle}`}
                    >
                      <div
                        className="px-4 flex w-full justify-center"
                        key={`current-day-${days.dayTitle}`}
                      >
                        <button
                          onClick={() =>
                            updateDaySelection(
                              days.day,
                              weeksArray,
                              updateStore
                            )
                          }
                          tabIndex={0}
                          className={getDateStyle(
                            customerOrder,
                            userSelectedDate,
                            weeksArray,
                            customerSolutionistDetails,
                            currentMonthYear,
                            solutionistWorkSettings,
                            days
                          )}
                          disabled={getVacationStatus(days.day, weeksArray)}
                        >
                          {days.day}
                        </button>
                      </div>
                    </td>
                  ) : (
                    <td className="pt-6">
                      <div
                        className={`${
                          isVacationValid(
                            customerSolutionistDetails.solutionistWorkSettings,
                            {
                              day: days.day,
                              month: month || "",
                              year: year || 0,
                            },
                            weeksArray
                          ) && "bg-black"
                        } px-4 flex w-full justify-center`}
                      >
                        <p>
                          <button
                            onClick={() =>
                              updateDaySelection(
                                days.day,
                                weeksArray,
                                updateStore
                              )
                            }
                            className={`${getDateStyle(
                              customerOrder,
                              userSelectedDate,
                              weeksArray,
                              customerSolutionistDetails,
                              currentMonthYear,
                              solutionistWorkSettings,
                              days
                            )}`}
                          >
                            {getVacationStatus(days.day, weeksArray)
                              ? "Out"
                              : days.day}
                          </button>
                        </p>
                      </div>
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
