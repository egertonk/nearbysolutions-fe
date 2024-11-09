import { compareDates, isTimeValid } from "../../lib";
import { TimeProps } from "../../lib/types/CalenderTypes";
import { useTimeIntervals } from "../../lib/useTimeIntervals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import {
  availableTimeCSS,
  grayOutTime,
  scheduleTimeSelectedCSS,
  userTimeSelectedCSS,
} from "../../assets/common-css/css";
import { useVacationCheck } from "../../lib/useVacationCheck";

export const TimeList: React.FC<TimeProps> = ({
  requiredData,
  previousDateCheck,
  isTimeChangeAllow,
  filteredOrders,
}) => {
  const dispatch = useDispatch();

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );
  const solutionistWorkSettings = useSelector(
    (state: RootState) => state.solutionistWorkSettingsState
  );

  const { isTimeSelectionAllow } = useVacationCheck(
    solutionistWorkSettings,
    requiredData.userSelectedDate
  );

  const { generate24HourIntervals, generateIntervals } = useTimeIntervals();

  // Generate the intervals based on the provided start and end times
  const timeIntervals = generateIntervals(
    solutionistWorkSettings.businessStartTime.substring(0, 5),
    solutionistWorkSettings.businessEndTime.substring(0, 5)
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
    requiredData.setIsCalenderReady(true);
  };

  const getDateStyle = (twelveHour: string) => {
    const nowDate = new Date();
    const isDateTimeListValid = compareDates(
      `${previousDateCheck.dateUpdate.month}/${previousDateCheck.dateUpdate.day}/${previousDateCheck.dateUpdate.year}`,
      `${nowDate}`
    );

    if (isTimeSelectionAllow) return grayOutTime;
    else if (
      twelveHour.toString() ===
      customerOrder.solutionDateContract.solutionStartTime.toString()
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

  const checkTimeForPreviousOrders = (time: string) => {
    const foundTime = filteredOrders.find((timeData) => {
      return timeData.solutionDateContract.solutionStartTime === time;
    });
    if (foundTime) return true;
    return false;
  };

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
                    isTimeChangeAllow &&
                    customerOrder.solutionDateContract.solutionStartTime ===
                      time.twelveHour &&
                    "bg-purple-600 text-white items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg border-blue-600 "
                  }`}
                >
                  <input
                    type="radio"
                    id={`${time.twelveHour}`}
                    value={`${time.twelveHour}`}
                    className="hidden peer"
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
                      checkTimeForPreviousOrders(time.twelveHour)
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
                    {time.twelveHour}
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
