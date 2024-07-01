import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import {
  envelopIconSVG,
  locationDropSVG,
  personIconSVG,
  phoneIconSVG,
} from "../../assets/svg/svgs";
import { customerInputCSS, errorCss } from "../../assets/common-css/css";
import { dayNames, monthNames } from "../../lib";
import { LongTermContract } from "./LongTermContract";

export const CustomerPersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state);
  const [contractLength, setContractLength] = useState<number>(0);
  const customerOrder = states.formData.customerOrder;
  const isGiftASolution = states.applicationModeState.isGiftASolution;

  // inside useQuery Mutate
  // Navigate(`/mmmmmm?ordernumber=${res.orderNumber}`, {state: {orderDetails: res}});

  const dates = [] as {
    dayName: string;
    dayNumber: number;
    monthName: string;
    monthNumber: number;
    year: number;
  }[];

  const startDate = new Date(
    customerOrder.solutionDateContract.solutionFormattedDate
  );

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

  const showFutureApp =
    customerOrder.solutionDateContract.solutionFormattedDate.length > 0 &&
    customerOrder.solutionDateContract.longTermContract !== "";

  const updateStore = (name: string, value: string) => {
    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      [name]: value,
    };

    dispatch(setCustomerOrder(updatedOrder));
  };

  const updateCustomerInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (customerOrder.solutionDateContract.solutionFormattedDate.length > 0)
      updateStore(name, value);
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.firstName.length === 0 && errorCss
            }`}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your First Name"
            value={customerOrder.firstName}
            onChange={updateCustomerInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.lastName.length === 0 && errorCss
            }`}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your Last Name"
            value={customerOrder.lastName}
            onChange={updateCustomerInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.email.length === 0 && errorCss
            }`}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={customerOrder.email}
            onChange={updateCustomerInfo}
          />
          {envelopIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.phoneNumber.length === 0 && errorCss
            }`}
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={customerOrder.phoneNumber}
            onChange={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.address.length === 0 && errorCss
            }`}
            id="address"
            name="address"
            type="text"
            placeholder="Home Address"
            value={customerOrder.address}
            onChange={updateCustomerInfo}
          />
          {locationDropSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.city.length === 0 && errorCss
            }`}
            id="city"
            name="city"
            type="text"
            placeholder="City"
            value={customerOrder.city}
            onChange={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={customerInputCSS}
            id="state"
            name="state"
            value={customerOrder.state}
            onChange={updateCustomerInfo}
          >
            <option value="">Select State</option>
            <option value="New Mexico">New Mexico</option>
            <option value="Virginia">Virginia</option>
            <option value="Texas">Texas</option>
          </select>
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${customerInputCSS} ${
              customerOrder.zip.length === 0 && errorCss
            }`}
            id="zip"
            name="zip"
            type="text"
            placeholder="Zip Code"
            value={customerOrder.zip}
            onChange={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={`${customerInputCSS} ${
              customerOrder.country.length === 0 && errorCss
            }`}
            id="country"
            name="country"
            value={customerOrder.country}
            onChange={updateCustomerInfo}
          >
            <option value="">Select your Country</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="Philippines">Philippines</option>
          </select>
        </div>

        {isGiftASolution && (
          <div className="relative flex items-center m-1">
            <input
              className={`${customerInputCSS} ${
                customerOrder.giftFor_fullName.length === 0 && errorCss
              }`}
              id="giftFor_fullName"
              name="giftFor_fullName"
              type="text"
              placeholder="Gift For - Full Name"
              value={customerOrder.giftFor_fullName}
              onChange={updateCustomerInfo}
            />
            {personIconSVG}
          </div>
        )}

        <LongTermContract dates={dates} setContractLength={setContractLength} />
      </div>

      {showFutureApp && (
        <div className="w-full">
          <p className="text-purple-900 dark:text-purple text-base font-medium mt-3 text-center">
            Future Appointments{" "}
          </p>
          <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-2 w-full">
            {LimitedList(contractLength)}
            {customerOrder.solutionDateContract.longTermContract ===
              "goodUntilCancel" && "..."}
          </div>
        </div>
      )}
    </>
  );
};
