export const useTimeIntervals = () => {
  // Function to generate 30-minute interval times in 24-hour format
  const generate24HourIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hourString = hour.toString().padStart(2, "0");
        const minuteString = minute.toString().padStart(2, "0");
        intervals.push(`${hourString}:${minuteString}`);
      }
    }
    return intervals;
  };

  // Function to generate 30-minute interval times in 12-hour format
  const generate12HourIntervals = () => {
    const intervals = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const hour12 = hour % 12 || 12; // Convert 24-hour format to 12-hour format
        const period = hour < 12 ? "AM" : "PM";
        const hourString = hour12.toString().padStart(2, "0");
        const minuteString = minute.toString().padStart(2, "0");
        intervals.push(`${hourString}:${minuteString} ${period}`);
      }
    }
    return intervals;
  };

  // Function to generate 30-minute interval times in 24-hour and 12-hour formats
  const generateIntervals = (start: string, end: string) => {
    const intervals = [];
    const [startHour, startMinute] = start?.split(":").map(Number);
    const [endHour, endMinute] = end?.split(":").map(Number);
    const startDate = new Date(2024, 0, 1, startHour, startMinute); // Use a fixed date
    const endDate = new Date(2024, 0, 1, endHour, endMinute);

    for (
      let time = startDate;
      time <= endDate;
      time.setMinutes(time.getMinutes() + 30)
    ) {
      const hour = time.getHours();
      const minute = time.getMinutes();
      const hourString = hour.toString().padStart(2, "0");
      const minuteString = minute.toString().padStart(2, "0");
      intervals?.push({
        twentyFourHour: `${hourString}:${minuteString}`,
        twelveHour: `${(hour % 12 || 12)
          .toString()
          .padStart(2, "0")}:${minuteString} ${hour < 12 ? "AM" : "PM"}`,
      });
    }
    return intervals;
  };

  return {
    generate24HourIntervals,
    generate12HourIntervals,
    generateIntervals,
  };
};
