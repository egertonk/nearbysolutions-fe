import React from "react";
import { ProductFormDataTypes, ProductFormErrorTypes } from "./RentYourTools";
import { JobInputs } from "../Find-Work-Post-A-Job/JobInputs";
import { StateAndTerritorySelector } from "../common-sections/StateAndTerritorySelector";
import { CountryTypes } from "../../lib/types/countryTypes";
import { isUSCanadaAddress } from "../common-sections/Address";

type ToolAddressInformationProps = {
  productFormData: ProductFormDataTypes;
  handleProductChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  errors: ProductFormErrorTypes;
  validCountries: CountryTypes[];
};

export const ToolAddressInformation: React.FC<ToolAddressInformationProps> = ({
  errors,
  productFormData,
  handleProductChange,
  validCountries,
}) => {
  return (
    <>
      <JobInputs
        value={productFormData.toolAddress}
        errorMessage={errors.toolAddress ?? ""}
        labelName={"Tool Address"}
        name="tool-address"
        id="toolAddress"
        handleChange={handleProductChange}
      />

      <JobInputs
        value={productFormData.toolCity}
        errorMessage={errors.toolCity ?? ""}
        labelName={"Tool City"}
        name="tool-city"
        id="toolCity"
        handleChange={handleProductChange}
      />

      <div className="relative flex items-center">
        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
          Tool Country
        </label>
        <select
          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          id="toolCountry"
          name="toolCountry"
          value={productFormData.toolCountry}
          onChange={handleProductChange}
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

        {errors.toolCountry && (
          <p className="text-red-500 text-xs">{errors.toolCountry}</p>
        )}
      </div>

      <div className="relative flex items-center">
        <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
          Tool City Location
        </label>
        <input
          type="text"
          name="toolCity"
          placeholder="Enter tool city location"
          className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
          value={productFormData.toolCity}
          onChange={handleProductChange}
        />
        {errors.toolCity && (
          <p className="text-red-500 text-xs">{errors.toolCity}</p>
        )}
      </div>

      {isUSCanadaAddress(productFormData.toolCountry) && (
        <>
          <div className="relative flex items-center">
            <label className="text-[13px] bg-white text-black absolute px-2 top-[-10px] left-[18px]">
              Tool State Location
            </label>
            <StateAndTerritorySelector
              className="px-4 py-3.5 bg-white text-black w-full text-sm border-2 border-gray-100 focus:border-blue-500 rounded outline-none"
              name={"toolState"}
              value={productFormData.toolState}
              onChange={handleProductChange}
            />
            {errors.toolState && (
              <p className="text-red-500 text-xs">{errors.toolState}</p>
            )}
          </div>

          <JobInputs
            value={productFormData.toolZipCode}
            errorMessage={errors.toolZipCode ?? ""}
            labelName={"Tool Zip-Code"}
            name="tool-zip-code"
            id="toolZipCode"
            handleChange={handleProductChange}
          />
        </>
      )}
    </>
  );
};
