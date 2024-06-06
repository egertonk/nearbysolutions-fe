import React from "react";

type Props = {
  formData: {
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    selectedTalent: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  isError: boolean;
};

export const CustomerPersonalInfoForm: React.FC<Props> = ({
  formData,
  handleChange,
  isError,
}) => {
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
          type="text"
          value={formData.firstName}
          onChange={handleChange}
        />
        {isError && formData.firstName.length === 0 && (
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
          type="text"
          value={formData.lastName}
          onChange={handleChange}
        />
        {isError && formData.lastName.length === 0 && (
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
          onChange={handleChange}
          value={formData.country}
        >
          <option selected>Select Country</option>
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Philippines">Philippines</option>
        </select>
        {isError && formData.country.length === 0 && (
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
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
        {isError && formData.address.length === 0 && (
          <p className="text-red-500 text-xs italic">Please fill out Addres.</p>
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
          type="text"
          value={formData.city}
          onChange={handleChange}
        />
        {isError && formData.city.length === 0 && (
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
            value={formData.state}
            onChange={handleChange}
          >
            <option>New Mexico</option>
            <option>Virginia</option>
            <option>Texas</option>
          </select>
          {isError && formData.state.length === 0 && (
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
          type="text"
          value={formData.zip}
          onChange={handleChange}
        />
        {isError && formData.zip.length === 0 && (
          <p className="text-red-500 text-xs italic">Please fill out Zip.</p>
        )}
      </div>

      {/* <div className="w-full px-3 pt-4">
        <label
          htmlFor="selectedTalent"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Talent
        </label>
        <div className="relative ">
          <select
            className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="selectedTalent"
            onChange={handleChange}
            value={formData.selectedTalent}
          >
            {talentProfile.jobTitles.map((jobTitle) => (
              <option key={jobTitle}>{jobTitle}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div> */}
    </>
  );
};
