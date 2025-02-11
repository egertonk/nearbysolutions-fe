import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { DateTimeSelection } from "./DateTimeSelection";
import { MainTitle } from "../common-sections/MainTitle";
import {
  useGetOrdersWithSolutionistId,
  useGetSolutionistWithIdAndSkillId,
} from "../../utils/fetchEndpoints";
import { RootState } from "../../../store";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import {
  setAllSolutionistWorkSettings,
  SolutionistWorkSetting,
} from "../../../store/solutionistWorkSettingsSlice";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";

export const TalentDetailPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  console.log("customerOrder = ", customerOrder);
  const searchParams = new URLSearchParams(location.search);
  const solutionistId = searchParams.get("solutionistId"); // Access `solutionistId` directly
  const skillId = searchParams.get("skillId"); // Access `jobId` directly
  const isCalenderReady = !(
    customerOrder.solutionDateContract.solutionStartTime.length > 0 &&
    customerOrder.solutionDateContract.solutionDate.length > 0
  );

  const { data: customerSolutionistDetails, isFetching } =
    useGetSolutionistWithIdAndSkillId(Number(solutionistId), Number(skillId));
  const { data: solutionistOrders } = useGetOrdersWithSolutionistId(
    Number(solutionistId)
  );

  useEffect(() => {
    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      solutionJob: customerSolutionistDetails?.solutionistSkills
        ? customerSolutionistDetails?.solutionistSkills[0]?.name
        : "",
      selectedTalent: customerSolutionistDetails?.solutionistSkills
        ? customerSolutionistDetails?.solutionistSkills[0]?.name
        : "",
      talentID: customerSolutionistDetails?.solutionistInformation
        ? customerSolutionistDetails?.solutionistInformation.id
        : 0,
      talentFirstName: customerSolutionistDetails?.solutionistInformation
        ? customerSolutionistDetails?.solutionistInformation.firstName
        : "",
      talentLastName: customerSolutionistDetails?.solutionistInformation
        ? customerSolutionistDetails?.solutionistInformation.lastName
        : "",
      solutionPrice: customerSolutionistDetails?.solutionistSkills
        ? customerSolutionistDetails?.solutionistSkills[0]?.fixPrice
        : 0,
      solutionPriceDiscountPercentage: 0,
      longTermSubscriptionAllow:
        customerSolutionistDetails?.solutionistWorkSettings
          ?.longTermSubscriptionAllow ?? false,
    };
    dispatch(setCustomerOrder(updatedOrder));
  }, [isFetching]);

  return (
    <>
      <MainTitle title="Select Date and Time" />

      <div className="flex flex-col lg:flex-row justify-center">
        <DateTimeSelection
          customerSolutionistDetails={
            customerSolutionistDetails as unknown as SolutionistResponseTypes
          }
          solutionistOrders={solutionistOrders ?? []}
        />
      </div>

      <div className="w-full px-3 pt-4">
        <button
          className="mt-5 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-purple-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
          type="button"
          onClick={() => navigate(`/customer-form`)}
          disabled={isCalenderReady}
        >
          Next
        </button>
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-purple-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      {/* {Contractor jobs and slideshow} */}
      {/* <div className="flex flex-col lg:flex-row justify-center">
        <div
          id="default-carousel"
          className="relative w-full md:py-8 py-5 px-5 "
          data-carousel="slide"
        >
          <div className="relative h-48 overflow-hidden rounded-lg md:h-96">
            <div className="duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>

            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>

          <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse bg-white-500">
            <button
              className="w-3 h-3 rounded-full bg-purple-500"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to="0"
            ></button>
            <button
              className="w-3 h-3 rounded-full bg-red-500"
              aria-current="true"
              aria-label="Slide 2"
              data-carousel-slide-to="1"
            ></button>
            <button
              className="w-3 h-3 rounded-full bg-red-500"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to="2"
            ></button>
            <button
              className="w-3 h-3 rounded-full bg-red-500"
              aria-current="false"
              aria-label="Slide 4"
              data-carousel-slide-to="3"
            ></button>
            <button
              className="w-3 h-3 rounded-full bg-red-500"
              aria-current="false"
              aria-label="Slide 5"
              data-carousel-slide-to="4"
            ></button>
          </div>

          <button
            type="button"
            className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="bg-purple-900 inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-gray-800/30 group-hover:bg-purple-500 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="bg-purple-900 inline-flex items-center justify-center w-10 h-10 rounded-full dark:bg-gray-800/30 group-hover:bg-purple-500 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>
      </div> */}
    </>
  );
};
