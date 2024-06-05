import { CustomerFormData } from "../../lib/types/orderTypes";

type Props = {
  formData: CustomerFormData;
};

export const PaymentJobDetails: React.FC<Props> = ({ formData }) => {
  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200 mb-8"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-semibold">Job Details</p>

        <div className="h-56 grid grid-cols-2 gap-4 content-start mt-5">
          <div>
            <h3 className="font-semibold">Talent Name</h3>
            <span>
              {formData.talentFirstName} {formData.talentLastName}
            </span>
          </div>

          <div>
            <h3 className="font-semibold">Appointment Date</h3>
            <span>{formData.solutionFormattedDate}</span>
          </div>

          <div>
            <h3 className="font-semibold">Schedule Time</h3>
            <span>{formData.solutionStartTime}</span>
          </div>

          <div>
            <h3 className="font-semibold">Job Selection</h3>
            <span>{formData.solutionJob}</span>
          </div>

          <div>
            <h3 className="font-semibold">Job Task</h3>
            <span>{formData.solutionTask || "N/A"}</span>
          </div>

          <div>
            <h3 className="font-semibold">Job Address</h3>
            <p>{formData.address}</p>
            <p>
              {formData.city}, {formData.state}, {formData.zip}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
