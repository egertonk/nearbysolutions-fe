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

export const TermsConditionSolutionistsAcceptingJobs: React.FC = () => {
  return (
    <div className="m-8 pb-8 bg-sky-950 text-white rounded-lg shadow-lg">
      <h1 className="pt-8 font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Terms and Conditions for Solutionists Accepting Jobs
      </h1>
      <ol className="ps-5 mt-8 space-y-1 list-decimal list-inside text-start">
        <Section title="Agreement to Provide Services">
          <li>
            By accepting this job, the Solutionist agrees to provide services as
            outlined in the job details, including tasks, timeline, and
            deliverables.
          </li>
        </Section>
        <Section title="Professional Standards">
          <li>
            The Solutionist must perform all tasks with skill, professionalism,
            and adherence to industry standards.
          </li>
        </Section>
        <Section title="Communication">
          <li>Clear and timely communication with the customer is required.</li>
          <li>All communication should be conducted via the platform.</li>
        </Section>
        <Section title="Delivery Timeline">
          <li>
            Work must be completed by the agreed deadline, and any delays must
            be communicated in advance.
          </li>
        </Section>
        <Section title="Confidentiality">
          <li>
            Solutionists must keep all customer information and project details
            confidential.
          </li>
        </Section>
        <Section title="Ownership of Work">
          <li>
            Upon full payment, all deliverables become the property of the
            customer unless otherwise agreed.
          </li>
        </Section>
        <Section title="Payment Terms">
          <li>
            Payments must follow platform policies, and direct payments outside
            the platform are prohibited.
          </li>
        </Section>
        <Section title="Job Cancellation">
          <li>
            Customers may cancel jobs up to 2 hours before the start time
            without penalty.
          </li>
          <li>
            Solutionists have up to 24 hours to reject a job without penalty,
            provided no work has begun.
          </li>
          <li>
            In emergencies, Solutionists must notify the customer and provide
            evidence if required.
          </li>
        </Section>
        <Section title="Compliance with Laws">
          <li>
            Solutionists must comply with all relevant laws and regulations.
          </li>
        </Section>
        <Section title="Dispute Resolution">
          <li>
            Disputes must be handled through the platform's resolution
            mechanism.
          </li>
        </Section>
        <Section title="Liability">
          <li>
            Solutionists are responsible for the quality and accuracy of their
            work.
          </li>
        </Section>
      </ol>
    </div>
  );
};
