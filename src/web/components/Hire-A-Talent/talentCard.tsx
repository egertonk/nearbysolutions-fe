import { priceWithComma } from "../../lib";
import { SocialIcon } from "./socialIcon";

type Props = {
  talentDetails: {
    talentID: number;
    imageSource: string;
    fullName: string;
    jobTitles: string[];
    talentIntroduction: string;
    socialMediaDetails: { name: string; link: string }[];
    solutionPricing: {
      fixPrice: number;
      ratePerHour: number;
    };
    verifyStatus: boolean;
  }[];
  setShowTalentDetailPage: React.Dispatch<React.SetStateAction<boolean>>;
  setTalentID: React.Dispatch<React.SetStateAction<number>>;
};

export const TalentCard: React.FC<Props> = ({
  talentDetails,
  setShowTalentDetailPage,
  setTalentID,
}) => {
  return (
    <>
      {talentDetails.map((talentData, index) => (
        <div
          className="w-full bg-sky-950 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
          key={`talent-card-${index}`}
        >
          <div className="w-full md:w-2/5 h-80 group">
            <button
              className=" object-center object-cover w-full h-full group relative "
              onClick={() => {
                setTalentID(talentData.talentID);
                setShowTalentDetailPage(true);
              }}
            >
              {/* Start hidden content */}
              <div className="transition-all transform z-40 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-center absolute justify-center">
                <button className="px-4 py-2 text-sm text-white bg-purple-600">
                  Hire
                </button>
              </div>
              {/* End of hidden content */}
              <img
                className="object-center object-cover w-full h-full group-hover:opacity-50 object-cover inset-0 "
                src={talentData.imageSource}
                alt={`user-${index}`}
              />
            </button>
          </div>
          <div className="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <p className="text-xl text-white font-bold">
                  {talentData.fullName}
                </p>
              </div>

              {talentData.verifyStatus && (
                <div>
                  <svg
                    className="h-8 w-8 text-green-500 text-end"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
              )}
            </div>
            {talentData.jobTitles.map((jobName, jobIndex) => (
              <p
                key={`job-title-${index}-${jobIndex}`}
                className="text-base text-gray-400 font-normal"
              >
                {jobName}
              </p>
            ))}

            <p className="text-base font-normal">
              <span className="text-gray-400">Fix Solution Price: </span>{" "}
              <span className="text-white">
                ${priceWithComma(talentData.solutionPricing.fixPrice)}
              </span>
            </p>

            <p className="text-base font-normal">
              <span className="text-gray-400">Rate Per Hour: </span>{" "}
              <span className="text-white">
                ${priceWithComma(talentData.solutionPricing.ratePerHour)}
              </span>
            </p>

            <p className="text-base leading-relaxed text-gray-500 font-normal">
              {talentData.talentIntroduction}
            </p>

            <div className="flex justify-start space-x-2">
              {talentData.socialMediaDetails.map((socialData, socialIndex) => (
                <SocialIcon
                  key={`social-link-${index}-${socialIndex}`}
                  socialData={socialData}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
