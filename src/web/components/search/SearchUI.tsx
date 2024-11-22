import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { DIYToolListing } from "../../lib/types/DIYToolsListings";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";

type Props = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  jobTitlesArray?: string[];
  filteredJobs?: JobPosting[];
  filteredTools?: DIYToolListing[];
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

        <button
          className="ml-1.5 relative align-middle select-none bg-purple-400 font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
          onClick={handleSubmit}
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <MagnifyingGlassIcon className="h-5 w-5 flex-none text-white-400 btn" />
          </span>
        </button>
      </div>
    </>
  );
};
