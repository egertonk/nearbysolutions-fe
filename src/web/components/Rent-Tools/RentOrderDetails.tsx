import React from "react";
import { useGetToolRentalListingWithId } from "../../utils/fetchEndpoints";
import { usePostAJob } from "../Find-Work-Post-A-Job/usePostAJob";
import { useLocation } from "react-router";
import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { MainTitle } from "../common-sections/MainTitle";
import { useRentTools } from "./useRentTools";
import { DateAndTimeInputs } from "./DateAndTimeInputs";

export const RentOrderDetails: React.FC = () => {
  const location = useLocation();
  const { rentToolsAction } = useRentTools();

  const searchParams = new URLSearchParams(location.search);
  const toolId = searchParams.get("tool");

  const { postActions, booleanStatus, postData } = usePostAJob();
  const { data: customerAndToolInfo, isFetching: isCustomerAndToolFetching } =
    useGetToolRentalListingWithId(2, Number(toolId));

  console.log("customerAndToolInfo ", customerAndToolInfo);

  const orderDetails = {
    productName: "Rainfall Artwork Tee",
    productPrice: "$36.00",
    productDescription:
      "A foreboding archway leads outside. Heavy rains descend upon the earth. Your destiny awaits. Hold up, are we still talking about t-shirts?",
    deliveryAddress: {
      name: "Floyd Miles",
      address: "7363 Cynthia Pass",
      city: "Toronto, ON",
      postalCode: "N3Y 4H8",
    },
    shippingUpdates: {
      email: "f•••@example.com",
      phone: "1••••••••40",
    },
    shippedDate: "March 23, 2021",
    billingAddress: {
      name: "Floyd Miles",
      address: "7363 Cynthia Pass",
      city: "Toronto, ON",
      postalCode: "N3Y 4H8",
    },
    paymentInfo: {
      cardType: "VISA",
      lastFour: "4242",
      expiryDate: "02/24",
    },
    pricing: {
      subtotal: 72,
      shipping: 5,
      tax: 6.16,
      total: 83.16,
    },
  };

  if (customerAndToolInfo?.toolRentalListing === undefined) return null;

  return (
    <>
      <MainTitle title={"1. Setup 2. Review 3. Confirmation"} />

      <div className="mt-4">
        <DateAndTimeInputs rentToolsAction={rentToolsAction} />
      </div>

      <div className="p-6 bg-white shadow-md rounded-md">
        <div className="flex">
          <div className="w-1/3">
            <img
              src={`${
                customerAndToolInfo?.toolRentalListing?.imageUrls !== undefined
                  ? customerAndToolInfo?.toolRentalListing?.imageUrls[0]
                  : DIYToolsImage
              }`}
              alt={customerAndToolInfo.toolRentalListing.toolName}
              className="rounded-md h-68"
            />
          </div>

          <div className="w-2/3 pl-4">
            <h2 className="text-xl font-semibold">
              {customerAndToolInfo?.toolRentalListing?.toolName}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Brand: {customerAndToolInfo.toolRentalListing.toolBrand} -
              Category: {customerAndToolInfo.toolRentalListing.toolCategory}
            </p>
            <h2 className="mt-2">
              <span className="text-purple-900 font-bold">
                ${customerAndToolInfo.toolRentalListing.pricePerDay}
              </span>{" "}
              (Per Day)
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {customerAndToolInfo.toolRentalListing.description}
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Pickup Date/Time</h3>
                <p className="text-sm text-gray-600">
                  {rentToolsAction.fromDate}
                  <br />
                  {rentToolsAction.fromTime}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Dropoff Date/Time</h3>
                <p className="text-sm text-gray-600">
                  {rentToolsAction.untilDate}
                  <br />
                  {rentToolsAction.untilTime}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Tool Rental Days</h3>
                <p className="text-sm text-gray-600">
                  {calculateRentalDays(
                    rentToolsAction.fromDate,
                    rentToolsAction.fromTime,
                    rentToolsAction.untilDate,
                    rentToolsAction.untilTime
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Pickup Address</h3>
                {customerAndToolInfo.toolRentalListing.toolCountry ===
                  "United States" ||
                customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
                customerAndToolInfo.toolRentalListing.toolCountry ===
                  "Canada" ? (
                  <p className="text-sm text-gray-600">
                    Egeton During
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolAddress}
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolCity},{" "}
                    {customerAndToolInfo.toolRentalListing.toolZipcode}
                    {customerAndToolInfo.toolRentalListing.toolState},{" "}
                    {customerAndToolInfo.toolRentalListing.toolCountry}.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Egeton During
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolAddress}
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolCity},{" "}
                    {customerAndToolInfo.toolRentalListing.toolCountry}.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Dropoff Address</h3>
                {customerAndToolInfo.toolRentalListing.toolCountry ===
                  "United States" ||
                customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
                customerAndToolInfo.toolRentalListing.toolCountry ===
                  "Canada" ? (
                  <p className="text-sm text-gray-600">
                    Egeton During
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolAddress}
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolCity},{" "}
                    {customerAndToolInfo.toolRentalListing.toolZipcode}
                    {customerAndToolInfo.toolRentalListing.toolState},{" "}
                    {customerAndToolInfo.toolRentalListing.toolCountry}.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    Egeton During
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolAddress}
                    <br />
                    {customerAndToolInfo.toolRentalListing.toolCity},{" "}
                    {customerAndToolInfo.toolRentalListing.toolCountry}.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Tool Provider Contaacts
                </h3>
                <p className="text-sm text-gray-600">
                  Email: egertonduring@yahoo.com
                  <br />
                  Phone: 5713301230
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Shipped on {orderDetails.shippedDate}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-purple-600 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Order placed</span>
                <span>Processing</span>
                <span>Shipped</span>
                <span>Delivered</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Customer Address</h3>
                {customerAndToolInfo.toolRentalListing.toolCountry ===
                  "United States" ||
                customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
                customerAndToolInfo.toolRentalListing.toolCountry ===
                  "Canada" ? (
                  <p className="text-sm text-gray-600">
                    {customerAndToolInfo.customer?.firstName}{" "}
                    {customerAndToolInfo.customer?.lastName}
                    <br />
                    {customerAndToolInfo.customer?.address}
                    <br />
                    {customerAndToolInfo.customer?.city},{" "}
                    {customerAndToolInfo.customer?.zip}
                    {customerAndToolInfo.customer?.state},{" "}
                    {customerAndToolInfo.customer?.country}.
                  </p>
                ) : (
                  <p className="text-sm text-gray-600">
                    {customerAndToolInfo.customer?.firstName}{" "}
                    {customerAndToolInfo.customer?.lastName}
                    <br />
                    {customerAndToolInfo.customer?.address}
                    <br />
                    {customerAndToolInfo.customer?.city},{" "}
                    {customerAndToolInfo.customer?.country}.
                  </p>
                )}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold">
                  Customer Billing address
                </h3>
                <p className="text-sm text-gray-600">
                  {customerAndToolInfo.toolRentalListing.toolCountry ===
                    "United States" ||
                  customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
                  customerAndToolInfo.toolRentalListing.toolCountry ===
                    "Canada" ? (
                    <p className="text-sm text-gray-600">
                      {customerAndToolInfo.customer?.firstName}{" "}
                      {customerAndToolInfo.customer?.lastName}
                      <br />
                      {customerAndToolInfo.customer?.address}
                      <br />
                      {customerAndToolInfo.customer?.city},{" "}
                      {customerAndToolInfo.customer?.zip}
                      {customerAndToolInfo.customer?.state},{" "}
                      {customerAndToolInfo.customer?.country}.
                    </p>
                  ) : (
                    <p className="text-sm text-gray-600">
                      {customerAndToolInfo.customer?.firstName}{" "}
                      {customerAndToolInfo.customer?.lastName}
                      <br />
                      {customerAndToolInfo.customer?.address}
                      <br />
                      {customerAndToolInfo.customer?.city},{" "}
                      {customerAndToolInfo.customer?.country}.
                    </p>
                  )}
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">
                  Customer Payment information
                </h3>
                <p className="text-sm text-gray-600">
                  {orderDetails.paymentInfo.cardType} Ending with{" "}
                  {orderDetails.paymentInfo.lastFour}
                  <br />
                  Expires {orderDetails.paymentInfo.expiryDate}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>
              $
              {(customerAndToolInfo.toolRentalListing.pricePerDay * 5).toFixed(
                2
              )}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>
              ${" "}
              {(
                customerAndToolInfo.toolRentalListing.pricePerDay * 5 +
                5
              ).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-sm font-bold">
            <span>Rental total</span>
            <span>
              $
              {(
                customerAndToolInfo.toolRentalListing.pricePerDay * 5 +
                5
              ).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

function calculateRentalDays(
  pickupDate: string,
  pickupTime: string,
  dropoffDate: string,
  dropoffTime: string
): number | string {
  try {
    // Parse the pickup and dropoff DateTime strings
    const pickupDateTime = new Date(
      `${pickupDate} ${convertTo24HourTime(pickupTime)}`
    );
    const dropoffDateTime = new Date(
      `${dropoffDate} ${convertTo24HourTime(dropoffTime)}`
    );

    // Check for invalid dates
    if (isNaN(pickupDateTime.getTime()) || isNaN(dropoffDateTime.getTime())) {
      return "Invalid date/time. Please adjust the date/time to calculate rental days.";
    }

    // Ensure dropoff is after pickup
    if (dropoffDateTime <= pickupDateTime) {
      return "Dropoff date/time must be after pickup date/time.";
    }

    // Calculate the time difference in milliseconds
    const timeDifference = dropoffDateTime.getTime() - pickupDateTime.getTime();

    // Convert the time difference to days
    const days = timeDifference / (1000 * 60 * 60 * 24);

    // Round up to the next whole number
    return Math.ceil(days);
  } catch (error) {
    return "An error occurred. Please ensure the date/time format is correct.";
  }
}

// Helper function to convert 12-hour time to 24-hour time
function convertTo24HourTime(time: string): string {
  const [timePart, meridian] = time.split(" ");
  let [hours, minutes] = timePart.split(":").map(Number);

  if (meridian === "PM" && hours !== 12) {
    hours += 12;
  } else if (meridian === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}
