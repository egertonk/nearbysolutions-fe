import { useDispatch, useSelector } from "react-redux";
import { CustomerPersonalInfoForm } from "../customer/CustomerPersonalInfoForm";
import { RootState } from "../../../store";
import {
  setCustomerOrder,
  setIsError,
} from "../../../store/customerContractorSlice";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { useNavigate } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";

export const CalenderForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData;
  const isEditOrder = states.formData.isEditOrder;
  const isGiftASolution = states.applicationModeState.isGiftASolution;

  const validateForm = () => {
    const excludedFields = [
      "giftFor_fullName",
      "giftStatus",
      "longTermContract",
      "orderID", // Delete from here to down
      "customerInfo",
      "solutionDateContract",
      "solutionTask",
      "solutionJob",
      "solutionStartTime",
      "selectedTalent",
      "talentID",
      "talentFirstName",
      "talentLastName",
      "solutionPrice",
      "fixPriceStatus",
      "solutionPriceDiscountPercentage",
      "orderDate",
    ];

    const result = Object.entries(customerOrder.customerOrder).every(
      ([key, value]) => {
        console.log(key, "   ");

        if (!excludedFields.includes(key)) {
          return value?.toString()?.length > 0;
        }
        return true;
      }
    );

    return result;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // submit to database and navig
      navigate("/payment");
    } else {
      dispatch(setIsError(true));
    }
  };

  const updateStore = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const updatedOrder: CustomerFormData = {
      ...customerOrder.customerOrder,
      [name]: value,
    };

    dispatch(setCustomerOrder(updatedOrder));
  };

  return (
    <>
      <MainTitle
        title={`${
          isGiftASolution ? "Infomation Gift Form" : "Customer Infomation Form"
        }`}
      />

      <div className="justify-center -mx-3 mb-1">
        <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading text-purple-800">
          {`Talent Name: ${customerOrder.customerOrder.talentFirstName} ${customerOrder.customerOrder.talentLastName}`}
        </p>
        <p className="flex justify-center text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading">
          {`Date: ${customerOrder.customerOrder.solutionDateContract.solutionFormattedDate} | Time: ${customerOrder.customerOrder.solutionStartTime}`}
        </p>
        <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
          <span className="font-heading text-purple-800">Job:</span>{" "}
          {customerOrder.customerOrder.solutionJob}{" "}
          {isEditOrder ? (
            <>
              {customerOrder.customerOrder.fixPriceStatus === false ? (
                <>
                  <span className="font-heading text-purple-800">
                    Fix Price:{" $"}
                  </span>
                  {customerOrder.customerOrder.solutionPrice}
                </>
              ) : (
                <>
                  <span className="font-heading text-purple-800">
                    Price Per Hour:{" $"}
                  </span>
                  {customerOrder.customerOrder.solutionPrice}
                </>
              )}
            </>
          ) : (
            <>
              <span className="font-heading text-purple-800">
                {customerOrder.customerOrder.fixPriceStatus
                  ? "Fix Price: $"
                  : "Price Per Hour: $"}
              </span>
              {customerOrder.customerOrder.solutionPrice}
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap w-50 justify-center">
        <div className="flex flex-wrap mb-6">
          <CustomerPersonalInfoForm />

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
              name="solutionTask"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write out your solution... Example: Change my car front breaks"
              defaultValue={customerOrder.customerOrder.solutionTask}
              maxLength={100}
              onChange={(e) => updateStore(e)}
            />
            {customerOrder.isError &&
              customerOrder.customerOrder.solutionTask?.length === 0 && (
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
              {isEditOrder ? "Update" : "Submit"}
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
  );
};
