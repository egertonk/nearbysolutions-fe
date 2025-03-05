import { useState, ChangeEvent } from "react";
import { MainTitle } from "../common-sections/MainTitle";
import {
  envelopIconSVG,
  messageIconSVG,
  personIconSVG,
  phoneIconSVG,
} from "../../assets/svg/svgs";
import { ContactFormData, FormErrorS } from "../../lib/types/ContactUsTypes";
import { CompanyProfileCard } from "./CompanyProfileCard";
import { ConfirmationPage } from "./ConfirmationPage";
import { errorCss, inputCSS } from "../../assets/common-css/css";

/** Inquiry Options */
const INQUIRY_OPTIONS = [
  { id: "generalInquiry", label: "General Inquiry" },
  { id: "technicalSupport", label: "Technical Support" },
  { id: "websiteFeedback", label: "Website Feedback" },
];

export const ContactUs: React.FC = () => {
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
    inquiryType: "generalInquiry",
  });

  const [errors, setErrors] = useState<FormErrorS>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: ""
  });

  /** 🔹 Handle Input Change (Text & Radio) */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error if valid
  };

  /** 🔹 Form Validation */
  const validateFormData = (): boolean => {
    const newErrors: FormErrorS = {
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      message: ""
    };
    const phonePattern = /^[0-9+\- ]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    [
      { field: "firstName", message: "First name is required" },
      { field: "lastName", message: "Last name is required" },
      { field: "message", message: "Message is required" },
    ].forEach(({ field, message }) => {
      if (!formData[field as keyof ContactFormData]?.trim()) {
        newErrors[field as keyof FormErrorS] = message;
      }
    });

    if (!phonePattern.test(formData.phoneNo)) {
      newErrors.phoneNo = "Invalid phone number";
    }

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** 🔹 Handle Form Submission */
  const handleSubmit = () => {
    if (validateFormData()) setShowConfirmationPage(true);
  };

  return showConfirmationPage ? (
    <ConfirmationPage formData={formData} />
  ) : (
    <>
      <MainTitle title="Contact Us" />
      <div className="max-w-6xl mx-auto bg-white my-6 font-sans text-[#011c2b]">
        <div className="text-center px-6">
          <p className="text-sm text-gray-400 mt-3">
            Have some big idea for Nearby Solutions or need help?
          </p>
        </div>

        <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-md rounded-lg mt-8">
          <CompanyProfileCard />

          {/* Contact Form */}
          <div className="p-6 rounded-xl lg:col-span-2">
            <form>
              <div className="grid sm:grid-cols-2 gap-8">
                <InputField
                  name="firstName"
                  value={formData.firstName}
                  placeholder="First Name"
                  onChange={handleChange}
                  icon={personIconSVG}
                  error={errors.firstName}
                />
                <InputField
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Last Name"
                  onChange={handleChange}
                  icon={personIconSVG}
                  error={errors.lastName}
                />
                <InputField
                  name="phoneNo"
                  value={formData.phoneNo}
                  placeholder="Phone Number"
                  onChange={handleChange}
                  icon={phoneIconSVG}
                  error={errors.phoneNo}
                />
                <InputField
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  icon={envelopIconSVG}
                  error={errors.email}
                />
                <TextAreaField
                  name="message"
                  value={formData.message}
                  placeholder="Message"
                  onChange={handleChange}
                  icon={envelopIconSVG}
                  error={errors.message}
                />
              </div>

              {/* Inquiry Type Selection */}
              <h6 className="text-sm text-gray-400 mt-6">Select Subject</h6>
              <div className="flex flex-wrap gap-6 mt-3">
                {INQUIRY_OPTIONS.map(({ id, label }) => (
                  <RadioInput
                    key={id}
                    id={id}
                    name="inquiryType"
                    value={id}
                    label={label}
                    checked={formData.inquiryType === id}
                    onChange={handleChange}
                  />
                ))}
              </div>

              {/* Submit Button */}
              <button
                type="button"
                className="mt-12 flex items-center justify-center text-sm w-full lg:w-auto rounded px-4 py-2.5 font-semibold bg-[#011c2b] text-white hover:bg-[#011c2bf3]"
                onClick={handleSubmit}
              >
                {messageIconSVG} Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

/** 📌 Reusable Input Field Component */
type InputProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  icon: JSX.Element;
  error?: string;
};
const InputField: React.FC<InputProps> = ({
  name,
  value,
  placeholder,
  onChange,
  icon,
  error,
}) => (
  <div className="relative flex items-center">
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${inputCSS} ${error ? errorCss : ""}`}
    />
    {icon}
  </div>
);

/** 📌 Reusable Text Area Field */
type TextAreaProps = {
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  icon: JSX.Element;
  error?: string;
};
const TextAreaField: React.FC<TextAreaProps> = ({
  name,
  value,
  placeholder,
  onChange,
  icon,
  error,
}) => (
  <div className="relative flex items-center sm:col-span-2">
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={5}
      placeholder={placeholder}
      className={`${inputCSS} ${error ? errorCss : ""}`}
    />
    {icon}
  </div>
);

/** 📌 Reusable Radio Button Component */
type RadioProps = {
  id: string;
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
const RadioInput: React.FC<RadioProps> = ({
  id,
  name,
  value,
  label,
  checked,
  onChange,
}) => (
  <div className="flex items-center">
    <input
      id={id}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      className="hidden peer"
    />
    <label
      htmlFor={id}
      className="cursor-pointer border-2 border-[#011c2b] rounded-full w-5 h-5 flex items-center justify-center peer-checked:bg-[#011c2b]"
    />
    <p className="text-sm ml-3">{label}</p>
  </div>
);
