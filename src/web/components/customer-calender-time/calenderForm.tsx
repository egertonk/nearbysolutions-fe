import { useDispatch, useSelector } from "react-redux";
import { CustomerPersonalInfoForm } from "../customer/CustomerPersonalInfoForm";
import { RootState } from "../../../store";
import {
  setCustomerOrder,
  setIsError,
} from "../../../store/customerContractorSlice";
import { useNavigate } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";

export const CalenderForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const states = useSelector((state: RootState) => state);
  const { customerOrder, isEditOrder } = states.formData;
  const {
    giftStatus,
    solutionTask,
    solutionJob,
    solutionPrice,
    fixPriceStatus,
    solutionDateContract,
    talentFirstName,
    talentLastName,
  } = customerOrder;

  const excludedFields = new Set([
    "giftFor_fullName",
    "giftStatus",
    "longTermContract",
    "orderID",
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
  ]);

  const validateForm = () => {
    const isCustomerOrderReady = Object.entries(customerOrder).every(
      ([key, value]) =>
        excludedFields.has(key) || Boolean(value?.toString().trim())
    );

    const isGiftReady =
      !giftStatus ||
      Object.values(customerOrder.giftInformationFor).every((value) =>
        Boolean(value?.toString().trim())
      );

    return isCustomerOrderReady && isGiftReady;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      navigate("/payment");
    } else {
      dispatch(setIsError(true));
    }
  };

  const updateStore = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(
      setCustomerOrder({
        ...customerOrder,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <>
      <MainTitle
        title={
          giftStatus ? "Information Gift Form" : "Customer Information Form"
        }
      />

      <div className="justify-center -mx-3 mb-1 text-center">
        <p className="text-base font-medium text-purple-800">
          <span className="font-semibold">Solutionist Name:</span>{" "}
          {talentFirstName} {talentLastName}
        </p>
        <p className="text-base font-medium">
          <span className="font-semibold text-purple-800">Solution Date:</span>{" "}
          {solutionDateContract.solutionFormattedDate}
          <span className="ml-2 font-semibold text-purple-800">Time:</span>{" "}
          {solutionDateContract.solutionStartTime}
        </p>
        <p className="text-base font-medium">
          <span className="font-semibold text-purple-800">Job:</span>{" "}
          {solutionJob}{" "}
          <span className="font-semibold text-purple-800">
            {fixPriceStatus ? "Fix Price: $" : "Price Per Hour: $"}
          </span>
          {solutionPrice}
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        <div>
          <CustomerPersonalInfoForm />

          <div className="w-full px-3 pt-4">
            <label
              htmlFor="solutionTask"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Talent Job Task
            </label>
            <textarea
              id="solutionTask"
              rows={4}
              name="solutionTask"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write out your solution... Example: Change my car front brakes"
              defaultValue={solutionTask}
              maxLength={100}
              onChange={updateStore}
            />
            {states.formData.isError && !solutionTask && (
              <p className="text-red-500 text-xs italic">
                Please provide a short Task.
              </p>
            )}
          </div>

          <div className="w-full px-3 pt-4">
            <button
              className="mt-5 w-full text-xs py-3 px-6 rounded-lg bg-purple-900 text-white font-bold uppercase shadow-md hover:shadow-lg focus:opacity-85"
              type="button"
              onClick={handleSubmit}
            >
              {isEditOrder ? "Update" : "Submit"}
            </button>
          </div>

          {isEditOrder && (
            <div className="w-full px-3 pt-4">
              <button
                className="mt-5 w-full text-xs py-3 px-6 rounded-lg bg-red-900 text-white font-bold uppercase shadow-md hover:shadow-lg focus:opacity-85"
                type="button"
                onClick={handleSubmit}
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
