import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  forwardArrowNoCircleSVG,
  forwardArrowSVG,
} from "../../assets/svg/svgs";
import { setPaymentState } from "../../../store/paymentSlice";
import { PaymentStateProps } from "../../lib/types/paymentTyoes";

type Props = {
  handlePaymentInfoEdit: () => void;
};

export const PaymentNav: React.FC<Props> = ({ handlePaymentInfoEdit }) => {
  const dispatch = useDispatch();
  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );

  const handleSelectPaymentEdit = () => {
    const updatedPaymentStatus: PaymentStateProps = {
      ...paymentStatus,
      showPaymentSelection: true,
      showPaymentInfo: false,
      showCreditCard: false,
      showPaypal: false,
    };

    dispatch(setPaymentState(updatedPaymentStatus));
  };

  return (
    <nav className="flex mb-3" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {paymentStatus.showPaymentInfo ? (
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

        {paymentStatus.showPaymentInfo && (
          <li>
            {paymentStatus.showPaymentInputs ? (
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

        {paymentStatus.showPaymentInputs === false &&
          paymentStatus.showSelectPayment === false && (
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
