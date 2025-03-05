import { companyProfile, companySocialData } from "../..";
import { emailIcon, locationIconSVG, phoneIcon } from "../../assets/svg/svgs";
import { getSocialMedia } from "../../lib";

export const CompanyProfileCard: React.FC = () => {
  return (
    <div className="bg-[#011c2b] rounded-lg p-6 text-center lg:text-left">
      <h2 className="text-xl font-bold text-white">Contact Information</h2>
      <p className="text-sm text-gray-400 mt-3">
        Help us make your life better and easier.
      </p>

      {/* Contact Information */}
      <ul className="mt-8 space-y-6">
        <ContactItem icon={emailIcon} text={companyProfile.companyEmail} />
        <ContactItem
          icon={phoneIcon}
          text={`+1-${companyProfile.companyPhoneNumber}`}
        />
        <ContactItem
          icon={locationIconSVG}
          text={`${companyProfile.companyStreetAddress}, ${companyProfile.companyCity}, ${companyProfile.companyCountry}`}
        />
      </ul>

      {/* Social Media Links */}
      <ul className="flex justify-center lg:justify-start mt-8 space-x-4">
        {companySocialData.map(({ name, link }) => (
          <li
            key={`social-${name}`}
            className="bg-purple-800 hover:bg-gray-900 h-10 w-10 rounded-full flex items-center justify-center"
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              {getSocialMedia(name)?.icon}
              <span className="sr-only">{name.toUpperCase()}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ContactItem: React.FC<{ icon: JSX.Element; text: string }> = ({
  icon,
  text,
}) => (
  <li className="flex items-center justify-center lg:justify-start space-x-3">
    {icon}
    <span className="text-white text-sm font-semibold">{text}</span>
  </li>
);
