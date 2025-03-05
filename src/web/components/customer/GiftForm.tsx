import React from "react";
import {
  envelopIconSVG,
  locationDropSVG,
  personIconSVG,
  phoneIconSVG,
} from "../../assets/svg/svgs";
import { customerInputCSS, errorCss } from "../../assets/common-css/css";
import { CustomerFormData } from "../../lib/types/OrderSolutionTypes";
import { CountryTypes } from "../../lib/types/countryTypes";
import { StateAndTerritorySelector } from "../common-sections/StateAndTerritorySelector";
import { isUSCanadaAddress } from "../common-sections/Address";
import { CustomerInput } from "./CustomerInputs";

type GiftInputTypes = {
  customerOrder: CustomerFormData;
  updateGiftInfo: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  validGiftCountries: CountryTypes[];
};

export const GiftForm: React.FC<GiftInputTypes> = ({
  customerOrder,
  updateGiftInfo,
  validGiftCountries,
}) => {
  return (
    <>
      <div className="text-center w-full px-3 pt-4">
        <h1 className="font-bold text-3xl sm:text-4xl ml:text-5xl font-heading text-purple-800">
          Gift Information
        </h1>
      </div>

      <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8 w-full">
        <div className="relative flex items-center m-1">
          <CustomerInput
            id="giftInformationFor.firstName"
            value={customerOrder.giftInformationFor.firstName}
            placeholder="Enter first name for gift reciever"
            onChange={updateGiftInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInput
            id="giftInformationFor.lastName"
            value={customerOrder.giftInformationFor.lastName}
            placeholder="Enter last name for gift reciever"
            onChange={updateGiftInfo}
          />
          {personIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInput
            id="giftInformationFor.email"
            value={customerOrder.giftInformationFor.email}
            placeholder="Enter email for gift reciever"
            onChange={updateGiftInfo}
          />
          {envelopIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInput
            id="giftInformationFor.phoneNumber"
            value={customerOrder.giftInformationFor.phoneNumber}
            placeholder="Enter phone number for gift reciever"
            onChange={updateGiftInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInput
            id="giftInformationFor.street"
            value={customerOrder.giftInformationFor.street}
            placeholder="Enter address for gift reciever"
            onChange={updateGiftInfo}
          />
          {locationDropSVG}
        </div>

        <div className="relative flex items-center m-1">
          <CustomerInput
            id="giftInformationFor.city"
            value={customerOrder.giftInformationFor.city}
            placeholder="Enter city for gift reciever"
            onChange={updateGiftInfo}
          />
          {phoneIconSVG}
        </div>

        <div className="relative flex items-center m-1">
          <select
            className={`${customerInputCSS} ${
              customerOrder.giftInformationFor.country.length === 0 && errorCss
            }`}
            id="giftInformationFor.country"
            name="country"
            value={customerOrder.giftInformationFor.country}
            onChange={updateGiftInfo}
          >
            <option className="h-20" value="">
              Select country for gift reciever
            </option>
            {validGiftCountries?.map((countryData) => (
              <option className="h-20" value={`${countryData.countryName}`}>
                {countryData.countryName}
              </option>
            ))}
          </select>
        </div>

        {isUSCanadaAddress(customerOrder.giftInformationFor.country) && (
          <>
            <div className="relative flex items-center m-1">
              <StateAndTerritorySelector
                className={customerInputCSS}
                name={"state"}
                value={customerOrder.giftInformationFor.state}
                onChange={updateGiftInfo}
              />
            </div>
            <div className="relative flex items-center m-1">
              <CustomerInput
                id="giftInformationFor.postalCode"
                value={customerOrder.giftInformationFor.postalCode}
                placeholder="Enter zip code for gift reciever"
                onChange={updateGiftInfo}
              />
              {phoneIconSVG}
            </div>
            show map for customer or gift location city
          </>
        )}
      </div>
    </>
  );
};
