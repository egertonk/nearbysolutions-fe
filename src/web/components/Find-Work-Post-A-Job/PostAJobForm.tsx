import { MainTitle } from "../common-sections/MainTitle";
import { StateAndTerritorySelector } from "../common-sections/StateAndTerritorySelector";
import { useDispatch } from "react-redux";
import { JobInputs } from "./JobInputs";
import { ReviewPopup } from "./ReviewPopup";
import {
  setPostAJobDetails,
  urgencyLevels,
} from "../../../store/postAJobSlice";
import { usePostAJob } from "./usePostAJob";
import { Service } from "../../lib/types/FindWorkPostAJobtypesData";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";

export const PostAJobForm: React.FC = () => {
  const dispatch = useDispatch();

  const {
    handleImage,
    handleReview,
    handleSubmit,
    handleChange,
    openReview,
    setOpenReview,
    postAJobOrder,
    generalDescription,
    jobImage,
    userCategory,
    setUserCategory,
    subCategoryList,
    errors,
    validCountries,
    groupedServices,
  } = usePostAJob();

  return (
    <>
      {openReview ? (
        <ReviewPopup
          setOpenReview={setOpenReview}
          formData={postAJobOrder.postAJobFormDetails}
          jobImage={jobImage}
          handleSubmit={handleSubmit}
        />
      ) : (
        <>
          <MainTitle title={"Post a Job"} />

          {generalDescription?.length > 0 &&
            postAJobOrder?.postAJobFormDetails?.jobName.length > 0 && (
              <GeneralBannerInfo
                title={`General ${postAJobOrder.postAJobFormDetails.jobName} 
                  Description`}
                description={generalDescription as unknown as string}
                titleBG={"bg-red-500"}
              />
            )}

          <form
            className="p-6 font-[sans-serif] m-6 max-w-4xl mx-auto"
            onSubmit={handleReview}
          >
            <div className="grid sm:grid-cols-2 gap-10">
              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Category
                </label>
                <select
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                  id="country"
                  name="jobCountry"
                  value={userCategory}
                  onChange={(e) => {
                    if (e.target.value.length === 0)
                      dispatch(
                        setPostAJobDetails({
                          ...postAJobOrder,
                          jobName: "",
                          jobTask: postAJobOrder.postAJobFormDetails.jobTask,
                          jobPrice: postAJobOrder.postAJobFormDetails.jobPrice,
                          jobZip: postAJobOrder.postAJobFormDetails.jobZip,
                          jobCityLocation:
                            postAJobOrder.postAJobFormDetails.jobCityLocation,
                          date: postAJobOrder.postAJobFormDetails.date,
                          time: postAJobOrder.postAJobFormDetails.time,
                          email: postAJobOrder.postAJobFormDetails.email,
                          jobCountry:
                            postAJobOrder.postAJobFormDetails.jobCountry,
                          jobState: postAJobOrder.postAJobFormDetails.jobState,
                          urgencyLevel:
                            postAJobOrder.postAJobFormDetails.urgencyLevel,
                          phoneNumber:
                            postAJobOrder.postAJobFormDetails.phoneNumber,
                          customerName:
                            postAJobOrder.postAJobFormDetails.customerName,
                          jobAddress:
                            postAJobOrder.postAJobFormDetails.jobAddress,
                        })
                      );
                    setUserCategory(e.target.value);
                  }}
                >
                  <option className="h-20" value="">
                    Select Category
                  </option>
                  {Object.entries(groupedServices).map(
                    ([category, services]) => (
                      <option
                        className="h-20"
                        value={`${category}`}
                        key={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Category Services
                </label>
                <select
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                  id="jobName"
                  name="jobName"
                  value={postAJobOrder.postAJobFormDetails.jobName}
                  onChange={(e) => {
                    // setUserService();
                    handleChange(e);
                  }}
                >
                  <option className="h-20" value="">
                    Select Service Name
                  </option>
                  {subCategoryList &&
                    (subCategoryList as Service[]).map((service) => (
                      <option
                        className="h-20"
                        value={`${service.name}`}
                        key={service.name}
                      >
                        {service.name}
                      </option>
                    ))}
                </select>

                {errors.jobName && (
                  <p className="text-red-500 text-xs">{errors.jobName}</p>
                )}
              </div>

              <JobInputs
                value={postAJobOrder.postAJobFormDetails.jobTask}
                errorMessage={errors.jobTask ?? ""}
                labelName={"Job Task"}
                name="jobTask"
                handleChange={handleChange}
              />

              <JobInputs
                value={postAJobOrder.postAJobFormDetails.jobPrice}
                errorMessage={errors.jobPrice ?? ""}
                labelName={"Job Price"}
                name="jobPrice"
                handleChange={handleChange}
              />

              <JobInputs
                value={postAJobOrder.postAJobFormDetails.jobAddress}
                errorMessage={errors.jobAddress ?? ""}
                labelName={"Job Address"}
                name="jobAddress"
                handleChange={handleChange}
              />

              <JobInputs
                value={postAJobOrder.postAJobFormDetails.phoneNumber}
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
                  value={postAJobOrder.postAJobFormDetails.jobCountry}
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
                  value={postAJobOrder.postAJobFormDetails.jobCityLocation}
                  onChange={handleChange}
                />
                {errors.jobCityLocation && (
                  <p className="text-red-500 text-xs">
                    {errors.jobCityLocation}
                  </p>
                )}
              </div>

              {(postAJobOrder.postAJobFormDetails.jobCountry ===
                "United States" ||
                postAJobOrder.postAJobFormDetails.jobCountry === "Canada") && (
                <>
                  <div className="relative flex items-center">
                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                      Job State Location
                    </label>
                    <StateAndTerritorySelector
                      className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                      name={"jobState"}
                      value={postAJobOrder.postAJobFormDetails.jobState}
                      onChange={handleChange}
                    />
                    {errors.jobState && (
                      <p className="text-red-500 text-xs">{errors.jobState}</p>
                    )}
                  </div>

                  <JobInputs
                    value={postAJobOrder.postAJobFormDetails.jobZip}
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
                  value={postAJobOrder.postAJobFormDetails.date}
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
                  value={postAJobOrder.postAJobFormDetails.time}
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
                  value={postAJobOrder.postAJobFormDetails.urgencyLevel}
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
                  value={postAJobOrder.postAJobFormDetails.email}
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
              onClick={handleReview}
            >
              Review
            </button>
          </form>
        </>
      )}
    </>
  );
};
