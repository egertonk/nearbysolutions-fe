import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPaymentState } from "../../../store/paymentSlice";
import { PaymentStateProps } from "../../lib/types/PaymentTyoes";

export const PaymentSelection: React.FC = () => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );

  const handlePaymentInfoEdit = (updatedPaymentStatus: PaymentStateProps) => {
    dispatch(setPaymentState(updatedPaymentStatus));
  };

  const handlePaymentOptions = (name?: string) => {
    if (name === "credit") {
      const updatedPaymentStatus: PaymentStateProps = {
        ...paymentStatus,
        showCreditCard: true,
        showPaypal: false,
        showPaymentSelection: false,
        showPaymentInfo: true,
      };
      handlePaymentInfoEdit(updatedPaymentStatus);
    } else {
      const updatedPaymentStatus: PaymentStateProps = {
        ...paymentStatus,
        showCreditCard: false,
        showPaypal: true,
        showPaymentSelection: false,
        showPaymentInfo: true,
      };
      handlePaymentInfoEdit(updatedPaymentStatus);
    }
  };

  return (
    <>
      {paymentStatus.showPaymentSelection && (
        <>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="credit-card"
                      aria-describedby="credit-card-text"
                      type="radio"
                      name="credit-card-payment-method"
                      className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      checked={paymentStatus.showCreditCard}
                      onClick={() => handlePaymentOptions("credit")}
                    />
                  </div>
                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="credit-card"
                      className="font-medium leading-none text-gray-900 dark:text-white"
                    >
                      Credit Card
                    </label>
                    <p
                      id="credit-card-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      Pay with your credit card
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex items-start">
                  <div className="flex h-5 items-center">
                    <input
                      id="paypal-2"
                      aria-describedby="paypal-text"
                      type="radio"
                      name="payment-method"
                      className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      checked={paymentStatus.showPaypal}
                      onClick={() => handlePaymentOptions()}
                    />
                  </div>
                  <div className="ms-4 text-sm">
                    <label
                      htmlFor="paypal-2"
                      className="font-medium leading-none text-gray-900 dark:text-white"
                    >
                      Paypal account
                    </label>
                    <p
                      id="paypal-text"
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                    >
                      Pay with Paypal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
