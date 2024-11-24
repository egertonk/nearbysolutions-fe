import { useMemo, useState } from "react";
// import * as nsfwjs from "nsfwjs";
import { useNavigate } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";
import { useGetCoutries } from "../../utils/fetchEndpoints";
import { StateAndTerritorySelector } from "../common-sections/StateAndTerritorySelector";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { JobInputs } from "./JobInputs";
import { ReviewPopup } from "./ReviewPopup";

export type FormData = {
  jobName: string;
  jobTask: string;
  jobPrice: string;
  jobZip: string;
  jobCityLocation: string;
  date: string;
  time: string;
  email: string;
  jobCountry: string;
  jobState: string;
  urgencyLevel: string;
  phoneNumber: string;
  customerName: string;
  jobAddress: string;
};

export const PostAJobForm: React.FC = () => {
  const navigate = useNavigate();
  const [openReview, setOpenReview] = useState(false);
  const [jobImage, setJobImage] = useState<File>();
  const states = useSelector((state: RootState) => state);

  const customerOrder = states.formData.customerOrder;
  const { data: coutries, isFetching: isCoutriesFetching } = useGetCoutries();

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [formData, setFormData] = useState({
    jobName: "",
    jobTask: "",
    jobPrice: "",
    jobZip: customerOrder.customerInfo.zip || "",
    jobCityLocation: customerOrder.customerInfo.city || "",
    date: "",
    time: "",
    email: customerOrder.customerInfo.email || "",
    jobCountry: customerOrder.customerInfo.country || "",
    jobState: customerOrder.customerInfo.state || "",
    urgencyLevel: "",
    phoneNumber: "",
    customerName:
      `${customerOrder.customerInfo.firstName} ${customerOrder.customerInfo.lastName}` ||
      "",
    jobAddress: customerOrder.customerInfo.address || "",
  });

  const urgencyLevels = [
    { value: "", label: "Select Level" },
    { value: "High", label: "High" },
    { value: "Medium", label: "Medium" },
    { value: "Low", label: "Low" },
  ];

  // Add database colunmn
  // jobCountry;
  // jobState;
  // urgencyLevel
  // phoneNumber
  // customerName
  // preferredCommunicationMethod

  const validCountries = useMemo(() => {
    if (coutries) return coutries?.filter((country) => country?.featureFlag);
    return [];
  }, [coutries]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // const detectExplicitContent = async (imageElement: any) => {
  //   const model = await nsfwjs.load();
  //   const predictions = await model.classify(imageElement);
  //   return predictions.some(
  //     (p: { className: string; probability: number }) =>
  //       p.className === "Porn" && p.probability > 0.9
  //   );
  // };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    const isUSA = formData.jobCountry === "United States";

    // Define required fields with their corresponding error messages
    const requiredFields: { key: keyof FormData; message: string }[] = [
      { key: "jobName", message: "Job Name is required" },
      { key: "jobTask", message: "Job Task is required" },
      { key: "jobCityLocation", message: "Job City Location is required" },
      { key: "date", message: "Date is required" },
      { key: "time", message: "Time is required" },
      { key: "email", message: "Email is required" },
      { key: "jobCountry", message: "Country is required" },
      { key: "jobState", message: "State is required" },
      { key: "urgencyLevel", message: "Urgency level is required" },
      { key: "phoneNumber", message: "Phone number is required" },
      { key: "customerName", message: "Customer name is required" },
      { key: "jobAddress", message: "Job address is required" },
      { key: "jobAddress", message: "Job address is required" },
    ];

    const usaRequiredFields: { key: keyof FormData; message: string }[] = [
      { key: "jobZip", message: "Zip Code is required" },
      { key: "jobState", message: "State is required" },
    ];

    const validateRequiredFields = async () => {
      requiredFields.forEach(({ key, message }) => {
        if (!formData[key]) {
          newErrors[key] = message;
        }
      });

      // Check for porno image
      // console.log(await detectExplicitContent(formData.jobImage));
      // if (!formData.jobImage) {
      //   newErrors.jobZip = "Job Zip is required";
      // } else if (await detectExplicitContent(formData.jobImage)) {
      //   newErrors.jobZip = "Job Zip is required";
      // }
    };

    // Validate required fields
    if (isUSA) {
      usaRequiredFields.forEach(({ key, message }) => {
        if (!formData[key]) {
          newErrors[key] = message;
        }
      });

      if (!formData.jobZip) {
        newErrors.jobZip = "Job Zip is required";
      } else if (!/^\d{5}(-\d+)?$/.test(formData.jobZip)) {
        newErrors.jobZip =
          "Job Zip must be either 5 digits or 5 digits followed by a hyphen and more digits";
      }

      validateRequiredFields();
    } else validateRequiredFields();

    // Additional field-specific validations
    if (!formData.jobPrice) {
      newErrors.jobPrice = "Job Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(formData.jobPrice)) {
      newErrors.jobPrice =
        "Job Price must be a number with up to two decimal places";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log(
        `${customerOrder.customerInfo.firstName} ${customerOrder.customerInfo}`,
        "Form submitted: to database",
        formData
      );
      // navigate("/find-work-post-a-job");
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) setJobImage(files[0]);
    e.target.value = ""; // Clear the input value after selection
  };

  return (
    <>
      {openReview ? (
        <ReviewPopup
          openReview={openReview}
          setOpenReview={setOpenReview}
          formData={formData}
          jobImage={jobImage}
        />
      ) : (
        <>
          <MainTitle title={"Post a Job"} />

          <form
            className="p-6 font-[sans-serif] m-6 max-w-4xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-10">
              <JobInputs
                value={formData.jobName}
                errorMessage={errors.jobName ?? ""}
                labelName={"Job Name"}
                name="jobName"
                handleChange={handleChange}
              />

              <JobInputs
                value={formData.jobTask}
                errorMessage={errors.jobTask ?? ""}
                labelName={"Job Task"}
                name="jobTask"
                handleChange={handleChange}
              />

              <JobInputs
                value={formData.jobPrice}
                errorMessage={errors.jobPrice ?? ""}
                labelName={"Job Price"}
                name="jobPrice"
                handleChange={handleChange}
              />

              <JobInputs
                value={formData.jobAddress}
                errorMessage={errors.jobAddress ?? ""}
                labelName={"Job Address"}
                name="jobAddress"
                handleChange={handleChange}
              />

              <JobInputs
                value={formData.phoneNumber}
                errorMessage={errors.phoneNumber ?? ""}
                labelName={"Customer Phone Number"}
                name="phoneNumber"
                handleChange={handleChange}
              />

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Country Location
                </label>
                <select
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                  id="country"
                  name="jobCountry"
                  value={formData.jobCountry}
                  onChange={handleChange}
                >
                  <option className="h-20" value="">
                    Select your Country
                  </option>
                  {validCountries?.map((countryData) => (
                    <option
                      className="h-20"
                      value={`${countryData.countryName}`}
                      key={countryData.countryName}
                    >
                      {countryData.countryName}
                    </option>
                  ))}
                </select>

                {errors.jobCountry && (
                  <p className="text-red-500 text-xs">{errors.jobCountry}</p>
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
                  <p className="text-red-500 text-xs">
                    {errors.jobCityLocation}
                  </p>
                )}
              </div>

              {(formData.jobCountry === "United States" ||
                formData.jobCountry === "Canada") && (
                <>
                  <div className="relative flex items-center">
                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                      Job State Location
                    </label>
                    <StateAndTerritorySelector
                      className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                      name={"jobState"}
                      value={formData.jobState}
                      onChange={handleChange}
                    />
                    {errors.jobState && (
                      <p className="text-red-500 text-xs">{errors.jobState}</p>
                    )}
                  </div>

                  <JobInputs
                    value={formData.jobZip}
                    errorMessage={errors.jobZip ?? ""}
                    labelName={"Job Zip Code"}
                    name="jobZip"
                    handleChange={handleChange}
                  />
                </>
              )}

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Date
                </label>
                <input
                  type="date"
                  name="date"
                  className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
                  value={formData.date}
                  onChange={handleChange}
                  min={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  } //Data is one day ahead
                />
                {errors.date && (
                  <p className="text-red-500 text-xs">{errors.date}</p>
                )}
              </div>

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Time
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

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Urgency Level
                </label>
                <select
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                  id="country"
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                >
                  {urgencyLevels.map((level) => (
                    <option
                      key={level.value}
                      className="h-20"
                      value={level.value}
                    >
                      {level.label}
                    </option>
                  ))}
                </select>
                ;
                {errors.urgencyLevel && (
                  <p className="text-red-500 text-xs">{errors.urgencyLevel}</p>
                )}
              </div>

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Image
                </label>

                <input
                  type="file"
                  name="jobImage"
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                  value={(jobImage && jobImage?.name) || ""}
                  onChange={handleImage}
                  accept="image/*"
                />
                {jobImage && (
                  <p className="text-red-500 text-xs">Job image nedded.</p>
                )}
              </div>

              <div className="relative flex items-center sm:col-span-2">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
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
              onClick={(e) => setOpenReview(true)}
            >
              Review
            </button>
          </form>
        </>
      )}
    </>
  );
};
