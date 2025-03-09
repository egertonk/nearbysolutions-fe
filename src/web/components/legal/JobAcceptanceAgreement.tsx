import { TermsConditionSolutionistsAcceptingJobs } from "./TermsConditionSolutionistsAcceptingJobs";
import { JobPosting } from "../../lib/types/FindWorkPostAJobtypesData";
import { TermsConditionSolutionistsPostingJobs } from "./TermsConditionTermsConditionsPostingJob";

type BooleanStatus = {
  isAccept: boolean;
  setIsAccept: React.Dispatch<React.SetStateAction<boolean>>;
  isShowTermsAndConditions: boolean;
  setIsShowTermsAndConditions: React.Dispatch<React.SetStateAction<boolean>>;
};

type Props = {
  isCustomer: boolean;
  booleanStatus: BooleanStatus;
  jobOrder?: JobPosting;
};

export const JobAcceptanceAgreement: React.FC<Props> = ({
  isCustomer,
  jobOrder,
  booleanStatus,
}) => {
  const toggleTermsAndConditions = () => {
    if (booleanStatus.isShowTermsAndConditions && !booleanStatus.isAccept) {
      booleanStatus.setIsShowTermsAndConditions(
        !booleanStatus.isShowTermsAndConditions
      );
    }
    booleanStatus.setIsAccept(!booleanStatus.isAccept);
  };

  return (
    <div className="bg-[#081449] shadow-lg shadow-indigo-500/40 px-4 py-5 sm:px-6 m-4 w-68">
      <div className="text-lg text-gray-900">
        <input
          id="link-checkbox"
          type="checkbox"
          onClick={toggleTermsAndConditions}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="link-checkbox"
          className="ms-2 text-white text-lg font-medium dark:text-gray-300"
        >
          I agree with the{" "}
          <button
            className="text-blue-600 dark:text-blue-400 hover:underline"
            onClick={() =>
              booleanStatus.setIsShowTermsAndConditions(
                !booleanStatus.isShowTermsAndConditions
              )
            }
          >
            {booleanStatus.isShowTermsAndConditions
              ? "click again to close terms and conditions "
              : "terms and conditions"}
          </button>
          .
        </label>
        <p className="text-white">
          {isCustomer ? `By checking the "checkbox" ` : `By clicking "Accept" `}
          or proceeding with the job, the
          {isCustomer ? " Customer " : " Solutionist "}
          acknowledges that they have read, understood, and agreed to these
          Terms and Conditions.
        </p>
      </div>

      {booleanStatus.isShowTermsAndConditions &&
        (isCustomer ? (
          <TermsConditionSolutionistsPostingJobs />
        ) : (
          <TermsConditionSolutionistsAcceptingJobs />
        ))}

      {!isCustomer && (
        <button
          type="submit"
          disabled={!booleanStatus.isAccept}
          onClick={() => {
            console.log(
              "IF SOLUTIONIST update database --- send notification to job poster with a payment code and instruction--- send confirmation to solutionist and its own code --"
            );
            booleanStatus.setIsShowTermsAndConditions(
              !booleanStatus.isShowTermsAndConditions
            );
          }}
          className="font-bold mt-2 mb-4 px-6 py-2.5 w-full text-lg text-white rounded bg-gray-600 hover:bg-gray-900 transition-all"
        >
          Accept
        </button>
      )}
    </div>
  );
};
