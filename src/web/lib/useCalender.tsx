type MonthDays = {
  day: number;
  dayTitle: string;
}[];

export const useCalender = () => {
  // Get the current date
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = today.getDate();
  const day = today.getDay();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayTitles = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get the current month name
  const currentMonthName = monthNames[month];

  // Get the next month index and name
  const nextMonthIs = (month + 1) % 12;
  const nextMonthName = monthNames[nextMonthIs];

  // Function to get mapped days for a given month and year
  const getMappedDays = (month: number, year: number) => {
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate an array of day numbers
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Get the first day of the month
    const firstDay = new Date(year, month, 1);
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

    return mappedDays;
  };

  // Function to chunk array into weeks
  const chunkIntoWeeks = (array: MonthDays) => {
    const weeks = [];
    for (let i = 0; i < array.length; i += 7) {
      weeks.push(array.slice(i, i + 7));
    }
    return weeks;
  };

  // Get the mapped days and weeks for the current month
  const currentMappedDays = getMappedDays(month, year);
  const currentWeeksArray = chunkIntoWeeks(currentMappedDays as MonthDays);

  // Get the next month and year
  const nextMonth = (month + 1) % 12;
  const nextYear = month === 11 ? year + 1 : year;

  // Get the mapped days and weeks for the next month
  const nextMappedDays = getMappedDays(nextMonth, nextYear);
  const nextWeeksArray = chunkIntoWeeks(nextMappedDays as MonthDays);

  return {
    currentWeeksArray,
    nextWeeksArray,
    year,
    dayNames,
    today,
    nextMonthName,
    currentMonthName,
    date,
    dayTitles,
    day,
    month,
  };
};
