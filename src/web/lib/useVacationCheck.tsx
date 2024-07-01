import { cSettings, monthNameToNumber } from ".";
import { DateSelection, weeksArrayTypes } from "./types/CalenderTypes";

export const calculateDaysBetweenDates = (
  startDate: string,
  endDate: string
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates = [];

  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    dates.push([d.getDate(), d.getMonth() + 1, d.getFullYear()]); // getMonth() returns month index starting from 0
  }

  return dates;
};

export const isVacationValid = (
  userSelectedDate: DateSelection,
  weeksArray?: weeksArrayTypes
) => {
  const startDate = cSettings.vacationStartDate;
  const endDate = cSettings.vacationEndDate;
  const daysBetweenArray = calculateDaysBetweenDates(startDate, endDate);

  const calenderDate = `${userSelectedDate.day}/${userSelectedDate.month}/${userSelectedDate.year}`;
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

  if (
    weeksArray?.month !== undefined &&
    weeksArray?.month?.length > 0 &&
    userSelectedDate.month !== weeksArray?.month &&
    userSelectedDate.year === weeksArray?.year
  )
    return false;
  else return dayStatus;
};

export const useVacationCheck = (userSelectedDate: DateSelection) => {
  const isTimeSelectionAllow = isVacationValid(userSelectedDate);

  return {
    isTimeSelectionAllow,
  };
};
