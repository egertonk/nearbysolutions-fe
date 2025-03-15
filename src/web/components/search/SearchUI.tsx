import React, { useState } from "react";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { SearchButton } from "../common-sections/SearchButton";
import { ToolRentalListing } from "../../lib/types/DIYToolsListings";

type Props = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  jobTitlesArray?: string[];
  filteredJobs?: JobPosting[];
  filteredTools?: ToolRentalListing[];
  filteredOrders?: CustomerFormData[];
};

export const SearchUI: React.FC<Props> = ({
  handleOnChange,
  handleSubmit,
  jobTitlesArray,
  filteredJobs,
  filteredTools,
  filteredOrders,
}) => {
  const [isTyping, setIsTyping] = useState(false);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleOnChange(e);
    setIsTyping(e.target.value.length > 0); // Only show list when input length is greater than 0
  };
  console.log("isTyping", isTyping);
  return (
    <>
      <div className="flex justify-center rounded py-4">
        <input
          type="text"
          className="block w-80 px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          placeholder="Search..."
          list="frameworks"
          onChange={onInputChange}
        />
        {isTyping && (
          <datalist
            id="frameworks"
            className="cursor-pointer border-2 border-[#011c2b] w-100"
          >
            {jobTitlesArray !== undefined &&
              jobTitlesArray?.map((title) => (
                <option
                  key={title}
                  className="cursor-pointer border-2 border-[#011c2b] w-100"
                  value={title}
                ></option>
              ))}

            {filteredJobs !== undefined &&
              filteredJobs?.map((job) => (
                <option
                  key={job.jobName}
                  className="cursor-pointer border-2 border-[#011c2b] w-100"
                  value={job.jobName}
                ></option>
              ))}

            {filteredTools !== undefined &&
              filteredTools?.map((tool) => (
                <option
                  key={tool.toolName}
                  className="cursor-pointer border-2 border-[#011c2b] w-100"
                  value={tool.toolName}
                ></option>
              ))}

            {filteredOrders !== undefined &&
              filteredOrders?.map((order) => (
                <option
                  key={order.orderID}
                  className="cursor-pointer border-2 border-[#011c2b] w-100"
                  value={order.orderID}
                ></option>
              ))}
          </datalist>
        )}

        <SearchButton handleSubmit={handleSubmit} />
      </div>
    </>
  );
};
