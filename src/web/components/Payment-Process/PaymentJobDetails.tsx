import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { isAllPostAJobOrderEmpty } from "../Find-Work-Post-A-Job/useResetPostAJob";
import { Address } from "../common-sections/Address";

export const PaymentJobDetails: React.FC = () => {
  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;
  const postAJobOrder = states.postAJobFormDetailsState.postAJobFormDetailsData;

  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200 mb-8 justtify-center"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <p className="text-xl font-semibold">Job Details</p>

        {!isAllPostAJobOrderEmpty(postAJobOrder) ? (
          <div className="grid grid-cols-2 gap-4 content-start mt-5">
            <div>
              <h3 className="font-semibold">Requestor Name</h3>
              <span>{postAJobOrder.customerName}</span>
            </div>

            <div>
              <h3 className="font-semibold">Requestor Email</h3>
              <span>{postAJobOrder.email}</span>
            </div>

            <div>
              <h3 className="font-semibold">Requestor Phone Number</h3>
              <span>{postAJobOrder.email}</span>
            </div>

            <div>
              <h3 className="font-semibold">Job Location </h3>
              <Address
                country={customerOrder.customerAddress.country ?? ""}
                address={customerOrder.customerAddress.street ?? ""}
                city={customerOrder.customerAddress.city ?? ""}
                state={customerOrder.customerAddress.state ?? ""}
                zip={customerOrder.customerAddress.postalCode ?? ""}
              />
            </div>

            <div>
              <h3 className="font-semibold">Job Name</h3>
              <span>{postAJobOrder.jobName}</span>
            </div>

            <div>
              <h3 className="font-semibold">Job Task</h3>
              <span>{postAJobOrder.jobTask}</span>
            </div>

            <div>
              <h3 className="font-semibold">Appointment Job Date</h3>
              <span>{postAJobOrder.jobDate}</span>
            </div>

            <div>
              <h3 className="font-semibold">Schedule Time</h3>
              <span>{postAJobOrder.time}</span>
            </div>

            <div>
              <h3 className="font-semibold">Job Urgency Level</h3>
              <span>{postAJobOrder.urgencyLevel}</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 content-start mt-5">
            <div>
              <h3 className="font-semibold">Solutionist Name</h3>
              <span>
                {customerOrder.talentFirstName} {customerOrder.talentLastName}
              </span>
            </div>

            <div>
              <h3 className="font-semibold">Solutionist ID</h3>
              <span>{customerOrder.talentID}</span>
            </div>

            <div>
              <h3 className="font-semibold">Appointment Date</h3>
              <span>
                {customerOrder.solutionDateContract.solutionFormattedDate}
              </span>
            </div>

            <div>
              <h3 className="font-semibold">Schedule Time</h3>
              <span>
                {customerOrder.solutionDateContract.solutionStartTime}
              </span>
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
              <p>{customerOrder.customerAddress.street}</p>
              <p>
                {customerOrder.customerAddress.city},{" "}
                {customerOrder.customerAddress.state},{" "}
                {customerOrder.customerAddress.postalCode}.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
