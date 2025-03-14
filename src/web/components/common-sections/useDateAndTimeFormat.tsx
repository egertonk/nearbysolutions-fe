/**
 * Custom hook to format an appointment date and time
 * based on the given locale or the user's browser locale.
 *
 * @param appointmentDate - The appointment date in YYYY-MM-DD format
 * @param scheduleTime - The schedule time in HH:mm:ss format
 * @param locale - Optional locale (e.g., 'en-US', 'en-GB'); defaults to browser locale
 * @returns formattedDate, formattedTime, and combinedDateTime object
 */
export const useDateAndTimeFormat = (
  appointmentDate: string,
  scheduleTime: string,
  locale: string = navigator.language // Default to browser locale if not provided
) => {
  // Combine date and time into one JavaScript Date object
  const combinedDateTime = new Date(`${appointmentDate}T${scheduleTime}`);

  // Format the date (e.g., "Friday, March 14, 2025")
  const formattedDate = combinedDateTime.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format the time (e.g., "09:00 AM" or "09:00")
  const formattedTime = combinedDateTime.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Return formatted values and the raw combined Date object
  return {
    formattedDate,
    formattedTime,
    combinedDateTime,
  };
};


/**
 * Formats a raw date string (ISO format or Date-compatible)
 * into a human-readable localized format.
 *
 * @param dateStr - The raw date string (e.g. '2025-03-14')
 * @param locale - Optional locale (default: user's browser locale)
 * @returns A formatted date string like 'Friday, March 14, 2025'
 */
export const formatDate = (
  dateStr?: string,
  locale: string = navigator.language
): string => {
  if (!dateStr) return "";

  const date = new Date(dateStr);

  if (isNaN(date.getTime())) return ""; // Invalid date

  return date.toLocaleDateString(locale, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
