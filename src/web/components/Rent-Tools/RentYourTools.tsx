import { useMemo, useState } from "react";
import { MainTitle } from "../common-sections/MainTitle";
import { AddProductModal } from "./AddProductModal";
import { useGetCoutries } from "../../utils/fetchEndpoints";
import { ToolAddressInformation } from "./ToolAddressInformation";
import { FormProgressBar } from "../common-sections/FormProgressBar";
import { RentToolsReview } from "./RentToolsReview";
import { useBooleans } from "../common-sections/useBooleans";

export type ProductFormDataTypes = {
  toolName: string;
  toolBrand: string;
  toolCategory: string;
  description: string;
  toolAddress: string;
  toolCity: string;
  toolState: string;
  toolCountry: string;
  toolZipCode: string;
  powerSource: string;
  pricePerDay: number;
  imageUrls: string;
  discountPercent: number;
  usageInstructions: string;
  safetyInformation: string;
  nextAvailableDate: string;
};

export type ProductFormErrorTypes = {
  [K in keyof ProductFormDataTypes]?: string; // Each field can have a string error message or be undefined
};

export const RentYourTools: React.FC = () => {
  const { data: coutries } = useGetCoutries();
  const validCountries = useMemo(() => {
    return coutries?.filter((country) => country.featureFlag) || [];
  }, [coutries]);

  const [isToolListingReady, setIsToolListingReady] = useState(true);
  const [openToolForm, setOpenToolForm] = useState(false);
  const [toolEditIndex, setToolEditIndex] = useState(-1);

  const {
    isAccept,
    setIsAccept,
    isShowTermsAndConditions,
    setIsShowTermsAndConditions,
  } = useBooleans();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const steps = ["Tools Address", "Add Tools", "Review", "Confirmation"];
  const [errors, setErrors] = useState<ProductFormErrorTypes>({});
  const [productList, setProductList] = useState<ProductFormDataTypes[]>([
    {
      toolName: "ddd",
      toolBrand: "ddddd",
      toolCategory: "www",
      description: "jg",
      toolAddress: "11786 General Cooke Dr",
      toolCity: "Bristow",
      toolState: "Virginia",
      toolCountry: "United States",
      toolZipCode: "20136",
      powerSource: "333333333333efffffffffffffffffff fafafa",
      pricePerDay: 0.9,
      imageUrls:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
      discountPercent: 0,
      usageInstructions: "fafafavvvnn",
      safetyInformation: "affffaffafa",
      nextAvailableDate: "2024-12-17",
    },
  ]);
  const [productFormData, setProductFormData] = useState<ProductFormDataTypes>({
    toolName: "",
    toolBrand: "",
    toolCategory: "",
    description: "",
    toolAddress: "",
    toolCity: "",
    toolState: "",
    toolCountry: "",
    toolZipCode: "",
    powerSource: "",
    pricePerDay: 0,
    imageUrls: "",
    discountPercent: 0,
    usageInstructions: "",
    safetyInformation: "",
    nextAvailableDate: "",
  });

  const handleProductChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value, files } = e.target as HTMLInputElement;

    if (e.target.type === "file" && files) {
      // If the input is a file type, capture the file(s)
      setProductFormData((prev) => ({
        ...prev,
        [id]: files[0], // Store the first selected file (or handle multiple files if needed)
      }));
    } else {
      setProductFormData((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleToolActions = (actionName: string, index: number) => {
    if (actionName === "Duplicate") {
      setProductList((prevList) => [...prevList, productList[index]]);
    }
    if (actionName === "Delete") {
      setProductList((prevList) =>
        prevList.filter((_, prevIndex) => prevIndex !== index)
      );
    }
    if (actionName === "Edit") {
      setProductFormData(productList[index]);
      setOpenToolForm(true);
      setToolEditIndex(index);
    }
  };

  const fieldsValidation = (
    newErrors: ProductFormErrorTypes,
    isUSA: boolean,
    requiredFields: {
      key: keyof ProductFormDataTypes;
      message: string;
    }[]
  ) => {
    const usaRequiredFields: {
      key: keyof ProductFormDataTypes;
      message: string;
    }[] = [
      { key: "toolZipCode", message: "Tool zip code is required" },
      { key: "toolState", message: "State is required" },
    ];

    requiredFields.forEach(({ key, message }) => {
      if (!productFormData[key]) {
        newErrors[key] = message;
      }
    });

    if (isUSA) {
      usaRequiredFields.forEach(({ key, message }) => {
        if (!productFormData[key]) {
          newErrors[key] = message;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    const newErrors: ProductFormErrorTypes = {};
    const isUSA = productFormData.toolCountry === "United States";

    // Define required fields with their corresponding error messages
    const requiredFields: {
      key: keyof ProductFormDataTypes;
      message: string;
    }[] = [
      { key: "toolName", message: "Tool name is required" },
      { key: "toolBrand", message: "Tool brand is required" },
      { key: "toolCategory", message: "Tool category Location is required" },
      { key: "description", message: "Description is required" },
      { key: "powerSource", message: "Power source is required" },
      { key: "pricePerDay", message: "Price per day is required" },
      { key: "imageUrls", message: "Image is required" },
      { key: "usageInstructions", message: "Usage instructions are required" },
      { key: "safetyInformation", message: "Safety information is required" },
      { key: "nextAvailableDate", message: "Available date is required" },
    ];

    return fieldsValidation(newErrors, isUSA, requiredFields);
  };

  const resetToolForm = () => {
    setToolEditIndex(-1);
    setIsToolListingReady(true);
    setOpenToolForm(false);
    setProductFormData({
      ...productFormData,
      toolName: "",
      toolBrand: "",
      toolCategory: "",
      description: "",
      powerSource: "",
      pricePerDay: 0,
      imageUrls: "",
      discountPercent: 0,
      usageInstructions: "",
      safetyInformation: "",
      nextAvailableDate: "",
    });
  };

  const handleToolForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (toolEditIndex >= 0) {
      const newList = [...productList]; // Create a copy of the current list
      newList[toolEditIndex] = productFormData; // Replace the object at index
      console.log("productList = ", productList);
      console.log("newList = ", newList);
      setProductList(newList);
      resetToolForm();
    }
    if (validateForm() && toolEditIndex === -1) {
      setProductList((prevList) => [...prevList, productFormData]);
      resetToolForm();
    }
  };

  // Handler to move to the next step
  const handleNextStep = () => {
    if (currentStep === 0 && validateAddressForm()) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 1 && productList.length > 0) {
      setCurrentStep(currentStep + 1);
    }
    if (currentStep === 2 && isToolListingReady && isAccept) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handler to move to the previous step
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateAddressForm = () => {
    const newErrors: ProductFormErrorTypes = {};
    const isUSA = productFormData.toolCountry === "United States";

    const requiredFields: {
      key: keyof ProductFormDataTypes;
      message: string;
    }[] = [
      { key: "toolAddress", message: "Tool address is required" },
      { key: "toolCity", message: "Tool city is required" },
      { key: "toolCountry", message: "Tool country is required" },
    ];

    if (fieldsValidation(newErrors, isUSA, requiredFields)) {
      return true;
    } else return false;
  };

  const [sortDirection, setSortDirection] = useState<string>("asc");

  const sortByPrice = () => {
    const sorted = [...productList].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.pricePerDay - b.pricePerDay;
      } else {
        return b.pricePerDay - a.pricePerDay;
      }
    });

    return sorted;
  };

  const sortByDiscount = () => {
    const sorted = [...productList].sort((a, b) => {
      if (sortDirection === "asc") {
        return a.discountPercent - b.discountPercent;
      } else {
        return b.discountPercent - a.discountPercent;
      }
    });

    return sorted;
  };

  const sortByName = () => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...productList].sort(
      (a, b) => a.toolName.localeCompare(b.toolName) * sortOrder
    );
  };

  const sortByBrand = () => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...productList].sort(
      (a, b) => a.toolBrand.localeCompare(b.toolBrand) * sortOrder
    );
  };

  const sortByCategory = () => {
    const sortOrder = sortDirection === "asc" ? 1 : -1;
    return [...productList].sort(
      (a, b) => a.toolCategory.localeCompare(b.toolCategory) * sortOrder
    );
  };

  const handleSort = (sortType: string) => {
    const sortedList =
      sortType === "Price"
        ? sortByPrice()
        : sortType === "Discount"
        ? sortByDiscount()
        : sortType === "Brand"
        ? sortByBrand()
        : sortType === "Category"
        ? sortByCategory()
        : sortByName();

    setProductList((prevList) =>
      JSON.stringify(prevList) !== JSON.stringify(sortedList)
        ? sortedList
        : prevList
    );
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <>
      <MainTitle title={"Tool Form Listings"} />

      <FormProgressBar
        steps={steps}
        currentStep={currentStep}
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
      />

      {currentStep === 0 && (
        <div className="p-4 font-[sans-serif] vg-purple m-6 max-w-4xl mx-auto border-solid border-2 border-indigo-600 ">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Tools Address Information
          </h3>
          <ToolAddressInformation
            productFormData={productFormData}
            handleProductChange={handleProductChange}
            errors={errors}
            validCountries={validCountries}
          />

          <button
            type="submit"
            className="mt-8 px-6 py-2.5 w-full text-sm text-white rounded bg-gray-600 hover:bg-gray-700 transition-all"
            onClick={handleNextStep}
          >
            Submit
          </button>
        </div>
      )}

      {currentStep === 1 && (
        <AddProductModal
          errors={errors}
          productFormData={productFormData}
          handleProductChange={handleProductChange}
          handleToolForm={handleToolForm}
          openToolForm={openToolForm}
          setOpenToolForm={setOpenToolForm}
          productList={productList}
          handleSort={handleSort}
          setProductFormData={setProductFormData}
          handleToolActions={handleToolActions}
          resetToolForm={resetToolForm}
        />
      )}

      {currentStep >= 2 && (
        <RentToolsReview
          productList={productList}
          currentStep={currentStep}
          isAccept={isAccept}
          setIsAccept={setIsAccept}
          isShowTermsAndConditions={isShowTermsAndConditions}
          setIsShowTermsAndConditions={setIsShowTermsAndConditions}
        />
      )}
    </>
  );
};
