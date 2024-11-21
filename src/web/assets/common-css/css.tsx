import { SolutionistWorkSetting } from "../../../store/solutionistWorkSettingsSlice";
import { SolutionistTypes } from "../../lib/types/solutionistTypes";
import {
  DayKeys,
  dayWithShortNames,
} from "../../components/customer-calender-time/data-setup";
import { monthNames, monthNameToNumberMarch } from "../../lib";
import { DateSelection, WeeksData } from "../../lib/types/CalenderTypes";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { isVacationValid } from "../../lib/useVacationCheck";

export const inputCSS =
  "px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#011c2b] outline-none";

export const errorCss = "border-2 border-rose-600";

export const customerInputCSS =
  "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

export const availableTimeCSS =
  "cursor-pointer bg-white inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-purple-600 dark:hover:border-blue-600 dark:peer-checked:bg-purple-500 peer-checked:bg-purple-600 hover:text-white peer-checked:text-white";

export const userTimeSelectedCSS =
  "bg-green-600 inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:hover:text-white ";

export const scheduleTimeSelectedCSS =
  "bg-purple-500 inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:hover:text-white ";

export const grayOutTime =
  "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:border-blue-500 bg-gray-500";

export const purpleBookedTime =
  "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:border-purple-500 bg-purple-500";

export const disablePastDatesTime =
  "cursor-none pointer-events-none bg-gray-200 rounded-full px-4 flex w-8 justify-center ";

export const selectedCSS =
  "focus:outline-none  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full";

export const vacationCSS =
  "cursor-none pointer-events-none focus:ring-black hover:bg-black text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-black";

export const timeSelectedCSS =
  "bg-purple-600 text-white items-center justify-center  p-2 text-sm font-medium text-center  border rounded-lg border-blue-600 ";

export const grayButtonCSS =
  "px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-600 hover:bg-gray-700 cursor-pointer";

export const getDateStyle = (
  customerOrder: CustomerFormData,
  userSelectedDate: DateSelection,
  weeksArray: WeeksData,
  solutionistDeatils: SolutionistTypes | undefined,
  currentMonthYear: {
    showMonth: string;
    showYear: number;
  },
  solutionistWorkSettings: SolutionistWorkSetting,
  days: { day: number; dayTitle: string }
) => {
  const { showMonth, showYear } = currentMonthYear;
  const { month, year, day } = userSelectedDate;

  const solutionDate = new Date(
    customerOrder.solutionDateContract.solutionDate
  );

  const systemDate = new Date();

  const sameMonth = month === weeksArray?.month && year === weeksArray?.year;

  const availableDays =
    solutionistDeatils?.talent?.solutionistWorkSettings?.[0]?.availableDays ||
    "";

  const systemMonthNumber =
    monthNameToNumberMarch[monthNames[systemDate.getMonth()]?.substring(0, 3)];
  const currentMonthNumber =
    monthNameToNumberMarch[weeksArray?.month?.substring(0, 3)];

  const currentCalendarVacationCheck = {
    day: days.day,
    month: showMonth,
    year: showYear,
  };
  const dayKey = days.dayTitle;

  if (
    availableDays.includes(dayWithShortNames[dayKey as DayKeys]) === false &&
    availableDays?.length > 0
  ) {
    console.log("1--contractor availableDays");
    return disablePastDatesTime;
  } else if (
    isVacationValid(
      solutionistWorkSettings,
      currentCalendarVacationCheck,
      weeksArray
    )
  ) {
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
