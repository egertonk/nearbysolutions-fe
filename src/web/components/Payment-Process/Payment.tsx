import { PaymentCustomerDetails } from "./PaymentCustomerDetails";
import { PaymentJobDetails } from "./PaymentJobDetails";
import { PaymentSumary } from "./PaymentSumary";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setPaymentState } from "../../../store/paymentSlice";
import {
  setCustomerOrder,
  setIsEditOrder,
} from "../../../store/customerContractorSlice";
import { orderStates, paymentStatusStates } from "../../../store/defualtStates";
import { GeneralBannerInfo } from "../common-sections/GeneralBannerInfo";
import { useJobPostingById } from "../../utils/fetchEndpoints";

export const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const paymentStatus = useSelector(
    (state: RootState) => state.paymentCheckoutState.paymentCheckoutState
  );
  const isEditOrder = useSelector(
    (state: RootState) => state.formData.isEditOrder
  );

  const searchParams = new URLSearchParams(location.search);
  const acceptJobId = searchParams.get("acceptJob");
  const { data: postAJobOrder } = useJobPostingById(Number(acceptJobId));

  const handleSubmit = (action: string) => {
    // todo - submit to the database

    if (action === "Submit") {
      navigate("/order-summary");

      // Reset States to default
      dispatch(setIsEditOrder(false));
      dispatch(setPaymentState(paymentStatusStates));
      dispatch(setCustomerOrder(orderStates));
    }
  };

  return (
    <>
      <div className="text-center ">
        {/* <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800 mb-4">
          {isEditOrder
            ? "Review Information"
            : paymentStatus.showPaymentInputs
            ? "Payment"
            : "Review Order"}
        </h1> */}
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-purple-800 mb-4">
          {postAJobOrder ? "Future Payment" : "Payment"}
        </h1>

        <GeneralBannerInfo
          title={`Policy`}
          description="All payments will be put on hold until you confirm through the
            contactor onsite. A work pin will be given sent to your email that
            will be use to confirm job on site"
          titleBG={"bg-indigo-500"}
        />
      </div>

      <section id="testimonials" className="py-10">
        {(isEditOrder || paymentStatus.showPaymentInputs === false) && (
          <button
            className="bg-purple-500 w-50 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none mb-3"
            type="button"
            onClick={() => handleSubmit(isEditOrder ? "Submit" : "Place Order")}
          >
            {isEditOrder ? "Submit" : "Place Order"}
          </button>
        )}

        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:-mx-3">
            <PaymentCustomerDetails />

            <PaymentJobDetails />

            {isEditOrder === false && <PaymentSumary />}
          </div>
        </div>
      </section>
    </>
  );
};
