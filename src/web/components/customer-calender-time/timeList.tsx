import { compareDates, isTimeGreater, isTimeValid } from "../../lib";
import { useTimeIntervals } from "../../lib/useTimeIntervals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import {
  availableTimeCSS,
  purpleBookedTime,
  grayOutTime,
  scheduleTimeSelectedCSS,
  selectedCSS,
  timeSelectedCSS,
  userTimeSelectedCSS,
} from "../../assets/common-css/css";
import { useVacationCheck } from "../../lib/useVacationCheck";
import { useGetCountries } from "../../utils/fetchEndpoints";
import { TimeProps } from "../../lib/types/CalenderTypes";
import { time } from "console";
import { SolutionistWorkSettingsTypes } from "../../lib/types/solutionistTypes";

export const TimeList: React.FC<TimeProps> = ({
  requiredData,
  previousDateCheck,
  isTimeChangeAllow,
  filteredOrders,
  ordersGreaterThanTodaysDate,
  weeksArray,
  customerSolutionistDetails,
}) => {
  const dispatch = useDispatch();
  const { data: coutries, isFetching: isCoutriesFetching } = useGetCountries();

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const solutionistWorkSettings =
    customerSolutionistDetails.solutionistWorkSettings ??
    ({} as SolutionistWorkSettingsTypes);

  const { isTimeSelectionAllow } = useVacationCheck(
    solutionistWorkSettings,
    requiredData.userSelectedDate
  );

  const { generate24HourIntervals, generateIntervals } = useTimeIntervals();

  // Generate the intervals based on the provided start and end times
  const timeIntervals = generateIntervals(
    solutionistWorkSettings?.businessStartTime?.substring(0, 5) ?? "",
    solutionistWorkSettings?.businessEndTime?.substring(0, 5) ?? ""
  ) as {
    twentyFourHour: string;
    twelveHour: string;
  }[];

  const updateStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOrder = {
      ...customerOrder,
      solutionDateContract: {
        ...customerOrder.solutionDateContract,
        solutionStartTime: e.target.value,
      },
    };

    dispatch(setCustomerOrder(updatedOrder));
  };

  const isDateTimeInPast = (timeString: string): boolean => {
    const currentDate = new Date();

    // Check if the month is November (month index 10) and the year is 2024
    const isCurrentMonthYear =
      weeksArray.month === previousDateCheck.dateUpdate.month &&
      weeksArray.year === previousDateCheck.dateUpdate.year;

    if (isCurrentMonthYear && timeString) {
      // Parse the time string (e.g., "11:00 AM")
      const [time, period] = timeString?.split(" ");
      const [hourString, minuteString] = time?.split(":");
      let hour = parseInt(hourString, 10);
      const minute = parseInt(minuteString, 10);

      // Adjust the hour based on AM/PM
      if (period === "PM" && hour !== 12) {
        hour += 12;
      } else if (period === "AM" && hour === 12) {
        hour = 0;
      }

      // Create a Date object for the specified time on the current day in November 2024
      const specifiedTime = new Date(currentDate);
      specifiedTime.setHours(hour, minute, 0, 0); // Set the parsed hour and minute

      // Check if the current time has passed the specified time
      return currentDate > specifiedTime;
    }

    // If it's not November 2024, return false
    return false;
  };

  const getDateStyle = (twelveHour: string) => {
    const nowDate = new Date();
    const isDateTimeListValid = compareDates(
      `${previousDateCheck.dateUpdate.month}/${previousDateCheck.dateUpdate.day}/${previousDateCheck.dateUpdate.year}`,
      `${nowDate}`
    );

    if (findTimeFromPastOrders(twelveHour, "")) return purpleBookedTime;
    else if (isTimeSelectionAllow) return grayOutTime;
    else if (
      twelveHour.toString() ===
        customerOrder.solutionDateContract.solutionStartTime.toString() &&
      isDateTimeInPast(twelveHour) === false
    ) {
      return userTimeSelectedCSS;
    } else if (requiredData.isCurrentMonth) {
      if (isTimeValid(twelveHour)) {
        return availableTimeCSS;
      } else {
        if (isDateTimeListValid) return availableTimeCSS;
        else return grayOutTime;
      }
    } else {
      return availableTimeCSS;
    }
  };

  const checkSchedule = (time: string) => {
    const foundTime = requiredData.solutionStartTimes.find(
      (timeData) => timeData === time
    );
    if (foundTime) return true;
    return false;
  };

  // const checkTimeForPreviousOrders = (time: string) => {
  //   const foundTime = filteredOrders.find((timeData) => {
  //     return timeData.solutionDateContract.solutionStartTime === time;
  //   });
  //   if (foundTime) return true;
  //   return false;
  // };

  const findTimeFromPastOrders = (time: string, date: string) => {
    const isTimeFound = ordersGreaterThanTodaysDate?.find(
      (data) => data.startTime === time
    );

    return isTimeFound !== undefined ? true : false;
  };
  // const isTimeGreater = (time1: any, time2: any) => {
  //   if (ordersGreaterThanTodaysDate !== undefined) {
  //     const date1 = new Date();
  //     date1.setHours(ordersGreaterThanTodaysDate[0]?.startTime as any);
  //     date1.setMinutes(time1.minutes);

  //     const date2 = new Date();
  //     date2.setHours(time2.hours);
  //     date2.setMinutes(time2.minutes);

  //     return date1 > date2;
  //   }
  //   return false;
  // };

  return (
    <ul
      id="timetable"
      className="grid w-full grid-cols-4 gap-2 mt-5"
      key={Math.random()}
    >
      {solutionistWorkSettings.twelveHoursStatus
        ? timeIntervals.map((time, index) => (
            <>
              {requiredData.userSelectedDate?.day !== undefined &&
              requiredData.userSelectedDate?.day !== requiredData.date ? (
                <li
                  key={`tim-li-${index}`}
                  className={`${
                    customerOrder.solutionDateContract.solutionStartTime ===
                      time.twelveHour && timeSelectedCSS
                  }`}
                >
                  <input
                    type="radio"
                    id={`${time.twelveHour}`}
                    value={`${time.twelveHour}`}
                    className={`${selectedCSS} hidden peer`}
                    name="timetable"
                    onChange={(e) => updateStore(e)}
                    disabled={checkSchedule(time.twelveHour)}
                  />
                  <label
                    key={`label-${index}`}
                    htmlFor={`${time.twelveHour}`}
                    className={`${
                      checkSchedule(time.twelveHour)
                        ? scheduleTimeSelectedCSS
                        : isTimeChangeAllow &&
                          customerOrder.solutionDateContract
                            .solutionStartTime === time.twelveHour
                        ? ""
                        : customerOrder.solutionDateContract
                            .solutionStartTime === time.twelveHour
                        ? timeSelectedCSS
                        : availableTimeCSS
                    }`}
                  >
                    {time.twelveHour}
                  </label>
                </li>
              ) : (
                <li key={`li-${index}`}>
                  <input
                    type="radio"
                    id={`${time.twelveHour}`}
                    value={`${time.twelveHour}`}
                    className="hidden peer"
                    name="timetable"
                    onChange={(e) => updateStore(e)}
                    disabled={
                      findTimeFromPastOrders(time.twelveHour, "")
                        ? true
                        : isTimeSelectionAllow
                        ? isTimeSelectionAllow
                        : requiredData.isCurrentMonth
                        ? !isTimeValid(time.twelveHour)
                        : false
                    }
                  />
                  <label
                    htmlFor={`${time.twelveHour}`}
                    className={`${getDateStyle(time.twelveHour)}`}
                  >
                    {time.twelveHour}{" "}
                    {findTimeFromPastOrders(time.twelveHour, "") && "Booked"}
                  </label>
                </li>
              )}
            </>
          ))
        : generate24HourIntervals().map((time, index) => (
            <li key={`time-${index}`}>
              <input
                type="radio"
                id={`${time}`}
                value={time}
                className="hidden peer"
                name="timetable"
                onChange={(e) => updateStore(e)}
              />
              <label
                key={`label-2-${index}`}
                htmlFor={`${time}`}
                className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 peer-checked:bg-blue-600 hover:text-white peer-checked:text-white hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:peer-checked:bg-blue-500"
              >
                {time} GMT
              </label>
            </li>
          ))}
    </ul>
  );
};
