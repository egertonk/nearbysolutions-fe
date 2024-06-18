import { useDispatch, useSelector } from "react-redux";
import { greaterThanArrowSVG, lessThanArrowSVG } from "../../assets/svg/svgs";
import { cSettings } from "../../lib";
import { DateSelection } from "../../lib/types/CalenderTypes";
import { useCalender } from "../../lib/useCalender";
import { RootState } from "../../../store";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { useEffect, useState } from "react";

type Props = {
  fullDate: string;
  currentMonthSelection: string;
  currentYearSelection: number;
  showNextMonth: boolean;
  isDateChangeAllow?: boolean;
  userSelectedDate: DateSelection | undefined;
  setShowNextMonth: React.Dispatch<React.SetStateAction<boolean>>;
  updateDateSelection: (day: number, month: string, year: number) => void;
  formattedDate: string;
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
  formattedDate,
}) => {
  const [isUpdateValid, setIsUpdateValid] = useState(false);
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state.formData);
  const customerOrder = states.customerOrder;
  const isEditOrder = states.isEditOrder;

  const solutionDate = new Date(customerOrder.solutionDate);

  const {
    date,
    dayTitles,
    nextWeeksArray,
    currentWeeksArray,
    monthNameToNumber,
  } = useCalender();

  const weeksArray = showNextMonth ? nextWeeksArray : currentWeeksArray;
  const disablePastDatesTime =
    "cursor-none pointer-events-none bg-gray-200 rounded-full w-5 h-6";
  const selectedCSS =
    "focus:outline-none focus:ring-indigo-700 focus:bg-red-500 hover:bg-red-500 text-base w-5 flex items-center justify-center font-medium text-white bg-red-700 rounded-full";

  const calculateDaysBetweenDates = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dates = [];

    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      dates.push([d.getDate(), d.getMonth() + 1, d.getFullYear()]); // getMonth() returns month index starting from 0
    }

    return dates;
  };

  const startDate = cSettings.vacationStartDate;
  const endDate = cSettings.vacationEndDate;
  const daysBetweenArray = calculateDaysBetweenDates(startDate, endDate);

  const isVacationValid = (calendarDay: number) => {
    const calenderDate = `${calendarDay}/${currentMonthSelection}/${currentYearSelection}`;
    const [splitDay, splitMonth, splitear] = calenderDate.split("/");
    const monthNumber = monthNameToNumber[splitMonth.substring(0, 3)];
    const parseDate = [
      parseInt(splitDay, 10),
      monthNumber,
      parseInt(splitear, 10),
    ];

    const [day, month, year] = parseDate;

    const dayStatus = daysBetweenArray.some(
      (date) => date[0] === day && date[1] === month && date[2] === year
    );

    return dayStatus;
  };

  const updateStore = () => {
    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      solutionDate: `${userSelectedDate?.month}/${userSelectedDate?.day}/${userSelectedDate?.year}`,
      solutionFormattedDate: formattedDate,
    };

    dispatch(setCustomerOrder(updatedOrder));
  };

  const updateDaySelection = (
    day: number,
    month: string,
    year: number | undefined
  ) => {
    updateDateSelection(day, month, year || 0);
    setIsUpdateValid(true);
  };

  useEffect(() => {
    if (isUpdateValid) updateStore();
  }, [userSelectedDate]);

  // todo - remove
  const compareDates = () => {
    const parsedDate1 = new Date(
      `${userSelectedDate?.month}/${userSelectedDate?.day}/${userSelectedDate?.year}`
    );
    const parsedDate2 = new Date(customerOrder.solutionDate);

    // Check if the dates are the same
    if (
      parsedDate1.getFullYear() === parsedDate2.getFullYear() &&
      parsedDate1.getMonth() === parsedDate2.getMonth() &&
      parsedDate1.getDate() === parsedDate2.getDate()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const getDateStyle = (days: { day: number; dayTitle: string }) => {
    if (
      isEditOrder &&
      solutionDate.getDate() === days.day &&
      customerOrder.solutionFormattedDate
        .toLowerCase()
        .includes(currentMonthSelection.toLowerCase()) &&
      solutionDate.getFullYear() === currentYearSelection
    ) {
      return selectedCSS;
    } else if (isVacationValid(days.day)) {
      return "text-white cursor-none pointer-events-none";
    } else if (days.day >= date) {
      return `text-base cursor-pointer font-medium  ${
        isDateChangeAllow && days.day === userSelectedDate?.day
          ? selectedCSS
          : "text-gray-500 dark:text-gray-100"
      }`;
    } else if (showNextMonth) {
      return "text-base cursor-pointer text-gray-500 dark:text-gray-100 font-medium";
    } else {
      return disablePastDatesTime;
    }
  };

  const getDateStyleTwo = (days: { day: number; dayTitle: string }) => {
    if (
      userSelectedDate?.day === days.day &&
      userSelectedDate?.month === currentMonthSelection
    ) {
      if (days.day >= date) {
        return selectedCSS;
      } else if (showNextMonth) {
        return selectedCSS;
      } else return disablePastDatesTime;
    }
  };

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
                        <div
                          className={`${
                            isVacationValid(days.day) && "bg-black"
                          } flex items-center justify-center w-full rounded-full cursor-pointer`}
                        >
                          <button
                            onClick={() =>
                              updateDaySelection(
                                days.day,
                                currentMonthSelection,
                                currentYearSelection
                              )
                            }
                            tabIndex={0}
                            className="focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full"
                          >
                            {days.day}
                          </button>
                        </div>
                      </div>
                    </td>
                  ) : (
                    <td className="pt-6">
                      <div
                        className={`${
                          isVacationValid(days.day) && "bg-black"
                        } px-4 flex w-full justify-center`}
                      >
                        <p className={`${getDateStyle(days)}`}>
                          <button
                            onClick={() =>
                              updateDaySelection(
                                days.day,
                                currentMonthSelection,
                                currentYearSelection
                              )
                            }
                            className={`${getDateStyleTwo(
                              days
                            )}                                  `}
                          >
                            {isVacationValid(days.day) ? "Out" : days.day}
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
