import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import {
  envelopIconSVG,
  locationDropSVG,
  personIconSVG,
  phoneIconSVG,
} from "../../assets/svg/svgs";
import { customerInputCSS, errorCss } from "../../assets/common-css/css";
import { dayNames, monthNames } from "../../lib";
import { LongTermContract } from "../common-sections/LongTermContract";
import { customerInfoFields } from ".";
import { CustomerInputs } from "./CustomerInputs";
import { useGetCoutries } from "../../utils/fetchEndpoints";

export const CustomerPersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const { data: coutries, isFetching: isCoutriesFetching } = useGetCoutries();

  const states = useSelector((state: RootState) => state);
  const [contractLength, setContractLength] = useState<number>(0);
  const customerOrder = states.formData.customerOrder;
  const isGiftASolution = states.applicationModeState.isGiftASolution;

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

  // const updateStore = (name: string, value: string) => {
  //   const updatedOrder: CustomerFormData = {
  //     ...customerOrder,
  //     [name]: value,
  //   };
  //   console.log("updatedOrder = ", updatedOrder);
  //   dispatch(setCustomerOrder(updatedOrder));
  // };

  const updateCustomerInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (customerInfoFields.includes(name)) {
      const updatedCustomerFormData = {
        ...customerOrder,
        customerInfo: {
          ...customerOrder.customerInfo,
          [name]: value,
        },
      };

      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
    // if (customerOrder.solutionDateContract.solutionFormattedDate.length > 0)
    //   updateStore(name, value);
  };

  const validCountries = useMemo(() => {
    return coutries?.filter((country) => country.featureFlag);
  }, [coutries]);

  return (
    <>
      <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
        <div className="relative flex items-center m-1">
          <CustomerInputs
            id="firstName"
            value={customerOrder.customerInfo.firstName}
            placeHolder="Enter your First Name"
            updateCustomerInfo={updateCustomerInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id="lastName"
            value={customerOrder.customerInfo.lastName}
            placeHolder="Enter your Last Name"
            updateCustomerInfo={updateCustomerInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id="email"
            value={customerOrder.customerInfo.email}
            placeHolder="Enter your email"
            updateCustomerInfo={updateCustomerInfo}
          />
          {envelopIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id="phoneNumber"
            value={customerOrder.customerInfo.phoneNumber}
            placeHolder="Enter your Phone Number"
            updateCustomerInfo={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id="address"
            value={customerOrder.customerInfo.address}
            placeHolder="Enter your Home Address"
            updateCustomerInfo={updateCustomerInfo}
          />
          {locationDropSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInputs
            id="city"
            value={customerOrder.customerInfo.city}
            placeHolder="Enter your City"
            updateCustomerInfo={updateCustomerInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={`${customerInputCSS} ${
              customerOrder.customerInfo.country.length === 0 && errorCss
            }`}
            id="country"
            name="country"
            value={customerOrder.customerInfo.country}
            onChange={updateCustomerInfo}
          >
            <option className="h-20" value="">
              Select your Country
            </option>
            {validCountries?.map((countryData) => (
              <option className="h-20" value={`${countryData.countryName}`}>
                {countryData.countryName}
              </option>
            ))}
          </select>
        </div>

        {(customerOrder.customerInfo.country === "United States" ||
          customerOrder.customerInfo.country === "Canada") && (
          <>
            <div className="relative flex items-center m-1">
              <select
                className={customerInputCSS}
                id="state"
                name="state"
                value={customerOrder.customerInfo.state}
                onChange={updateCustomerInfo}
              >
                <option value="">Select State</option>
                <option value="Alabama">Alabama</option>
                <option value="Alaska">Alaska</option>
                <option value="Arizona">Arizona</option>
                <option value="Arkansas">Arkansas</option>
                <option value="California">California</option>
                <option value="Colorado">Colorado</option>
                <option value="Connecticut">Connecticut</option>
                <option value="Delaware">Delaware</option>
                <option value="Florida">Florida</option>
                <option value="Georgia">Georgia</option>
                <option value="Hawaii">Hawaii</option>
                <option value="Idaho">Idaho</option>
                <option value="Illinois">Illinois</option>
                <option value="Indiana">Indiana</option>
                <option value="Iowa">Iowa</option>
                <option value="Kansas">Kansas</option>
                <option value="Kentucky">Kentucky</option>
                <option value="Louisiana">Louisiana</option>
                <option value="Maine">Maine</option>
                <option value="Maryland">Maryland</option>
                <option value="Massachusetts">Massachusetts</option>
                <option value="Michigan">Michigan</option>
                <option value="Minnesota">Minnesota</option>
                <option value="Mississippi">Mississippi</option>
                <option value="Missouri">Missouri</option>
                <option value="Montana">Montana</option>
                <option value="Nebraska">Nebraska</option>
                <option value="Nevada">Nevada</option>
                <option value="New Hampshire">New Hampshire</option>
                <option value="New Jersey">New Jersey</option>
                <option value="New Mexico">New Mexico</option>
                <option value="New York">New York</option>
                <option value="North Carolina">North Carolina</option>
                <option value="North Dakota">North Dakota</option>
                <option value="Ohio">Ohio</option>
                <option value="Oklahoma">Oklahoma</option>
                <option value="Oregon">Oregon</option>
                <option value="Pennsylvania">Pennsylvania</option>
                <option value="Rhode Island">Rhode Island</option>
                <option value="South Carolina">South Carolina</option>
                <option value="South Dakota">South Dakota</option>
                <option value="Tennessee">Tennessee</option>
                <option value="Texas">Texas</option>
                <option value="Utah">Utah</option>
                <option value="Vermont">Vermont</option>
                <option value="Virginia">Virginia</option>
                <option value="Washington">Washington</option>
                <option value="West Virginia">West Virginia</option>
                <option value="Wisconsin">Wisconsin</option>
                <option value="Wyoming">Wyoming</option>
              </select>
            </div>

            <div className="relative flex items-center m-1">
              <CustomerInputs
                id="zip"
                value={customerOrder.customerInfo.zip}
                placeHolder="Enter your Zip Code"
                updateCustomerInfo={updateCustomerInfo}
              />
              {phoneIconSVG}
            </div>
          </>
        )}
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

        {customerOrder.fixPriceStatus == false && (
          <LongTermContract
            dates={dates}
            setContractLength={setContractLength}
          />
        )}
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
