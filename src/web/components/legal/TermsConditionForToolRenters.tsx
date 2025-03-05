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

export const TermsConditionForToolRenters: React.FC = () => {
  return (
    <div className="m-8 pb-8 bg-sky-950 text-white rounded-lg shadow-lg">
      <h1 className="pt-8 font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Terms and Conditions for Tool Renters
      </h1>
      <ol className="ps-5 mt-8 space-y-1 list-decimal list-inside text-start">
        <Section title="Eligibility to Rent">
          <li>
            Renters must be at least 18 years old and legally capable of
            entering into binding agreements.
          </li>
          <li>Accurate personal and payment information must be provided.</li>
          <li>Renters must comply with all applicable laws.</li>
        </Section>
        <Section title="Rental Period and Return">
          <li>Rental period begins as specified and ends upon tool return.</li>
          <li>Tools must be returned in the same condition as received.</li>
          <li>Late returns may incur additional charges.</li>
        </Section>
        <Section title="Tool Usage">
          <li>Renters must use tools properly and safely.</li>
          <li>Tools cannot be used illegally or for unintended purposes.</li>
          <li>
            No modifications or repairs are allowed without owner’s permission.
          </li>
        </Section>
        <Section title="Damage, Loss, or Theft">
          <li>Renters are responsible for any loss, theft, or damage.</li>
          <li>Repair or replacement costs must be reimbursed.</li>
          <li>Renters should inspect tools upon receipt.</li>
        </Section>
        <Section title="Payments and Fees">
          <li>All rental fees must be paid upfront unless otherwise agreed.</li>
          <li>Additional charges may apply for damages or late returns.</li>
          <li>Payments must be made through the platform’s secure system.</li>
        </Section>
        <Section title="Cancellations and Refunds">
          <li>Cancellation policies depend on the owner's terms.</li>
          <li>Refund eligibility depends on timing and owner policy.</li>
          <li>Misrepresented tools may be eligible for a refund.</li>
        </Section>
        <Section title="Liability and Safety">
          <li>Renters assume full responsibility for tool use.</li>
          <li>The platform and owners are not liable for misuse.</li>
          <li>Renters must release and indemnify the platform and owners.</li>
        </Section>
        <Section title="Inspection and Acceptance">
          <li>Tools should be inspected upon receipt.</li>
          <li>Failure to report defects implies acceptance.</li>
        </Section>
        <Section title="Prohibited Tools">
          <li>
            Renters must not use prohibited tools, including weapons and
            hazardous materials.
          </li>
        </Section>
        <Section title="Platform Policies">
          <li>
            The platform is not responsible for tool condition or performance.
          </li>
          <li>
            Renters must comply with platform policies, including reviews.
          </li>
        </Section>
        <Section title="Privacy and Confidentiality">
          <li>Renters cannot misuse owner information.</li>
          <li>The platform will protect renters’ data.</li>
        </Section>
        <Section title="Legal Protections for the Platform">
          <li>
            The platform is not liable for disputes between renters and owners.
          </li>
          <li>Accounts may be suspended for policy violations.</li>
          <li>Renters agree to indemnify the platform from claims.</li>
        </Section>
      </ol>
    </div>
  );
};
