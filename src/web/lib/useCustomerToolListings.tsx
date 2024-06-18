import { useState } from "react";
import { DIYToolListing } from "./types/DIYToolsListings";

export const useCustomerToolListings = (diyToolListings: DIYToolListing[]) => {
  const [filteredTools, setFilteredTools] =
    useState<DIYToolListing[]>(diyToolListings);
  const [sortDirection, setSortDirection] = useState<string>("asc");

  const sortByToolName = (jobs: DIYToolListing[]): DIYToolListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.toolName.localeCompare(b.toolName) * sortOrder
    );
  };

  const sortByDescription = (jobs: DIYToolListing[]): DIYToolListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.description.localeCompare(b.description) * sortOrder
    );
  };

  const sortByCategory = (jobs: DIYToolListing[]): DIYToolListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => a.category.localeCompare(b.category) * sortOrder
    );
  };

  const sortByAvailability = (jobs: DIYToolListing[]): DIYToolListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) =>
        (a.availability === b.availability ? 0 : a.availability ? -1 : 1) *
        sortOrder
    );
  };

  const sortByBrand = (jobs: DIYToolListing[]): DIYToolListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort((a, b) => a.brand.localeCompare(b.brand) * sortOrder);
  };

  const sortByPrice = (jobs: DIYToolListing[]): DIYToolListing[] => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...jobs].sort(
      (a, b) => ((a.pricePerday || 0) - (b.pricePerday || 0)) * sortOrder
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
