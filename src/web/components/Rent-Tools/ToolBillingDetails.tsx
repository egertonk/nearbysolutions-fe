import React from "react";
import { ToolAndCustomerTypes } from "../../lib/types/DIYToolsListings";

type Props = {
  customerAndToolInfo: ToolAndCustomerTypes;
};

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
}; // pass in

export const ToolBillingDetails: React.FC<Props> = ({
  customerAndToolInfo,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 displayBlock">
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Customer Address</h3>
        {customerAndToolInfo.toolRentalListing.toolCountry ===
          "United States" ||
        customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
        customerAndToolInfo.toolRentalListing.toolCountry === "Canada" ? (
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
        <h3 className="text-lg font-semibold">Customer Billing address</h3>
        <p className="text-sm text-gray-600">
          {customerAndToolInfo.toolRentalListing.toolCountry ===
            "United States" ||
          customerAndToolInfo.toolRentalListing.toolCountry === "USA" ||
          customerAndToolInfo.toolRentalListing.toolCountry === "Canada" ? (
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
        <h3 className="text-lg font-semibold">Customer Payment information</h3>
        <p className="text-sm text-gray-600">
          {orderDetails.paymentInfo.cardType} Ending with{" "}
          {orderDetails.paymentInfo.lastFour}
          <br />
          Expires {orderDetails.paymentInfo.expiryDate}
        </p>
      </div>
    </div>
  );
};
