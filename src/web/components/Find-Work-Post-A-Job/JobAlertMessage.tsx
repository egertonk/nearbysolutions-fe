import React from "react";

import { daysUntil } from "./JobListings";

type Props = {
  jobDate: string;
};

export const JobAlertMessage: React.FC<Props> = ({ jobDate }) => {
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
            Job Expiring Today
          </div>
        </div>
      )}
    </>
  );
};
