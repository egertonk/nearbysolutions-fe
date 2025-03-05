import React from "react";
import { ToolAndCustomerTypes } from "../../lib/types/DIYToolsListings";
import { Address } from "../common-sections/Address";

type Props = {
  customerAndToolInfo: ToolAndCustomerTypes;
  isOrderConfirm: boolean;
};

export const ToolExchangeInfo: React.FC<Props> = ({
  customerAndToolInfo,
  isOrderConfirm,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 displayBlock">
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Pickup Address</h3>
        <p className="text-sm text-gray-600">
          Egeton During
          <br />
          <Address
            country={customerAndToolInfo.toolRentalDetails?.toolCountry ?? ""}
            address={customerAndToolInfo.toolRentalDetails?.toolAddress ?? ""}
            city={customerAndToolInfo.toolRentalDetails?.toolCity ?? ""}
            state={customerAndToolInfo.toolRentalDetails?.toolState ?? ""}
            zip={customerAndToolInfo.toolRentalDetails?.toolZipcode ?? ""}
          />
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Dropoff Address</h3>
        <p className="text-sm text-gray-600">
          Egeton During
          <br />
          <Address
            country={customerAndToolInfo.toolRentalDetails?.toolCountry ?? ""}
            address={customerAndToolInfo.toolRentalDetails?.toolAddress ?? ""}
            city={customerAndToolInfo.toolRentalDetails?.toolCity ?? ""}
            state={customerAndToolInfo.toolRentalDetails?.toolState ?? ""}
            zip={customerAndToolInfo.toolRentalDetails?.toolZipcode ?? ""}
          />
        </p>
      </div>
      {isOrderConfirm && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Tool Provider Contaacts</h3>
          <p className="text-sm text-gray-600 text-wrap">
            Email: egertonduring@yahoo.com
            <br />
            Phone: 5713301230
          </p>
        </div>
      )}
    </div>
  );
};
