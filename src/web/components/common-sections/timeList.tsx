import { cSettings, isTimeValid } from "../../lib";
import { DateSelection } from "../../lib/types/calenderTypes";
import { useTimeIntervals } from "../../lib/useTimeIntervals";

type Props = {
  handleChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isCurrentMonth: boolean;
  date: number;
  isTimeChangeAllow?: any;
  userSelectedTime?: string;
  userSelectedDate: DateSelection | undefined;
};

export const TimeList: React.FC<Props> = ({
  handleChangeTime,
  isCurrentMonth,
  date,
  userSelectedDate,
  isTimeChangeAllow,
  userSelectedTime,
}) => {
  const { generate24HourIntervals, generateIntervals } = useTimeIntervals();
  const contractorSettings = cSettings; // API

  // Generate the intervals based on the provided start and end times
  const timeIntervals = generateIntervals(
    contractorSettings.businessStartTime.substring(0, 5),
    contractorSettings.businessEndTime.substring(0, 5)
  ) as {
    twentyFourHour: string;
    twelveHour: string;
  }[];

  const timeSelectionCSS =
    "cursor-pointer bg-white inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-blue-600 border-blue-600 dark:hover:text-white dark:border-blue-500 dark:peer-checked:border-blue-500 peer-checked:border-blue-600 hover:bg-blue-500 dark:text-blue-500 dark:bg-gray-900 dark:hover:bg-purple-600 dark:hover:border-blue-600 dark:peer-checked:bg-purple-500 peer-checked:bg-purple-600 hover:text-white peer-checked:text-white";

  console.log("isTimeChangeAllow ", isTimeChangeAllow);
  return (
    <ul id="timetable" className="grid w-full grid-cols-4 gap-2 mt-5">
      {contractorSettings.twelveHoursStatus
        ? timeIntervals.map((time) => (
            <>
              {userSelectedDate?.day !== undefined &&
              userSelectedDate?.day !== date ? (
                <li
                  className={`${
                    isTimeChangeAllow &&
                    userSelectedTime === time.twelveHour &&
                    "bg-purple-600 text-white items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg border-blue-600 "
                  }`}
                >
                  <input
                    type="radio"
                    id={`${time.twelveHour}`}
                    value={`${time.twelveHour}`}
                    className="hidden peer"
                    name="timetable"
                    onChange={handleChangeTime}
                  />
                  <label
                    htmlFor={`${time.twelveHour}`}
                    className={`${
                      isTimeChangeAllow && userSelectedTime === time.twelveHour
                        ? ""
                        : timeSelectionCSS
                    }`}
                  >
                    {time.twelveHour}
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
                    onChange={handleChangeTime}
                    disabled={
                      isCurrentMonth ? !isTimeValid(time.twelveHour) : false
                    }
                  />
                  <label
                    htmlFor={`${time.twelveHour}`}
                    className={`${
                      isCurrentMonth
                        ? isTimeValid(time.twelveHour)
                          ? timeSelectionCSS
                          : "inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center  border rounded-lg text-white border-blue-600 dark:border-blue-500 bg-gray-500"
                        : timeSelectionCSS
                    }`}
                  >
                    {time.twelveHour}
                  </label>
                </li>
              )}
            </>
          ))
        : generate24HourIntervals().map((time) => (
            <li>
              <input
                type="radio"
                id={`${time}`}
                value=""
                className="hidden peer"
                name="timetable"
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
