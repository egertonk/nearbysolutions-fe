import { useState } from "react";
import { CustomerFormData, TalentInformation } from "./types/orderTypes";
import { DateSelection } from "./types/calenderTypes";

export const useCustomerPersonalInfoForm = (
  talent: TalentInformation | undefined,
  jobDetails:
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
  selectedTalent: string,
  setSelectedTalent: (value: React.SetStateAction<string>) => void,
  userSelectedDate: DateSelection | undefined,
  userSelectedTime: string,
  formattedDate: string
) => {
  const priceWithoutDiscount = jobDetails?.isFixPrice
    ? jobDetails.price.fixPrice
    : jobDetails?.price.ratePerHour || 0;

  const discountGiven = jobDetails?.isFixPrice
    ? jobDetails.price.discount
    : jobDetails?.price.discount || 0;

  const [formData, setFormData] = useState<CustomerFormData>({
    customerID: "???????", // we can generated it later and it should never be null
    firstName: "",
    lastName: "",
    country: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phoneNumber: "5713301230",
    solutionFormattedDate: formattedDate || "",
    solutionDate:
      userSelectedDate !== undefined
        ? `${userSelectedDate?.day}/${userSelectedDate?.month}/${userSelectedDate?.year}`
        : "",
    solutionTask: "",
    solutionJob: jobDetails?.title || "",
    solutionStartTime: userSelectedTime || "",
    selectedTalent: selectedTalent,
    talentID: talent?.talentID || 0, // it should never be null
    talentFirstName: talent?.firstName || "",
    talentLastName: talent?.lastName || "",
    solutionPrice: priceWithoutDiscount,
    solutionPricePerHourStatus: jobDetails?.isFixPrice ?? false,
    solutionPriceDiscountPercentage: discountGiven,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
    if (id === "selectedTalent") {
      setSelectedTalent(value);
    }
  };

  const updateSolutionDetails = (id: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${id}`]: value,
    }));
  };

  return {
    formData,
    setFormData,
    handleChange,
    updateSolutionDetails,
  };
};
