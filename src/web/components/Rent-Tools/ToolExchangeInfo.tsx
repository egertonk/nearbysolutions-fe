import React from "react";
import { ToolAndCustomerTypes } from "../../lib/types/DIYToolsListings";

type Props = {
  customerAndToolInfo: ToolAndCustomerTypes;
};

export const ToolExchangeInfo: React.FC<Props> = ({ customerAndToolInfo }) => {
  return (
    <div className="grid grid-cols-3 gap-4 displayBlock">
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Pickup Address</h3>
        {customerAndToolInfo.toolRentalListing.toolCountry ===
          "United States" ||
        customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
        customerAndToolInfo.toolRentalListing.toolCountry === "Canada" ? (
          <p className="text-sm text-gray-600">
            Egeton During
            <br />
            {customerAndToolInfo.toolRentalListing.toolAddress}
            <br />
            {customerAndToolInfo.toolRentalListing.toolCity},{" "}
            {customerAndToolInfo.toolRentalListing.toolZipcode}
            {customerAndToolInfo.toolRentalListing.toolState},{" "}
            {customerAndToolInfo.toolRentalListing.toolCountry}.
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Egeton During
            <br />
            {customerAndToolInfo.toolRentalListing.toolAddress}
            <br />
            {customerAndToolInfo.toolRentalListing.toolCity},{" "}
            {customerAndToolInfo.toolRentalListing.toolCountry}.
          </p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Dropoff Address</h3>
        {customerAndToolInfo.toolRentalListing.toolCountry ===
          "United States" ||
        customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
        customerAndToolInfo.toolRentalListing.toolCountry === "Canada" ? (
          <p className="text-sm text-gray-600">
            Egeton During
            <br />
            {customerAndToolInfo.toolRentalListing.toolAddress}
            <br />
            {customerAndToolInfo.toolRentalListing.toolCity},{" "}
            {customerAndToolInfo.toolRentalListing.toolZipcode}
            {customerAndToolInfo.toolRentalListing.toolState},{" "}
            {customerAndToolInfo.toolRentalListing.toolCountry}.
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Egeton During
            <br />
            {customerAndToolInfo.toolRentalListing.toolAddress}
            <br />
            {customerAndToolInfo.toolRentalListing.toolCity},{" "}
            {customerAndToolInfo.toolRentalListing.toolCountry}.
          </p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Tool Provider Contaacts</h3>
        <p className="text-sm text-gray-600 text-wrap">
          Email: egertonduring@yahoo.com
          <br />
          Phone: 5713301230
        </p>
      </div>
    </div>
  );
};
