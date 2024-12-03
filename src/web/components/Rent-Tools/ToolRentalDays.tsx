import React from "react";
import { DateAndTimeInputsProps } from "./DateAndTimeInputs";

type Props = {
  toolActions: DateAndTimeInputsProps;
  dateTimeCSSError: string;
};

export const ToolRentalDays: React.FC<Props> = ({ toolActions, dateTimeCSSError }) => {
  return (
    <div className="grid grid-cols-3 gap-4 displayBlock">
      <div className="mt-4">
        <h3 className={`text-lg font-semibold ${dateTimeCSSError}`}>
          Pickup Date/Time
        </h3>
        <p className="text-sm text-gray-600">
          {toolActions.rentToolsAction.fromDate}
          <br />
          {toolActions.rentToolsAction.fromTime}
        </p>
      </div>

      <div className="mt-4">
        <h3 className={`text-lg font-semibold ${dateTimeCSSError}`}>
          Dropoff Date/Time
        </h3>
        <p className="text-sm text-gray-600">
          {toolActions.rentToolsAction.untilDate}
          <br />
          {toolActions.rentToolsAction.untilTime}
        </p>
      </div>

      <div className="mt-4">
        <h3 className={`text-lg font-semibold ${dateTimeCSSError}`}>
          Tool Rental Days
        </h3>
        <p className="text-sm text-gray-600">
          {calculateRentalDays(
            toolActions.rentToolsAction.fromDate,
            toolActions.rentToolsAction.fromTime,
            toolActions.rentToolsAction.untilDate,
            toolActions.rentToolsAction.untilTime
          )}
        </p>
      </div>
    </div>
  );
};

function calculateRentalDays(
  pickupDate: string,
  pickupTime: string,
  dropoffDate: string,
  dropoffTime: string
): number | string {
  try {
    // Parse the pickup and dropoff DateTime strings
    const pickupDateTime = new Date(
      `${pickupDate} ${convertTo24HourTime(pickupTime)}`
    );
    const dropoffDateTime = new Date(
      `${dropoffDate} ${convertTo24HourTime(dropoffTime)}`
    );

    // Check for invalid dates
    if (isNaN(pickupDateTime.getTime()) || isNaN(dropoffDateTime.getTime())) {
      return "Invalid date/time. Please adjust the date/time to calculate rental days.";
    }

    // Ensure dropoff is after pickup
    if (dropoffDateTime <= pickupDateTime) {
      return "Dropoff date/time must be after pickup date/time.";
    }

    // Calculate the time difference in milliseconds
    const timeDifference = dropoffDateTime.getTime() - pickupDateTime.getTime();

    // Convert the time difference to days
    const days = timeDifference / (1000 * 60 * 60 * 24);

    // Round up to the next whole number
    return Math.ceil(days);
  } catch (error) {
    // return "An error occurred. Please ensure the date/time format is correct.";
    return "";
  }
}

// Helper function to convert 12-hour time to 24-hour time
function convertTo24HourTime(time: string): string {
  const [timePart, meridian] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}