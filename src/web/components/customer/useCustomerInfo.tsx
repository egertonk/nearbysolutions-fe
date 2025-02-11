import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCustomerWithId } from "../../utils/fetchEndpoints";
import { RootState } from "../../../store";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { orderStates } from "../../../store/defualtStates";
import { setPostAJobDetails } from "../../../store/postAJobSlice";

export const useCustomerInfo = (
  isGiftASolution: boolean,
  id: number,
  isPostAJob?: boolean | false
) => {
  const dispatch = useDispatch();

  const states = useSelector((state: RootState) => state);
  const customerOrder = states.formData.customerOrder;
  const postAJobOrder = states.postAJobFormDetailsState.postAJobFormDetailsData;
  const { data: customerInfo, isFetching: isCustomerFetching } =
    useGetCustomerWithId(id); // comes from login

  useEffect(() => {
    if (customerInfo && isCustomerFetching === false) {
      const address =
        customerInfo.customerAddress.find((data) => data.permanent) ??
        orderStates.customerAddress;
      const customerFullInfo =
        customerInfo.customerInformation ?? orderStates.customerInfo;

      const updatedCustomerFormData = {
        ...customerOrder,
        customerInfo: customerFullInfo,
        customerAddress: address,
        giftStatus: isGiftASolution,
      };

      if (isPostAJob) {
        const updatedPostAJobFormData = {
          ...postAJobOrder,
          jobName: "",
          jobTask: "",
          jobPrice: "",
          jobZip: address?.postalCode || "",
          jobCityLocation: address?.city || "",
          jobDate: "",
          time: "",
          email: customerOrder.customerInfo?.email || "",
          jobCountry: address?.country || "",
          jobState: address?.state || "",
          urgencyLevel: "",
          phoneNumber: customerFullInfo?.phoneNumber || "",
          customerName: `${customerFullInfo?.firstName || ""} ${
            customerFullInfo?.lastName || ""
          }`.trim(),
          jobAddress: address.street || "",
        };

        dispatch(setPostAJobDetails(updatedPostAJobFormData));
      }
      dispatch(setCustomerOrder(updatedCustomerFormData));
    }
  }, [isCustomerFetching, isGiftASolution]);

  return {
    customerInfo,
    customerOrder,
  };
};
