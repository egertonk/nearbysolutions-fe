import { MainTitle } from "../common-sections/MainTitle";
import { StateAndTerritorySelector } from "../common-sections/StateAndTerritorySelector";
import { JobInputs } from "./JobInputs";
import { ReviewPopup } from "./ReviewPopup";
import { urgencyLevels } from "../../../store/postAJobSlice";
import { usePostAJob } from "./usePostAJob";
import { Service } from "../../lib/types/FindWorkPostAJobtypesData";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { JobAcceptanceAgreement } from "../legal/JobAcceptanceAgreement";

export const PostAJobForm: React.FC = () => {
  const { postActions, booleanStatus, postData } = usePostAJob();

  return (
    <>
      {postData.openReview ? (
        <ReviewPopup
          setOpenReview={postActions.setOpenReview}
          formData={postData.postAJobOrder}
          jobImage={postData.jobImage}
          handleSubmit={postActions.handleSubmit}
        />
      ) : (
        <>
          <MainTitle title={"Post a Job"} />

          {postData.generalDescription?.length > 0 &&
            postData.postAJobOrder?.jobName.length > 0 && (
              <GeneralBannerInfo
                title={`General ${postData.postAJobOrder.jobName} 
                  Description`}
                description={postData.generalDescription as unknown as string}
                titleBG={"bg-red-500"}
              />
            )}

          {"Job Not Listed" === postData.userCategory && (
            <GeneralBannerInfo
              title="Job Not Listed"
              description="This job posting request requires government verification of any certification prior to publication. Please allow up to 3 business days for processing."
              titleBG={"bg-red-500"}
            />
          )}

          <form
            className="p-6 font-[sans-serif] m-6 max-w-4xl mx-auto"
            onSubmit={postActions.handleReview}
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
                  value={postData.userCategory}
                  onChange={(e) => {
                    if (e.target.value === "Job Not Listed") {
                      e.target.value =
                        e.target.value === "Job Not Listed"
                          ? "Job Not Listed"
                          : "";
                      e.target.name = "jobName";
                      postActions.handleChange(e);
                    }

                    postActions.setUserCategory(e.target.value);
                  }}
                >
                  <option className="h-20" value="">
                    Select Category
                  </option>
                  <option
                    className="h-20 bg-purple-700 text-white"
                    value="Job Not Listed"
                  >
                    Job Not Listed
                  </option>
                  {Object.entries(postData.groupedServices).map(
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
                  value={postData.postAJobOrder.jobName}
                  onChange={(e) => {
                    // setUserService();
                    postActions.handleChange(e);
                  }}
                >
                  <option className="h-20" value="">
                    Select Service Name
                  </option>
                  {postData.subCategoryList &&
                    (postData.subCategoryList as Service[]).map((service) => (
                      <option
                        className="h-20"
                        value={`${service.name}`}
                        key={service.name}
                      >
                        {service.name}
                      </option>
                    ))}
                </select>

                {postData.errors.jobName && (
                  <p className="text-red-500 text-xs">
                    {postData.errors.jobName}
                  </p>
                )}
              </div>

              <JobInputs
                value={postData.postAJobOrder.jobTask}
                errorMessage={postData.errors.jobTask ?? ""}
                labelName={"Job Task"}
                name="jobTask"
                handleChange={postActions.handleChange}
              />

              <JobInputs
                value={postData.postAJobOrder.jobPrice}
                errorMessage={postData.errors.jobPrice ?? ""}
                labelName={"Job Price"}
                name="jobPrice"
                handleChange={postActions.handleChange}
              />

              <JobInputs
                value={postData.postAJobOrder.jobAddress}
                errorMessage={postData.errors.jobAddress ?? ""}
                labelName={"Job Address"}
                name="jobAddress"
                handleChange={postActions.handleChange}
              />

              <JobInputs
                value={postData.postAJobOrder.phoneNumber}
                errorMessage={postData.errors.phoneNumber ?? ""}
                labelName={"Customer Phone Number"}
                name="phoneNumber"
                handleChange={postActions.handleChange}
              />

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Country Location
                </label>
                <select
                  className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                  id="country"
                  name="jobCountry"
                  value={postData.postAJobOrder.jobCountry}
                  onChange={postActions.handleChange}
                >
                  <option className="h-20" value="">
                    Select your Country
                  </option>
                  {postData.validCountries?.map((countryData) => (
                    <option
                      className="h-20"
                      value={`${countryData.countryName}`}
                      key={countryData.countryName}
                    >
                      {countryData.countryName}
                    </option>
                  ))}
                </select>

                {postData.errors.jobCountry && (
                  <p className="text-red-500 text-xs">
                    {postData.errors.jobCountry}
                  </p>
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
                  value={postData.postAJobOrder.jobCityLocation}
                  onChange={postActions.handleChange}
                />
                {postData.errors.jobCityLocation && (
                  <p className="text-red-500 text-xs">
                    {postData.errors.jobCityLocation}
                  </p>
                )}
              </div>

              {(postData.postAJobOrder.jobCountry === "United States" ||
                postData.postAJobOrder.jobCountry === "Canada") && (
                <>
                  <div className="relative flex items-center">
                    <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                      Job State Location
                    </label>
                    <StateAndTerritorySelector
                      className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
                      name={"jobState"}
                      value={postData.postAJobOrder.jobState}
                      onChange={postActions.handleChange}
                    />
                    {postData.errors.jobState && (
                      <p className="text-red-500 text-xs">
                        {postData.errors.jobState}
                      </p>
                    )}
                  </div>

                  <JobInputs
                    value={postData.postAJobOrder.jobZip}
                    errorMessage={postData.errors.jobZip ?? ""}
                    labelName={"Job Zip Code"}
                    name="jobZip"
                    handleChange={postActions.handleChange}
                  />
                </>
              )}

              <div className="relative flex items-center">
                <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
                  Job Date
                </label>
                <input
                  type="date"
                  name="jobDate"
                  className="px-4 py-3 bg-[#f0f1f2] text-black w-full text-sm outline-[#007bff] rounded"
                  value={postData.postAJobOrder.jobDate}
                  onChange={postActions.handleChange}
                  min={
                    new Date(Date.now() + 86400000).toISOString().split("T")[0]
                  } //Data is one day ahead
                />
                {postData.errors.jobDate && (
                  <p className="text-red-500 text-xs">
                    {postData.errors.jobDate}
                  </p>
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
                  value={postData.postAJobOrder.time}
                  onChange={postActions.handleChange}
                />
                {postData.errors.time && (
                  <p className="text-red-500 text-xs">{postData.errors.time}</p>
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
                  value={postData.postAJobOrder.urgencyLevel}
                  onChange={postActions.handleChange}
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
                {postData.errors.urgencyLevel && (
                  <p className="text-red-500 text-xs">
                    {postData.errors.urgencyLevel}
                  </p>
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
                  value={(postData.jobImage && postData.jobImage?.name) || ""}
                  onChange={postActions.handleImage}
                  accept="image/*"
                />
                {postData.jobImage && (
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
                  value={postData.postAJobOrder.email}
                  onChange={postActions.handleChange}
                />
                {postData.errors.email && (
                  <p className="text-red-500 text-xs">
                    {postData.errors.email}
                  </p>
                )}
              </div>
            </div>

            <JobAcceptanceAgreement isCustomer booleanStatus={booleanStatus} />

            <button
              type="submit"
              className="mt-8 px-6 py-2.5 w-full text-sm text-white rounded bg-gray-600 hover:bg-gray-700 transition-all"
              onClick={postActions.handleReview}
            >
              Review
            </button>
          </form>
        </>
      )}
    </>
  );
};
