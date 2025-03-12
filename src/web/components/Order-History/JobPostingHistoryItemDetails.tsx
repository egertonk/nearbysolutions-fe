import jobSearchListImage from "../../assets/images/customer-job-requests.jpeg";
import {
  JobOrderHistory,
  JobPosting,
} from "../../lib/types/FindWorkPostAJobtypesData";
import { getPaymentOrderStatusClass } from "./CustomerJopPostingOrderHistory";
import { OrderHistoryItemDetails } from "./Common/OrderHistoryItemDetails";
import { HistoryDetailsButton } from "./Common/HistoryDetailsButton";
import { useEffect, useState } from "react";
import { getValidImage } from "../common-sections/useImageLoader";
import { HistoryImageTag } from "./Common/HistoryImageTag";

type Props = {
  index?: number;
  arrayLength?: number;
  content: JobOrderHistory | JobPosting;
  showViewDetailsButton: boolean;
  lastElementRef?: (node: HTMLDivElement | null) => void;
};

export const JobPostingHistoryItemDetails: React.FC<Props> = ({
  index,
  arrayLength,
  content,
  lastElementRef,
  showViewDetailsButton,
}) => {
  const [imageSrc, setImageSrc] = useState<string>(jobSearchListImage);

  useEffect(() => {
    getValidImage(content?.images).then(setImageSrc);
  }, [content?.images]);

  return (
    <div
      className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
      ref={index === (arrayLength ?? 0) - 1 ? lastElementRef : null}
      key={Math.random()}
    >
      <div className="w-full md:w-40">
        <HistoryImageTag imageSrc={imageSrc} name={content.jobName} />
      </div>

      <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 md:space-y-0">
        <div className="w-full flex flex-col justify-start items-start space-y-4 mb-4">
          <h3 className="text-xl dark:text-white font-semibold leading-6 text-gray-800">
            {content.jobName}{" "}
            {showViewDetailsButton === false && (
              <>
                (Order #
                {(content as JobOrderHistory).orderId ??
                  (content as JobPosting).id}
                )
              </>
            )}
          </h3>

          <div className="flex justify-start items-start flex-col space-y-2">
            <OrderHistoryItemDetails
              name="Order Date"
              value={content?.createdAt?.split("T")[0] ?? ""}
            />

            {showViewDetailsButton && (
              <>
                <OrderHistoryItemDetails
                  name="Job Date"
                  value={content?.jobDate?.split("T")[0] ?? ""}
                />
                <OrderHistoryItemDetails
                  name="Job Time"
                  value={
                    (content as JobOrderHistory).jobTime ??
                    (content as JobPosting).time ??
                    ""
                  }
                />
                <OrderHistoryItemDetails
                  name="Job Category"
                  value={content.jobCategory ?? ""}
                />
                <OrderHistoryItemDetails
                  name="Job Category Services"
                  value={content.jobCategoryServices ?? ""}
                />
                <OrderHistoryItemDetails
                  name="Job Task"
                  value={content.jobTask ?? ""}
                />
                <OrderHistoryItemDetails
                  name="Job Description"
                  value={content.jobDescription ?? ""}
                />
              </>
            )}

            <OrderHistoryItemDetails
              name="Job Date"
              value={content?.jobDate?.split("T")[0] ?? ""}
            />
            <OrderHistoryItemDetails
              name="Job Time"
              value={
                (content as JobOrderHistory).jobTime ??
                (content as JobPosting).time ??
                ""
              }
            />

            {showViewDetailsButton && (
              <OrderHistoryItemDetails
                name="Job Description"
                value={content?.jobDescription ?? ""}
              />
            )}
          </div>
        </div>

        {showViewDetailsButton === false && (
          <div className="flex md:justify-end justify-center space-x-8 items-start w-full">
            <div className="grid grid-cols-3 gap-2 text-white text-sm text-center font-bold leading-6">
              <div className="p-2 rounded-lg shadow-lg bg-purple-600">
                Paid: ${content.jobPrice?.toFixed(2)}
              </div>

              <div
                className={`${getPaymentOrderStatusClass(
                  content.jobStatus
                )} p-2 rounded-lg shadow-lg`}
              >
                {content.jobStatus}
              </div>

              <HistoryDetailsButton
                url={`/history/job-request-order-details?orderId=${
                  (content as JobOrderHistory).orderId ??
                  (content as JobPosting).id
                }&solutionist=${content.solutionistId}&poster=${
                  content.posterId
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
