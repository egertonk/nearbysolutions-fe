export type SocialMedia = {
  name: string;
  link: string;
};

export type Reviews = {
  customerReviewDate: string;
  customerFirstName: string;
  customerLastName: string;
  customerReviewComment: string;
  customerCity: string;
  customerStarsRating: number;
  customerImage: string;
  customerJobRequest: string;
  contractorImage: string;
  contractorFullName: string;
  socialMedias: SocialMedia[];
};
