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
  const jobOrder = (jobOrderDetails || {}) as JobPosting;

  const NS_FLAT_FEE = 0.12;
  const solutionistPayOut = (jobOrder.jobPrice * (1 - NS_FLAT_FEE)).toFixed(2);
  const nearbySolutionPayOut = (jobOrder.jobPrice * NS_FLAT_FEE).toFixed(2);

  const {
    isAccept,
    setIsAccept,
    isShowTermsAndConditions,
    setIsShowTermsAndConditions,
  } = useBooleans();
  const { googleMapsUrl } = useMaps(
    jobOrder.jobCountry ?? "",
    jobOrder.jobAddress ?? "",
    jobOrder.jobCityLocation ?? "",
    jobOrder.jobState ?? "",
    jobOrder.jobZip ?? ""
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

      <p className="mt-2 text-lg text-gray-900">
        Thank you for accepting the job posted by{" "}
        <strong>{jobOrder.customerName}</strong>. We appreciate your expertise
        and are confident you’ll provide exceptional service.
      </p>

      {/* Price & Customer Details Section */}
      <div className="flex flex-col md:flex-row md:-mx-3">
        <PriceDetails
          solutionistPayOut={solutionistPayOut}
          nearbySolutionPayOut={nearbySolutionPayOut}
        />
        <CustomerDetails
          jobOrder={jobOrder}
          isShowCustomerDetails={isShowCustomerDetails}
          setIsShowCustomerDetails={setIsShowCustomerDetails}
        />
      </div>

      {/* Job Location */}
      <JobLocation jobOrder={jobOrder} googleMapsUrl={googleMapsUrl} />

      {/* Job Details Section */}
      <JobDetails
        jobOrder={jobOrder}
        isShowJobDetails={isShowJobDetails}
        setIsShowJobDetails={setIsShowJobDetails}
      />

      {/* Agreement Section */}
      {!isAccept || !isShowTermsAndConditions ? (
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
      ) : null}

      {isShowTermsAndConditions && jobOrder && (
         <div className="bg-[#081449] shadow-lg shadow-indigo-500/40 px-4 py-5 sm:px-6 m-4 w-68">
          <p className="mt-4 text-lg mb-4 text-white">
            Please feel free to reach out to{" "}
            <strong>{jobOrder.customerName}</strong> directly at{" "}
            <a
              className="text-purple-400 font-bold "
              href={`mailto:${jobOrder.email}`}
            >
              {jobOrder.email}
            </a>{" "}
            {/* or{" "}
            <span className="text-purple-400 font-bold ">
              {jobOrder.phoneNumber}
            </span>{" "} */}
            if you have any questions or require additional details about the
            job.
          </p>
          <p className="mt-2 text-lg mb-4 text-white">Best regards,</p>
          <p className="mt-2 text-lg mb-4 text-white">
            <strong>
              The <span className="text-purple-400">Nearby Solutions</span> Team
            </strong>
          </p>
        </div>
      )}
    </>
  );
};

// ✅ Price Details Component
const PriceDetails: React.FC<{
  solutionistPayOut: string;
  nearbySolutionPayOut: string;
}> = ({ solutionistPayOut, nearbySolutionPayOut }) => (
  <div className="flex-1 px-3">
    <div className="p-6 rounded-lg border-gray-200 mb-8 shadow-md">
      <div className="bg-[#081449] rounded-full text-white flex justify-center items-center">
        <p className="text-xl font-semibold">Price Details</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-5">
        <PriceItem
          title="Solutionist Pay Out"
          value={`$${solutionistPayOut}`}
          color="text-emerald-600"
        />
        <PriceItem
          title="Nearby Solutions Service Fee"
          value={`$${nearbySolutionPayOut}`}
          color="text-purple-600"
        />
      </div>
    </div>
  </div>
);

const PriceItem: React.FC<{ title: string; value: string; color: string }> = ({
  title,
  value,
  color,
}) => (
  <div>
    <h3 className="font-semibold">{title}</h3>
    <span className={`font-medium ${color}`}>{value}</span>
  </div>
);

