import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { checkMarkSVG } from "../../assets/svg/svgs";
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
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const updateStore = (value: string, cLength: number) => {
    const isContractActive = value !== "";
    const targetEndDateIndex = cLength - 1;

    const newSolutionDateContract = {
      longTermContract: value,
      longTermstartDate: isContractActive
        ? customerOrder.solutionDateContract.solutionDate
        : "",
      longTermEndDate: isContractActive
        ? cLength === 12
          ? "goodUntilCancel"
          : `${dates[targetEndDateIndex].monthName}/${dates[targetEndDateIndex].dayNumber}/${dates[targetEndDateIndex].year}`
        : "",
    };

    dispatch(
      setCustomerOrder({
        ...customerOrder,
        solutionDateContract: {
          ...customerOrder.solutionDateContract,
          ...newSolutionDateContract,
        },
      })
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newValue =
      value === customerOrder.solutionDateContract.longTermContract
        ? ""
        : value;

    setContractLength(12);
    updateStore(newValue, 12);
  };

  return (
    <div className="relative flex items-center m-1">
      <input
        id="goodUntilCancel"
        type="checkbox"
        name="longTermContract"
        className="hidden peer"
        value="goodUntilCancel"
        onChange={handleCheckboxChange}
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
  );
};
