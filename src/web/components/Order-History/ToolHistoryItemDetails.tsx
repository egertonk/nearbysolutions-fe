import { ToolOrderHistory } from "../../lib/types/DIYToolsListings";
import { getPaymentOrderStatusClass } from "./CustomerJopPostingOrderHistory";
import { OrderHistoryItemDetails } from "./Common/OrderHistoryItemDetails copy";
import { HistoryDetailsButton } from "./Common/HistoryDetailsButton";

type Props = {
  content: ToolOrderHistory;
  showViewDetailsButton: boolean;
};

export const ToolHistoryItemDetails: React.FC<Props> = ({
  content,
  showViewDetailsButton,
}) => {
  return (
    <>
      <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <div className="w-full md:w-40">
          <img
            className="w-full hidden md:block"
            src={
              content?.imageUrls !== undefined
                ? JSON?.parse(content?.imageUrls)[0]
                : ""
            }
            alt={content.toolName}
          />
        </div>
        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-8">
            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
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
                  url={`/history/order-details?orderId=${content.id}&id=${content.renterId}&poster=${content.posterId}`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
