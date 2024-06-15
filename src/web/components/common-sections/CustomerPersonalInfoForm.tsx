import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CustomerFormData } from "../../lib/types/orderTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import {
  envelopIconSVG,
  locationDropSVG,
  personIconSVG,
  phoneIconSVG,
} from "../../assets/svg/svgs";
import { errorCss } from "../../assets/common-css/css";

export const CustomerPersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;
  const isGiftASolution = states.applicationModeState.isGiftASolution;

  const updateStore = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const updatedOrder: CustomerFormData = {
      ...customerOrder,
      [name]: value,
    };

    dispatch(setCustomerOrder(updatedOrder));
  };

  const inputCSS =
    "appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";

  // inside useQuery Mutate
  // Navigate(`/mmmmmm?ordernumber=${res.orderNumber}`, {state: {orderDetails: res}});
  return (
    <>
      <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.firstName.length === 0 && errorCss
            }`}
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your First Name"
            value={customerOrder.firstName}
            onChange={updateStore}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.lastName.length === 0 && errorCss
            }`}
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your Last Name"
            value={customerOrder.lastName}
            onChange={updateStore}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.email.length === 0 && errorCss
            }`}
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            value={customerOrder.email}
            onChange={updateStore}
          />
          {envelopIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.phoneNumber.length === 0 && errorCss
            }`}
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            placeholder="Phone Number"
            value={customerOrder.phoneNumber}
            onChange={updateStore}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.address.length === 0 && errorCss
            }`}
            id="address"
            name="address"
            type="text"
            placeholder="Home Address"
            value={customerOrder.address}
            onChange={updateStore}
          />
          {locationDropSVG}
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.city.length === 0 && errorCss
            }`}
            id="city"
            name="city"
            type="text"
            placeholder="City"
            value={customerOrder.city}
            onChange={updateStore}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={inputCSS}
            id="state"
            name="state"
            value={customerOrder.state}
            onChange={updateStore}
          >
            <option value="">Select State</option>
            <option value="New Mexico">New Mexico</option>
            <option value="Virginia">Virginia</option>
            <option value="Texas">Texas</option>
          </select>
        </div>

        <div className="relative flex items-center m-1">
          <input
            className={`${inputCSS} ${
              customerOrder.zip.length === 0 && errorCss
            }`}
            id="zip"
            name="zip"
            type="text"
            placeholder="Zip Code"
            value={customerOrder.zip}
            onChange={updateStore}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={`${inputCSS} ${
              customerOrder.country.length === 0 && errorCss
            }`}
            id="country"
            name="country"
            value={customerOrder.country}
            onChange={updateStore}
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
              className={`${inputCSS} ${
                customerOrder.giftFor_fullName.length === 0 && errorCss
              }`}
              id="giftFor_fullName"
              name="giftFor_fullName"
              type="text"
              placeholder="Gift For - Full Name"
              value={customerOrder.giftFor_fullName}
              onChange={updateStore}
            />
            {personIconSVG}
          </div>
        )}
      </div>
    </>
  );
};
