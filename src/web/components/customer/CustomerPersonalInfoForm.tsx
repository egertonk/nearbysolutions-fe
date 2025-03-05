import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { customerAddressFields, customerPersonalFields, giftInfoFields } from ".";
import { useGetCountries } from "../../utils/fetchEndpoints";
import { CustomerForm } from "./CustomerForm";
import { GiftForm } from "./GiftForm";

export const CustomerPersonalInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const { data: coutries } = useGetCountries();

  const states = useSelector((state: RootState) => state);
  const [contractLength, setContractLength] = useState<number>(0);
  const customerOrder = states.formData.customerOrder;

  const startDate = new Date(
    customerOrder.solutionDateContract.solutionFormattedDate
  );

  const validCountries = useMemo(() => {
    if (coutries)
      return coutries?.filter(
        (country) => country?.featureFlag && country?.turnOff === null
      );
    return [];
  }, [coutries]);

  const validGiftCountries = useMemo(() => {
    if (coutries) return coutries?.filter((country) => country?.featureFlag);
    return [];
  }, [coutries]);

  const updateCustomerInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      customerAddressFields.includes(
        name as
          | "addressLine2"
          | "addressType"
          | "city"
          | "country"
          | "postalCode"
          | "region"
          | "state"
          | "street"
      )
    ) {
      const updatedCustomerFormData = {
        ...customerOrder,
        customerAddress: {
          ...customerOrder.customerAddress,
          [name]: value,
        },
      };

      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
    if (
      customerPersonalFields.includes(
        name as "firstName" | "lastName" | "email" | "phoneNumber"
      )
    ) {
      const updatedCustomerFormData = {
        ...customerOrder,
        customerInfo: {
          ...customerOrder.customerInfo,
          [name]: value,
        },
      };

      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
  };

  const updateGiftInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, id } = e.target;
    const fieldName = id.split(".")[1];
    const updatedFieldName = id === "state" ? id : fieldName;

    if (giftInfoFields.includes(updatedFieldName)) {
      const updatedCustomerFormData = {
        ...customerOrder,
        giftInformationFor: {
          ...customerOrder.giftInformationFor,
          [updatedFieldName]: value,
        },
      };

      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
  };

  return (
    <>
      <CustomerForm
        customerOrder={customerOrder}
        updateCustomerInfo={updateCustomerInfo}
        validCountries={validCountries}
        startDate={startDate}
        setContractLength={setContractLength}
        contractLength={contractLength}
      />

      {customerOrder.giftStatus && (
        <GiftForm
          customerOrder={customerOrder}
          updateGiftInfo={updateGiftInfo}
          validGiftCountries={validGiftCountries}
        />
      )}
    </>
  );
};
