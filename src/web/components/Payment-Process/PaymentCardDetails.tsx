import React from "react";
import { editIconSVG } from "../../assets/svg/svgs";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentNav } from "./PaymentNav";
import { PaymentSelection } from "./PaymentSelection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPaymentState } from "../../../store/paymentSlice";
import { PaymentStateProps } from "../../lib/types/PaymentTyoes";

export const PaymentCardDetails: React.FC = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );

  const isEditOrder = useSelector(
    (state: RootState) => state.formData.isEditOrder
  );

  const handlePaymentInfoEdit = () => {
    // todo - validate first with handleSubmit
    const updatedPaymentStatus: PaymentStateProps = {
      ...paymentStatus,
      showPaymentInputs: true,
      showPayment: true,
      showPaymentInfo: true,
    };

    dispatch(setPaymentState(updatedPaymentStatus));
  };

  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        {isEditOrder === false && (
          <>
            <PaymentNav handlePaymentInfoEdit={handlePaymentInfoEdit} />

            <PaymentSelection />
          </>
        )}

        {(isEditOrder || paymentStatus.showCreditCard) && (
          <>
            {isEditOrder === false && (
              <div className="text-left mt-3">
                {paymentStatus.showPaymentSelection === false && (
                  <CreditCardForm />
                )}
                {paymentStatus.showPaymentInputs === false && (
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
            )}
          </>
        )}
      </div>
    </div>
  );
};