// ✅ Customer Details Component
const CustomerDetails: React.FC<{
  jobOrder: JobPosting;
  isShowCustomerDetails: boolean;
  setIsShowCustomerDetails: any;
}> = ({ jobOrder, isShowCustomerDetails, setIsShowCustomerDetails }) => (
  <div className="flex-1 px-3">
    <div className="p-6 rounded-lg border-gray-200 mb-8 shadow-md">
      <Header
        title="Customer Details"
        isVisible={isShowCustomerDetails}
        toggleVisibility={setIsShowCustomerDetails}
      />
      {isShowCustomerDetails && (
        <div className="grid grid-cols-2 gap-4 mt-5">
          <DetailItem title="Requestor Name" value={jobOrder.customerName} />
          <DetailItem title="Requestor Email" value={jobOrder.email} />
          <DetailItem
            title="Requestor Phone Number"
            value={jobOrder.phoneNumber}
          />
          <DetailItem
            title="Payment Status"
            value={jobOrder.paymentStatus ? "On Hold" : "Pending"}
          />
        </div>
      )}
    </div>
  </div>
);

// ✅ Job Location Component
const JobLocation: React.FC<{
  jobOrder: JobPosting;
  googleMapsUrl: string;
}> = ({ jobOrder, googleMapsUrl }) => (
  <div className="flex-1 px-3">
    <div className="p-12 rounded-lg border-gray-200 mb-8 shadow-md">
      <Header title="Job Location" />
      <Address
        country={jobOrder.jobCountry ?? ""}
        address={jobOrder.jobAddress ?? ""}
        city={jobOrder.jobCityLocation ?? ""}
        state={jobOrder.jobState ?? ""}
        zip={jobOrder.jobZip ?? ""}
      />
      <div className="relative w-full h-96 mt-5">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={googleMapsUrl}
          allowFullScreen
          title="Job Location Map"
        />
      </div>
    </div>
  </div>
);

// ✅ Job Details Component
const JobDetails: React.FC<{
  jobOrder: JobPosting;
  isShowJobDetails: boolean;
  setIsShowJobDetails: any;
}> = ({ jobOrder, isShowJobDetails, setIsShowJobDetails }) => (
  <div className="flex-1 px-3">
    <div className="p-12 rounded-lg border-gray-200 mb-8 shadow-md">
      <Header
        title="Job Details"
        isVisible={isShowJobDetails}
        toggleVisibility={setIsShowJobDetails}
      />
      {isShowJobDetails && (
        <div className="grid grid-cols-2 gap-4 mt-5">
          <DetailItem title="Job Price" value={`$${jobOrder.jobPrice}`} />
          <DetailItem title="Job Name" value={jobOrder.jobName} />
          <DetailItem title="Job Task" value={jobOrder.jobTask} />
          <DetailItem title="Job Description" value={jobOrder.jobDescription} />
          <DetailItem title="Job Status" value={jobOrder.jobStatus} />
          <DetailItem title="Job Category" value={jobOrder.jobCategory} />
          <DetailItem title="Job Urgency Level" value={jobOrder.urgencyLevel} />
          <DetailItem title="Appointment Job Date" value={jobOrder.jobDate} />
          <DetailItem title="Schedule Time" value={jobOrder.time} />
        </div>
      )}
    </div>
  </div>
);

const DetailItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div>
    <h3 className="font-semibold">{title}</h3>
    <span>{value}</span>
  </div>
);

const Header: React.FC<{
  title: string;
  isVisible?: boolean;
  toggleVisibility?: any;
}> = ({ title, isVisible, toggleVisibility }) => (
  <div className="bg-[#081449] rounded-full text-white flex justify-between items-center px-4 py-2">
    <p className="text-xl font-semibold">{title}</p>
    {toggleVisibility && (
      <button
        className="text-sm font-medium text-emerald-300"
        onClick={() => toggleVisibility(!isVisible)}
      >
        {isVisible ? "Hide" : "Show"}
      </button>
    )}
  </div>
);
