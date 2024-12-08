// import * as nsfwjs from "nsfwjs";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetCoutries,
  useNoLicensePermitVerificationService,
} from "../../utils/fetchEndpoints";
import { RootState } from "../../../store";
import { setPostAJobDetails } from "../../../store/postAJobSlice";
import {
  GroupedServices,
  NoLicensePermitVerificationServiceTypes,
} from "../../lib/types/FindWorkPostAJobtypesData";
import { useBooleans } from "../common-sections/useBooleans";

export type FormData = {
  jobName: string;
  jobTask: string;
  jobPrice: string;
  jobZip: string;
  jobCityLocation: string;
  date: string;
  time: string;
  email: string;
  jobCountry: string;
  jobState: string;
  urgencyLevel: string;
  phoneNumber: string;
  customerName: string;
  jobAddress: string;
};

export const usePostAJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openReview, setOpenReview] = useState(false);
  const [userCategory, setUserCategory] = useState("");
  const [userService, setUserService] = useState("");
  const [jobImage, setJobImage] = useState<File>();

  const {
    isAccept,
    setIsAccept,
    isShowTermsAndConditions,
    setIsShowTermsAndConditions,
  } = useBooleans();

  const { data: noLicensePermitList } = useNoLicensePermitVerificationService();

  const groupedServices = (
    noLicensePermitList || ([] as NoLicensePermitVerificationServiceTypes[])
  ).reduce<Record<string, NoLicensePermitVerificationServiceTypes[]>>(
    (acc, service) => {
      const { category } = service;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(service);
      return acc;
    },
    {}
  ) as GroupedServices;

  const states = useSelector((state: RootState) => state);

  const customerOrder = states.formData.customerOrder;
  const postAJobOrder = states.postAJobFormDetailsState.postAJobFormDetailsData;
  const { data: coutries, isFetching: isCoutriesFetching } = useGetCoutries();

  const [errors, setErrors] = useState<Partial<FormData>>({});

  useEffect(() => {
    if (customerOrder && !isCoutriesFetching) {
      const updatedPostAJobFormData = {
        ...postAJobOrder,
        id: postAJobOrder?.id ?? "",
        jobName: "",
        jobTask: "",
        jobPrice: "",
        jobZip: customerOrder.customerInfo?.zip || "",
        jobCityLocation: customerOrder.customerInfo?.city || "",
        date: "",
        time: "",
        email: customerOrder.customerInfo?.email || "",
        jobCountry: customerOrder.customerInfo?.country || "",
        jobState: customerOrder.customerInfo?.state || "",
        urgencyLevel: "",
        phoneNumber: "",
        customerName: `${customerOrder.customerInfo?.firstName || ""} ${
          customerOrder.customerInfo?.lastName || ""
        }`.trim(),
        jobAddress: customerOrder.customerInfo?.address || "",
      };

      dispatch(setPostAJobDetails(updatedPostAJobFormData));
    }
  }, [customerOrder, postAJobOrder, isCoutriesFetching, dispatch]);


  const validCountries = useMemo(() => {
    if (coutries) return coutries?.filter((country) => country?.featureFlag);
    return [];
  }, [coutries]);

  const subCategoryList = useMemo(() => {
    if (groupedServices) return groupedServices[`${userCategory}`];
    return [];
  }, [userCategory]);

  const generalDescription = useMemo(() => {
    if (groupedServices)
      return groupedServices[`${userCategory}`]?.map(
        (data) => data.name === postAJobOrder?.jobName && data.description
      );
    return [];
  }, [postAJobOrder?.jobName]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    const updatedCustomerFormData = {
      ...postAJobOrder,
      id: postAJobOrder.id,
      jobName: name === "jobName" ? value : postAJobOrder.jobName,
      jobTask: name === "jobTask" ? value : postAJobOrder.jobTask,
      jobAddress: name === "jobAddress" ? value : postAJobOrder.jobAddress,
      jobPrice: name === "jobPrice" ? value : postAJobOrder.jobPrice,
      jobZip: name === "jobZip" ? value : postAJobOrder.jobZip,
      jobCityLocation:
        name === "jobCityLocation" ? value : postAJobOrder.jobCityLocation,
      date: name === "date" ? value : postAJobOrder.date,
      time: name === "time" ? value : postAJobOrder.time,
      email: name === "email" ? value : postAJobOrder.email,
      jobCountry: name === "jobCountry" ? value : postAJobOrder.jobCountry,
      jobState: name === "jobState" ? value : postAJobOrder.jobState,
      urgencyLevel:
        name === "urgencyLevel" ? value : postAJobOrder.urgencyLevel,
      phoneNumber: name === "phoneNumber" ? value : postAJobOrder.phoneNumber,
      customerName:
        name === "customerName" ? value : postAJobOrder.customerName,
    };

    dispatch(setPostAJobDetails(updatedCustomerFormData));
  };

  // const detectExplicitContent = async (imageElement: any) => {
  //   const model = await nsfwjs.load();
  //   const predictions = await model.classify(imageElement);
  //   return predictions.some(
  //     (p: { className: string; probability: number }) =>
  //       p.className === "Porn" && p.probability > 0.9
  //   );
  // };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    const isUSA = postAJobOrder.jobCountry === "United States";

    // Define required fields with their corresponding error messages
    const requiredFields: { key: keyof FormData; message: string }[] = [
      { key: "jobName", message: "Job Name is required" },
      { key: "jobTask", message: "Job Task is required" },
      { key: "jobCityLocation", message: "Job City Location is required" },
      { key: "date", message: "Date is required" },
      { key: "time", message: "Time is required" },
      { key: "email", message: "Email is required" },
      { key: "jobCountry", message: "Country is required" },
      { key: "jobState", message: "State is required" },
      { key: "urgencyLevel", message: "Urgency level is required" },
      { key: "phoneNumber", message: "Phone number is required" },
      { key: "customerName", message: "Customer name is required" },
      { key: "jobAddress", message: "Job address is required" },
      { key: "jobAddress", message: "Job address is required" },
    ];

    const usaRequiredFields: { key: keyof FormData; message: string }[] = [
      { key: "jobZip", message: "Zip Code is required" },
      { key: "jobState", message: "State is required" },
    ];

    const validateRequiredFields = async () => {
      requiredFields.forEach(({ key, message }) => {
        if (!postAJobOrder[key]) {
          newErrors[key] = message;
        }
      });

      // Check for porno image
      // console.log(await detectExplicitContent(formData.jobImage));
      // if (!formData.jobImage) {
      //   newErrors.jobZip = "Job Zip is required";
      // } else if (await detectExplicitContent(formData.jobImage)) {
      //   newErrors.jobZip = "Job Zip is required";
      // }
    };

    // Validate required fields
    if (isUSA) {
      usaRequiredFields.forEach(({ key, message }) => {
        if (!postAJobOrder[key]) {
          newErrors[key] = message;
        }
      });

      if (!postAJobOrder.jobZip) {
        newErrors.jobZip = "Job Zip is required";
      } else if (!/^\d{5}(-\d+)?$/.test(postAJobOrder.jobZip)) {
        newErrors.jobZip =
          "Job Zip must be either 5 digits or 5 digits followed by a hyphen and more digits";
      }

      validateRequiredFields();
    } else validateRequiredFields();

    // Additional field-specific validations
    if (!postAJobOrder.jobPrice) {
      newErrors.jobPrice = "Job Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(postAJobOrder.jobPrice)) {
      newErrors.jobPrice =
        "Job Price must be a number with up to two decimal places";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // WE Need cutomer Info before head to payment
    console.log("Customer MUCH isAccept (TRUE) BE CALLING THE DATABASE");
    console.log(
      "Customer selected Job Not LISTED THEN set JobStatus to (FALSE)"
    );

    navigate(`/payment?acceptJob=${postAJobOrder.id}`); //
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm() && isAccept) {
      setOpenReview(true);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files[0]) setJobImage(files[0]);
    e.target.value = "";
  };

  return {
    postActions: {
      handleImage,
      handleReview,
      handleSubmit,
      handleChange,
      setOpenReview,
      setUserCategory,
    },
    postData: {
      postAJobOrder,
      generalDescription,
      jobImage,
      userCategory,
      subCategoryList,
      errors,
      validCountries,
      groupedServices,
      openReview,
    },
    booleanStatus: {
      isAccept,
      setIsAccept,
      isShowTermsAndConditions,
      setIsShowTermsAndConditions,
    },
  };
};
