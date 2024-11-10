import { useEffect, useState } from "react";
import { CustomerFormData } from "./types/OrderSolutionTypes";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerOrder } from "../../store/customerContractorSlice";
import { RootState } from "../../store";
import { DateSelection } from "./types/CalenderTypes";
import { useCalender } from "./useCalender";
import { orderStates } from "../../store/defualtStates";
import {
  JobTitleTypes,
  SolutionistTypes,
} from "../components/all-types/solutionistTypes";

export const useCustomerPersonalInfoForm = (
  userSelectedTime?: string,
  formattedDate?: string,
  userSelectedDate?: DateSelection,
  jobDetails?: JobTitleTypes | undefined,
  solutionistDeatils?: SolutionistTypes
) => {
  const { today } = useCalender();
  const dispatch = useDispatch();
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const priceWithoutDiscount = jobDetails?.isFixPrice
    ? jobDetails.fixPrice
    : jobDetails?.ratePerHour || 0;

  const discountGiven = jobDetails?.isFixPrice
    ? jobDetails.discount
    : jobDetails?.discount || 0;

  const [formData, setFormData] = useState<CustomerFormData>(orderStates);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    // if (id === "selectedTalent" && setSelectedTalent) {
    //   setSelectedTalent(value);
    // }
  };

  const updateSolutionDetails = (id: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${id}`]: value,
    }));
  };
  console.log("customerOrder22222222 = ", customerOrder);
  useEffect(() => {
    console.log("solutionist1111111111 = ", solutionistDeatils);
    const orderData = {
      orderID: customerOrder.orderID,
      customerInfo: {
        customerID: customerOrder.customerInfo.customerID || 0, // we can generated it later and it should never be null
        firstName: customerOrder.customerInfo.firstName || "",
        lastName: customerOrder.customerInfo.lastName || "",
        country: customerOrder.customerInfo.country || "",
        address: customerOrder.customerInfo.address || "",
        city: customerOrder.customerInfo.city || "",
        state: customerOrder.customerInfo.state || "",
        zip: customerOrder.customerInfo.zip || "",
        phoneNumber: customerOrder.customerInfo.phoneNumber || "5713301230",
        email: customerOrder.customerInfo.email || "",
      },
      solutionDateContract: {
        solutionDate:
          customerOrder.solutionDateContract.solutionDate ||
          `${userSelectedDate?.month}/${userSelectedDate?.day}/${userSelectedDate?.year}` ||
          "",
        longTermContract:
          customerOrder.solutionDateContract.longTermContract || "",
        longTermstartDate:
          customerOrder.solutionDateContract.longTermstartDate || "",
        longTermEndDate:
          customerOrder.solutionDateContract.longTermEndDate || "",
        solutionFormattedDate:
          customerOrder.solutionDateContract.solutionFormattedDate ||
          formattedDate ||
          "",
        solutionStartTime:
          userSelectedTime ||
          customerOrder.solutionDateContract.solutionStartTime ||
          "",
      },

      solutionTask: customerOrder.solutionTask || "",
      solutionJob: jobDetails?.title || customerOrder.solutionJob || "",
      selectedTalent: jobDetails?.title || "",
      talentID: solutionistDeatils?.talent?.solutionist.id || 0, // it should never be null
      talentFirstName: solutionistDeatils?.talent?.solutionist.firstName || "",
      talentLastName: solutionistDeatils?.talent?.solutionist?.lastName || "",
      solutionPrice:
        (jobDetails?.isFixPrice
          ? jobDetails.fixPrice
          : jobDetails?.ratePerHour) || 0,
      fixPriceStatus:
        jobDetails?.isFixPrice ?? (customerOrder.fixPriceStatus || false),
      solutionPriceDiscountPercentage:
        customerOrder.solutionPriceDiscountPercentage || discountGiven,
      orderDate: `${today}`,
      orderStatus: customerOrder.orderStatus || false,
      giftStatus: customerOrder.giftStatus || false,
      giftFor_fullName: customerOrder.giftFor_fullName || "",
    };
    console.log("orderData1111111 = ", orderData);
    dispatch(setCustomerOrder(orderData));
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    updateSolutionDetails,
  };
};
