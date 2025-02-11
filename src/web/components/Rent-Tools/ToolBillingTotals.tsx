import React from "react";
import { ToolAndCustomerTypes } from "../../lib/types/DIYToolsListings";
import { DateAndTimeInputsProps } from "./DateAndTimeInputs";
import { calculateRentalDays } from "./ToolRentalDays";

type Props = {
  customerAndToolInfo: ToolAndCustomerTypes;
  toolActions: DateAndTimeInputsProps;
};

export const ToolBillingTotals: React.FC<Props> = ({
  customerAndToolInfo,
  toolActions,
}) => {
  const totalDays = calculateRentalDays(
    toolActions.rentToolsAction.fromDate,
    toolActions.rentToolsAction.fromTime,
    toolActions.rentToolsAction.untilDate,
    toolActions.rentToolsAction.untilTime
  );

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>
          $
          {(
            customerAndToolInfo?.toolRentalDetails?.pricePerDay *
            Number(totalDays ?? 0)
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Tax</span>
        <span>
          ${" "}
          {(
            customerAndToolInfo?.toolRentalDetails?.pricePerDay *
              Number(totalDays ?? 0) +
            5
          ).toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between text-sm font-bold">
        <span>Rental total</span>
        <span>
          $
          {(
            customerAndToolInfo?.toolRentalDetails?.pricePerDay *
              Number(totalDays ?? 0) +
            5
          ).toFixed(2)}
        </span>
      </div>
    </div>
  );
};
