import React, { useState } from "react";
import { useGetPostedJobInfo } from "../Find-Work-Post-A-Job/useGetPostedJobInfo";
import { useCustomerInfo } from "../customer/useCustomerInfo";
import { MainTitle } from "../common-sections/MainTitle";
import { JobAcceptanceAgreement } from "../legal/JobAcceptanceAgreement";
import { useBooleans } from "../common-sections/useBooleans";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { Address } from "../common-sections/Address";
import { useMaps } from "../common-sections/useMaps";

export const ThankYouMessage: React.FC = () => {
  const [isShowJobDetails, setIsShowJobDetails] = useState(true);
  const [isShowCustomerDetails, setIsShowCustomerDetails] = useState(true);

  const { jobOrderDetails } = useGetPostedJobInfo("acceptJob");
  const { customerInfo } = useCustomerInfo(false, 49);
  const jobOrder = (jobOrderDetails ? jobOrderDetails : {}) as JobPosting;

  const NS_FLAT_FEE = 0.12; // DATABASE
  const solutionistPayOut = Number(
    jobOrder.jobPrice - jobOrder.jobPrice * NS_FLAT_FEE
  ).toFixed(2);
  const nearbySolutionPayOut = (
    jobOrder.jobPrice - Number(solutionistPayOut)
  ).toFixed(2);

  const {
    isAccept,
    setIsAccept,
    isShowTermsAndConditions,
    setIsShowTermsAndConditions,
  } = useBooleans();

  const { googleMapsUrl } = useMaps(
    jobOrder.jobCountry,
    jobOrder.jobAddress,
    jobOrder.jobCityLocation,
    jobOrder.jobState,
    jobOrder.jobZip
  );

  return (
    <>
      <MainTitle
        title={
          isAccept && isShowTermsAndConditions
            ? `Thank You, ${customerInfo?.customerInformation.firstName}!`
            : "Confirm Job Agreement"
        }
      />

      <p className="mt-2 text-lg text-gray-90">
        Thank you for accepting the job posted by{" "}
        <strong>{jobOrder && jobOrder.customerName}</strong>. We appreciate your
        expertise and are confident you’ll provide exceptional service.
      </p>

      <div className="flex flex-col md:flex-row md:-mx-3">
        <div className="flex-1 px-3">
          <div
            className="p-6 rounded-lg border-gray-200 mb-8 justtify-center"
            style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
          >
            <div className="bg-[#081449] rounded-full text-white flex justify-center items-center">
              <p className="text-xl font-semibold">Price Details</p>
            </div>

            <div className="grid grid-cols-2 gap-4 content-start mt-5">
              <div>
                <h3 className="font-semibold">Solutionist Pay Out</h3>
                <span className="font-medium text-emerald-600">
                  ${solutionistPayOut}
                </span>
              </div>

              <div>
                <h3 className="font-semibold">Nearby Solutions Service Fee</h3>
                <span className="font-medium text-purple-600">
                  ${nearbySolutionPayOut}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 px-3">
          <div
            className="p-6 rounded-lg border-gray-200 mb-8 justtify-center"
            style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
          >
            <div className="bg-[#081449] rounded-full text-white flex justify-between items-right">
              <p className="text-xl font-semibold ml-4">Customer Details</p>
              <button
                className="text-sm font-medium text-emerald-300 mx-4"
                onClick={() => setIsShowCustomerDetails(!isShowCustomerDetails)}
              >
                {isShowCustomerDetails ? "Hide" : "Show"}
              </button>
            </div>

            {isShowCustomerDetails && (
              <div className="grid grid-cols-2 gap-4 content-start mt-5">
                <div>
                  <h3 className="font-semibold">Requestor Name</h3>
                  <span>{jobOrder.customerName}</span>
                </div>

                <div>
                  <h3 className="font-semibold">Requestor Email</h3>
                  <span>{jobOrder.email}</span>
                </div>

                <div>
                  <h3 className="font-semibold">Requestor Phone Number</h3>
                  <span>{jobOrder.phoneNumber}</span>
                </div>

                <div>
                  <h3 className="font-semibold">Payment Status</h3>
                  <span>{jobOrder.paymentStatus && "On Hold"}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 px-3">
        <div
          className="p-12 rounded-lg border-gray-200 mb-8 justtify-center"
          style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
        >
          <div className="bg-[#081449] rounded-full text-white flex justify-center items-right">
            <p className="text-xl font-semibold">Job Location</p>
          </div>

          <Address
            country={jobOrder.jobCountry ?? ""}
            address={jobOrder.jobAddress ?? ""}
            city={jobOrder.jobCityLocation ?? ""}
            state={jobOrder.jobState ?? ""}
            zip={jobOrder.jobZip ?? ""}
          />

          <div className="relative w-full h-96 mt-5">
            {/* <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={googleMapsUrl}
            frame-Border="0"
            style={{ border: 0 }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            title="Job Location Map"
          ></iframe> */}

            <iframe
              className="absolute top-0 left-0 w-full h-full"
              width="100%"
              height="380px"
              frame-Border="0"
              style={{ border: 0 }}
              src={googleMapsUrl}
              allowFullScreen
              title="Job Location Map 2"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="flex-1 px-3">
        <div
          className="p-12 rounded-lg border-gray-200 mb-8 justtify-center"
          style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
        >
          <div className="bg-[#081449] rounded-full text-white flex justify-between items-right">
            <p className="text-xl font-semibold ml-4">Job Details</p>
            <button
              className="text-sm font-medium text-emerald-300 mx-4"
              onClick={() => setIsShowJobDetails(!isShowJobDetails)}
            >
              {isShowJobDetails ? "Hide" : "Show"}
            </button>
          </div>

          {isShowJobDetails && (
            <div className="grid grid-cols-2 gap-4 content-start mt-5">
              <div>
                <h3 className="font-semibold">Job Price</h3>
                <span>${jobOrder.jobPrice}</span>
              </div>

              <div>
                <h3 className="font-semibold">Job Name</h3>
                <span>{jobOrder.jobName}</span>
              </div>

              <div>
                <h3 className="font-semibold">Job Task</h3>
                <span>{jobOrder.jobTask}</span>
              </div>

              <div>
                <h3 className="font-semibold">Job Description</h3>
                <span>{jobOrder.jobDescription}</span>
              </div>

              <div>
                <h3 className="font-semibold">Job Status</h3>
                <span>{jobOrder.jobStatus}</span>
              </div>

              <div>
                <h3 className="font-semibold">Job Category</h3>
                <span>{jobOrder.jobCategory}</span>
                <h3 className="font-semibold">Job Category Service</h3>
                <span>{jobOrder.jobCategoryServices}</span>
              </div>

              <div>
                <h3 className="font-semibold">Appointment Job Date</h3>
                <span>{jobOrder.jobDate}</span>
              </div>

              <div>
                <h3 className="font-semibold">Schedule Time</h3>
                <span>{jobOrder.time}</span>
              </div>

              <div>
                <h3 className="font-semibold">Job Urgency Level</h3>
                <span>{jobOrder.urgencyLevel}</span>
              </div>

              <div>
                <h3 className="font-semibold">
                  Preferred Communication Method
                </h3>
                <span>{jobOrder.preferredCommunicationMethod}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {(isAccept === false || isShowTermsAndConditions === false) && (
        <JobAcceptanceAgreement
          isCustomer={false}
          booleanStatus={{
            isAccept,
            setIsAccept,
            isShowTermsAndConditions,
            setIsShowTermsAndConditions,
          }}
          jobOrder={jobOrder}
        />
      )}
    </>
  );
};
