import React from "react";
import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { FullPaymentDetailsDTO } from "../../lib/types/DIYToolsListings copy";
import {
  useJobPostingByJobId,
  useToolsRentalHistoryByOrderId,
} from "../../utils/fetchEndpoints";
import { useLocation } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";
import { getOrderStatusClass } from "./RentalToolsOrderHistory";
import { FullJobPostingDetails } from "../../lib/types/FindWorkPostAJobtypesData";

export const JobRequestsOrderHistoryDetails: React.FC = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get("jobId");
  const { data: jobOrderDetails } = useJobPostingByJobId(Number(jobId));
  console.log("jobId = ", jobId);
  console.log("jobOrderDetails = ", jobOrderDetails);
  const orderDetails = (
    jobOrderDetails !== undefined ? jobOrderDetails : {}
  ) as FullJobPostingDetails;

  console.log("orderDetailss ", orderDetails);
  if (
    orderDetails.paymentDetails === undefined ||
    orderDetails.jobPosting === undefined
  )
    return null;

  return (
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <MainTitle title={`Order #${orderDetails?.jobPosting?.id} Details `} />
      dddddddddddddd
      <div className="p-6 mt-5 bg-gray-50 shadow-lg rounded-lg">
        <div className="sm:flex">
          <div className="sm:w-1/3">
            <img
              src={`${
                orderDetails !== undefined
                  ? orderDetails?.jobPosting?.images[0] //Do Slider for multiple images
                  : DIYToolsImage
              }`}
              alt={orderDetails?.jobPosting?.jobName}
              className="rounded-md h-68"
            />
          </div>

          {/* <div className="sm:w-2/3 pl-4">
            <h2 className="text-xl font-semibold mb-2">
              {orderDetails?.jobPosting?.jobName}
            </h2>

            <span
              className={`inline-block px-3 py-1 rounded text-md font-medium ${getOrderStatusClass(
                orderDetails?.rentalDetails?.orderStatus
              )}`}
            >
              {orderDetails?.rentalDetails?.orderStatus}
            </span>

            <p className="text-md text-gray-600 mt-2">
              Brand: {orderDetails?.rentalDetails?.toolBrand} - Category:{" "}
              {orderDetails?.rentalDetails.toolCategory}
            </p>
            <h2 className="mt-2">
              <span className="text-purple-900 font-bold">
                ${orderDetails?.rentalDetails?.toolPricePerDay}
              </span>{" "}
              (Per Day)
            </h2>
            <p className="text-md text-gray-600 mt-2">
              {orderDetails?.rentalDetails?.description}
            </p>

            <div className="grid grid-cols-3 gap-4 displayBlock">
              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Owner Info</h3>
                <p className="text-md text-gray-600">
                  Name: {orderDetails.rentalDetails.ownerFullName}
                  <br />
                  Email: {orderDetails.rentalDetails.ownerEmail}
                  <br />
                  Phone: {orderDetails.rentalDetails.ownerPhoneNumber}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Renter Contacts</h3>
                <p className="text-md text-gray-600">
                  Name: {orderDetails.rentalDetails.renterFullName}
                  <br />
                  Phone: {orderDetails.rentalDetails.renterPhoneNumber}
                  <br />
                  Email: {orderDetails.rentalDetails.renterEmail}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Renter Address</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.rentalDetails.dropoffAddressCountry ===
                    "United States" ||
                  orderDetails.rentalDetails.dropoffAddressCountry === "USA" ||
                  orderDetails.rentalDetails.dropoffAddressCountry ===
                    "Canada" ? (
                    <p className="text-md text-gray-600">
                      {orderDetails.rentalDetails.renterAddressStreet}
                      <br />
                      {orderDetails.rentalDetails.renterAddressCity},{" "}
                      {orderDetails.rentalDetails.renterZipCode}{" "}
                      {orderDetails.rentalDetails.renterAddressState},{" "}
                      {orderDetails.rentalDetails.renterAddressCountry}.
                    </p>
                  ) : (
                    <p className="text-md text-gray-600">
                      {orderDetails.rentalDetails.renterAddressStreet} <br />
                      {orderDetails.rentalDetails.renterAddressCity},{" "}
                      {orderDetails.rentalDetails.renterAddressCountry}.
                    </p>
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 displayBlock">
              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Pickup Date/Time</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.rentalDetails.fromDate}
                  <br />
                  {orderDetails.rentalDetails.fromTime}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Dropoff Date/Time</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.rentalDetails.untilDate}
                  <br />
                  {orderDetails.rentalDetails.untilTime}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Tool Rental Days</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.rentalDetails.toolRentalDays}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 displayBlock">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Pickup Address</h3>
                {orderDetails.rentalDetails.dropoffAddressCountry ===
                  "United States" ||
                orderDetails.rentalDetails.dropoffAddressCountry === "USA" ||
                orderDetails.rentalDetails.dropoffAddressCountry ===
                  "Canada" ? (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.rentalDetails.ownerFullName}
                    <br />
                    {orderDetails.rentalDetails.pickupAddressStreet}
                    <br />
                    {orderDetails.rentalDetails.pickupAddressCity},{" "}
                    {orderDetails.rentalDetails.toolZipcode}
                    {orderDetails.rentalDetails.pickupAddressState},{" "}
                    {orderDetails.rentalDetails.dropoffAddressCountry}.
                  </p>
                ) : (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.rentalDetails.ownerFullName}
                    <br />
                    {orderDetails.rentalDetails.pickupAddressStreet}
                    <br />
                    {orderDetails.rentalDetails.pickupAddressCity},{" "}
                    {orderDetails.rentalDetails.dropoffAddressCountry}.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Dropoff Address</h3>
                {orderDetails.rentalDetails.dropoffAddressCountry ===
                  "United States" ||
                orderDetails.rentalDetails.dropoffAddressCountry === "USA" ||
                orderDetails.rentalDetails.dropoffAddressCountry ===
                  "Canada" ? (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.rentalDetails.ownerFullName}
                    <br />
                    {orderDetails.rentalDetails.dropoffAddressStreet}
                    <br />
                    {orderDetails.rentalDetails.dropoffAddressCity},{" "}
                    {orderDetails.rentalDetails.toolZipcode}
                    {orderDetails.rentalDetails.dropoffAddressState},{" "}
                    {orderDetails.rentalDetails.dropoffAddressCountry}.
                  </p>
                ) : (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.rentalDetails.ownerFullName}
                    <br />
                    {orderDetails.rentalDetails.dropoffAddressStreet}
                    <br />
                    {orderDetails.rentalDetails.dropoffAddressCity},{" "}
                    {orderDetails.rentalDetails.dropoffAddressCountry}.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Payment Info</h3>
                <p className="text-md text-gray-600 text-wrap">
                  Card Ends: xxxx{orderDetails.paymentDetails.cardNumberLast4}
                  <br />
                  Payment Method: {orderDetails.paymentDetails.paymentMethod}
                  <br />
                  Payment Status: {orderDetails.paymentDetails.paymentStatus}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-purple-600 h-2.5 rounded-full" />
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-md">
                <span>Rental Amount After Discount</span>
                <span>
                  $
                  {(
                    orderDetails.paymentDetails.amountDue -
                    orderDetails.paymentDetails.taxAmount
                  )?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-md">
                <span>Dicount Amount</span>
                <span>
                  -${orderDetails.rentalDetails.discountPrice?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-md">
                <span>Tax</span>
                <span>
                  $ {orderDetails.paymentDetails.taxAmount?.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-md font-bold">
                <span>Total Rental Paid</span>
                <span>
                  ${orderDetails.paymentDetails.amountDue?.toFixed(2)}
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
