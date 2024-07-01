import { useEffect, useState } from "react";
import {
  CustomerFormData,
  TalentInformation,
} from "./types/OrderSolutionTypes";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerOrder } from "../../store/customerContractorSlice";
import { RootState } from "../../store";
import { DateSelection } from "./types/CalenderTypes";
import { useCalender } from "./useCalender";
import { orderStates } from "../../store/defualtStates";

export const useCustomerPersonalInfoForm = (
  selectedTalent?: string,
  userSelectedTime?: string,
  formattedDate?: string,
  userSelectedDate?: DateSelection,
  setSelectedTalent?: (value: React.SetStateAction<string>) => void,
  jobDetails?:
    | {
        isFixPrice: boolean;
        selectedStatus: boolean;
        title: string;
        price: {
          fixPrice: number;
          ratePerHour: number;
          discount: number;
        };
      }
    | undefined,
  talent?: TalentInformation | undefined
) => {
  const { today } = useCalender();
  const dispatch = useDispatch();
  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const priceWithoutDiscount = jobDetails?.isFixPrice
    ? jobDetails.price.fixPrice
    : jobDetails?.price.ratePerHour || 0;

  const discountGiven = jobDetails?.isFixPrice
    ? jobDetails.price.discount
    : jobDetails?.price.discount || 0;

  const [formData, setFormData] = useState<CustomerFormData>(orderStates);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    if (id === "selectedTalent" && setSelectedTalent) {
      setSelectedTalent(value);
    }
  };

  const updateSolutionDetails = (id: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${id}`]: value,
    }));
  };

  useEffect(() => {
    dispatch(
      setCustomerOrder({
        orderID: customerOrder.orderID,
        customerID: customerOrder.customerID || 0, // we can generated it later and it should never be null
        firstName: customerOrder.firstName || "",
        lastName: customerOrder.lastName || "",
        country: customerOrder.country || "",
        address: customerOrder.address || "",
        city: customerOrder.city || "",
        state: customerOrder.state || "",
        zip: customerOrder.zip || "",
        phoneNumber: customerOrder.phoneNumber || "5713301230",
        email: customerOrder.email || "",
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
        },

        solutionTask: customerOrder.solutionTask || "",
        solutionJob: jobDetails?.title || customerOrder.solutionJob || "",
        solutionStartTime:
          userSelectedTime || customerOrder.solutionStartTime || "",
        selectedTalent: selectedTalent || customerOrder.selectedTalent || "",
        talentID: talent?.talentID || customerOrder.talentID || 0, // it should never be null
        talentFirstName:
          talent?.firstName || customerOrder.talentFirstName || "",
        talentLastName: talent?.lastName || customerOrder.talentLastName || "",
        solutionPrice: customerOrder.solutionPrice || priceWithoutDiscount,
        solutionPricePerHourStatus:
          jobDetails?.isFixPrice ??
          (customerOrder.solutionPricePerHourStatus || false),
        solutionPriceDiscountPercentage:
          customerOrder.solutionPriceDiscountPercentage || discountGiven,
        orderDate: `${today}`,
        orderStatus: customerOrder.orderStatus || false,
        giftStatus: customerOrder.giftStatus || false,
        giftFor_fullName: customerOrder.giftFor_fullName || "",
      })
    );
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    updateSolutionDetails,
  };
};
