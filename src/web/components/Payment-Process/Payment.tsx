import { useState } from "react";
import { CustomerFormData } from "../../lib/types/orderTypes";
import { PaymentCustomerDetails } from "./PaymentCustomerDetails";
import { PaymentJobDetails } from "./PaymentJobDetails";
import { PaymentSumary } from "./PaymentSumary";
import { useNavigate } from "react-router";

type Props = {
  formData: CustomerFormData;
};

export type PaymentStateProps = {
  showPaymentInputs: boolean;
  showCreditCard: boolean;
  showPaypal: boolean;
  showPaymentSelection: boolean;
  showPaymentInfo: boolean;
  showPayment: boolean;
  showSelectPayment: boolean;
};

export const Payment: React.FC<Props> = ({ formData }) => {
  const navigate = useNavigate();

  const [paymentState, setPaymentState] = useState<PaymentStateProps>({
    showPaymentInputs: true,
    showCreditCard: false,
    showPaypal: false,
    showPaymentSelection: true,
    showPaymentInfo: false,
    showPayment: true,
    showSelectPayment: true,
  });

  const togglePaymentInputs = (name: string, status: boolean) => {
    setPaymentState((prevState) => ({
      ...prevState,
      [name]: status,
    }));
  };

  return (
    <>
      <div className="text-center ">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800 mb-4">
          {paymentState.showPaymentInputs ? "Payment" : "Review Order"}
        </h1>

        <div
          className="p-2 bg-indigo-900 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
          role="alert"
        >
          <span className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
            Policy
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            All payments will be put on hold until you confirm through the
            contactor onsite. A work pin will be given sent to your email that
            will be use to confirm job on site
          </span>
        </div>
      </div>

      <section id="testimonials" className="py-10">
        {paymentState.showPaymentInputs === false && (
          <button
            className="bg-purple-500 w-50 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none mb-3"
            type="button"
            onClick={() => {
              // todo - submit to the database
              navigate("/order-summary");
            }}
          >
            Place Order
          </button>
        )}

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:-mx-3">
            <PaymentCustomerDetails
              formData={formData}
              paymentState={paymentState}
              togglePaymentInputs={togglePaymentInputs}
            />

            <PaymentJobDetails formData={formData} />

            <PaymentSumary formData={formData} />
          </div>
        </div>
      </section>
    </>
  );
};
