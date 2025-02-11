import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Address } from "../common-sections/Address";

export const PaymentCustomerDetails: React.FC = () => {
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  return (
    <div className="flex-1 px-3">
      <div
        className="p-12 rounded-lg border-gray-200"
        style={{ boxShadow: "0 10px 28px rgba(0,0,0,.08)" }}
      >
        <>
          <p className="text-xl font-semibold">Customer Details</p>
          <div className="text-left mt-5">
            <h3 className="font-semibold">Name</h3>
            <span>
              {customerOrder.customerInfo.firstName}{" "}
              {customerOrder.customerInfo.lastName}
            </span>
          </div>

          <div className="text-left mt-3">
            <h3 className="font-semibold">Phone</h3>
            <span>{customerOrder.customerInfo.phoneNumber}</span>
          </div>

          <div className="text-left mt-3">
            <h3 className="font-semibold">Email</h3>
            <span>{customerOrder.customerInfo.email}</span>
          </div>

          <div className="text-left mt-3">
            <h3 className="font-semibold">Address</h3>
            <Address
              country={customerOrder.customerAddress.country ?? ""}
              address={customerOrder.customerAddress.street ?? ""}
              city={customerOrder.customerAddress.city ?? ""}
              state={customerOrder.customerAddress.state ?? ""}
              zip={customerOrder.customerAddress.postalCode ?? ""}
            />
          </div>
        </>
      </div>
    </div>
  );
};
