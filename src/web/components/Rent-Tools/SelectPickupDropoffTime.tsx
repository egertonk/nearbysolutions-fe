import { useEffect, useState } from "react";

type Props = {
  selectedDate?: string;
  value: string;
  onChange: (e: any) => void;
};

export const rentInputCSS =
  "m-1 flex-grow text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40";

export const SelectPickupDropoffTime: React.FC<Props> = ({
  selectedDate,
  value,
  onChange,
}) => {
  const [fromTime, setFromTime] = useState<string>("");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  console.log("selectedDate    = ", selectedDate);
  useEffect(() => {
    const generateTimeOptions = () => {
      const now = new Date();
      const options: string[] = [];
      const selected = selectedDate ? new Date(selectedDate) : now;

      // Case 1: If the selected date is today
      if (
        selected.getFullYear() === now.getFullYear() &&
        selected.getMonth() === now.getMonth() &&
        selected.getDate() === now.getDate()
      ) {
        const nextHour = new Date();
        nextHour.setHours(now.getHours() + 1, 0, 0, 0); // Start at the next hour
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);

        while (nextHour <= endOfDay) {
          options.push(formatTime(nextHour.getHours(), nextHour.getMinutes()));
          nextHour.setHours(nextHour.getHours() + 1); // Increment by 1 hour
        }
      } else {
        // Case 2: If the selected date is in the future
        for (let hour = 6; hour < 24; hour++) {
          // Start at 6:00 AM
          options.push(formatTime(hour, 0));
        }
      }

      setTimeOptions(options);
    };

    generateTimeOptions();
  }, [selectedDate]); // Re-run whenever the date changes

  // Format time into 12-hour format with AM/PM
  const formatTime = (hours: number, minutes: number): string => {
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };

  return (
    <select value={value} onChange={onChange} className={rentInputCSS}>
      {timeOptions.length === 0 ? (
        <>
          <option key="No Time" value="">
            Select another day
          </option>
        </>
      ) : (
        <>
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </>
      )}
    </select>
  );
};
