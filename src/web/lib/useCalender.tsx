import { useState } from "react";
import {
  dayNames,
  dayTitles,
  monthNameToNumber,
  monthNameToNumberMarch,
  monthNames,
} from ".";

type MonthDays = {
  day: number;
  dayTitle: string;
}[];

export const useCalender = () => {
  const [nextMonthName, setNextMonthName] = useState("");
  const [nextYearName, setNextYearName] = useState(0);

  // Get the current date
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = today.getDate();
  const day = today.getDay();

  // Get the current month name
  const currentMonthName = monthNames[month];

  // Function to get all days of a given month and year
  const getDaysInMonth = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: MonthDays = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ day: i, dayTitle: dayNames[date.getDay()] });
    }

    return days;
  };

  // Function to get days for the next 12 months
  const getNextTwelveMonthsDays = () => {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const newMonth = (month + i) % 12;
      const newYear = month + i >= 12 ? year + 1 : year;
      const daysInMonth = getDaysInMonth(newMonth, newYear);
      months.push({
        month: monthNames[newMonth],
        year: newYear,
        days: daysInMonth,
      });
    }
    return months;
  };

  // Function to chunk array into weeks
  const chunkIntoWeeks = (array: MonthDays) => {
    const weeks = [];
    for (let i = 0; i < array.length; i += 7) {
      weeks.push(array.slice(i, i + 7));
    }
    return weeks;
  };

  // Function to get mapped days for a given month and year
  const getMappedDays = (month: number, year: number) => {
    // Get the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    console.log(month, " month ", new Date(year, month, 0));
    // Generate an array of day numbers
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Get the first day of the month
    const firstDay = new Date(year, month - 1, 1); // Adjust month index
    const firstDayName = dayNames[firstDay.getDay()];

    // Find the index of the first day of the month in the dayTitles array
    const startIndex = dayTitles.indexOf(firstDayName.substring(0, 2));

    // Calculate the number of days to prepend
    const daysToPrepend = startIndex === -1 ? 0 : startIndex;
    const beginningDays = Array.from({ length: daysToPrepend }, (_, i) => ({
      day: null,
      dayTitle: dayTitles[i],
    }));

    // Create a mapping of day numbers with corresponding day titles, starting from the first day
    const mappedDays = [
      ...beginningDays,
      ...daysArray.map((day, index) => {
        const dayIndex = (startIndex + index) % 7;
        return { day, dayTitle: dayTitles[dayIndex] };
      }),
    ];

    const currentWeeksArray = chunkIntoWeeks(mappedDays as MonthDays);

    return currentWeeksArray;
  };

  const getNextMonth = () => {
    const userNextMonth = monthNameToNumber[nextMonthName?.substring(0, 3)];
    // Get the next month index and name
    const nextYear = userNextMonth === 11 ? nextYearName + 1 : nextYearName;
    const nextMonthIs = userNextMonth % 12;
    const nextMonth = monthNames[nextMonthIs];
    const mappedDays = getMappedDays(nextMonthIs, nextYearName);
    const nextWeeksArray = [] as MonthDays;

    return {
      weeksArray: nextWeeksArray,
      month: nextMonth,
      year: nextYear,
    };
  };

  const getPrevMonth = () => {
    const userNextMonth =
      monthNameToNumberMarch[nextMonthName?.substring(0, 3)];
    // Get the next month index and name
    const prevtYear = userNextMonth === 0 ? nextYearName - 1 : nextYearName;
    // const nextMonthIs = userNextMonth % 12;
    const previousMonthNumber = userNextMonth === 0 ? 11 : userNextMonth - 1;
    const prevMonth = monthNames[previousMonthNumber];
    const mappedDays = getMappedDays(previousMonthNumber, nextYearName);
    const prevWeeksArray = [] as MonthDays;

    return {
      weeksArray: prevWeeksArray,
      month: prevMonth,
      year: prevtYear,
    };
  };

  return {
    year,
    dayNames,
    today,
    nextMonthName,
    setNextMonthName,
    setNextYearName,
    nextYearName,
    currentMonthName,
    date,
    dayTitles,
    day,
    month,
    monthNameToNumber,
    getNextMonth,
    getPrevMonth,
    getMappedDays,
  };
};
