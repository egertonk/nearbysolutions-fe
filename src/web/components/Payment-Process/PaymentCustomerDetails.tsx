import React from "react";
import { editIconSVG } from "../../assets/svg/svgs";
import { CustomerFormData } from "../../lib/types/orderTypes";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentStateProps } from "./Payment";
import { PaymentNav } from "./PaymentNav";
import { PaymentSelection } from "./PaymentSelection";

type Props = {
  formData: CustomerFormData;
  paymentState: PaymentStateProps;
  togglePaymentInputs: (name: string, status: boolean) => void;
};

export const PaymentCustomerDetails: React.FC<Props> = ({
  formData,
  paymentState,
  togglePaymentInputs,
}) => {
  const handlePaymentInfoEdit = () => {
    togglePaymentInputs("showPaymentInputs", true);
    togglePaymentInputs("showPayment", true);
    togglePaymentInputs("showPaymentInfo", false);
    togglePaymentInputs("showPaymentInfo", true);
  };

  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <PaymentNav
          paymentState={paymentState}
          togglePaymentInputs={togglePaymentInputs}
          handlePaymentInfoEdit={handlePaymentInfoEdit}
        />

        <PaymentSelection
          paymentState={paymentState}
          togglePaymentInputs={togglePaymentInputs}
        />

        {paymentState.showCreditCard && (
          <>
            {paymentState.showPaymentInputs === false ? (
              <>
                <p className="text-xl font-semibold">Customer Details</p>
                <div className="text-left mt-5">
                  <h3 className="font-semibold">Name</h3>
                  <span>
                    {formData.firstName} {formData.lastName}
                  </span>
                </div>

                <div className="text-left mt-3">
                  <h3 className="font-semibold">Phone</h3>
                  <span>{formData.phoneNumber}</span>
                </div>

                <div className="text-left mt-3">
                  <h3 className="font-semibold">Address</h3>
                  <p>{formData.address}</p>
                  <p>
                    {formData.city}, {formData.state}, {formData.zip}.
                  </p>
                </div>
              </>
            ) : (
              <>
                {paymentState.showPaymentSelection === false && (
                  <p className="text-xl font-semibold">Provide Payment Info</p>
                )}
              </>
            )}

            <div className="text-left mt-3">
              {paymentState.showPaymentSelection === false && (
                <CreditCardForm
                  togglePaymentInputs={togglePaymentInputs}
                  showPaymentInputs={paymentState.showPaymentInputs}
                />
              )}
              {paymentState.showPaymentInputs === false && (
                <div className="w-full items-left ">
                  <button
                    onClick={() => handlePaymentInfoEdit()}
                    className="hover:text-purple-500 text-base w-5 rounded-full ml-4"
                  >
                    {editIconSVG}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
