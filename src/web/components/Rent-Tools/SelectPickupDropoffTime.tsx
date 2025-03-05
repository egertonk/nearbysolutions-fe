import { useEffect, useState } from "react";

type Props = {
  selectedDate?: string;
  value: string;
  onChange: (e: any) => void;
};

export const rentInputCSS =
  "w-80 m-1 flex-grow text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40";

export const SelectPickupDropoffTime: React.FC<Props> = ({
  selectedDate,
  value,
  onChange,
}) => {
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    const generateTimeOptions = () => {
      const now = new Date();
      const options: string[] = [];
      const selected = selectedDate ? new Date(selectedDate) : now;
      const isToday = selected.toDateString() === now.toDateString();

      let startHour = isToday ? now.getHours() + 1 : 6; // Start at next hour if today, else 6 AM
      const endHour = 23; // End at 11 PM

      for (let hour = startHour; hour <= endHour; hour++) {
        options.push(formatTime(hour, 0));
      }

      setTimeOptions(options);
    };

    generateTimeOptions();
  }, [selectedDate]);

  // Format time into 12-hour format with AM/PM
  const formatTime = (hours: number, minutes: number): string => {
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <select value={value} onChange={onChange} className={rentInputCSS}>
      <option
        key="default"
        value=""
        className="bg-red-900 font-bold text-white"
      >
        Select Time
      </option>
      {timeOptions.length === 0 ? (
        <option key="No Time" value="">
          Select another day
        </option>
      ) : (
        timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))
      )}
    </select>
  );
};
