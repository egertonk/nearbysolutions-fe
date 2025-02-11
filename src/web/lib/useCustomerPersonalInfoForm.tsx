import { useEffect, useState } from "react";
import { CustomerFormData } from "./types/OrderSolutionTypes";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerOrder } from "../../store/customerContractorSlice";
import { RootState } from "../../store";
import { useCalender } from "./useCalender";
import { orderStates } from "../../store/defualtStates";
import {
  JobTitleTypes,
  SolutionistResponseTypes,
} from "./types/solutionistTypes";
import { DateSelection } from "./types/CalenderTypes";

export const useCustomerPersonalInfoForm = (
  userSelectedTime?: string,
  formattedDate?: string,
  userSelectedDate?: DateSelection,
  jobDetails?: JobTitleTypes | undefined,
  solutionistDeatils?: SolutionistResponseTypes
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

  useEffect(() => {
    const orderData = {
      orderID: customerOrder.orderID,
      customerInfo: {
        id: customerOrder.customerInfo.id || -1,
        name: customerOrder.customerInfo.name || "",
        email: customerOrder.customerInfo.email || "",
        password: customerOrder.customerInfo.password || "",
        role: customerOrder.customerInfo.role || "",
        username: customerOrder.customerInfo.username || "",
        passwordHash: customerOrder.customerInfo.passwordHash || "",
        phoneNumber: customerOrder.customerInfo.phoneNumber || "",
        profilePicture: customerOrder.customerInfo.profilePicture || "",
        dateOfBirth: customerOrder.customerInfo.dateOfBirth || "", // Use ISO 8601 date format
        location: customerOrder.customerInfo.location || "",
        createdAt: customerOrder.customerInfo.createdAt || "", // Use ISO 8601 date-time format
        updatedAt: customerOrder.customerInfo.updatedAt || "", // Use ISO 8601 date-time format
        termsAccepted: customerOrder.customerInfo.termsAccepted || false,
        privacyPolicyAccepted:
          customerOrder.customerInfo.privacyPolicyAccepted || false,
        middleName: customerOrder.customerInfo.middleName || "",
        lastName: customerOrder.customerInfo.lastName || "",
        firstName: customerOrder.customerInfo.firstName || "",
        fullName: customerOrder.customerInfo.fullName || "",
        isVerified: customerOrder.customerInfo.isVerified || false,
        verificationToken: customerOrder.customerInfo.verificationToken || "",
        resetPasswordToken: customerOrder.customerInfo.resetPasswordToken || "",
        resetPasswordExpiration:
          customerOrder.customerInfo.resetPasswordExpiration || "",
        lastLogin: customerOrder.customerInfo.lastLogin || "",
        loginAttempts: customerOrder.customerInfo.loginAttempts || 0,
        isLocked: customerOrder.customerInfo.isLocked || false,
        notificationPreferences:
          customerOrder.customerInfo.notificationPreferences || "",
        preferredTheme: customerOrder.customerInfo.preferredTheme || "",
        gender: customerOrder.customerInfo.gender || "",
        nationality: customerOrder.customerInfo.nationality || "",
        permissions: customerOrder.customerInfo.permissions || "",
        roleLevel: customerOrder.customerInfo.roleLevel || 0,
        lastLoginIp: customerOrder.customerInfo.lastLoginIp || "",
        deviceInfo: customerOrder.customerInfo.deviceInfo || "",
        subscriptionType: customerOrder.customerInfo.subscriptionType || "",
        subscriptionStatus: customerOrder.customerInfo.subscriptionStatus || "",
        subscriptionStartDate:
          customerOrder.customerInfo.subscriptionStartDate || "",
        subscriptionEndDate:
          customerOrder.customerInfo.subscriptionEndDate || "",
        referralCode: customerOrder.customerInfo.referralCode || "",
        referredBy: customerOrder.customerInfo.referredBy || "",
        isDeleted: customerOrder.customerInfo.isDeleted || false,
        deletedAt: customerOrder.customerInfo.deletedAt || "",
      },
      customerAddress: {
        id: customerOrder.customerAddress.id || -1,
        userId: Number(customerOrder.customerAddress.userId) || -1,
        street: customerOrder.customerAddress.street || "",
        addressLine2: customerOrder.customerAddress.addressLine2 || null,
        city: customerOrder.customerAddress.city || "",
        state: customerOrder.customerAddress.state || "",
        region: customerOrder.customerAddress.region || "",
        postalCode: customerOrder.customerAddress.postalCode || "",
        country: customerOrder.customerAddress.country || "",
        latitude: customerOrder.customerAddress.latitude || 0,
        longitude: customerOrder.customerAddress.longitude || 0,
        addressType: customerOrder.customerAddress.addressType || "",
        label: customerOrder.customerAddress.label || "",
        isDefault: customerOrder.customerAddress.isDefault || false,
        isVerified: customerOrder.customerAddress.isVerified || false,
        permanent: customerOrder.customerAddress.permanent || false,
        createdAt: customerOrder.customerAddress.createdAt || "",
        updatedAt: customerOrder.customerAddress.updatedAt || "",
      },
      paymentInfo: {
        nameOnCard: `${customerOrder.customerInfo.firstName ?? ""} ${
          customerOrder.customerInfo.lastName ?? ""
        }`,
        cardNumber: "4312 567 7890 7864",
        cardType: "MasterCard",
        expirationDate: "03/25",
        securityCode: "025",
        postalCode: customerOrder.customerAddress.postalCode || "",
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
      talentID: solutionistDeatils?.solutionistInformation.id || 0, // it should never be null
      talentFirstName:
        solutionistDeatils?.solutionistInformation.firstName || "",
      talentLastName:
        solutionistDeatils?.solutionistInformation?.lastName || "",
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
      giftInformationFor: {
        firstName: customerOrder.giftInformationFor.firstName || "",
        lastName: customerOrder.giftInformationFor.lastName || "",
        country: customerOrder.giftInformationFor.country || "",
        street: customerOrder.giftInformationFor.street || "",
        city: customerOrder.giftInformationFor.city || "",
        state: customerOrder.giftInformationFor.state || "",
        postalCode: customerOrder.giftInformationFor.postalCode || "",
        phoneNumber: customerOrder.giftInformationFor.phoneNumber || "",
        email: customerOrder.giftInformationFor.email || "",
      },
      longTermSubscriptionAllow:
        customerOrder.longTermSubscriptionAllow || false,
    };

    dispatch(setCustomerOrder(orderData));
  }, []);

  return {
    formData,
    setFormData,
    handleChange,
    updateSolutionDetails,
  };
};
