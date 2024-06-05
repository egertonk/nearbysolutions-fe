import { CustomerFormData } from "../../lib/types/orderTypes";
import { CreditCardForm } from "./CreditCardForm";

type Props = {
  formData: CustomerFormData;
  setShowPaymentInputs: React.Dispatch<React.SetStateAction<boolean>>;
  showPaymentInputs: boolean;
};

export const PaymentCustomerDetails: React.FC<Props> = ({
  formData,
  setShowPaymentInputs,
  showPaymentInputs,
}) => {
  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="credit-card"
                    aria-describedby="credit-card-text"
                    type="radio"
                    name="payment-method"
                    className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                    defaultChecked
                  />
                </div>
                <div className="ms-4 text-sm">
                  <label
                    htmlFor="credit-card"
                    className="font-medium leading-none text-gray-900 dark:text-white"
                  >
                    {" "}
                    Credit Card{" "}
                  </label>
                  <p
                    id="credit-card-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    Pay with your credit card
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Delete
                </button>
                <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Edit
                </button>
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
                  />
                </div>
                <div className="ms-4 text-sm">
                  <label
                    htmlFor="paypal-2"
                    className="font-medium leading-none text-gray-900 dark:text-white"
                  >
                    {" "}
                    Paypal account{" "}
                  </label>
                  <p
                    id="paypal-text"
                    className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400"
                  >
                    Connect to your account
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Delete
                </button>
                <div className="h-3 w-px shrink-0 bg-gray-200 dark:bg-gray-700" />
                <button
                  type="button"
                  className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>

        {showPaymentInputs === false ? (
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
          <p className="text-xl font-semibold">Provide Payment Info</p>
        )}

        <div className="text-left mt-3">
          <CreditCardForm
            setShowPaymentInputs={setShowPaymentInputs}
            showPaymentInputs={showPaymentInputs}
          />
        </div>
      </div>
    </div>
  );
};
