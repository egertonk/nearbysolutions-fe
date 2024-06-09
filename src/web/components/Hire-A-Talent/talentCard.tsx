import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { RootState } from "../../../store";
import { addTalentSVG, removeTalentSVG } from "../../assets/svg/svgs";
import { isFixPriceValid, priceWithComma } from "../../lib";
import {
  CustomerFormData,
  JobTitlePricing,
  TalentInformation,
} from "../../lib/types/orderTypes";
import { SocialIcon } from "./socialIcon";

type Props = {
  talentInformationCard: TalentInformation[];
  setTalentInformationCard: React.Dispatch<
    React.SetStateAction<TalentInformation[]>
  >;
  isFavoriteValid?: boolean;
};

export const TalentCard: React.FC<Props> = ({
  talentInformationCard,
  setTalentInformationCard,
  isFavoriteValid,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customerState = useSelector((state: RootState) => state);
  const [id, setId] = useState(0);

  const updateTalentInformation = (
    talentID: number,
    updatedJobTitlePricing: JobTitlePricing[]
  ) => {
    const updatedTalentInformation = talentInformationCard.map((talent) => {
      if (talentID === talent.talentID) {
        return {
          ...talent,
          jobTitlesPrice: updatedJobTitlePricing,
        };
      }
      return talent;
    });

    if (updatedTalentInformation) {
      setTalentInformationCard(updatedTalentInformation);
      setId(talentID);
    }
  };

  const updateSelectedStatus = (
    selectedJob: string,
    jobDetailsObject: JobTitlePricing[],
    talentID: number
  ) => {
    if (selectedJob !== "Select Job") {
      const updatedJobTitlePricing = jobDetailsObject.map((job) => ({
        ...job,
        selectedStatus: job.title === selectedJob,
      }));

      updateTalentInformation(talentID, updatedJobTitlePricing);
    }
  };

  const getValue = (jobDetailsObject: JobTitlePricing[]) => {
    const title = jobDetailsObject.find((job) => job.selectedStatus)?.title;
    return title;
  };

  const getJobAndPrice = (
    jobTitlesPrice: JobTitlePricing[],
    priceCall?: string
  ) => {
    const found = jobTitlesPrice.find((data) => data.selectedStatus);
    if (priceCall === "ratePerHour") return found?.price.ratePerHour;
    if (priceCall === "fixPrice") return found?.price.fixPrice;
    return found?.title;
  };

  useEffect(() => {
    const foundHire = talentInformationCard.find(
      (talent) => talent.talentID === id
    );

    const foundPrice = foundHire?.jobTitlesPrice.find(
      (data) => data.selectedStatus
    );

    const newOrder: CustomerFormData = {
      ...customerState.formData.customerOrder,
      talentID: foundHire?.talentID || 0,
      talentFirstName: foundHire?.firstName || "",
      talentLastName: foundHire?.lastName || "",
      solutionJob: foundPrice?.title || "",
      solutionPrice: foundPrice?.isFixPrice
        ? foundPrice.price.fixPrice || 0
        : foundPrice?.price.ratePerHour || 0,
      solutionPricePerHourStatus: foundPrice?.isFixPrice ? false : true,
      solutionPriceDiscountPercentage: foundPrice?.price.discount || 0,
      orderStatus: false,
    };

    dispatch(setCustomerOrder(newOrder));
  }, [talentInformationCard]);

  return (
    <>
      {talentInformationCard.map((talentData, index) => (
        <div
          className="w-full bg-sky-950 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
          key={`talent-card-${index}`}
        >
          <div className="w-full md:w-2/5 h-100 group">
            <Link
              className="object-center object-cover w-full h-full group relative"
              to={`/talent-detail-page?talentID=${talentData.talentID}`}
            >
              <div className="transition-all transform z-40 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-center absolute justify-center">
                <button className="px-4 py-2 text-sm text-white bg-purple-600">
                  {isFavoriteValid ? "Re-Hire" : "Hire"}
                </button>
              </div>
              <img
                className="object-center object-cover w-full h-full group-hover:opacity-50 object-cover inset-0"
                src={talentData.imageSource}
                alt={`user-${index}`}
              />
            </Link>
          </div>

          <div className="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2">
            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <p className="text-xl text-white font-bold">
                  {talentData.fullName}
                </p>
              </div>

              {talentData.verifyStatus && (
                <div className="w-full text-end px-5">
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
                    <path stroke="none" d="M0 0h24v24H0z" />
                    <path d="M5 12l5 5l10 -10" />
                  </svg>
                </div>
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="Talent"
                className="block mb-2 text-sm font-medium text-white"
              >
                Select Talent
              </label>

              <div className="relative" key={`update-card-${index}`}>
                <select
                  className="w-full border-none text-white bg-sky-950"
                  id="grid-state"
                  onChange={(e) => {
                    updateSelectedStatus(
                      e.target.value,
                      talentData.jobTitlesPrice,
                      talentData.talentID
                    );
                  }}
                  value={getValue(talentData.jobTitlesPrice)}
                >
                  <option defaultValue="Select Job">Select Job</option>
                  {talentData.jobTitlesPrice.map((details, jobIndex) => (
                    <option key={details.title}>{details.title}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {isFixPriceValid(talentData.jobTitlesPrice) ? (
              <p className="text-base font-normal">
                <span className="text-gray-400">Fix Solution Price: </span>{" "}
                <span className="text-white">
                  $
                  {priceWithComma(
                    getJobAndPrice(talentData.jobTitlesPrice, "fixPrice") || ""
                  )}
                </span>
              </p>
            ) : (
              <p className="text-base font-normal">
                <span className="text-gray-400">Rate Per Hour: </span>{" "}
                <span className="text-white">
                  $
                  {priceWithComma(
                    getJobAndPrice(talentData.jobTitlesPrice, "ratePerHour") ||
                      ""
                  )}
                </span>
              </p>
            )}

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

            <div className="grid grid-cols-4 gap-4 mb-0">
              <div className="col-span-3">
                <Link
                  className="px-4 py-2 text-sm text-white bg-purple-600"
                  to={`/talent-detail-page?talentID=${talentData.talentID}`}
                >
                  Hire
                </Link>

                <p className="text-xl text-white font-bold"></p>
              </div>

              <button className="w-full text-end group flex justify-center text-white font-semibold hover:translate-y-0 transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
                {isFavoriteValid ? removeTalentSVG : addTalentSVG}
                <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-whitw group-hover:text-sm group-hover:-translate-y-4 duration-700">
                  {isFavoriteValid ? "Remove" : "Add to Favorite"}
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
