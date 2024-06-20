import { useNavigate } from "react-router";
import { cSettings, isTimeValid } from "../../lib";
import { DateSelection } from "../../lib/types/CalenderTypes";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { useTimeIntervals } from "../../lib/useTimeIntervals";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";

type Props = {
  requiredData: {
    date: number;
    userSelectedDate: DateSelection;
    isCurrentMonth: boolean;
    solutionStartTimes: string[];
  };
  isTimeChangeAllow?: any;
};

export const TimeList: React.FC<Props> = ({
  requiredData,
  isTimeChangeAllow,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { generate24HourIntervals, generateIntervals } = useTimeIntervals();
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );
  const contractorSettings = cSettings; // API

  // Generate the intervals based on the provided start and end times
  const timeIntervals = generateIntervals(
    contractorSettings.businessStartTime.substring(0, 5),
    contractorSettings.businessEndTime.substring(0, 5)
  ) as {
    twentyFourHour: string;
    twelveHour: string;
  }[];

  const updateStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      solutionStartTime: e.target.value,
    };

    dispatch(setCustomerOrder(updatedOrder));
    navigate(`/customer-form`);
  };

  const getDateStyle = (twelveHour: string) => {
    if (twelveHour.toString() === customerOrder.solutionStartTime.toString()) {
      return timeSelected;
    } else if (requiredData.isCurrentMonth) {
      if (isTimeValid(twelveHour)) {
        return timeSelectionCSS;
      } else {
        return "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:border-blue-500 bg-gray-500";
      }
    } else {
      return timeSelectionCSS;
    }
  };

  const timeSelectionCSS =
    "cursor-pointer bg-white inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-purple-600 dark:hover:border-blue-600 dark:peer-checked:bg-purple-500 peer-checked:bg-purple-600 hover:text-white peer-checked:text-white";

  const timeSelected =
    "bg-red-500 inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:hover:text-white ";

  const scheduleTimeSelected =
    "bg-purple-500 inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:hover:text-white ";

  const checkSchedule = (time: string) => {
    const foundTime = requiredData.solutionStartTimes.find(
      (timeData) => timeData === time
    );
    if (foundTime) return true;
    return false;
  };

  return (
    <ul id="timetable" className="grid w-full grid-cols-4 gap-2 mt-5">
      {contractorSettings.twelveHoursStatus
        ? timeIntervals.map((time) => (
            <>
              {requiredData.userSelectedDate?.day !== undefined &&
              requiredData.userSelectedDate?.day !== requiredData.date ? (
                <li
                  className={`${
                    isTimeChangeAllow &&
                    customerOrder.solutionStartTime === time.twelveHour &&
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
                    htmlFor={`${time.twelveHour}`}
                    className={`${
                      checkSchedule(time.twelveHour)
                        ? scheduleTimeSelected
                        : isTimeChangeAllow &&
                          customerOrder.solutionStartTime === time.twelveHour
                        ? ""
                        : timeSelectionCSS
                    }`}
                  >
                    {time.twelveHour}-----
                  </label>
                </li>
              ) : (
                <li>
                  <input
                    type="radio"
                    id={`${time.twelveHour}`}
                    value={`${time.twelveHour}`}
                    className="hidden peer"
                    name="timetable"
                    onChange={(e) => updateStore(e)}
                    disabled={
                      requiredData.isCurrentMonth
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
        : generate24HourIntervals().map((time) => (
            <li key={time}>
              <input
                type="radio"
                id={`${time}`}
                value={time}
                className="hidden peer"
                name="timetable"
                onChange={(e) => updateStore(e)}
              />
              <label
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
