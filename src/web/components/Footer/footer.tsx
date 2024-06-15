import { addressSVG, emailSVG, phoneNumberSVG } from "../../assets/svg/svgs";
import nearbySolutionsLogo from "../../assets/company-logos-icons/fulllogo_transparent.png";
import { getSocialMedia } from "../../lib";
import { FooterTitles } from "./footerTitles";
import { Link } from "react-router-dom";
import { companyProfile, companySocialData } from "../..";

export const Footer: React.FC = () => {
  const ourServices = [
    { name: "Hire a Talent", link: "#" },
    { name: "Bulk Hire", link: "#" },
    { name: "Google Ads", link: "#" },
  ];

  const helpfulLinks = [
    { name: "FAQs", link: "#" },
    { name: "Support", link: "#" },
  ];

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="object-center">
            <div className="justify-center w-full text-center pl-14 m-4 md:pl-10">
              <img
                className="h-50 w-60"
                src={`${nearbySolutionsLogo}`}
                alt="Company Logo"
              />
            </div>

            <p className="max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              At Nearby Solutions, our mission is to deliver innovative and
              efficient technology solutions right to your doorstep. We strive
              to empower local businesses and communities with cutting-edge
              services tailored to their unique needs. Our commitment is to
              provide unparalleled support and foster growth through accessible,
              reliable, and personalized solutions
            </p>

            <ul
              className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8"
              style={{ color: "cyan" }}
            >
              {companySocialData.map((socialData) => (
                <li key={`social-media-${socialData.name}`}>
                  <a
                    href={`${socialData.link}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-purple-700 transition hover:text-purple-700/75"
                  >
                    <span className="sr-only">
                      {socialData.name.toLocaleUpperCase()}
                    </span>
                    {getSocialMedia(socialData.name)?.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <FooterTitles />

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Our Services</p>

              <ul className="mt-8 space-y-4 text-sm">
                {ourServices.map((services, index) => (
                  <li key={`${services}-${index}`}>
                    <a
                      className="text-gray-700 transition hover:text-gray-700/75"
                      href={`${services.link}`}
                    >
                      {services.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Helpful Links</p>

              <ul className="mt-8 space-y-4 text-sm">
                <ul className="mt-8 space-y-4 text-sm">
                  {helpfulLinks.map((help, index) => (
                    <li key={`${help}-${index}`}>
                      <a
                        className="text-gray-700 transition hover:text-gray-700/75"
                        href={`${help.link}`}
                      >
                        {help.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <Link
                type="button"
                className="text-lg font-medium text-gray-900"
                to={`/contact-us`}
              >
                Contact Us
              </Link>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <p className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    {emailSVG}
                    <span className="flex-1 text-gray-700">
                      {companyProfile.companyEmail}
                    </span>
                  </p>
                </li>

                <li>
                  <p className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                    {phoneNumberSVG}
                    <span className="flex-1 text-gray-700">
                      {companyProfile.companyPhoneNumber}
                    </span>
                  </p>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  {addressSVG}
                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    {companyProfile.companyStreetAddress}
                    {", "}
                    {companyProfile.companyCity}
                    {", "} {companyProfile.companyCountry}
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              {/* make year auto */}
              &copy; 2022 Company Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
