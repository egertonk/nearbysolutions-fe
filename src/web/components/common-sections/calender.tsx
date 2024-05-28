import { greaterThanArrowSVG, lessThanArrowSVG } from "../../assets/svg/svgs";
import { DateSelection } from "../../lib/types/calenderTypes";
import { useCalender } from "../../lib/useCalender";

type Props = {
  fullDate: string;
  currentMonthSelection: string;
  currentYearSelection: number;
  showNextMonth: boolean;
  isDateChangeAllow?: boolean;
  userSelectedDate: DateSelection | undefined;
  setShowNextMonth: React.Dispatch<React.SetStateAction<boolean>>;
  updateDateSelection: (day: number, month: string, year: number) => void;
};

export const Calender: React.FC<Props> = ({
  fullDate,
  currentMonthSelection,
  currentYearSelection,
  showNextMonth,
  userSelectedDate,
  isDateChangeAllow,
  setShowNextMonth,
  updateDateSelection,
}) => {
  const { date, dayTitles, nextWeeksArray, currentWeeksArray } = useCalender();

  const weeksArray = showNextMonth ? nextWeeksArray : currentWeeksArray;
  const disablePastDatesTime =
    "cursor-none pointer-events-none bg-gray-200 rounded-full w-5 h-6";
  const selectedCSS =
    "focus:outline-none focus:ring-indigo-700 focus:bg-red-500 hover:bg-red-500 text-base w-5 flex items-center justify-center font-medium text-white bg-red-700 rounded-full";

  return (
    <div className="md:p-8 p-5 dark:bg-gray-800 bg-white rounded-t auto-cols-max">
      <div className="px-4 flex items-center justify-between">
        <span
          tabIndex={0}
          className="focus:outline-none  text-base font-bold dark:text-gray-100 text-gray-800"
        >
          {fullDate}
        </span>
        <div className="flex items-center">
          <button
            aria-label="calendar backward"
            className="focus:text-gray-400 hover:text-gray-400 text-gray-800 dark:text-gray-100"
            onClick={() => setShowNextMonth(false)}
          >
            {lessThanArrowSVG}
          </button>
          <button
            aria-label="calendar forward"
            onClick={() => setShowNextMonth(true)}
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
            {weeksArray.map((weeks, index) => (
              <tr key={`week-${index}`}>
                {weeks.map((days) =>
                  days.day === null ? (
                    <td
                      className="pt-6"
                      key={`previous-month-${days.dayTitle}`}
                    >
                      <div className="px-2 py-2 cursor-pointer flex w-full justify-center" />
                    </td>
                  ) : days.day === date && showNextMonth === false ? (
                    <td
                      className="pt-6"
                      key={`previous-month-${days.dayTitle}`}
                    >
                      <div
                        className="w-full h-full"
                        key={`current-day-${days.dayTitle}`}
                      >
                        <div className="flex items-center justify-center w-full rounded-full cursor-pointer">
                          <a
                            role="link"
                            href="#"
                            onClick={() =>
                              updateDateSelection(
                                days.day,
                                currentMonthSelection,
                                currentYearSelection
                              )
                            }
                            tabIndex={0}
                            className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full"
                          >
                            {days.day}
                          </a>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <td className="pt-6">
                      <div className="px-4 flex w-full justify-center">
                        <p
                          className={`${
                            days.day >= date
                              ? `text-base cursor-pointer font-medium  ${
                                  isDateChangeAllow &&
                                  days.day === userSelectedDate?.day
                                    ? selectedCSS
                                    : "text-gray-500 dark:text-gray-100"
                                }`
                              : showNextMonth
                              ? "text-base cursor-pointer text-gray-500 dark:text-gray-100 font-medium"
                              : disablePastDatesTime
                          }`}
                        >
                          <a
                            role="link"
                            onClick={() =>
                              updateDateSelection(
                                days.day,
                                currentMonthSelection,
                                currentYearSelection
                              )
                            }
                            href="#"
                            className={`
                                  ${
                                    userSelectedDate?.day === days.day &&
                                    userSelectedDate?.month ===
                                      currentMonthSelection &&
                                    `${
                                      days.day >= date
                                        ? selectedCSS
                                        : showNextMonth
                                        ? selectedCSS
                                        : disablePastDatesTime
                                    }`
                                  }
                                  `}
                          >
                            {days.day}
                          </a>
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
