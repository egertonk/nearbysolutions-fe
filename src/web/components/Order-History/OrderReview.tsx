type Props = {
  formData: {
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    selectedTalent: string;
  };
  setReviewOrder: React.Dispatch<React.SetStateAction<boolean>>;
};

export const OrderReview: React.FC<Props> = ({ formData, setReviewOrder }) => {
  return <>{formData.country}</>;
};
