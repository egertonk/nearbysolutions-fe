import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { CustomerFormData } from "../../lib/types/orderTypes";
import { setCustomerOrder } from "../../../store/customerContractorSlice";

export const CustomerPersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

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

  return (
    <>
      <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          id="firstName"
          name="firstName"
          type="text"
          value={customerOrder.firstName}
          onChange={updateStore}
        />
        {customerOrder.firstName.length === 0 && (
          <p className="text-red-500 text-xs italic">
            Please fill out First Name.
          </p>
        )}
      </div>

      <div className="w-full md:w-1/2 px-3">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className={inputCSS}
          id="lastName"
          name="lastName"
          type="text"
          value={customerOrder.lastName}
          onChange={updateStore}
        />
        {customerOrder.lastName.length === 0 && (
          <p className="text-red-500 text-xs italic">
            Please fill out Last Name.
          </p>
        )}
      </div>

      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4">
        <label
          htmlFor="select-country-input-3"
          className="block text-sm font-medium text-gray-900 dark:text-white"
        >
          Country
        </label>
        <select
          className={inputCSS}
          id="country"
          name="country"
          value={customerOrder.country}
          onChange={updateStore}
        >
          <option value="">Select Country</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Philippines">Philippines</option>
        </select>
        {customerOrder.country.length === 0 && (
          <p className="text-red-500 text-xs italic">
            Please fill out Country.
          </p>
        )}
      </div>

      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="address"
        >
          Address
        </label>
        <input
          className={inputCSS}
          id="address"
          name="address"
          type="text"
          value={customerOrder.address}
          onChange={updateStore}
        />
        {customerOrder.address.length === 0 && (
          <p className="text-red-500 text-xs italic">
            Please fill out Address.
          </p>
        )}
      </div>

      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="city"
        >
          City
        </label>
        <input
          className={inputCSS}
          id="city"
          name="city"
          type="text"
          value={customerOrder.city}
          onChange={updateStore}
        />
        {customerOrder.city.length === 0 && (
          <p className="text-red-500 text-xs italic">Please fill out City.</p>
        )}
      </div>

      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="state"
        >
          State
        </label>
        <div className="relative">
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
          {customerOrder.state.length === 0 && (
            <p className="text-red-500 text-xs italic">
              Please fill out State.
            </p>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 pt-4">
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="zip"
        >
          Zip
        </label>
        <input
          className={inputCSS}
          id="zip"
          name="zip"
          type="text"
          value={customerOrder.zip}
          onChange={updateStore}
        />
        {customerOrder.zip.length === 0 && (
          <p className="text-red-500 text-xs italic">Please fill out Zip.</p>
        )}
      </div>
    </>
  );
};
