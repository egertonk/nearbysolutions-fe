import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export const PaymentJobDetails: React.FC = () => {
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );
  const address = `${customerOrder.address}, ${customerOrder.city}, ${customerOrder.state}, ${customerOrder.zip}.`;
  const [imageUrl, setImageUrl] = useState("");

  const googleMapURL = "https://maps.googleapis.com/maps/api/staticmap";
  const apiKey = "AIzaSyCkpoGe0dJZVeOo6Rq0k22WS6gPOHsDuuA";
  const signature = "YQLhWfyFuKgCykLi7ynJv2gAjTE=";

  const fetchMap = () => {
    const baseUrl = `${googleMapURL}?size=512x512&maptype=roadmap\&markers=size:mid%7Ccolor:red%7C${address},CA&key=${apiKey}`;
    setImageUrl(baseUrl);
  };

  useEffect(() => {
    fetchMap();
  }, [customerOrder]);

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
            <span>{customerOrder.solutionFormattedDate}</span>
          </div>

          <div>
            <h3 className="font-semibold">Schedule Time</h3>
            <span>{customerOrder.solutionStartTime}</span>
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
            <p>{customerOrder.address}</p>
            <p>
              {customerOrder.city}, {customerOrder.state}, {customerOrder.zip}.
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center m-5">
          {imageUrl && <img src={imageUrl} alt="Static Map" />}
        </div>
      </div>
    </div>
  );
};
