import React from "react";
import { editIconSVG } from "../../assets/svg/svgs";
import { CreditCardForm } from "./CreditCardForm";
import { PaymentNav } from "./PaymentNav";
import { PaymentSelection } from "./PaymentSelection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPaymentState } from "../../../store/paymentSlice";
import { PaymentStateProps } from "../../lib/types/paymentTyoes";

export const PaymentCustomerDetails: React.FC = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
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
            {isEditOrder || paymentStatus.showPaymentInputs === false ? (
              <>
                <p className="text-xl font-semibold">Customer Details</p>
                <div className="text-left mt-5">
                  <h3 className="font-semibold">Name</h3>
                  <span>
                    {customerOrder.firstName} {customerOrder.lastName}
                  </span>
                </div>

                <div className="text-left mt-3">
                  <h3 className="font-semibold">Phone</h3>
                  <span>{customerOrder.phoneNumber}</span>
                </div>

                <div className="text-left mt-3">
                  <h3 className="font-semibold">Address</h3>
                  <p>{customerOrder.address}</p>
                  <p>
                    {customerOrder.city}, {customerOrder.state},{" "}
                    {customerOrder.zip}.
                  </p>
                </div>
              </>
            ) : (
              <>
                {paymentStatus.showPaymentSelection === false && (
                  <p className="text-xl font-semibold">Provide Payment Info</p>
                )}
              </>
            )}

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
          </>
        )}
      </div>
    </div>
  );
};
