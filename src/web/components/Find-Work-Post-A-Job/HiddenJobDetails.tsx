import React from "react";
import { JobDetailTypes } from "./JobDetails";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";

type Props = {
  formData: JobDetailTypes;
  imageUrl: string;
  customerOrder: CustomerFormData;
};

export const HiddenJobDetails: React.FC<Props> = ({
  formData,
  imageUrl,
  customerOrder,
}) => {
  const detailsColor = "font-bold text-xl bg-[#525495] rounded-lg";

  return (
    <div className="flex-1 mt-3 bg-[#312020] text-white font-bold w-full max-w-lg rounded-lg overflow-hidden mx-auto flex-col mb-4">
      <div
        className="p-6 rounded-lg border-gray-200 mb-8 justtify-center"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-3xl font-bold grid center-text bg-[#525495] rounded-lg">
          Hidden Job Details
        </p>

        <div className="grid grid-cols-2 gap-4 content-start mt-5">
          <div className="">
            <h3 className={detailsColor}>Customer Name</h3>
            <span>
              {customerOrder.customerInfo.firstName}{" "}
              {customerOrder.customerInfo.lastName}
            </span>
          </div>

          <div>
            <h3 className={detailsColor}>Job Address</h3>
            <p>{formData.jobAddress}</p>
            {formData.jobCountry === "United States" ||
            formData.jobCountry === "Canada" ? (
              <>
                <p>{formData.jobCountry}.</p>
                <p>
                  {formData.jobCityLocation}, {formData.jobState},{" "}
                  {formData.jobZip}.
                </p>
              </>
            ) : (
              <>
                <p>{formData.jobCountry}.</p>
                <p>{formData.jobCityLocation}.</p>
              </>
            )}
          </div>

          <div>
            <h3 className={detailsColor}>Customer Email</h3>
            <span>{formData.email}</span>
          </div>

          <div>
            <h3 className={detailsColor}>Customer Phone Number</h3>
            <span>{formData.phoneNumber}</span>
          </div>

          <div>
            <h3 className={detailsColor}>Appointment Date</h3>
            <span>{formData.date}</span>
          </div>

          <div>
            <h3 className={detailsColor}>Schedule Time</h3>
            <span>{formData.time}</span>
          </div>

          <div>
            <h3 className={detailsColor}>Job Task</h3>
            <span>{formData.jobTask}</span>
          </div>

          <div>
            <h3 className={detailsColor}>Job Urgency Level</h3>
            <span>{formData.urgencyLevel}</span>
          </div>
        </div>
        <div className="flex justify-center items-center m-5">
          {imageUrl && <img src={imageUrl} alt="Static Map" />}
        </div>
      </div>
    </div>
  );
};
