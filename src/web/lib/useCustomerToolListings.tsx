import { useState } from "react";
import { ToolRentalListing } from "./types/DIYToolsListings";

export const useCustomerToolListings = (diyToolListings: ToolRentalListing[]) => {
  const [filteredTools, setFilteredTools] =
    useState<ToolRentalListing[]>(diyToolListings);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const sortByToolName = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.toolName.localeCompare(b.toolName) * sortOrder
    );
  };

  const sortByDescription = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.description.localeCompare(b.description) * sortOrder
    );
  };

  const sortByCategory = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.category.localeCompare(b.category) * sortOrder
    );
  };

  const sortByAvailability = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) =>
        (a.isAvailable === b.isAvailable ? 0 : a.isAvailable ? -1 : 1) *
        sortOrder
    );
  };

  const sortByBrand = (jobs: ToolRentalListing[]): ToolRentalListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort((a, b) => a.brand.localeCompare(b.brand) * sortOrder);
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
    if (sortType === "Availability") {
      setFilteredTools(sortByAvailability(filteredTools));
    }
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
    if (value.length === 0) setFilteredTools(diyToolListings);
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
