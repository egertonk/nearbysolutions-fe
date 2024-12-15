import { useState } from "react";
import { useCustomerToolListings } from "../../lib/useCustomerToolListings";
import { useToolRentalListing } from "../../utils/fetchEndpoints";
import { ToolRentalListing } from "../../lib/types/DIYToolsListings";

export const hasDatePassed = (dateString: string): boolean => {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Remove time from today's date for an accurate comparison
  today.setHours(0, 0, 0, 0);

  return inputDate > today;
};

export const useRentTools = (isEnabled: boolean) => {
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [untilDate, setUntilDate] = useState<string>("");
  const [untilTime, setUntilTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[1]
  ); // Default to today's date

  const { data: toolRentalListing, isFetching: isFetchingToolRentalListing } =
    useToolRentalListing(isEnabled);

  const { handleOnChange, filteredTools, handleSubmit, handleSort } =
    useCustomerToolListings(
      toolRentalListing ?? ([] as ToolRentalListing[]),
      isFetchingToolRentalListing
    );

  // Helper function to add days to a date string
  const addDays = (dateString: string, days: number): string => {
    const date = new Date(dateString);
    date.setDate(date.getDate() + days);
    return date.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  // Ensure fromDate is less than untilDate
  const handleSetFromDate = (date: string) => {
    setFromDate(date);

    // If fromDate is greater than or equal to untilDate, update untilDate
    if (untilDate && new Date(date) >= new Date(untilDate)) {
      const updatedUntilDate = addDays(date, 1); // Set untilDate to one day after fromDate
      setUntilDate(updatedUntilDate);
      console.log(`Updated untilDate to ${updatedUntilDate}`);
    }
  };

  // Ensure untilDate is always greater than fromDate
  const handleSetUntilDate = (date: string) => {
    // Prevent setting untilDate earlier than fromDate
    if (fromDate && new Date(date) <= new Date(fromDate)) {
      console.log("Cannot set untilDate earlier than fromDate.");
      return;
    }
    setUntilDate(date);
  };

  const handleSearch = () => {
    console.log({
      location,
      from: `${fromDate} ${fromTime}`,
      until: `${untilDate} ${untilTime}`,
    });
    // Implement search logic here
  };

  return {
    rentToolsAction: {
      filteredTools,
      handleSearch,
      hasDatePassed,
      location,
      setLocation,
      fromDate,
      setFromDate: handleSetFromDate, // Use the custom setter for validation
      fromTime,
      setFromTime,
      untilDate,
      setUntilDate: handleSetUntilDate, // Use the custom setter for validation
      untilTime,
      setUntilTime,
      selectedDate,
      setSelectedDate,
    },
  };
};
