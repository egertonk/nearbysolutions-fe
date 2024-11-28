import { useState } from "react";
import { TermsConditionSolutionistsAcceptingJobs } from "../legal/TermsConditionSolutionistsAcceptingJobs";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";

type Props = {
  postAJobOrder: JobPosting;
};

export const JobAcceptanceAgreement: React.FC<Props> = ({ postAJobOrder }) => {
  const [isAccept, setIsAccept] = useState(false);
  const [isShowTermsAndConditions, setIsShowTermsAndConditions] =
    useState(false);

  return (
    <div className="bg-[#081449] shadow-lg shadow-indigo-500/40 px-4 py-5 sm:px-6 m-4 w-68">
      <div className="mt-8 text-lg text-gray-900 ">
        <input
          id="link-checkbox"
          type="checkbox"
          value=""
          onClick={() => {
            if (isShowTermsAndConditions && isAccept === false)
              setIsShowTermsAndConditions(!isShowTermsAndConditions);
            setIsAccept(!isAccept);
          }}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 text-white text-lg font-medium text-gray-900 dark:text-gray-300"
        >
          I agree with the{" "}
          <button
            className="text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() =>
              setIsShowTermsAndConditions(!isShowTermsAndConditions)
            }
          >
            {isShowTermsAndConditions
              ? "click again to close terms and conditions "
              : "terms and conditions"}
          </button>
          .
        </label>
        <p className="text-white">
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

      <p className="mt-4 text-lg mb-4 text-white">
        Please feel free to reach out to{" "}
        <strong>{postAJobOrder && postAJobOrder.customerName}</strong> directly
        at{" "}
        <a
          className="text-purple-400 font-bold "
          href={`mailto:${postAJobOrder && postAJobOrder.email}`}
        >
          {postAJobOrder && postAJobOrder.email}
        </a>{" "}
        or{" "}
        <span className="text-purple-400 font-bold ">
          {postAJobOrder && postAJobOrder.phoneNumber}
        </span>{" "}
        if you have any questions or require additional details about the job.
      </p>

      <p className="mt-2 text-lg mb-4 text-white">Best regards,</p>
      <p className="mt-2 text-lg mb-4 text-white">
        <strong>The Nearby Solutions Team</strong>
      </p>
    </div>
  );
};
