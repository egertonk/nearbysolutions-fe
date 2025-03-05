import React from "react";

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

const Section: React.FC<SectionProps> = ({ title, children }) => (
  <li>
    <span className="font-bold dark:text-white">{title}</span>
    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">{children}</ul>
  </li>
);

export const TermsConditionForToolOwners: React.FC = () => {
  return (
    <div className="m-8 pb-8 bg-sky-950 text-white rounded-lg shadow-lg">
      <h1 className="pt-8 font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Terms and Conditions for Tool Owners
      </h1>
      <ol className="ps-5 mt-8 space-y-1 list-decimal list-inside text-start">
        <Section title="Tool Listing Requirements">
          <li>
            All tools listed must be owned by the owner or authorized for
            rental.
          </li>
          <li>Tools must be in safe and functional condition.</li>
          <li>
            Accurate descriptions and high-quality images must be provided.
          </li>
        </Section>
        <Section title="Tool Maintenance and Safety">
          <li>
            Owners must ensure tools are well-maintained and safe for use.
          </li>
          <li>Defects or issues must be disclosed before rental.</li>
          <li>Regular inspections and servicing are required.</li>
        </Section>
        <Section title="Rental Pricing and Discounts">
          <li>Owners must set fair and competitive pricing.</li>
          <li>Discounts must be clearly indicated.</li>
        </Section>
        <Section title="Rental Period and Availability">
          <li>Owners must specify accurate rental availability.</li>
          <li>Availability must be updated promptly to avoid conflicts.</li>
        </Section>
        <Section title="Prohibited Tools">
          <li>
            Weapons, explosives, hazardous materials, and unregistered or unsafe
            tools cannot be listed.
          </li>
        </Section>
        <Section title="Damage, Loss, and Insurance">
          <li>
            Owners should document tool conditions before and after rentals.
          </li>
          <li>
            Insurance is recommended as the platform is not liable for loss or
            damage.
          </li>
        </Section>
        <Section title="Platform Policies">
          <li>
            The platform reserves the right to remove non-compliant listings.
          </li>
          <li>
            Owners must follow platform policies, including ratings and
            feedback.
          </li>
        </Section>
        <Section title="Cancellation and Refunds">
          <li>Owners must define a clear cancellation policy.</li>
          <li>
            Renters are entitled to refunds if an owner cancels a confirmed
            rental.
          </li>
        </Section>
        <Section title="Legal Protections for the Platform">
          <li>
            The platform acts as an intermediary and is not responsible for tool
            safety or functionality.
          </li>
          <li>
            The platform is not liable for accidents or damages caused by rented
            tools.
          </li>
          <li>
            Owners must indemnify the platform against any rental-related
            claims.
          </li>
          <li>Violations may result in account suspension.</li>
        </Section>
        <Section title="Privacy and Confidentiality">
          <li>
            Owners must protect renter information and use it only for
            rental-related purposes.
          </li>
          <li>
            The platform will safeguard user data according to its privacy
            policy.
          </li>
        </Section>
      </ol>
    </div>
  );
};
