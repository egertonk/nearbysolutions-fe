import { useEffect, useState } from "react";
import { CustomerFormData, TalentInformation } from "./types/orderTypes";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerOrder } from "../../store/customerContractorSlice";
import { RootState } from "../../store";
import { DateSelection } from "./types/calenderTypes";
import { useCalender } from "./useCalender";

export const useCustomerPersonalInfoForm = (
  talent?: TalentInformation | undefined,
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
  selectedTalent?: string,
  setSelectedTalent?: (value: React.SetStateAction<string>) => void,
  userSelectedTime?: string,
  formattedDate?: string,
  userSelectedDate?: DateSelection
) => {
  const { today } = useCalender();
  const dispatch = useDispatch();
  const customerState = useSelector((state: RootState) => state);

  const priceWithoutDiscount = jobDetails?.isFixPrice
    ? jobDetails.price.fixPrice
    : jobDetails?.price.ratePerHour || 0;

  const discountGiven = jobDetails?.isFixPrice
    ? jobDetails.price.discount
    : jobDetails?.price.discount || 0;

  const [formData, setFormData] = useState<CustomerFormData>({
    orderID: customerState.formData.customerOrder.orderID,
    customerID: customerState.formData.customerOrder.customerID || 0, // we can generated it later and it should never be null
    firstName: customerState.formData.customerOrder.firstName || "",
    lastName: customerState.formData.customerOrder.lastName || "",
    country: customerState.formData.customerOrder.country || "",
    address: customerState.formData.customerOrder.address || "",
    city: customerState.formData.customerOrder.city || "",
    state: customerState.formData.customerOrder.state || "",
    zip: customerState.formData.customerOrder.zip || "",
    phoneNumber:
      customerState.formData.customerOrder.phoneNumber || "5713301230",
    solutionFormattedDate:
      customerState.formData.customerOrder.solutionFormattedDate ||
      formattedDate ||
      "",
    solutionDate:
      `${userSelectedDate?.month}/${userSelectedDate?.day}/${userSelectedDate?.year}` ||
      customerState.formData.customerOrder.solutionDate ||
      "",
    solutionTask: customerState.formData.customerOrder.solutionTask || "",
    solutionJob:
      jobDetails?.title ||
      customerState.formData.customerOrder.solutionJob ||
      "",
    solutionStartTime:
      userSelectedTime ||
      customerState.formData.customerOrder.solutionStartTime ||
      "",
    selectedTalent:
      selectedTalent ||
      customerState.formData.customerOrder.selectedTalent ||
      "",
    talentID:
      talent?.talentID || customerState.formData.customerOrder.talentID || 0, // it should never be null
    talentFirstName:
      talent?.firstName ||
      customerState.formData.customerOrder.talentFirstName ||
      "",
    talentLastName:
      talent?.lastName ||
      customerState.formData.customerOrder.talentLastName ||
      "",
    solutionPrice:
      customerState.formData.customerOrder.solutionPrice ||
      priceWithoutDiscount,
    solutionPricePerHourStatus:
      jobDetails?.isFixPrice ??
      (customerState.formData.customerOrder.solutionPricePerHourStatus ||
        false),
    solutionPriceDiscountPercentage:
      customerState.formData.customerOrder.solutionPriceDiscountPercentage ||
      discountGiven,
    orderDate: `${today}`,
    orderStatus: customerState.formData.customerOrder.orderStatus || false,
  });

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
    dispatch(setCustomerOrder(formData));
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    updateSolutionDetails,
  };
};
