import { SolutionistWorkSetting } from "../../../store/solutionistWorkSettingsSlice";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";
import {
  DayKeys,
  dayWithShortNames,
} from "../../components/customer-calender-time/data-setup";
import { monthNames, monthNameToNumberMarch } from "../../lib";
import { DateSelection, WeeksData } from "../../lib/types/CalenderTypes";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { isVacationValid } from "../../lib/useVacationCheck";

// ✅ Commonly used CSS classes
export const inputCSS =
  "px-2 py-3 bg-white w-full text-sm border-b-2 focus:border-[#011c2b] outline-none";
export const errorCss = "border-2 border-rose-600";
export const customerInputCSS =
  "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

// ✅ Button & Selection Styles
export const availableTimeCSS =
  "cursor-pointer bg-white inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center border rounded-lg text-blue-600 border-blue-600 peer-checked:bg-purple-600 peer-checked:text-white hover:bg-blue-500";
export const userTimeSelectedCSS =
  "bg-green-600 inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center border rounded-lg text-white border-blue-600";
export const scheduleTimeSelectedCSS =
  "bg-purple-500 inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center border rounded-lg text-white border-blue-600";
export const grayOutTime =
  "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center border rounded-lg text-white border-blue-600 bg-gray-500";
export const purpleBookedTime =
  "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center border rounded-lg text-white border-blue-600 bg-purple-500";
export const disablePastDatesTime =
  "cursor-none pointer-events-none bg-gray-200 rounded-full px-4 flex w-8 justify-center";

// ✅ Selection Highlight Styles
export const selectedCSS =
  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-500 hover:bg-indigo-500 text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-indigo-700 rounded-full";
export const vacationCSS =
  "cursor-none pointer-events-none hover:bg-black text-base w-8 h-8 flex items-center justify-center font-medium text-white bg-black";
export const timeSelectedCSS =
  "bg-purple-600 text-white items-center justify-center p-2 text-sm font-medium text-center border rounded-lg border-blue-600";

// ✅ Button Styles
export const grayButtonCSS =
  "px-3 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-600 hover:bg-gray-700";
export const purpleButtonCSS =
  "px-6 py-2.5 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-purple-600 hover:bg-purple-700";

export const getDateStyle = (
  customerOrder: CustomerFormData,
  userSelectedDate: DateSelection,
  weeksArray: WeeksData,
  customerSolutionistDetails: SolutionistResponseTypes,
  currentMonthYear: {
    showMonth: string;
    showYear: number;
  },
  solutionistWorkSettings: SolutionistWorkSetting,
  days: { day: number; dayTitle: string }
): string => {
  // Destructure current month/year and user-selected date
  const { showMonth, showYear } = currentMonthYear;
  const { month, year, day } = userSelectedDate;

  // Parse solutionist's available days
  const availableDays = (() => {
    const availableDaysJSON =
      customerSolutionistDetails?.solutionistWorkSettings?.availableDays;
    if (!availableDaysJSON) return [];
    try {
      const parsedDays = JSON.parse(availableDaysJSON as string);
      return parsedDays?.days || [];
    } catch {
      return [];
    }
  })();

  const solutionDate = new Date(
    customerOrder.solutionDateContract.solutionDate
  );
  const systemDate = new Date();
  const systemMonthNumber =
    monthNameToNumberMarch[monthNames[systemDate.getMonth()].substring(0, 3)];
  const currentMonthNumber =
    monthNameToNumberMarch[weeksArray?.month?.substring(0, 3)];
  const isDayAvailable = availableDays.includes(
    dayWithShortNames[days.dayTitle as DayKeys]
  );
  const isVacation = isVacationValid(
    customerSolutionistDetails.solutionistWorkSettings,
    { day: days.day, month: showMonth, year: showYear },
    weeksArray
  );
  const isSameMonthAndYear =
    month === weeksArray?.month && year === weeksArray?.year;

  if (!isDayAvailable && availableDays.length > 0) return disablePastDatesTime;
  if (isVacation) return vacationCSS;
  if (day === days.day && isSameMonthAndYear) return selectedCSS;
  if (solutionDate.getDate() === days.day && isSameMonthAndYear)
    return selectedCSS;
  if (weeksArray?.year === year && systemMonthNumber < currentMonthNumber)
    return "";
  if (
    systemMonthNumber === currentMonthNumber &&
    systemDate.getDate() > days.day
  )
    return disablePastDatesTime;
  if (weeksArray?.year === year && systemMonthNumber > currentMonthNumber)
    return disablePastDatesTime;

  return "";
};
