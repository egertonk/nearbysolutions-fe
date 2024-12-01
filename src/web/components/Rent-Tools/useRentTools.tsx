import { PostAJobFormTypes } from "../../../store/postAJobSlice";
import { useState } from "react";
import { useCustomerToolListings } from "../../lib/useCustomerToolListings";
import { useToolRentalListing } from "../../utils/fetchEndpoints";
import { ToolRentalListing } from "../../lib/types/DIYToolsListings";

export const isAllPostAJobOrderEmpty = (
  postAJobOrder: PostAJobFormTypes
): boolean => {
  return Object.values(postAJobOrder).every((value) => value === "");
};

export const useRentTools = () => {
  const [location, setLocation] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [fromTime, setFromTime] = useState<string>("");
  const [untilDate, setUntilDate] = useState<string>("");
  const [untilTime, setUntilTime] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[1]
  ); // Default to today's date

  const { data: toolRentalListing, isFetching: isFetchingToolRentalListing } =
    useToolRentalListing();

  const { handleOnChange, filteredTools, handleSubmit, handleSort } =
    useCustomerToolListings(
      toolRentalListing ?? ([] as ToolRentalListing[]),
      isFetchingToolRentalListing
    );

  const hasDatePassed = (dateString: string): boolean => {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Remove time from today's date for an accurate comparison
    today.setHours(0, 0, 0, 0);

    return inputDate > today;
  };

  const handleSearch = () => {
    console.log({
      location,
      from: `${fromDate} ${fromTime}`,
      until: `${untilDate} ${untilTime}`,
    });
    // Implement search logic here
    //   35 MILES RADUIS ONLY
  };

  return {
    rentToolsAction: {
      filteredTools,
      handleSearch,
      hasDatePassed,
      location,
      setLocation,
      fromDate,
      setFromDate,
      fromTime,
      setFromTime,
      untilDate,
      setUntilDate,
      untilTime,
      setUntilTime,
      selectedDate,
      setSelectedDate,
    },
  };
};
