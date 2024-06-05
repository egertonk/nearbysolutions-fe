import { Order } from "../../lib/types/orderTypes";
import { CustomerPersonalInfoForm } from "./CustomerPersonalInfoForm";

type Props = {
  isEditOrder?: boolean;
  order?: Order;
  handleSubmit: () => void;
  updateSolutionDetails: (id: string, value: string) => void;
  selectedTalent: string;
  setSelectedTalent?: React.Dispatch<React.SetStateAction<string>>;
  jobDetails?:
    | {
        isFixPrice: boolean;
        selectedStatus: boolean;
        title: string;
        price: {
          fixPrice: number;
          ratePerHour: number;
          discount: number;
        };
      }
    | undefined;
  formData: {
    customerID: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    selectedTalent: string;
    solutionFormattedDate: string;
    solutionDate: string;
    solutionStartTime: string;
    solutionTask?: string;
    solutionJob: string;
    talentID: number;
    talentFirstName: string;
    talentLastName: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isError: boolean;
};

export const CalenderForm: React.FC<Props> = ({
  isEditOrder,
  order,
  handleSubmit,
  updateSolutionDetails,
  jobDetails,
  formData,
  handleChange,
  isError,
}) => {
  console.table(formData);
  return (
    <>
      {isEditOrder ||
      (formData.solutionDate.length > 0 &&
        formData.solutionStartTime.length > 0) ? (
        <>
          <div className="justify-center -mx-3 mb-1">
            <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading text-purple-800">
              {`Talent Name: ${
                isEditOrder
                  ? order?.fullName
                  : `${formData?.talentFirstName} ${formData?.talentLastName}`
              }`}
            </p>
            <p className="flex justify-center text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading">
              {`Date: ${formData.solutionFormattedDate} | Time: ${formData.solutionStartTime}`}
            </p>
            <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
              <span className="font-heading text-purple-800">Job:</span>{" "}
              {formData.solutionJob}{" "}
              {jobDetails?.isFixPrice ? (
                <>
                  <span className="font-heading text-purple-800">
                    Fix Price:{" $"}
                  </span>
                  {jobDetails?.price?.fixPrice}
                </>
              ) : (
                <>
                  <span className="font-heading text-purple-800">
                    Price Per Hour:{" $"}
                  </span>
                  {jobDetails?.price?.ratePerHour}
                </>
              )}
            </p>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6 border border-purple-800 p-4 w-70">
            <div className="flex flex-wrap -mx-3 mb-6 pt-4">
              <CustomerPersonalInfoForm
                isError={isError}
                formData={formData}
                handleChange={handleChange}
              />

              <div className="w-full px-3 pt-4">
                <label
                  htmlFor="solutionTask"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Talent Job Task
                </label>
                <textarea
                  id="solutionTask"
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write out your solution... Example: Change my car front breaks"
                  defaultValue={formData.solutionTask}
                  maxLength={100}
                  onChange={(e) =>
                    updateSolutionDetails(e.target.id, e.target.value)
                  }
                />
                {isError && formData?.solutionTask?.length === 0 && (
                  <p className="text-red-500 text-xs italic">
                    Please provide a short Task.
                  </p>
                )}
              </div>

              <div className="w-full px-3 pt-4">
                <button
                  className="mt-5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                  type="button"
                  onClick={() => handleSubmit()}
                >
                  Pay
                </button>
              </div>

              {isEditOrder && (
                <div className="w-full px-3 pt-4">
                  <button
                    className="mt-5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-red-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
                    type="button"
                    onClick={() => handleSubmit()}
                  >
                    Cancel Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="text-center pb-4">
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
            Select a Date and Time
          </h1>
        </div>
      )}
    </>
  );
};
