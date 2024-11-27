import React, { useState } from "react";
import { useGetPostedJobInfo } from "../Find-Work-Post-A-Job/useGetPostedJobInfo";
import { useCustomerInfo } from "../customer/useCustomerInfo";
import { MainTitle } from "../common-sections/MainTitle";
import { ThankYouDetail } from "./ThankYouDetail";
import { TermsConditionSolutionistsAcceptingJobs } from "../legal/TermsConditionSolutionistsAcceptingJobs";

export const ThankYouMessage: React.FC = () => {
  const [isAccept, setIsAccept] = useState(false);
  const [isShowJobDetails, setIsShowJobDetails] = useState(true);
  const [isShowCustomerDetails, setIsShowCustomerDetails] = useState(true);
  const [isShowTermsAndConditions, setIsShowTermsAndConditions] =
    useState(false);
  const { postAJobOrder } = useGetPostedJobInfo("acceptJob");
  const { customerInfo } = useCustomerInfo(false, 1);

  return (
    <>
      <MainTitle title={`Thank You, ${customerInfo?.firstName}!`} />

      <p className="mt-2 text-lg text-gray-900 mb-4">
        Thank you for accepting the job posted by{" "}
        <strong>{postAJobOrder && postAJobOrder.customerName}</strong>. We
        appreciate your expertise and are confident you’ll provide exceptional
        service.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="shadow-xl bg-white overflow-hidden shadow rounded-lg border box rounded-lg shadow-lg flex-col md:flex-row">
          <div className="bg-sky-950 text-white shadow-lg shadow-indigo-500/40 px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium">
                Customer Details
              </h3>
              <button
                className="text-sm font-medium text-emerald-300"
                onClick={() => setIsShowCustomerDetails(!isShowCustomerDetails)}
              >
                {isShowCustomerDetails ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1 max-w-2xl text-sm">
              The contact information is provided below.
            </p>
          </div>

          {isShowCustomerDetails && (
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <ThankYouDetail
                  columName={"Full name"}
                  name={postAJobOrder.customerName}
                  isJobDetail={false}
                />

                <ThankYouDetail
                  columName={"Email"}
                  name={postAJobOrder.email}
                  isJobDetail={false}
                />

                <ThankYouDetail
                  columName={"Phone Number"}
                  name={postAJobOrder.phoneNumber}
                  isJobDetail={false}
                />

                <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-lg font-medium">Address</dt>
                  <dd className="mt-1 text-lg sm:mt-0 sm:col-span-2">
                    {postAJobOrder &&
                    (postAJobOrder?.jobCountry === "United States" ||
                      postAJobOrder.jobCountry === "Canada") ? (
                      <>
                        <p>
                          {postAJobOrder && postAJobOrder.jobAddress},{" "}
                          {postAJobOrder && postAJobOrder.jobCityLocation},{" "}
                          {postAJobOrder && postAJobOrder.jobZip}
                        </p>
                        <p>{postAJobOrder && postAJobOrder.jobCountry}</p>
                      </>
                    ) : (
                      <>
                        <p>
                          {postAJobOrder && postAJobOrder.jobCityLocation},{" "}
                          {postAJobOrder && postAJobOrder.jobCountry}
                        </p>
                      </>
                    )}
                  </dd>
                </div>

                <ThankYouDetail
                  columName={
                    "Preferred Communication Method --->-Add to fe form and java"
                  }
                  name={postAJobOrder.preferredCommunicationMethod}
                  isJobDetail={false}
                />
              </dl>
            </div>
          )}
        </div>

        <div className="shadow-xl bg-white overflow-hidden shadow rounded-lg border box rounded-lg shadow-lg flex-col md:flex-row">
          <div className="bg-sky-950 text-white shadow-lg shadow-indigo-500/40 px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg leading-6 font-medium">Job Details</h3>
              <button
                className="text-sm font-medium mx-4 text-emerald-300"
                onClick={() => setIsShowJobDetails(!isShowJobDetails)}
              >
                {isShowJobDetails ? "Hide" : "Show"}
              </button>
            </div>
            <p className="mt-1 max-w-2xl text-sm">
              You can find the job details assigned to this contact below.
            </p>
          </div>

          {isShowJobDetails && (
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <ThankYouDetail
                  columName={"Job Date"}
                  name={postAJobOrder.date}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Job Time"}
                  name={postAJobOrder.time}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Price"}
                  name={`$${String(postAJobOrder.jobPrice)}`}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Job Name"}
                  name={postAJobOrder.jobName}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Job Task"}
                  name={postAJobOrder.jobTask}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Job Description"}
                  name={postAJobOrder.jobDescription}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Cancellation Policy"}
                  name={postAJobOrder.cancellationPolicy}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={"Job Urgency Level"}
                  name={postAJobOrder.urgencyLevel}
                  isJobDetail
                />

                <ThankYouDetail
                  columName={
                    "Job special Instructions ----------Add to fe form and java"
                  }
                  name={postAJobOrder.specialInstructions}
                  isJobDetail
                />
              </dl>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 text-lg text-gray-900 ">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          onClick={() => setIsAccept(!isAccept)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            terms and conditions
          </a>
          .
          <button
            className="ms-8 text-sm font-bold text-red-900"
            onClick={() =>
              setIsShowTermsAndConditions(!isShowTermsAndConditions)
            }
          >
            {isShowTermsAndConditions
              ? "Click to Hide Terms and Conditions"
              : "Click to Show Terms and Conditions"}
          </button>
        </label>
        <p>
          By clicking "Accept" or proceeding with the job, the Solutionist
          acknowledges that they have read, understood, and agreed to these
          Terms and Conditions.
        </p>
      </div>
      {isShowTermsAndConditions && <TermsConditionSolutionistsAcceptingJobs />}

      <button
        type="submit"
        disabled={!isAccept}
        onClick={() =>
          console.log(
            "update database --- send notification to job poster with a payment code and instruction--- send confirmation to solutionist and it own code --"
          )
        }
        className="font-bold mt-2 mb-4 px-6 py-2.5 w-full text-lg text-white rounded bg-gray-600 hover:bg-gray-900 transition-all"
      >
        Accept
      </button>

      <p className="mt-4 text-lg text-black mb-4">
        Please feel free to reach out to{" "}
        <strong>{postAJobOrder && postAJobOrder.customerName}</strong> directly
        at{" "}
        <a
          className="text-purple-800 font-bold "
          href={`mailto:${postAJobOrder && postAJobOrder.email}`}
        >
          {postAJobOrder && postAJobOrder.email}
        </a>{" "}
        or{" "}
        <span className="text-purple-800 font-bold ">
          {postAJobOrder && postAJobOrder.phoneNumber}
        </span>{" "}
        if you have any questions or require additional details about the job.
      </p>

      <p className="mt-2 text-lg text-gray-900 mb-4">Best regards,</p>
      <p className="mt-2 text-lg text-gray-900 mb-4">
        <strong>The Nearby Solutions Team</strong>
      </p>
    </>
  );
};
