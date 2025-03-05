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

export const TermsConditionSolutionistsPostingJobs: React.FC = () => {
  return (
    <div className="m-8 pb-8 bg-sky-950 text-white rounded-lg shadow-lg">
      <h1 className="pt-8 font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white-800 bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
        Terms and Conditions for Posting Jobs
      </h1>
      <ol className="ps-5 mt-8 space-y-1 list-decimal list-inside text-start">
        <Section title="Agreement to Post Jobs">
          <li>
            The Customer agrees to provide accurate job descriptions, including
            tasks, timelines, and expectations.
          </li>
        </Section>
        <Section title="Job Requirements">
          <li>
            Job postings must adhere to platform guidelines and be lawful and
            ethical.
          </li>
          <li>
            Job scope and compensation must align with industry standards.
          </li>
        </Section>
        <Section title="Payment and Compensation">
          <li>
            Customers may cancel job requests without penalty up to 2 hours
            before the scheduled start time.
          </li>
          <li>Late cancellations require compensation for completed work.</li>
        </Section>
        <Section title="Communication">
          <li>
            Customers must maintain clear and respectful communication with
            Solutionists.
          </li>
          <li>
            Any changes to job details must be discussed via the platform.
          </li>
        </Section>
        <Section title="Emergency Situations">
          <li>
            Customers must cooperate in rescheduling jobs in unforeseen
            circumstances.
          </li>
        </Section>
        <Section title="Job Completion">
          <li>
            Customers must review and approve work within a reasonable
            timeframe.
          </li>
          <li>Feedback must be given in good faith.</li>
        </Section>
        <Section title="Confidentiality">
          <li>
            Customers must respect Solutionists' confidential information.
          </li>
        </Section>
        <Section title="Dispute Resolution">
          <li>
            Disputes must be handled through the platform’s dispute resolution
            mechanism.
          </li>
        </Section>
        <Section title="Liability">
          <li>
            The platform is not responsible for damages or disputes arising from
            job postings.
          </li>
          <li>Customers are responsible for ensuring job legality.</li>
        </Section>
        <Section title="Platform Policies">
          <li>
            Customers must comply with platform policies, including
            communication and payment guidelines.
          </li>
          <li>Violations may result in penalties or account suspension.</li>
        </Section>
        <Section title="Acceptance of Terms">
          <li>
            By posting a job, Customers agree to these Terms and Conditions.
          </li>
        </Section>
      </ol>
    </div>
  );
};
