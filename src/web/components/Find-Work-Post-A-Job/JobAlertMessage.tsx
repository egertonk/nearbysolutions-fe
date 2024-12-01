import React from "react";

import { daysUntil } from "./JobListings";

type Props = {
  jobDate: string;
};

export const JobAlertMessage: React.FC<Props> = ({ jobDate }) => {
  const checkIfTodayOrTomorrow = (): string => {
    const today = new Date();

    // Extract year, month, and day from the string
    const [year, month, day] = jobDate.split("-");

    // Create a new Date object for the target date (note that months are 0-indexed in JavaScript)
    const targetDate = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day)
    );

    // Set the time to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diffInTime = targetDate.getTime() - today.getTime();
    const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

    if (diffInDays === 0) {
      return "Today";
    } else if (diffInDays === 1) {
      return "Tomorrow";
    } else {
      return "";
    }
  };

  return (
    <>
      {daysUntil(jobDate) >= 1 && daysUntil(jobDate) <= 5 && (
        <div role="alert">
          <div className="bg-blue-500 text-white font-bold rounded-t px-4 py-2 center-text grid">
            Job Expiring Soon
          </div>
        </div>
      )}
      {daysUntil(jobDate) === -0 && (
        <div role="alert">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2 center-text grid">
            Job Expiring {checkIfTodayOrTomorrow()}
          </div>
        </div>
      )}
    </>
  );
};
