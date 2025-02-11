import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const PaymentJGiftDetails: React.FC = () => {
  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;

  if (customerOrder.giftStatus === false) return null;
  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200 mb-8 justtify-center"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-semibold">Gift Details</p>

        <div className="grid grid-cols-2 gap-4 content-start mt-5">
          <div>
            <h3 className="font-semibold">Recipient’s Name </h3>
            <span>
              {customerOrder.giftInformationFor.firstName}{" "}
              {customerOrder.giftInformationFor.lastName}
            </span>
          </div>

          <div>
            <h3 className="font-semibold">Recipient’s Address</h3>
            <p>{customerOrder.giftInformationFor.street}</p>
            <p>
              {customerOrder.giftInformationFor.city},{" "}
              {customerOrder.giftInformationFor.state},{" "}
              {customerOrder.giftInformationFor.postalCode}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
