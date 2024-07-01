import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { checkMarkSVG } from "../../assets/svg/svgs";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";

type Props = {
  dates: {
    dayName: string;
    dayNumber: number;
    monthName: string;
    monthNumber: number;
    year: number;
  }[];
  setContractLength: React.Dispatch<React.SetStateAction<number>>;
};

export const LongTermContract: React.FC<Props> = ({
  dates,
  setContractLength,
}) => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;

  const updateStore = (name: string, value: string, cLength: number) => {
    const targetEndDateIndex = cLength - 1;
    const newSolutionDateContract = {
      longTermContract: value,
      longTermstartDate:
        value === "" ? "" : customerOrder.solutionDateContract.solutionDate,
      longTermEndDate:
        value === ""
          ? ""
          : cLength === 12
          ? "goodUntilCancel"
          : `${dates[targetEndDateIndex].monthName}/${dates[targetEndDateIndex].dayNumber}/${dates[targetEndDateIndex].year}`,
    };

    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      solutionDateContract: {
        ...customerOrder.solutionDateContract,
        ...newSolutionDateContract,
      },
    };

    dispatch(setCustomerOrder(updatedOrder));
  };

  const updateCheck = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const newValue =
      value === customerOrder.solutionDateContract.longTermContract
        ? ""
        : value;

    if (value === "3Months") {
      setContractLength(3);
      updateStore(name, newValue, 3);
    }
    if (value === "6Months") {
      setContractLength(6);
      updateStore(name, newValue, 6);
    }
    if (value === "goodUntilCancel") {
      setContractLength(12);
      updateStore(name, newValue, 12);
    }
  };

  return (
    <>
      <div className="relative flex items-center m-1">
        <input
          id="checkbox3"
          type="checkbox"
          name="longTermContract"
          className="hidden peer"
          value="3Months"
          onChange={updateCheck}
          checked={
            customerOrder.solutionDateContract.longTermContract === "3Months"
          }
        />
        <label
          htmlFor="checkbox3"
          className="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer border-2 border-blue-500 rounded-md overflow-hidden"
        >
          {checkMarkSVG}
        </label>
        <p className="text-sm text-black ml-4">3 Months - Once a month.</p>
      </div>

      <div className="relative flex items-center m-1">
        <input
          id="6Months"
          type="checkbox"
          name="longTermContract"
          className="hidden peer"
          value="6Months"
          onChange={updateCheck}
          checked={
            customerOrder.solutionDateContract.longTermContract === "6Months"
          }
        />
        <label
          htmlFor="6Months"
          className="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer border-2 border-blue-500 rounded-md overflow-hidden"
        >
          {checkMarkSVG}
        </label>
        <p className="text-sm text-black ml-4">6 Months - Once a month.</p>
      </div>

      <div className="relative flex items-center m-1">
        <input
          id="goodUntilCancel"
          type="checkbox"
          name="longTermContract"
          className="hidden peer"
          value="goodUntilCancel"
          onChange={updateCheck}
          checked={
            customerOrder.solutionDateContract.longTermContract ===
            "goodUntilCancel"
          }
        />
        <label
          htmlFor="goodUntilCancel"
          className="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer border-2 border-blue-500 rounded-md overflow-hidden"
        >
          {checkMarkSVG}
        </label>
        <p className="text-sm text-black ml-4">
          Good Until Cancel - Once a month.
        </p>
      </div>
    </>
  );
};
