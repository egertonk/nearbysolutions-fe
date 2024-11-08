import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";

type FormData = {
  toolName: string;
  toolDescription: string;
  toolBrandName: string;
  inventoryStatus: string;
  rentalPrice: string;
  toolZip: string;
  toolCityLocation: string;
  startDate: string;
  endDate: string;
  email: string;
  userInstructions: string;
};

export const RentAToolForm: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState({
    toolName: "",
    toolDescription: "",
    toolBrandName: "",
    inventoryStatus: "In Stock",
    rentalPrice: "",
    toolZip: "",
    toolCityLocation: "",
    startDate: "",
    endDate: "",
    email: "",
    userInstructions: "",
  });

  const mmm = [
    {
      toolName: "a",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "b",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "c",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "d",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "a",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "b",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "c",
      toolDescription: "",
      toolBrandName: "",
    },
    {
      toolName: "d",
      toolDescription: "",
      toolBrandName: "",
    },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.toolName) newErrors.toolName = "Tool Name is required";
    if (!formData.toolDescription)
      newErrors.toolDescription = "Tool Description is required";
    if (!formData.toolBrandName)
      newErrors.toolBrandName = "Tool Brand Name is required";
    if (!formData.rentalPrice) {
      newErrors.rentalPrice = "Rental Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.rentalPrice)) {
      newErrors.rentalPrice =
        "Rental Price must be a number with up to two decimal places";
    }
    if (!formData.toolZip) {
      newErrors.toolZip = "Tool Zip-Code is required";
    } else if (!/^\d{5}(-\d+)?$/.test(formData.toolZip)) {
      newErrors.toolZip =
        "Tool Zip-Code must be either 5 digits or 5 digits followed by a hyphen and more digits";
    }
    if (!formData.toolCityLocation)
      newErrors.toolCityLocation = "Tool City Location is required";
    if (!formData.startDate) newErrors.startDate = "Start Date is required";
    if (!formData.endDate) newErrors.endDate = "End Date is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.userInstructions)
      newErrors.userInstructions = "User Short Instructions is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      navigate("/find-work-post-a-job");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <>
      <MainTitle title={"Rent your Tools"} />

      <form
        className="p-6 bg-gray-800 font-[sans-serif] m-6 max-w-4xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Tool Name
            </label>
            <input
              type="text"
              name="toolName"
              placeholder="Enter tool name"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.toolName}
              onChange={handleChange}
            />
            {errors.toolName && (
              <p className="text-red-500 text-xs">{errors.toolName}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Tool Brand Name
            </label>
            <input
              type="text"
              name="toolBrandName"
              placeholder="Enter tool brand name"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.toolBrandName}
              onChange={handleChange}
            />
            {errors.toolBrandName && (
              <p className="text-red-500 text-xs">{errors.toolBrandName}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Rental Price
            </label>
            <input
              type="text"
              name="rentalPrice"
              placeholder="Enter rental price"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.rentalPrice}
              onChange={handleChange}
            />
            {errors.rentalPrice && (
              <p className="text-red-500 text-xs">{errors.rentalPrice}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Tool Description
            </label>
            <input
              type="text"
              name="toolDescription"
              placeholder="Enter tool description"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.toolDescription}
              onChange={handleChange}
            />
            {errors.toolDescription && (
              <p className="text-red-500 text-xs">{errors.toolDescription}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Inventory Status
            </label>
            <select
              className="w-full border-2 border-gray-100 focus:border-blue-500 rounded"
              id="grid-state"
              onChange={handleChange}
              value={formData.inventoryStatus}
            >
              <option defaultValue="In Stock">In Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Tool Zip-Code
            </label>
            <input
              type="number"
              name="toolZip"
              placeholder="Enter tool Zip-Code"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.toolZip}
              onChange={handleChange}
            />
            {errors.toolZip && (
              <p className="text-red-500 text-xs">{errors.toolZip}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Tool City Location
            </label>
            <input
              type="text"
              name="toolCityLocation"
              placeholder="Enter tool city location"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.toolCityLocation}
              onChange={handleChange}
            />
            {errors.toolCityLocation && (
              <p className="text-red-500 text-xs">{errors.toolCityLocation}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Start Date
            </label>
            <input
              type="date"
              name="start-date"
              className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
              value={formData.startDate}
              onChange={handleChange}
            />
            {errors.startDate && (
              <p className="text-red-500 text-xs">{errors.startDate}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              End Date
            </label>
            <input
              type="date"
              name="end-date"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.endDate}
              onChange={handleChange}
            />
            {errors.endDate && (
              <p className="text-red-500 text-xs">{errors.endDate}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              User Short Instructions
            </label>

            <textarea
              id="solutionTask"
              rows={4}
              name="userInstructions"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Please provide a short user instructions."
              defaultValue={formData.userInstructions}
              maxLength={100}
              onChange={handleChange}
            />

            {errors.userInstructions && (
              <p className="text-red-500 text-xs">{errors.userInstructions}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-8 px-6 py-2.5 w-full text-sm text-white rounded bg-gray-600 hover:bg-gray-700 transition-all"
        >
          Submit
        </button>
      </form>
    </>
  );
};
