import React from "react";
import { ToolAndCustomerTypes } from "../../lib/types/DIYToolsListings";

type Props = {
  customerAndToolInfo: ToolAndCustomerTypes;
};

export const ToolBillingTotals: React.FC<Props> = ({ customerAndToolInfo }) => {
  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>
          ${(customerAndToolInfo.toolRentalListing.pricePerDay * 5).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax</span>
        <span>
          ${" "}
          {(customerAndToolInfo.toolRentalListing.pricePerDay * 5 + 5).toFixed(
            2
          )}
        </span>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <span>Rental total</span>
        <span>
          $
          {(customerAndToolInfo.toolRentalListing.pricePerDay * 5 + 5).toFixed(
            2
          )}
        </span>
      </div>
    </div>
  );
};
