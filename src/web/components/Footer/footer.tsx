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
    <>
      <footer className="bg-[#312020] mt-4 py-8 px-4 sm:px-12 font-sans tracking-wide">
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-20 gap-8">
          <div className="lg:col-span-2">
            <div className="max-xl:max-w-2xl object-center">
              <img
                className="h-50 w-60 img"
                src={`${nearbySolutionsLogo}`}
                alt="Company Logo"
              />

              <p className="text-gray-300 text-sm">
                At Nearby Solutions, our mission is to deliver innovative and
                efficient technology solutions right to your doorstep. We strive
                to empower local businesses and communities with cutting-edge
                services tailored to their unique needs. Our commitment is to
                provide unparalleled support and foster growth through
                accessible, reliable, and personalized solutions.
              </p>

              <div className="bg-white flex px-1 py-1 mt-8 rounded-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent pl-4 text-sm"
                />
                <button
                  type="button"
                  className="bg-gray-800 hover:bg-gray-900 transition-all text-white text-sm rounded-full px-5 py-2 tracking-wide"
                >
                  Subscribe
                </button>
              </div>
            </div>

            <ul
              className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8"
              style={{ color: "cyan" }}
            >
              {companySocialData?.map((socialData) => (
                <li key={`social-media-${socialData.name}`}>
                  <a
                    href={`${socialData.link}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-white transition hover:text-purple-700/75"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:col-span-3">
            <FooterTitles />

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Our Services</p>

              <ul className="mt-8 space-y-4 text-sm">
                {ourServices.map((services, index) => (
                  <li key={`${services}-${index}`}>
                    <a
                      className="text-gray-300 hover:text-white text-sm transition"
                      href={`${services.link}`}
                    >
                      {services.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-white">Helpful Links</p>

              <ul className="mt-8 space-y-4 text-sm">
                {helpfulLinks.map((help, index) => (
                  <li key={`${help}-${index}`}>
                    <a
                      className="text-gray-300 hover:text-white text-sm transition"
                      href={`${help.link}`}
                    >
                      {help.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}

            <div className="text-center sm:text-left">
              <Link
                type="button"
                className="text-lg font-medium text-white"
                to={`home/contact-us`}
              >
                Contact Us
              </Link>

              <ul className="mt-3 space-y-4 text-sm text-center sm:text-left">
                <li>
                  <p className="flex items-center gap-2">
                    {emailSVG}
                    <span className="text-white">
                      {companyProfile.companyEmail}
                    </span>
                  </p>
                </li>

                <li>
                  <p className="flex items-center gap-2">
                    {phoneNumberSVG}
                    <span className="text-white">
                      {companyProfile.companyPhoneNumber}
                    </span>
                  </p>
                </li>

                <li className="flex items-center gap-2 text-white">
                  {addressSVG}
                  <address className="not-italic">
                    {companyProfile.companyStreetAddress},{" "}
                    {companyProfile.companyCity},{" "}
                    {companyProfile.companyCountry}
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-300 mt-8">
          © 2023
          <a
            href="https://readymadeui.com/"
            target="_blank"
            className="hover:underline mx-1"
          >
            ReadymadeUI
          </a>
          All Rights Reserved.
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
      </footer>
    </>
  );
};
