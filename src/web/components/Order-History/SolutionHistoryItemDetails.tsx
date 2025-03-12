import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";
import { getPaymentOrderStatusClass } from "./CustomerJopPostingOrderHistory";
import { OrderHistoryItemDetails } from "./Common/OrderHistoryItemDetails";
import { HistoryDetailsButton } from "./Common/HistoryDetailsButton";
import { getValidImage } from "../common-sections/useImageLoader";
import { useEffect, useState } from "react";
import { SolutionJobOrderHistory } from "../../lib/types/OrderSolutionTypes";
import { HistoryImageTag } from "./Common/HistoryImageTag";

type Props = {
  index: number;
  arrayLength: number;
  content: SolutionJobOrderHistory;
  showViewDetailsButton: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
};

export const SolutionHistoryItemDetails: React.FC<Props> = ({
  index,
  arrayLength,
  content,
  showViewDetailsButton,
  lastElementRef,
}) => {
  return (
    <>
      <div
        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
        ref={index === arrayLength - 1 ? lastElementRef : null}
      >
        <div className="w-full md:w-40">
          <HistoryImageTag
            imageSrc={content?.solutionistImageUrl ?? jobSearchListImage}
            name={content.solutionistName}
          />
        </div>

        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-4 mb-4">
            <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-800">
              {content.jobSelection}{" "}
              {showViewDetailsButton === false && <>(Order #{content.id})</>}
            </h3>

            <div className="flex justify-start items-start flex-col space-y-2">
              <OrderHistoryItemDetails
                name="Order Date"
                value={content?.createdAt?.split("T")[0] ?? ""}
              />

              {showViewDetailsButton && (
                <>
                  <OrderHistoryItemDetails
                    name="Job Task"
                    value={content.jobTask ?? ""}
                  />
                  <OrderHistoryItemDetails
                    name="Job Price"
                    value={`$${content.jobPrice ?? 0}`}
                  />
                  <OrderHistoryItemDetails
                    name="Job Address"
                    value={`$${content.jobAddress ?? 0}`}
                  />
                </>
              )}

              <OrderHistoryItemDetails
                name="Appointment Date"
                value={content?.appointmentDate?.split("T")[0] ?? ""}
              />
              <OrderHistoryItemDetails
                name="Schedule Time"
                value={content?.scheduleTime?.split("T")[0] ?? ""}
              />
            </div>
          </div>

          {showViewDetailsButton === false && (
            <div className="flex md:justify-end justify-center space-x-8 items-start w-full ">
              <div className="grid grid-cols-3 gap-2 text-white text-sm text-center font-bold leading-6">
                <div className="p-2 rounded-lg shadow-lg bg-purple-600">
                  Paid: ${content.jobPrice?.toFixed(2)}
                </div>

                <div
                  className={`${getPaymentOrderStatusClass(
                    content.status
                  )} p-2 rounded-lg shadow-lg`}
                >
                  {content.status}
                </div>

                <HistoryDetailsButton
                  url={`/history/order-details?orderId=${content.id}&solutionist=${content.solutionistId}&customer=${content.customerId}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
