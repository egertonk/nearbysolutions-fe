type Props = {
  formData: {
    customerID: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    selectedTalent: string;
    phoneNumber: string;
    solutionFormattedDate: string;
    solutionDate: string;
    solutionStartTime: string;
    solutionTask: string;
    solutionJob: string;
    talentID: number;
    talentFirstName: string;
    talentLastName: string;
  };
};

export const Payment: React.FC<Props> = ({ formData }) => {
  return <>{formData?.country}bbbbbbbbbb</>;
};
