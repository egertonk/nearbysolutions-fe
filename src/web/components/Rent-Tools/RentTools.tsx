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

export const RentTools: React.FC = () => {
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

      <div className="bg-sky-950 relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-purple-900 shadow-md text-white">
        <a
          className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
          href="#"
        >
          <img
            className="object-cover"
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          />
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            39% OFF
          </span>
        </a>
        <div className="mt-4 px-5 pb-5">
          <a href="#">
            <h5 className="text-xl tracking-tight text-white-900">
              Nike Air MX Super 2500 - Red
            </h5>
          </a>
          <div className="mt-2 mb-5 flex items-center justify-between">
            <p>
              <span className="text-3xl font-bold text-white-900">$449</span>
              <span className="text-sm text-white-900 line-through">$699</span>
            </p>
            <div className="flex items-center">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                5.0
              </span>
            </div>
          </div>
          <a
            href="#"
            className="flex items-center justify-center rounded-md bg-purple-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Rent Now - Available (12/05/2025)
          </a>
        </div>
      </div>
    </>
  );
};
