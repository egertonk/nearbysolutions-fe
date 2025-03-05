import { TermsConditionForToolOwners } from "./TermsConditionForToolOwners";
import { TermsConditionForToolRenters } from "./TermsConditionForToolRenters";

type Props = {
  isCustomer: boolean;
  isAccept: boolean;
  setIsAccept: React.Dispatch<React.SetStateAction<boolean>>;
  isShowTermsAndConditions: boolean;
  setIsShowTermsAndConditions: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToolsLegalAgreement: React.FC<Props> = ({
  isCustomer,
  isAccept,
  setIsAccept,
  isShowTermsAndConditions,
  setIsShowTermsAndConditions,
}) => {
  const toggleTermsAndConditions = () => {
    if (isShowTermsAndConditions && !isAccept) {
      setIsShowTermsAndConditions(!isShowTermsAndConditions);
    }
    setIsAccept(!isAccept);
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
          {isCustomer
            ? `By checking the "checkbox" and renting tools through `
            : `By clicking "Accept" `}
          <span className="text-purple-400">Nearby Solutions</span>,
          {isCustomer ? " renter " : " owners "}
          acknowledges that they have read, understood, and agreed to these
          Terms and Conditions.
        </p>
      </div>

      {isShowTermsAndConditions &&
        (isCustomer ? (
          <TermsConditionForToolRenters />
        ) : (
          <TermsConditionForToolOwners />
        ))}

      {isCustomer && !isAccept && (
        <button
          type="submit"
          onClick={() => setIsAccept(true)}
          className="font-bold mt-2 mb-4 px-6 py-2.5 w-full text-lg text-white rounded bg-gray-600 hover:bg-gray-900 transition-all"
        >
          Accept
        </button>
      )}
    </div>
  );
};
