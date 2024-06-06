import {
  forwardArrowNoCircleSVG,
  forwardArrowSVG,
} from "../../assets/svg/svgs";
import { PaymentStateProps } from "./Payment";

type Props = {
  paymentState: PaymentStateProps;
  handlePaymentInfoEdit: () => void;
  togglePaymentInputs: (name: string, status: boolean) => void;
};

export const PaymentNav: React.FC<Props> = ({
  paymentState,
  togglePaymentInputs,
  handlePaymentInfoEdit,
}) => {
  const handleSelectPaymentEdit = () => {
    togglePaymentInputs("showPaymentInfo", true);
    togglePaymentInputs("showPaymentSelection", true);
    togglePaymentInputs("showPaymentInfo", false);
    togglePaymentInputs("showCreditCard", false);
    togglePaymentInputs("showPaypal", false);
  };

  return (
    <nav className="flex mb-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {paymentState.showPaymentInfo ? (
          <li className="inline-flex items-center">
            <button
              onClick={() => handleSelectPaymentEdit()}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              {forwardArrowSVG}
              Select Payment
            </button>
          </li>
        ) : (
          <li className="inline-flex items-center">
            <div className="flex items-center">
              {forwardArrowSVG}
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Select Payment
              </span>
            </div>
          </li>
        )}

        {paymentState.showPaymentInfo && (
          <li>
            {paymentState.showPaymentInputs ? (
              <div className="flex items-center">
                {forwardArrowNoCircleSVG}
                <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                  Provide Payment Info
                </span>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={() => handlePaymentInfoEdit()}
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  {forwardArrowNoCircleSVG}
                  Provide Payment Info
                </button>
              </div>
            )}
          </li>
        )}

        {paymentState.showPaymentInputs === false && (
          <li>
            <div className="flex items-center">
              {forwardArrowNoCircleSVG}
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Customer Details
              </span>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};
