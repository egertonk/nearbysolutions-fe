import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useCalenderStates } from "../../lib/useCalenderStates";
import { useCustomerPersonalInfoForm } from "../../lib/useCustomerPersonalInfoForm";
import { useState } from "react";
import { talentInformation } from "../../lib";
import { DateTimeSelection } from "./DateTimeSelection";
import { MainTitle } from "../common-sections/MainTitle";
import { useGetUserWithId } from "../../utils/fetchEndpoints";
import { RootState } from "../../../store";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";

export const TalentDetailPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const searchParams = new URLSearchParams(location.search);
  const talentId = searchParams.get("talentId"); // Access `talentId` directly
  const jobId = searchParams.get("jobId"); // Access `jobId` directly

  const { data: solutionistDeatils, isFetching } = useGetUserWithId(
    Number(talentId)
  );

  useEffect(() => {
    const jobDetails = solutionistDeatils?.talent?.jobTitle.find(
      (job) => job?.id === Number(jobId)
    );

    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      solutionJob: jobDetails?.title || "",
      selectedTalent: jobDetails?.title || "",
      talentID: solutionistDeatils?.talent?.user.id || 0,
      talentFirstName: solutionistDeatils?.talent?.user.firstName || "",
      talentLastName: solutionistDeatils?.talent?.user?.lastName || "",
      solutionPrice:
        (jobDetails?.isFixPrice
          ? jobDetails.fixPrice
          : jobDetails?.ratePerHour) || 0,
    };

    dispatch(setCustomerOrder(updatedOrder));
  }, [isFetching]);

  return (
    <>
      {/* <StepperProgress /> */}
      <MainTitle title="Select Date and Time" />

      <div className="flex flex-col lg:flex-row justify-center">
        <DateTimeSelection />
      </div>

      <hr className="w-full h-1 mx-auto my-4 bg-purple-300 border-0 rounded md:my-10 dark:bg-gray-700"></hr>

      {/* {Contractor jobs and slideshow} */}
      <div className="flex flex-col lg:flex-row justify-center">
        <div
          id="default-carousel"
          className="relative w-full md:py-8 py-5 px-5 "
          data-carousel="slide"
        >
          <div className="relative h-48 overflow-hidden rounded-lg md:h-96">
            {/* {use hidden to show picture or not} */}
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
      </div>
    </>
  );
};
