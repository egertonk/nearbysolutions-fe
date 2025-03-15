import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";
import { OrderHistoryItemDetails } from "./Common/OrderHistoryItemDetails";
import { SolutionJobOrderHistory } from "../../lib/types/OrderSolutionTypes";
import { HistoryImageTag } from "./Common/HistoryImageTag";
import { HistoryTableStatus } from "./Common/HistoryTableStatus";
import {
  formatDate,
  useDateAndTimeFormat,
} from "../common-sections/useDateAndTimeFormat";

type Props = {
  index?: number;
  arrayLength?: number;
  content: SolutionJobOrderHistory;
  showViewDetailsButton: boolean;
  lastElementRef?: (node: HTMLDivElement | null) => void;
};

export const SolutionHistoryItemDetails: React.FC<Props> = ({
  index,
  arrayLength,
  content,
  showViewDetailsButton,
  lastElementRef,
}) => {
  const params = new URLSearchParams({
    orderId: `${content.orderId}`,
    solutionist: `${content.solutionistId}`,
    customer: `${content.customerId}`,
  });
  const url = `/history/customer-Solution order-details?${params.toString()}`;

  const { formattedDate, formattedTime } = useDateAndTimeFormat(
    content?.appointmentDate ?? "",
    content?.scheduleTime ?? "",
    "en-US"
  );

  return (
    <>
      <div
        className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
        ref={index === (arrayLength ?? 0) - 1 ? lastElementRef : null}
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
              {showViewDetailsButton === false && (
                <>(Order #{content.orderId})</>
              )}
            </h3>

            <div className="flex justify-start items-start flex-col space-y-2">
              <OrderHistoryItemDetails
                name="Order Date"
                value={formatDate(content?.createdAt, "en-US")}
              />

              {showViewDetailsButton && (
                <>
                  <OrderHistoryItemDetails
                    name="Task"
                    value={content.jobTask ?? ""}
                  />
                  <OrderHistoryItemDetails
                    name="Price"
                    value={`$${content.jobPrice ?? 0}`}
                  />
                  <OrderHistoryItemDetails
                    name="Address"
                    value={`$${content.jobAddress ?? 0}`}
                  />
                </>
              )}

              <OrderHistoryItemDetails
                name="Appointment Date"
                value={formattedDate}
              />
              <OrderHistoryItemDetails
                name="Appointment Time"
                value={formattedTime}
              />
            </div>
          </div>

          {showViewDetailsButton === false && (
            <HistoryTableStatus
              price={content.jobPrice}
              status={content.status}
              url={url}
            />
          )}
        </div>
      </div>
    </>
  );
};
