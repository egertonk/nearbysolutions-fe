import React, { useState } from "react";
import { useGetToolRentalListingWithId } from "../../utils/fetchEndpoints";
import { usePostAJob } from "../Find-Work-Post-A-Job/usePostAJob";
import { useLocation } from "react-router";
import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { MainTitle } from "../common-sections/MainTitle";
import { useRentTools } from "./useRentTools";
import { DateAndTimeInputs } from "./DateAndTimeInputs";
import { RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { PaymentStateProps } from "../../lib/types/PaymentTyoes";
import { setPaymentState } from "../../../store/paymentSlice";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { PaymentCustomerDetails } from "../Payment-Process/PaymentCustomerDetails";
import { FormProgressBar } from "../common-sections/FormProgressBar";
import { ToolBillingDetails } from "./ToolBillingDetails";
import { ToolRentalDays } from "./ToolRentalDays";
import { ToolExchangeInfo } from "./ToolExchangeInfo";
import { ToolBillingTotals } from "./ToolBillingTotals";

export const RentOrderDetails: React.FC = () => {
  const location = useLocation();
  const { rentToolsAction } = useRentTools();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [isOrderConfirm, setIsOrderConfirm] = useState(false);
  const dateTimeCSSError = dateTimeError ? "bg-red-300" : "";

  const searchParams = new URLSearchParams(location.search);
  const toolId = searchParams.get("tool");

  const { postActions, booleanStatus, postData } = usePostAJob();
  const { data: customerAndToolInfo, isFetching: isCustomerAndToolFetching } =
    useGetToolRentalListingWithId(2, Number(toolId));

  const steps = [
    "Time / Date Setup",
    "Payment Setup",
    "Review",
    "Confirmation",
  ];

  const validateDateTimeSelection = () => {
    const result =
      rentToolsAction.fromDate.length > 0 &&
      rentToolsAction.fromTime.length > 0 &&
      rentToolsAction.untilDate.length > 0 &&
      rentToolsAction.untilTime.length > 0;
    if (result === false) setDateTimeError(true);
    else setDateTimeError(false);
    return result;
  };

  // Handler to move to the next step
  const handleNextStep = () => {
    if (currentStep < steps.length - 1 && validateDateTimeSelection()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handler to move to the previous step
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  const dispatch = useDispatch();
  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );

  // duplcate
  const handlePaymentInfoEdit = () => {
    // todo - validate first with handleSubmit
    const updatedPaymentStatus: PaymentStateProps = {
      ...paymentStatus,
      showPaymentInputs: true,
      showPayment: true,
      showPaymentInfo: true,
    };
    booleanStatus.setIsAccept(true);
    dispatch(setPaymentState(updatedPaymentStatus));
  };

  console.log("customerAndToolInfo ", customerAndToolInfo);

  if (customerAndToolInfo?.toolRentalListing === undefined) return null;

  return (
    <>
      <MainTitle
        title={
          isOrderConfirm ? "Tool Order Confrimation" : "DIY Tools Order Setup"
        }
      />

      {isOrderConfirm === false ? (
        <>
          {currentStep === 0 && (
            <div className="mt-4">
              <DateAndTimeInputs rentToolsAction={rentToolsAction} />
            </div>
          )}

          <FormProgressBar
            steps={steps}
            currentStep={currentStep}
            handlePreviousStep={handlePreviousStep}
            handleNextStep={handleNextStep}
          />

          <div className="p-6 bg-white shadow-md rounded-md">
            <div className="sm:flex">
              <div className="sm:w-1/3">
                {currentStep === 1 ? (
                  <>
                    <GeneralBannerInfo
                      title={`Policy`}
                      description="All payments will be put on hold until you confirm through the
            contactor onsite. A work pin will be given sent to your email that
            will be use to confirm job on site"
                      titleBG={"bg-indigo-500"}
                    />

                    <PaymentCustomerDetails />
                  </>
                ) : (
                  <img
                    src={`${
                      customerAndToolInfo?.toolRentalListing?.imageUrls !==
                      undefined
                        ? customerAndToolInfo?.toolRentalListing?.imageUrls[0]
                        : DIYToolsImage
                    }`}
                    alt={customerAndToolInfo.toolRentalListing.toolName}
                    className="rounded-md h-68"
                  />
                )}
              </div>

              <div className="sm:w-2/3 pl-4">
                <h2 className="text-xl font-semibold">
                  {customerAndToolInfo?.toolRentalListing?.toolName}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  Brand: {customerAndToolInfo.toolRentalListing.toolBrand} -
                  Category: {customerAndToolInfo.toolRentalListing.toolCategory}
                </p>
                <h2 className="mt-2">
                  <span className="text-purple-900 font-bold">
                    ${customerAndToolInfo.toolRentalListing.pricePerDay}
                  </span>{" "}
                  (Per Day)
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {customerAndToolInfo.toolRentalListing.description}
                </p>

                <ToolRentalDays
                  toolActions={{
                    rentToolsAction: rentToolsAction,
                  }}
                  dateTimeCSSError={dateTimeCSSError}
                />

                {currentStep > 0 && (
                  <>
                    <ToolExchangeInfo
                      customerAndToolInfo={customerAndToolInfo}
                    />

                    <div className="mt-4">
                      <div className="bg-gray-600 h-2.5 rounded-full" />
                    </div>

                    {/* <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Shipped on {orderDetails.shippedDate}
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                    <div
                      className="bg-purple-600 h-2.5 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Order placed</span>
                    <span>Processing</span>
                    <span>Shipped</span>
                    <span>Delivered</span>
                  </div>
                </div> */}

                    {currentStep > 1 && (
                      <ToolBillingDetails
                        customerAndToolInfo={customerAndToolInfo}
                      />
                    )}
                  </>
                )}
              </div>
            </div>

            <ToolBillingTotals customerAndToolInfo={customerAndToolInfo} />

            {currentStep === 3 && (
              <button
                type="submit"
                disabled={booleanStatus.isAccept}
                onClick={() => {
                  console.log(
                    "IF SOLUTIONIST update database --- send notification to tool poster with a payment code and instruction--- send confirmation to tool renter and it own code --"
                  );
                  setIsOrderConfirm(true);
                }}
                className="font-bold mt-2 mb-4 px-6 py-2.5 w-full text-lg text-white rounded bg-purple-600 hover:bg-purple-900 transition-all cursor-pointer"
              >
                Confirm Order
              </button>
            )}
          </div>
        </>
      ) : (
        <span>
          submit to a database and java return the confirmation path to a new
          url
        </span>
      )}
    </>
  );
};