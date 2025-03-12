import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";
import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { getPaymentOrderStatusClass } from "./CustomerJopPostingOrderHistory";
import { OrderHistoryItemDetails } from "./Common/OrderHistoryItemDetails";
import { HistoryDetailsButton } from "./Common/HistoryDetailsButton";
import { getValidImage } from "../common-sections/useImageLoader";
import { useEffect, useState } from "react";
import { HistoryImageTag } from "./Common/HistoryImageTag";

type Props = {
  index?: number;
  arrayLength?: number;
  content: ToolOrderHistory;
  showViewDetailsButton: boolean;
  lastElementRef?: (node: HTMLDivElement | null) => void;
};

export const ToolHistoryItemDetails: React.FC<Props> = ({
  index,
  arrayLength,
  content,
  lastElementRef,
  showViewDetailsButton,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(jobSearchListImage);

  useEffect(() => {
    getValidImage(content?.imageUrls).then(setImageSrc);
  }, [content?.imageUrls]);

  return (
    <>
      <div
        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
        ref={index === (arrayLength ?? 0) - 1 ? lastElementRef : null}
      >
        <div className="w-full md:w-40">
          <HistoryImageTag imageSrc={imageSrc} name={content.toolName} />
        </div>

        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-4 mb-4">
            <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-800">
              {content.toolName}{" "}
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
                    name="Category"
                    value={content.toolCategory ?? ""}
                  />
                  <OrderHistoryItemDetails
                    name="Tool Brand"
                    value={content.toolBrand ?? ""}
                  />
                  <OrderHistoryItemDetails
                    name="Rental Days"
                    value={content.rentalDays ?? 0}
                  />
                  <OrderHistoryItemDetails
                    name="Price Per Day"
                    value={`$${content.pricePerDay ?? 0}`}
                  />
                  <OrderHistoryItemDetails
                    name="Power Source"
                    value={content.powerSource ?? ""}
                  />
                </>
              )}

              <OrderHistoryItemDetails
                name="Rental Start Date"
                value={content?.rentStartDate?.split("T")[0] ?? ""}
              />
              <OrderHistoryItemDetails
                name="Rental End Date"
                value={content?.rentEndDate?.split("T")[0] ?? ""}
              />

              {showViewDetailsButton && (
                <OrderHistoryItemDetails
                  name="Description"
                  value={content?.description ?? ""}
                />
              )}
            </div>
          </div>

          {showViewDetailsButton === false && (
            <div className="flex md:justify-end justify-center space-x-8 items-start w-full ">
              <div className="grid grid-cols-3 gap-2 text-white text-sm text-center font-bold leading-6">
                <div className="p-2 rounded-lg shadow-lg bg-purple-600">
                  Paid: ${content.finalPrice?.toFixed(2)}
                </div>

                <div
                  className={`${getPaymentOrderStatusClass(
                    content.orderStatus
                  )} p-2 rounded-lg shadow-lg`}
                >
                  {content.orderStatus}
                </div>

                <HistoryDetailsButton
                  url={`/history/tool-rental-order-details?orderId=${content.id}&id=${content.renterId}&poster=${content.posterId}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
