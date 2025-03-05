import React, { useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { useGetToolRentalListingWithId } from "../../utils/fetchEndpoints";
import { useRentTools } from "./useRentTools";
import { useBooleans } from "../common-sections/useBooleans";
import { useMaps } from "../common-sections/useMaps";
import { getImageArray } from "../../lib";

import { setPaymentState } from "../../../store/paymentSlice";
import { RootState } from "../../../store";
import { PaymentStateProps } from "../../lib/types/PaymentTyoes";

import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { MainTitle } from "../common-sections/MainTitle";
import { DateAndTimeInputs } from "./DateAndTimeInputs";
import { FormProgressBar } from "../common-sections/FormProgressBar";
import { ToolRentalDays } from "./ToolRentalDays";
import { ToolExchangeInfo } from "./ToolExchangeInfo";
import { ToolBillingDetails } from "./ToolBillingDetails";
import { ToolBillingTotals } from "./ToolBillingTotals";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { PaymentCustomerDetails } from "../Payment-Process/PaymentCustomerDetails";
import { PaymentNav } from "../Payment-Process/PaymentNav";
import { PaymentSelection } from "../Payment-Process/PaymentSelection";
import { PaymentCardDetails } from "../Payment-Process/PaymentCardDetails";
import { Address } from "../common-sections/Address";

export const RentOrderDetails: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { rentToolsAction } = useRentTools(false, "");

  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dateTimeError, setDateTimeError] = useState(false);
  const [isOrderConfirm, setIsOrderConfirm] = useState(false);

  const {
    isAccept,
    setIsAccept,
    isShowTermsAndConditions,
    setIsShowTermsAndConditions,
  } = useBooleans();

  const searchParams = new URLSearchParams(location.search);
  const toolId = searchParams.get("tool");

  const { data: customerAndToolInfo } = useGetToolRentalListingWithId(
    56,
    Number(toolId)
  );

  const { googleMapsUrl } = useMaps(
    customerAndToolInfo?.customerInformation?.country ?? "",
    customerAndToolInfo?.customerInformation?.address ?? "",
    customerAndToolInfo?.customerInformation?.city ?? "",
    customerAndToolInfo?.customerInformation?.state ?? "",
    customerAndToolInfo?.customerInformation?.zip ?? ""
  );

  const steps = [
    "Time / Date Setup",
    "Payment Setup",
    "Review",
    "Confirmation",
  ];

  const validateDateTimeSelection = () => {
    const isValid =
      rentToolsAction.fromDate &&
      rentToolsAction.fromTime &&
      rentToolsAction.untilDate &&
      rentToolsAction.untilTime;

    setDateTimeError(!isValid);
    return isValid;
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1 && validateDateTimeSelection()) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handlePaymentInfoEdit = () => {
    dispatch(
      setPaymentState({
        ...paymentStatus,
        showPaymentInputs: true,
        showPayment: true,
        showPaymentInfo: true,
      })
    );
    setIsAccept(true);
  };

  if (!customerAndToolInfo) return null;

  return (
    <>
      <MainTitle
        title={
          isOrderConfirm ? "Tool Order Confirmation" : "DIY Tools Order Setup"
        }
      />

      {currentStep === 0 && (
        <DateAndTimeInputs rentToolsAction={rentToolsAction} />
      )}

      {!isOrderConfirm && (
        <FormProgressBar
          steps={steps}
          currentStep={currentStep}
          handlePreviousStep={handlePreviousStep}
          handleNextStep={handleNextStep}
        />
      )}

      <div className="p-6 bg-white shadow-md rounded-md">
        <div className="sm:flex">
          <div className="sm:w-1/3">
            {currentStep === 1 ? (
              <>
                <GeneralBannerInfo
                  title="Policy"
                  description="All payments will be held until confirmed onsite. A work pin will be sent via email to confirm job completion."
                  titleBG="bg-indigo-500"
                />
                <PaymentCardDetails />
              </>
            ) : (
              <>
                <img
                  src={
                    getImageArray(
                      customerAndToolInfo?.toolRentalDetails?.imageUrl
                    )[0] || DIYToolsImage
                  }
                  alt={customerAndToolInfo?.toolRentalDetails?.toolName}
                  className="rounded-md h-68"
                />
                {isOrderConfirm && (
                  <div className="relative w-full h-96 mt-5">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={googleMapsUrl}
                      allowFullScreen
                      title="Job Location Map"
                    ></iframe>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="sm:w-2/3 pl-4">
            <h2 className="text-xl font-semibold">
              {customerAndToolInfo?.toolRentalDetails?.toolName}
            </h2>

            <div className="flex flex-col mt-4">
              <div className="overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200 bg-gray-100 rounded-xl">
                  <tbody className="divide-y divide-gray-200">
                    {[
                      {
                        label: "Price Per Day",
                        value: `$${customerAndToolInfo?.toolRentalDetails?.pricePerDay}`,
                      },
                      {
                        label: "Brand",
                        value:
                          customerAndToolInfo?.toolRentalDetails?.toolBrand,
                      },
                      {
                        label: "Category",
                        value:
                          customerAndToolInfo?.toolRentalDetails?.toolCategory,
                      },
                      {
                        label: "Description",
                        value:
                          customerAndToolInfo?.toolRentalDetails?.description,
                      },
                      {
                        label: "Power Source",
                        value:
                          customerAndToolInfo?.toolRentalDetails?.powerSource,
                      },
                      {
                        label: "Safety Information",
                        value:
                          customerAndToolInfo?.toolRentalDetails
                            ?.safetyInformation,
                      },
                    ].map(({ label, value }) => (
                      <tr key={label}>
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {label}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-800">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <ToolRentalDays
              toolActions={{ rentToolsAction }}
              dateTimeCSSError={dateTimeError ? "bg-red-300" : ""}
            />

            {currentStep > 0 && (
              <>
                <ToolExchangeInfo
                  customerAndToolInfo={customerAndToolInfo}
                  isOrderConfirm={isOrderConfirm}
                />

                <ToolBillingDetails customerAndToolInfo={customerAndToolInfo} />
              </>
            )}
          </div>
        </div>

        <ToolBillingTotals
          customerAndToolInfo={customerAndToolInfo}
          toolActions={{ rentToolsAction }}
        />

        {currentStep === 3 && isOrderConfirm === false && (
          <button
            type="submit"
            disabled={isAccept}
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
  );
};
