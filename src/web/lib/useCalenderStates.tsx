import { useState } from "react";
import { useCalender } from "./useCalender";
import { monthNames, monthNameToNumber } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { isVacationValid } from "./useVacationCheck";
import { DateSelection, WeeksData } from "./types/CalenderTypes";
import { SolutionistResponseTypes } from "./types/solutionistTypes";

export const useCalenderStates = (
  customerSolutionistDetails: SolutionistResponseTypes
) => {
  const [isUpdateValid, setIsUpdateValid] = useState(false);
  const [showNextMonth, setShowNextMonth] = useState(false);
  const [showPrevMonth, setShowPrevMonth] = useState(false);
  const [userSelectedTime, setUserSelectedTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const {
    year,
    dayNames,
    nextMonthName,
    currentMonthName,
    date,
    day,
    month,
    getMappedDays,
  } = useCalender();

  const currentMonthSelection = showNextMonth
    ? nextMonthName
    : currentMonthName;
  const currentYearSelection =
    currentMonthName === "December" ? year + 1 : year;
  const isCurrentMonth = currentMonthName === currentMonthSelection;

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );
  const solutionDate = new Date(
    customerOrder?.solutionDateContract?.solutionDate
  );

  const [userSelectedDate, setUserSelectedDate] = useState<DateSelection>({
    day: solutionDate.getDate() || date,
    month: monthNames[solutionDate.getMonth()] || currentMonthSelection,
    year: solutionDate.getFullYear() || currentYearSelection,
  });

  //Find user day selection
  const specificDate = new Date(
    `${userSelectedDate?.month} ${userSelectedDate?.day}, ${userSelectedDate?.year}`
  ).getDay();

  // Get the full names for the day and month
  const dayName = dayNames[!Number.isNaN(specificDate) ? specificDate : day];

  const updateDateSelection = (day: number, month: string, year: number) => {
    setUserSelectedDate({
      day,
      month,
      year,
    });
    setFormattedDate(`${dayName} ${day} ${month} ${year}`);
  };

  const updateDaySelection = (
    actualDay: number,
    weeksArray: WeeksData,
    updateStore: (defaultValueDate?: DateSelection) => void
  ) => {
    updateDateSelection(
      actualDay,
      weeksArray?.month || "",
      weeksArray?.year || 0
    );
    updateStore({
      month: userSelectedDate.month,
      day: actualDay,
      year: userSelectedDate.year,
    });
    setIsUpdateValid(true);
  };

  const getVacationStatus = (day: number, weeksArray: WeeksData) => {
    return isVacationValid(
      customerSolutionistDetails.solutionistWorkSettings,
      {
        day: day,
        month: userSelectedDate.month,
        year: userSelectedDate.year,
      },
      weeksArray
    );
  };

  const handleCalenderArrows = (
    weeksArray: WeeksData,
    setWeeksArray: React.Dispatch<React.SetStateAction<WeeksData>>,
    attowAction?: string
  ) => {
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

  return {
    showNextMonth,
    setShowNextMonth,
    setUserSelectedDate,
    userSelectedDate,
    userSelectedTime,
    setUserSelectedTime,
    updateDateSelection,
    currentMonthSelection,
    currentYearSelection,
    formattedDate,
    date,
    day,
    year,
    month,
    isCurrentMonth,
    showPrevMonth,
    setShowPrevMonth,
    isUpdateValid,
    setIsUpdateValid,
    updateDaySelection,
    getVacationStatus,
    handleCalenderArrows,
  };
};
