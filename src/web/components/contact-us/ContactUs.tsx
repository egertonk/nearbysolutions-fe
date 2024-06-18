import { useState } from "react";
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

export const ContactUs: React.FC = () => {
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
    inquiryType: "generalInquiry", // Default radio button value
  });

  const [errors, setErrors] = useState<FormErrorS>({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (value.length > 0)
      setErrors({
        ...errors,
        [name]: "",
      });
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      inquiryType: e.target.value,
    });
  };

  const validateFormData = () => {
    const errors: FormErrorS = {
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      message: "",
    };

    // Validate first name
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (formData.firstName.trim()) {
      errors.firstName = "";
    }

    // Validate last name
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (formData.lastName.trim()) {
      errors.lastName = "";
    }

    // Validate phone number (example validation)
    const phonePattern = /^[0-9+\- ]+$/;
    if (!formData.phoneNo.match(phonePattern)) {
      errors.phoneNo = "Invalid phone number";
    }
    if (formData.phoneNo.match(phonePattern)) {
      errors.phoneNo = "";
    }

    // Validate email (example validation)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.match(emailPattern)) {
      errors.email = "Invalid email address";
    }
    if (formData.email.match(emailPattern)) {
      errors.email = "";
    }

    // Validate message
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    if (formData.message.trim()) {
      errors.message = "";
    }

    setErrors(errors);
  };

  const handleSubmit = () => {
    validateFormData();
    if (
      formData.email.length > 0 &&
      formData.firstName.length > 0 &&
      formData.lastName.length > 0 &&
      formData.message.length > 0 &&
      formData.phoneNo.length > 0
    ) {
      // send message for email to be sent
      setShowConfirmationPage(true);
    }
  };

  return (
    <>
      {showConfirmationPage ? (
        <ConfirmationPage formData={formData} />
      ) : (
        <>
          <MainTitle title="Contact Us" />
          <div className="max-w-6xl mx-auto bg-white my-6 font-[sans-serif] text-[#011c2b]">
            <div className="text-center px-6">
              <p className="text-sm text-gray-400 mt-3">
                Have some big idea for Nearby Solutions or and need help?
              </p>
            </div>
            <div className="grid lg:grid-cols-3 items-center gap-4 p-2 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-lg mt-8">
              <CompanyProfileCard />

              <div className="p-6 rounded-xl lg:col-span-2">
                <form>
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="block relative flex items-center">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`${inputCSS} ${
                          errors?.firstName?.length > 0 && errorCss
                        }`}
                      />
                      {personIconSVG}
                    </div>

                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={`${inputCSS} ${
                          errors?.lastName?.length > 0 && errorCss
                        }`}
                      />
                      {personIconSVG}
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="text"
                        name="phoneNo"
                        value={formData.phoneNo}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className={`${inputCSS} ${
                          errors?.phoneNo?.length > 0 && errorCss
                        }`}
                      />
                      {phoneIconSVG}
                    </div>
                    <div className="relative flex items-center">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className={`${inputCSS} ${
                          errors?.email?.length > 0 && errorCss
                        }`}
                      />
                      {envelopIconSVG}
                    </div>
                    <div className="relative flex items-center sm:col-span-2">
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Message"
                        className={`${inputCSS} ${
                          errors?.message?.length > 0 && errorCss
                        }`}
                        defaultValue={""}
                      />
                      {envelopIconSVG}
                    </div>
                    <div className="col-span-full">
                      <h6 className="text-sm text-gray-400">Select Subject</h6>
                      <div className="flex max-lg:flex-col lg:space-x-6 max-lg:space-y-6">
                        <div className="flex items-center mt-3">
                          <input
                            id="radio1"
                            type="radio"
                            name="inquiryType"
                            value="generalInquiry"
                            checked={formData.inquiryType === "generalInquiry"}
                            onChange={handleRadioChange}
                            className="hidden peer"
                          />
                          <label
                            htmlFor="radio1"
                            className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                          >
                            <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full" />
                          </label>
                          <p className="text-sm ml-3">General Inquiry</p>
                        </div>
                        <div className="flex items-center mt-3">
                          <input
                            id="radio2"
                            type="radio"
                            name="inquiryType"
                            value="technicalSupport"
                            checked={
                              formData.inquiryType === "technicalSupport"
                            }
                            onChange={handleRadioChange}
                            className="hidden peer"
                          />
                          <label
                            htmlFor="radio2"
                            className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                          >
                            <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full" />
                          </label>
                          <p className="text-sm ml-3">Technical Support</p>
                        </div>
                        <div className="flex items-center mt-3">
                          <input
                            id="radio3"
                            type="radio"
                            name="inquiryType"
                            value="websiteFeedback"
                            checked={formData.inquiryType === "websiteFeedback"}
                            onChange={handleRadioChange}
                            className="hidden peer"
                          />
                          <label
                            htmlFor="radio3"
                            className="relative p-0.5 flex items-center justify-center shrink-0 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-5 h-5 cursor-pointer border-2 border-[#011c2b] rounded-full overflow-hidden"
                          >
                            <span className="border-[4px] border-[#011c2b] rounded-full w-full h-full" />
                          </label>
                          <p className="text-sm ml-3">Website Feedback</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-12 flex items-center justify-center text-sm lg:ml-auto max-lg:w-full rounded px-4 py-2.5 font-semibold bg-[#011c2b] text-white hover:bg-[#011c2bf3]"
                    onClick={handleSubmit}
                  >
                    {messageIconSVG}
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
};
