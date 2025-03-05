import { useNavigate } from "react-router";
import { companyProfile } from "../..";
import icononly from "../../assets/company-logos-icons/icononly.png";
import { ContactFormData } from "../../lib/types/ContactUsTypes";
import { emailIcon, phoneIcon } from "../../assets/svg/svgs";

type Props = { formData: ContactFormData };

export const ConfirmationPage: React.FC<Props> = ({ formData }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 font-sans relative max-w-4xl shadow-lg shadow-[#e9d9f3] mx-auto rounded overflow-hidden">
      <div className="grid sm:grid-cols-2 gap-6">
        {/* Message Section */}
        <div className="text-center p-6 flex flex-col justify-center items-center">
          <h3 className="font-extrabold text-5xl text-[#4e0083] leading-tight">
            <span className="text-gray-800">Message</span> Sent{" "}
            {formData.firstName}
          </h3>
          <h6 className="text-lg text-gray-800 mt-4">
            Find your Nearby Solutions Today!
          </h6>
          <button
            className="bg-[#4e0083] hover:bg-[#4f0083cc] text-white font-semibold text-sm py-3 px-6 rounded-xl mt-8"
            onClick={() => navigate("/hire-a-talent")}
          >
            Find a Solution
          </button>

          {/* Contact Information */}
          <ul className="flex flex-wrap justify-center gap-6 mt-8">
            <ContactItem
              icon={phoneIcon}
              text={companyProfile.companyPhoneNumber}
            />
            <ContactItem icon={emailIcon} text={companyProfile.companyEmail} />
          </ul>
        </div>

        {/* Image Section */}
        <div className="flex justify-end items-center p-2 bg-gradient-to-b from-[#4e0083] to-[#796089] rounded-bl-[230px] w-full h-full">
          <div className="h-72 w-72 rounded-full bg-gradient-to-tr from-[#4e0083] to-[#c19ed6] p-5">
            <img
              src={icononly}
              className="w-full h-full rounded-full object-cover border-8 border-white"
              alt="Company Logo"
            />
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute -top-[50px] -left-[50px] w-28 h-28 rounded-full bg-[#4e0083] opacity-40 shadow-lg" />
      <div className="absolute -top-10 -left-10 w-28 h-28 rounded-full bg-[#4e0083] opacity-40 shadow-lg" />
    </div>
  );
};

/** 📌 Reusable Contact Item Component */
const ContactItem: React.FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => (
  <li className="flex items-center space-x-2">
    {icon}
    <span className="text-[#4e0083] text-sm font-semibold">{text}</span>
  </li>
);
