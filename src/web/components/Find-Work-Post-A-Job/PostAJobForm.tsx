import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";

type FormData = {
  jobName: string;
  jobTask: string;
  jobPrice: string;
  jobZip: string;
  jobCityLocation: string;
  date: string;
  time: string;
  email: string;
};

export const PostAJobForm: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState({
    jobName: "",
    jobTask: "",
    jobPrice: "",
    jobZip: "",
    jobCityLocation: "",
    date: "",
    time: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.jobName) newErrors.jobName = "Job Name is required";
    if (!formData.jobTask) newErrors.jobTask = "Job Task is required";
    if (!formData.jobPrice) {
      newErrors.jobPrice = "Job Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.jobPrice)) {
      newErrors.jobPrice =
        "Job Price must be a number with up to two decimal places";
    }
    if (!formData.jobZip) {
      newErrors.jobZip = "Job Zip is required";
    } else if (!/^\d{5}(-\d+)?$/.test(formData.jobZip)) {
      newErrors.jobZip =
        "Job Zip must be either 5 digits or 5 digits followed by a hyphen and more digits";
    }
    if (!formData.jobCityLocation)
      newErrors.jobCityLocation = "Job City Location is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.time) newErrors.time = "Time is required";
    if (!formData.email) newErrors.email = "Email is required";

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
      <MainTitle title={"Post a Job"} />

      <form
        className="p-6 bg-gray-800 font-[sans-serif] m-6 max-w-4xl mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="grid sm:grid-cols-2 gap-10">
          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Job Name
            </label>
            <input
              type="text"
              name="jobName"
              placeholder="Enter job name"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.jobName}
              onChange={handleChange}
            />
            {errors.jobName && (
              <p className="text-red-500 text-xs">{errors.jobName}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Job Task
            </label>
            <input
              type="text"
              name="jobTask"
              placeholder="Enter job task"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.jobTask}
              onChange={handleChange}
            />
            {errors.jobTask && (
              <p className="text-red-500 text-xs">{errors.jobTask}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Job Price
            </label>
            <input
              type="text"
              name="jobPrice"
              placeholder="Enter job price"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.jobPrice}
              onChange={handleChange}
            />
            {errors.jobPrice && (
              <p className="text-red-500 text-xs">{errors.jobPrice}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Job Zip
            </label>
            <input
              type="number"
              name="jobZip"
              placeholder="Enter job zip"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.jobZip}
              onChange={handleChange}
            />
            {errors.jobZip && (
              <p className="text-red-500 text-xs">{errors.jobZip}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Job City Location
            </label>
            <input
              type="text"
              name="jobCityLocation"
              placeholder="Enter job city location"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.jobCityLocation}
              onChange={handleChange}
            />
            {errors.jobCityLocation && (
              <p className="text-red-500 text-xs">{errors.jobCityLocation}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
              value={formData.date}
              onChange={handleChange}
            />
            {errors.date && (
              <p className="text-red-500 text-xs">{errors.date}</p>
            )}
          </div>

          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Time
            </label>
            <input
              type="time"
              name="time"
              className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
              value={formData.time}
              onChange={handleChange}
            />
            {errors.time && (
              <p className="text-red-500 text-xs">{errors.time}</p>
            )}
          </div>

          <div className="relative flex items-center sm:col-span-2">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
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
