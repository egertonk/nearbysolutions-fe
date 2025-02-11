import React from "react";
import {
  envelopIconSVG,
  locationDropSVG,
  personIconSVG,
  phoneIconSVG,
} from "../../assets/svg/svgs";
import { customerInputCSS, errorCss } from "../../assets/common-css/css";
import { dayNames, monthNames } from "../../lib";
import { LongTermContract } from "../common-sections/LongTermContract";
import { CustomerInputs } from "./CustomerInputs";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { CountryTypes } from "../../lib/types/countryTypes";
import { StateAndTerritorySelector } from "../common-sections/StateAndTerritorySelector";
import { customerFormFieldNames } from ".";
import { isUSCanadaAddress } from "../common-sections/Address";

type CustomerInputTypes = {
  customerOrder: CustomerFormData;
  updateCustomerInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  validCountries: CountryTypes[];
  startDate: Date;
  setContractLength: React.Dispatch<React.SetStateAction<number>>;
  contractLength: number;
};

export const CustomerForm: React.FC<CustomerInputTypes> = ({
  customerOrder,
  updateCustomerInfo,
  validCountries,
  startDate,
  setContractLength,
  contractLength,
}) => {
  const dates = [] as {
    dayName: string;
    dayNumber: number;
    monthName: string;
    monthNumber: number;
    year: number;
  }[];

  for (let i = 1; i <= 12; i++) {
    const nextDate = new Date(startDate);
    nextDate.setMonth(startDate.getMonth() + i);

    const dayName = dayNames[nextDate.getDay()];
    const dayNumber = nextDate.getDate();
    const monthName = monthNames[nextDate.getMonth()];
    const monthNumber = nextDate.getMonth() + 1;
    const year = nextDate.getFullYear();

    dates.push({
      dayName,
      dayNumber,
      monthName,
      monthNumber,
      year,
    });
  }

  const showFutureApp =
    customerOrder.solutionDateContract.solutionFormattedDate.length > 0 &&
    customerOrder.solutionDateContract.longTermContract !== "";

  const LimitedList = (contractNumber: number) => {
    const items = [];

    for (let i = 0; i < contractNumber; i++) {
      items.push(
        <div
          className="relative flex items-center m-1 "
          key={`feature-app-${i}`}
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4"
            viewBox="0 0 24 24"
          >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <path d="M22 4L12 14.01l-3-3" />
          </svg>
          <span className="font-medium">{`${dates[i].dayNumber} ${dates[i].monthName} ${dates[i].year}`}</span>
        </div>
      );
    }

    return items;
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
        <div className="relative flex items-center m-1">
          <CustomerInputs
            id={customerFormFieldNames.firstName}
            value={customerOrder.customerInfo.firstName}
            placeHolder="Enter your First Name"
            updateInfo={updateCustomerInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id={customerFormFieldNames.lastName}
            value={customerOrder.customerInfo.lastName}
            placeHolder="Enter your Last Name"
            updateInfo={updateCustomerInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id={customerFormFieldNames.email}
            value={customerOrder.customerInfo.email}
            placeHolder="Enter your email"
            updateInfo={updateCustomerInfo}
          />
          {envelopIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id={customerFormFieldNames.phoneNumber}
            value={customerOrder.customerInfo.phoneNumber}
            placeHolder="Enter your Phone Number"
            updateInfo={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id={customerFormFieldNames.street}
            value={customerOrder.customerAddress.street}
            placeHolder="Enter your Home Address"
            updateInfo={updateCustomerInfo}
          />
          {locationDropSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id={customerFormFieldNames.city}
            value={customerOrder.customerAddress.city}
            placeHolder="Enter your City"
            updateInfo={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={`${customerInputCSS} ${
              customerOrder.customerAddress.country.length === 0 && errorCss
            }`}
            id={customerFormFieldNames.country}
            name={customerFormFieldNames.country}
            value={customerOrder.customerAddress.country}
            onChange={updateCustomerInfo}
          >
            <option className="h-20" value="">
              Select your Country
            </option>
            {validCountries?.map((countryData) => (
              <option
                className="h-20"
                value={`${countryData.countryName}`}
                key={countryData.countryName}
              >
                {countryData.countryName}
              </option>
            ))}
          </select>
        </div>

        {isUSCanadaAddress(customerOrder.customerAddress.country) && (
          <>
            <div className="relative flex items-center m-1">
              <StateAndTerritorySelector
                className={customerInputCSS}
                name={customerFormFieldNames.state}
                value={customerOrder.customerAddress.state || ""}
                onChange={updateCustomerInfo}
              />
            </div>

            <div className="relative flex items-center m-1">
              <CustomerInputs
                id={customerFormFieldNames.postalCode}
                value={customerOrder.customerAddress.postalCode || ""}
                placeHolder="Enter your Zip Code"
                updateInfo={updateCustomerInfo}
              />
              {phoneIconSVG}
            </div>
          </>
        )}

        {customerOrder.longTermSubscriptionAllow && (
          <LongTermContract
            dates={dates}
            setContractLength={setContractLength}
          />
        )}
      </div>{" "}
      {showFutureApp && customerOrder.longTermSubscriptionAllow && (
        <div className="items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
          <p className="text-purple-900 dark:text-purple text-base font-medium mt-3 text-center">
            Future Appointments{" "}
          </p>
          <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
            {LimitedList(contractLength)}
            {customerOrder.solutionDateContract.longTermContract ===
              "goodUntilCancel" && "..."}
          </div>
        </div>
      )}
    </>
  );
};
