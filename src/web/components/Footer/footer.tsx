import { addressSVG, emailSVG, phoneNumberSVG } from "../../assets/svg/svgs";
import nearbySolutionsLogo from "../../assets/company-logos-icons/fulllogo_transparent.png";
import { getSocialMedia } from "../../lib";
import { FooterTitles } from "./footerTitles";

export const Footer: React.FC = () => {
  const socialData = [
    { name: "Facebook", link: "#" },
    { name: "X", link: "#" },
    { name: "Youtube", link: "#" },
    { name: "Linkedin", link: "#" },
  ];

  const ourServices = [
    { name: "Hire a Talent", link: "#" },
    { name: "Bulk Hire", link: "#" },
    { name: "Google Ads", link: "#" },
  ];

  const helpfulLinks = [
    { name: "FAQs", link: "#" },
    { name: "Support", link: "#" },
  ];

  const companyProfile = {
    companyName: "FAQs",
    companyEmail: "john@doe.com",
    companyPhoneNumber: "0123456789",
    companyStreetAddress: "213 Lane",
    companyCity: "London",
    companyState: "",
    companyCountry: "United Kingdom",
  };

  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 pb-6 pt-16 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="justify-center item-center justify-content justify-self">
            <div className="bg-black justify-content ">
              <img
                className="h-40 w-48"
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

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {socialData.map((socialData) => (
                <li key={`social-media-${socialData.name}`}>
                  <a
                    href={`${socialData.link}`}
                    rel="noreferrer"
                    target="_blank"
                    className="text-teal-700 transition hover:text-teal-700/75"
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
              <p className="text-lg font-medium text-gray-900">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    {emailSVG}
                    <span className="flex-1 text-gray-700">
                      {companyProfile.companyEmail}
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end"
                    href="#"
                  >
                    {phoneNumberSVG}
                    <span className="flex-1 text-gray-700">
                      {companyProfile.companyPhoneNumber}
                    </span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  {addressSVG}
                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    {/* todo maka method to do full address */}
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
