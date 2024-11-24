import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const PaymentJobDetails: React.FC = () => {
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200 mb-8 justtify-center"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-semibold">Job Details</p>

        <div className="grid grid-cols-2 gap-4 content-start mt-5">
          <div>
            <h3 className="font-semibold">Talent Name</h3>
            <span>
              {customerOrder.talentFirstName} {customerOrder.talentLastName}
            </span>
          </div>

          <div>
            <h3 className="font-semibold">Appointment Date</h3>
            <span>
              {customerOrder.solutionDateContract.solutionFormattedDate}
            </span>
          </div>

          <div>
            <h3 className="font-semibold">Schedule Time</h3>
            <span>{customerOrder.solutionDateContract.solutionStartTime}</span>
          </div>

          <div>
            <h3 className="font-semibold">Job Selection</h3>
            <span>{customerOrder.solutionJob}</span>
          </div>

          <div>
            <h3 className="font-semibold">Job Task</h3>
            <span>{customerOrder.solutionTask || "N/A"}</span>
          </div>

          <div>
            <h3 className="font-semibold">Job Address</h3>
            <p>{customerOrder.customerInfo.address}</p>
            <p>
              {customerOrder.customerInfo.city},{" "}
              {customerOrder.customerInfo.state},{" "}
              {customerOrder.customerInfo.zip}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
