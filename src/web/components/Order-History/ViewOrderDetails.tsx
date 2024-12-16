import React from "react";
import DIYToolsImage from "../../assets/images/DIY-Tools-Renting.jpeg";
import { RentalOrderHistory } from "../../lib/types/DIYToolsListings copy";
import { useToolsRentalHistoryByOrderId } from "../../utils/fetchEndpoints";
import { useLocation } from "react-router";
import { MainTitle } from "../common-sections/MainTitle";
import { getOrderStatusClass } from "./OrderList";

export const ViewOrderDetails: React.FC = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("id");
  const { data } = useToolsRentalHistoryByOrderId(Number(orderId)); //use customer in after login in

  const orderDetails = data !== undefined ? data : ({} as RentalOrderHistory);

  console.log("orderDetailss ", orderDetails);

  return (
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
      <MainTitle title={`Order #${orderDetails?.id} Details `} />

      <div className="p-6 mt-5 bg-gray-50 shadow-lg rounded-lg">
        <div className="sm:flex">
          <div className="sm:w-1/3">
            <img
              src={`${
                orderDetails !== undefined ? orderDetails.image : DIYToolsImage
              }`}
              alt={orderDetails.toolName}
              className="rounded-md h-68"
            />
          </div>

          <div className="sm:w-2/3 pl-4">
            <h2 className="text-xl font-semibold mb-2">
              {orderDetails.toolName}
            </h2>

            <span
              className={`inline-block px-3 py-1 rounded text-md font-medium ${getOrderStatusClass(
                orderDetails.orderStatus
              )}`}
            >
              {orderDetails.orderStatus}
            </span>

            <p className="text-md text-gray-600 mt-2">
              Brand: {orderDetails.toolBrand} - Category:{" "}
              {orderDetails.toolCategory}
            </p>
            <h2 className="mt-2">
              <span className="text-purple-900 font-bold">
                ${orderDetails.toolPricePerDay}
              </span>{" "}
              (Per Day)
            </h2>
            <p className="text-md text-gray-600 mt-2">
              {orderDetails.description}
            </p>

            <div className="grid grid-cols-3 gap-4 displayBlock">
              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Owner Info</h3>
                <p className="text-md text-gray-600">
                  Name: {orderDetails.ownerFullName}
                  <br />
                  Email: {orderDetails.ownerEmail}
                  <br />
                  Phone: {orderDetails.ownerPhoneNumber}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Renter Contacts</h3>
                <p className="text-md text-gray-600">
                  Name: {orderDetails.renterFullName}
                  <br />
                  Phone: {orderDetails.renterPhoneNumber}
                  <br />
                  Email: {orderDetails.renterEmail}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Renter Address</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.dropoffAddressCountry === "United States" ||
                  orderDetails.dropoffAddressCountry === "USA" ||
                  orderDetails.dropoffAddressCountry === "Canada" ? (
                    <p className="text-md text-gray-600">
                      {orderDetails.renterAddressStreet}
                      <br />
                      {orderDetails.renterAddressCity},{" "}
                      {orderDetails.renterZipCode}{" "}
                      {orderDetails.renterAddressState},{" "}
                      {orderDetails.renterAddressCountry}.
                    </p>
                  ) : (
                    <p className="text-md text-gray-600">
                      {orderDetails.renterAddressStreet} <br />
                      {orderDetails.renterAddressCity},{" "}
                      {orderDetails.renterAddressCountry}.
                    </p>
                  )}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 displayBlock">
              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Pickup Date/Time</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.fromDate}
                  <br />
                  {orderDetails.fromTime}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Dropoff Date/Time</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.untilDate}
                  <br />
                  {orderDetails.untilTime}
                </p>
              </div>

              <div className="mt-4">
                <h3 className={`text-lg font-semibold`}>Tool Rental Days</h3>
                <p className="text-md text-gray-600">
                  {orderDetails.toolRentalDays}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 displayBlock">
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Pickup Address</h3>
                {orderDetails.dropoffAddressCountry === "United States" ||
                orderDetails.dropoffAddressCountry === "USA" ||
                orderDetails.dropoffAddressCountry === "Canada" ? (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.ownerFullName}
                    <br />
                    {orderDetails.pickupAddressStreet}
                    <br />
                    {orderDetails.pickupAddressCity}, {orderDetails.toolZipcode}
                    {orderDetails.pickupAddressState},{" "}
                    {orderDetails.dropoffAddressCountry}.
                  </p>
                ) : (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.ownerFullName}
                    <br />
                    {orderDetails.pickupAddressStreet}
                    <br />
                    {orderDetails.pickupAddressCity},{" "}
                    {orderDetails.dropoffAddressCountry}.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Dropoff Address</h3>
                {orderDetails.dropoffAddressCountry === "United States" ||
                orderDetails.dropoffAddressCountry === "USA" ||
                orderDetails.dropoffAddressCountry === "Canada" ? (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.ownerFullName}
                    <br />
                    {orderDetails.dropoffAddressStreet}
                    <br />
                    {orderDetails.dropoffAddressCity},{" "}
                    {orderDetails.toolZipcode}
                    {orderDetails.dropoffAddressState},{" "}
                    {orderDetails.dropoffAddressCountry}.
                  </p>
                ) : (
                  <p className="text-md text-gray-600">
                    Owner Name: {orderDetails.ownerFullName}
                    <br />
                    {orderDetails.dropoffAddressStreet}
                    <br />
                    {orderDetails.dropoffAddressCity},{" "}
                    {orderDetails.dropoffAddressCountry}.
                  </p>
                )}
              </div>

              <div className="mt-4">
                <h3 className="text-lg font-semibold">Payment Info</h3>
                <p className="text-md text-gray-600 text-wrap">
                  Card Ends: xxxx{orderDetails.last4Digits}
                  <br />
                  Payment Method: {orderDetails.paymentMethod}
                  <br />
                  Payment Status: {orderDetails.paymentStatus}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="bg-purple-600 h-2.5 rounded-full" />
            </div>

            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-md">
                <span>Subtotal</span>
                <span>${orderDetails.toolSubtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-md">
                <span>Tax</span>
                <span>$ {orderDetails.toolTax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-md font-bold">
                <span>Rental total</span>
                <span>${orderDetails.toolTotal?.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
