import { useState } from "react";
import { DateSelection } from "./types/calenderTypes";
import { useCalender } from "./useCalender";

export const useCalenderStates = () => {
  const [showNextMonth, setShowNextMonth] = useState(false);
  const [userSelectedDate, setUserSelectedDate] = useState<DateSelection>();
  const [userSelectedTime, setUserSelectedTime] = useState("");

  const {
    year,
    dayNames,
    today,
    nextMonthName,
    currentMonthName,
    date,
    day,
    month,
  } = useCalender();

  const currentMonthSelection = showNextMonth
    ? nextMonthName
    : currentMonthName;
  const currentYearSelection =
    currentMonthName === "December" ? year + 1 : year;
  const isCurrentMonth = currentMonthName === currentMonthSelection;

  //Find user day selection
  const specificDate = new Date(
    `${userSelectedDate?.month} ${userSelectedDate?.day}, ${userSelectedDate?.year}`
  ).getDay();

  // Get the full names for the day and month
  const dayName = dayNames[!Number.isNaN(specificDate) ? specificDate : day];
  const dayOfMonth = today.getDate();

  // Format the date string
  const formattedDate = `${dayName} ${userSelectedDate?.day || dayOfMonth} ${
    userSelectedDate?.month || currentMonthName
  } ${currentYearSelection}`;

  const updateDateSelection = (day: number, month: string, year: number) => {
    setUserSelectedDate({
      day,
      month,
      year,
    });
  };

  const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setUserSelectedTime(value);

    if (userSelectedDate === undefined)
      setUserSelectedDate({
        day: date,
        month: currentMonthSelection,
        year: currentYearSelection,
      });
  };

  return {
    showNextMonth,
    setShowNextMonth,
    userSelectedDate,
    setUserSelectedDate,
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
    handleChangeTime,
    isCurrentMonth,
  };
};
