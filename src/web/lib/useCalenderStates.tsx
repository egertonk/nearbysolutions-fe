import { useState } from "react";
import { DateSelection } from "./types/CalenderTypes";
import { useCalender } from "./useCalender";
import { monthNames } from ".";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const useCalenderStates = () => {
  const [showNextMonth, setShowNextMonth] = useState(false);
  const [showPrevMonth, setShowPrevMonth] = useState(false);
  const [userSelectedTime, setUserSelectedTime] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const { year, dayNames, nextMonthName, currentMonthName, date, day, month } =
    useCalender();

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
  };
};
