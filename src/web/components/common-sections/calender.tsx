import { useSelector } from "react-redux";
import { greaterThanArrowSVG, lessThanArrowSVG } from "../../assets/svg/svgs";
import { DateSelection } from "../../lib/types/CalenderTypes";
import { useCalender } from "../../lib/useCalender";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { isVacationValid } from "../../lib/useVacationCheck";
import { useCalenderStates } from "../../lib/useCalenderStates";
import {
  monthNameToNumber,
  monthNameToNumberMarch,
  monthNames,
} from "../../lib";
import {
  disablePastDatesTime,
  selectedCSS,
  vacationCSS,
} from "../../assets/common-css/css";

export type DateParts = {
  month: string;
  day: number;
  year: number;
};

export const extractDateParts = (dateStr: string): DateParts | null => {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    return {
      month: parts[0] || "",
      day: Number(parts[1]) || 0,
      year: Number(parts[2]) || 0,
    };
  }
  return null;
};

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
};

type WeeksData = {
  weeksArray: {
    day: number;
    dayTitle: string;
  }[][];
  month: string | "";
  year: number | 0;
};

export const defaultWeeksData: WeeksData = {
  weeksArray: Array(4).fill(Array(7).fill({ day: 0, dayTitle: "" })),
  month: "",
  year: 0,
};

export const Calender: React.FC<Props> = ({
  currentMonthYear,
  updateStore,
}) => {
  const { showNextMonth, userSelectedDate, updateDateSelection } =
    useCalenderStates();

  const { showMonth, showYear } = currentMonthYear;
  const { month, year, day } = userSelectedDate;

  const [isUpdateValid, setIsUpdateValid] = useState(false);
  const [weeksArray, setWeeksArray] = useState<WeeksData>(defaultWeeksData);

  const states = useSelector((state: RootState) => state.formData);
  const customerOrder = states.customerOrder;
  const isEditOrder = states.isEditOrder;

  const solutionDate = new Date(
    customerOrder.solutionDateContract.solutionDate
  );

  const { date, dayTitles, getMappedDays } = useCalender();

  const updateDaySelection = (day: number) => {
    updateDateSelection(day, weeksArray?.month || "", weeksArray?.year || 0);
    updateStore({
      month,
      day,
      year,
    });
    setIsUpdateValid(true);
  };

  const getVacationStatus = (day: number) => {
    return isVacationValid(
      {
        day: day,
        month: month,
        year: year,
      },
      weeksArray
    );
  };

  // useEffect(() => {
  //   if (month) {
  //     setWeeksArray({
  //       weeksArray: getMappedDays(
  //         monthNameToNumber[month.substring(0, 3)],
  //         year
  //       ),
  //       month: month,
  //       year: year,
  //     });
  //   }
  // }, []);

  const systemDate = new Date();

  const sameMonth = month === weeksArray?.month && year === weeksArray?.year;

  const getDateStyle = (days: { day: number; dayTitle: string }) => {
    const systemMonthNumber =
      monthNameToNumberMarch[
        monthNames[systemDate.getMonth()]?.substring(0, 3)
      ];
    const currentMonthNumber =
      monthNameToNumberMarch[weeksArray?.month?.substring(0, 3)];

    const currentCalendarVacationCheck = {
      day: days.day,
      month: showMonth,
      year: showYear,
    };

    if (isVacationValid(currentCalendarVacationCheck, weeksArray)) {
      console.log("1--");
      return vacationCSS;
    } else if (day === days.day && sameMonth) {
      console.log("2--");
      return selectedCSS;
    } else if (solutionDate.getDate() === days.day && sameMonth) {
      console.log("3--");
      return selectedCSS;
    } else if (
      weeksArray?.year === year &&
      systemMonthNumber < currentMonthNumber
    ) {
      console.log("4--");
      return "";
    } else if (
      systemMonthNumber === currentMonthNumber &&
      systemDate.getDate() > days.day
    ) {
      console.log("5--");
      return disablePastDatesTime;
    } else if (
      weeksArray?.year === year &&
      systemMonthNumber > currentMonthNumber
    ) {
      console.log("6--");
      return disablePastDatesTime;
    }
  };

  const handleCalenderArrows = (attowAction?: string) => {
    if (attowAction === "previous") {
      const previousMonthNumber =
        monthNameToNumber[weeksArray?.month.substring(0, 3) || ""] - 1;

      setWeeksArray({
        weeksArray: getMappedDays(previousMonthNumber, year),
        month:
          monthNames[previousMonthNumber > 0 ? previousMonthNumber - 1 : 11],
        year:
          previousMonthNumber === 0
            ? weeksArray?.year - 1
            : weeksArray?.year || 0,
      });
    } else {
      const MonthNumber =
        monthNameToNumber[weeksArray?.month.substring(0, 3) || ""] + 1;

      const mName =
        monthNames[
          MonthNumber <= 12 && MonthNumber >= 1
            ? MonthNumber - 1
            : MonthNumber > 12
            ? 0
            : 11
        ];

      setWeeksArray({
        weeksArray: getMappedDays(MonthNumber, year),
        month: mName,
        year: MonthNumber > 12 ? weeksArray?.year + 1 || 0 : weeksArray?.year,
      });
    }
  };

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
            onClick={() => handleCalenderArrows("previous")}
          >
            {lessThanArrowSVG}
          </button>
          <button
            aria-label="calendar forward"
            onClick={() => handleCalenderArrows()}
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
                          onClick={() => updateDaySelection(days.day)}
                          tabIndex={0}
                          className={getDateStyle(days)}
                          disabled={getVacationStatus(days.day)}
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
                            onClick={() => updateDaySelection(days.day)}
                            className={`${getDateStyle(days)}`}
                          >
                            {getVacationStatus(days.day) ? "Out" : days.day}
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
