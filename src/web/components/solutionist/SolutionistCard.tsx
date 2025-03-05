import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { priceWithComma } from "../../lib";
import { SocialIcon } from "./socialIcon";
import {
  SolutionistResponseTypes,
  SolutionistSkillTypes,
} from "../../lib/types/solutionistTypes";
import { SolutionistCheckMark } from "./SolutionistCheckMark";
import { SolutionistImageHire } from "./SolutionistImageHire";
import { SolutionistFavoriteAddAndRemove } from "./SolutionistFavoriteAddAndRemove";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { RootState } from "../../../store";
import {
  solutionDate,
  solutionFormattedDate,
} from "../customer-calender-time/data-setup";

type Props = {
  data: SolutionistResponseTypes[];
  isFavoriteValid?: boolean;
  lastElementRef: (node: HTMLDivElement | null) => void;
};

export const SolutionistCard: React.FC<Props> = ({
  data,
  isFavoriteValid,
  lastElementRef,
}) => {
  console.log("data = ", data);
  const dispatch = useDispatch();
  const [id, setId] = useState<Number>(-1);
  const [skillId, setSkillId] = useState<Number>(-1);

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const updateSelectedStatus = (selectedSkillId: string, userId: number) => {
    if (selectedSkillId !== "Select Talent Skill") {
      setId(userId);
      setSkillId(Number(selectedSkillId));

      const updatedOrder = {
        ...customerOrder,
        solutionDateContract: {
          ...customerOrder.solutionDateContract,
          solutionDate,
          solutionFormattedDate,
        },
      };

      dispatch(setCustomerOrder(updatedOrder));
    }
  };

  const getSkill = (solutionistSkillsData: SolutionistSkillTypes[]) => {
    return solutionistSkillsData?.find(
      (skill) => skill?.id === skillId && skill?.name
    );
  };

  const getSelectedJob = (
    solutionistSkillsData: SolutionistSkillTypes[],
    userId: number
  ) => {
    const foundSkill = getSkill(solutionistSkillsData);

    if (userId === id && foundSkill?.id === skillId) {
      return foundSkill.name;
    } else {
      return "Select Talent Skill";
    }
  };

  const getSkillPrice = (solutionistSkillsData: SolutionistSkillTypes[]) => {
    return getSkill(solutionistSkillsData)?.fixPrice ?? 0;
  };

  const getSkillDescription = (
    solutionistSkillsData: SolutionistSkillTypes[]
  ) => {
    return getSkill(solutionistSkillsData)?.description ?? "";
  };

  // useEffect(() => {
  //   const foundHire = data.find((talent) => talent.talent.user.id === id);

  //   const foundPrice = foundHire?.talent.jobTitle.find((data) => data.selectedStatus);

  //   const newOrder: CustomerFormData = {
  //     ...customerState.formData.customerOrder,
  //     talentID: foundHire?.user?.id || 0,
  //     talentFirstName: foundHire?.user?.firstName || "",
  //     talentLastName: foundHire?.user?.lastName || "",
  //     solutionJob: foundPrice?.title || "",
  //     solutionPrice: foundPrice?.isFixPrice
  //       ? foundPrice.fixPrice || 0
  //       : foundPrice?.ratePerHour || 0,
  //     solutionPricePerHourStatus: foundPrice?.isFixPrice ? false : true,
  //     solutionPriceDiscountPercentage: foundPrice?.discount || 0,
  //     orderStatus: false,
  //   };

  //   dispatch(setCustomerOrder(newOrder));
  // }, [data]);

  return (
    <>
      {data?.length > 0 &&
        data?.map((talentData, index) => (
          <div
            className="w-full bg-sky-950 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
            key={`talent-card-${index}`}
            ref={index === data.length - 1 ? lastElementRef : null} // ✅ Apply ref to last <div>
          >
            <SolutionistImageHire
              index={index}
              skillId={skillId}
              disabled={id !== talentData.solutionistInformation.id}
              isFavoriteValid={false}
              talentData={talentData}
            />

            <div className="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <p className="text-xl text-white font-bold">
                    {talentData.solutionistInformation.firstName}{" "}
                    {talentData.solutionistInformation.lastName}
                  </p>
                </div>

                {talentData.solutionistInformation.isVerified && (
                  <SolutionistCheckMark />
                )}
              </div>

              <div className="w-full">
                <span className="text-white mb-2">
                  {talentData.solutionistSkills[0]?.name ?? ""}{" "}
                  {talentData.solutionistSkills.length >= 2 ? "..." : ""}
                </span>
                <label
                  htmlFor="Talent"
                  className="block mb-2 text-sm font-medium text-white"
                >
                  Select Talent
                </label>

                <div className="relative" key={`update-card-${index}`}>
                  <select
                    className="w-full border-none text-white bg-sky-950"
                    id="Select Talent Skill"
                    onChange={(e) => {
                      const selectedSkillId = e.target.value;
                      updateSelectedStatus(
                        selectedSkillId,
                        talentData.solutionistInformation.id
                      );
                    }}
                    value={customerOrder.solutionJob}
                  >
                    <option
                      value=""
                      className="w-full border-red text-purple-600 bg-white"
                    >
                      {getSelectedJob(
                        talentData?.solutionistSkills,
                        talentData?.solutionistInformation.id
                      )}
                    </option>

                    {talentData.solutionistSkills?.map((details) => (
                      <option key={details?.id} value={details?.id}>
                        {details.name}
                      </option>
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

              <p className="text-base font-normal">
                <span className="text-gray-400">Fix Solution Price: </span>{" "}
                <span className="text-white">
                  ${priceWithComma(getSkillPrice(talentData.solutionistSkills))}
                </span>
              </p>

              <p className="text-base leading-relaxed text-gray-200 font-normal">
                {getSkillDescription(talentData.solutionistSkills)}
              </p>

              <div className="flex text-white">
                {talentData?.solutionistSocialMedias?.map((socialData) => (
                  <SocialIcon
                    key={`social-link-${socialData.id}`}
                    socialData={socialData}
                  />
                ))}
              </div>

              <hr className="w-48 h-1 mx-auto bg-gray-100 border-0 rounded md:my-4 dark:bg-gray-700"></hr>

              <SolutionistFavoriteAddAndRemove
                id={id}
                skillId={skillId}
                isFavoriteValid={isFavoriteValid ?? false}
                talentData={talentData}
              />
            </div>
          </div>
        ))}
    </>
  );
};
