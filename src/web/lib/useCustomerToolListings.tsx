import { useEffect, useMemo, useState } from "react";
import { ToolRentalListing } from "./types/DIYToolsListings";

export const useCustomerToolListings = (
  toolRentalListing: ToolRentalListing[],
  isFetchingToolRentalListing?: boolean
) => {
  const [filteredTools, setFilteredTools] = useState<ToolRentalListing[]>(
    [] as ToolRentalListing[]
  );
  const [sortDirection, setSortDirection] = useState<string>("asc");

  // useEffect(() => {
  //   if (toolRentalListing.length > 0) setFilteredTools(toolRentalListing);
  // }, [isFetchingToolRentalListing]);

  useMemo(() => {
    if (toolRentalListing.length > 0) setFilteredTools(toolRentalListing);
  }, [toolRentalListing]);

  const sortByToolName = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.toolName.localeCompare(b.toolName) * sortOrder
    );
  };

  const sortByDescription = (
    jobs: ToolRentalListing[]
  ): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.description.localeCompare(b.description) * sortOrder
    );
  };

  const sortByCategory = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.toolCategory.localeCompare(b.toolCategory) * sortOrder
    );
  };

  const sortByBrand = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.toolBrand.localeCompare(b.toolBrand) * sortOrder
    );
  };

  const sortByPrice = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => ((a.pricePerDay || 0) - (b.pricePerDay || 0)) * sortOrder
    );
  };

  const handleSort = (sortType: string) => {
    if (sortType === "Tool Name") {
      setFilteredTools(sortByToolName(filteredTools));
    }
    if (sortType === "Description") {
      setFilteredTools(sortByDescription(filteredTools));
    }
    if (sortType === "Category") {
      setFilteredTools(sortByCategory(filteredTools));
    }
    // if (sortType === "Availability") {
    //   setFilteredTools(sortByAvailability(filteredTools));
    // }
    if (sortType === "Brand") {
      setFilteredTools(sortByBrand(filteredTools));
    }
    if (sortType === "Price") {
      setFilteredTools(sortByPrice(filteredTools));
    }

    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearchTerm(value);
    if (value.length === 0)
      setFilteredTools(toolRentalListing ?? ([] as ToolRentalListing[]));
  };

  const handleSubmit = () => {
    if (filteredTools.length > 0) {
      const matchJobs = filteredTools.filter((tool) =>
        tool.toolName.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredTools(matchJobs);
    }
  };

  return {
    handleOnChange,
    filteredTools,
    handleSubmit,
    handleSort,
  };
};
