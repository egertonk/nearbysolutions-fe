import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useGetCustomerWithId } from "../../utils/fetchEndpoints";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { setCustomerDetails } from "../../../store/customerDetailsSlice";

export const useCustomerInfo = (isGiftASolution: boolean, id: number) => {
  const dispatch = useDispatch();

  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;
  const { data: customerInfo, isFetching: isCustomerFetching } =
    useGetCustomerWithId(id); // comes from login

  useEffect(() => {
    if (customerInfo && isCustomerFetching === false) {
      dispatch(setCustomerDetails(customerInfo));

      const updatedCustomerFormData = {
        ...customerOrder,
        customerInfo: {
          customerID: customerInfo.customerId,
          firstName: customerInfo.firstName || "",
          lastName: customerInfo.lastName || "",
          country: customerInfo.country || "",
          address: customerInfo.address || "",
          city: customerInfo.city || "",
          state: customerInfo.state || "",
          zip: customerInfo.zip || "",
          phoneNumber: customerInfo.phoneNumber || "",
          email: customerInfo.email || "",
        },
        giftStatus: isGiftASolution,
      };
      console.info(updatedCustomerFormData);
      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
  }, [isCustomerFetching, isGiftASolution]);

  return {
    customerInfo,
  };
};
