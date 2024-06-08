import { useDispatch, useSelector } from "react-redux";
import { CustomerPersonalInfoForm } from "./CustomerPersonalInfoForm";
import { RootState } from "../../../store";
import {
  setCustomerOrder,
  setIsError,
} from "../../../store/customerContractorSlice";
import { CustomerFormData } from "../../lib/types/orderTypes";
import { useNavigate } from "react-router";

export const CalenderForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerOrder = useSelector((state: RootState) => state.formData);

  const validateForm = () => {
    return Object.values(customerOrder.customerOrder).every((field) => {
      // console.log(field, "    formData 1111 ", field.toString().length > 0);
      return field.toString().length > 0;
    });
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
      <div className="text-center pb-4">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800">
          Customer Infomation Form
        </h1>
      </div>

      <div className="justify-center -mx-3 mb-1">
        <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading text-purple-800">
          {`Talent Name: ${
            customerOrder.isEditOrder
              ? `${customerOrder.order.firstName} ${customerOrder.order.lastName}`
              : `${customerOrder.customerOrder.talentFirstName} ${customerOrder.customerOrder.talentLastName}`
          }`}
        </p>
        <p className="flex justify-center text-gray-900 dark:text-white text-base font-medium mb-3 text-center font-heading">
          {`Date: ${customerOrder.customerOrder.solutionFormattedDate} | Time: ${customerOrder.customerOrder.solutionStartTime}`}
        </p>
        <p className="text-gray-900 dark:text-white text-base font-medium mb-3 text-center">
          <span className="font-heading text-purple-800">Job:</span>{" "}
          {customerOrder.customerOrder.solutionJob}{" "}
          {customerOrder.isEditOrder ? (
            <>
              {customerOrder.customerOrder.solutionPricePerHourStatus ===
              false ? (
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
                {customerOrder.customerOrder.solutionPricePerHourStatus
                  ? "Fix Price: $"
                  : "Price Per Hour: $"}
              </span>
              {customerOrder.customerOrder.solutionPrice}
            </>
          )}
        </p>
      </div>

      <div className="flex flex-wrap -mx-3 mb-6 border border-purple-800 p-4 w-70">
        <div className="flex flex-wrap -mx-3 mb-6 pt-4">
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
              {customerOrder.isEditOrder ? "Update" : "Submit"}
            </button>
          </div>

          {customerOrder.isEditOrder && (
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
