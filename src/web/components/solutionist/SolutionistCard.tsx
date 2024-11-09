import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isFixPriceValid, priceWithComma } from "../../lib";
import { SocialIcon } from "./socialIcon";
import { JobTitleTypes, TalentTypes } from "../talent/talentTypes";
import { SolutionistCheckMark } from "./SolutionistCheckMark";
import { SolutionistImageHire } from "./SolutionistImageHire";
import { SolutionistFavoriteAddAndRemove } from "./SolutionistFavoriteAddAndRemove";
import { setCustomerOrder } from "../../../store/customerContractorSlice";
import { RootState } from "../../../store";
import { solutionDate, solutionFormattedDate } from "../customer-calender-time";

type Props = {
  data: TalentTypes[];
  isFavoriteValid?: boolean;
};

export const SolutionistCard: React.FC<Props> = ({ data, isFavoriteValid }) => {
  const dispatch = useDispatch();
  const [id, setId] = useState<Number>(-1);
  const [jobId, setJobId] = useState<Number>(-1);

  const customerOrder = useSelector(
    (state: RootState) => state.formData.customerOrder
  );

  const updateSelectedStatus = (selectedJobId: string, userId: number) => {
    if (selectedJobId !== "select-job") {
      setId(userId);
      setJobId(Number(selectedJobId));

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

  const getValue = (jobDetailsObject: JobTitleTypes[]) => {
    const title = jobDetailsObject?.find((job) => job?.selectedStatus)?.title;
    return title;
  };

  const getSelectedJob = (
    jobDetailsObject: JobTitleTypes[],
    userId: number
  ) => {
    const foundJob = jobDetailsObject?.find(
      (job) => job?.id === jobId && job?.title
    );

    if (userId === id && foundJob?.id === jobId) {
      return foundJob.title;
    } else {
      return "Select Job";
    }
  };

  const getJobAndPrice = (
    jobTitlesPrice: JobTitleTypes[],
    priceCall?: string
  ) => {
    const found = jobTitlesPrice?.find((data) => data?.selectedStatus);
    if (priceCall === "ratePerHour") return found?.ratePerHour;
    if (priceCall === "fixPrice") return found?.fixPrice;
    return found?.title;
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
          >
            <SolutionistImageHire
              index={index}
              jobId={jobId}
              disabled={id !== talentData.talent.user.id}
              isFavoriteValid={false}
              talentData={talentData}
            />

            <div className="w-full md:w-3/5 text-left p-4 md:p-4 space-y-2">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <p className="text-xl text-white font-bold">
                    {talentData.talent.user.firstName}{" "}
                    {talentData.talent.user.lastName}
                  </p>
                </div>

                {talentData.talent.verifyStatus && <SolutionistCheckMark />}
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
                    id="select-job"
                    onChange={(e) => {
                      const selectedJobId = e.target.value;
                      updateSelectedStatus(
                        selectedJobId,
                        talentData.talent.user.id
                      );
                    }}
                    value={getValue(talentData.talent.jobTitle)}
                  >
                    <option value="">
                      {getSelectedJob(
                        talentData?.talent?.jobTitle,
                        talentData?.talent?.user.id
                      )}
                    </option>
                    {talentData.talent.jobTitle?.map((details) => (
                      <option key={details?.id} value={details?.id}>
                        {details?.title}
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

              {isFixPriceValid(talentData?.talent.jobTitle) ? (
                <p className="text-base font-normal">
                  <span className="text-gray-400">Fix Solution Price: </span>{" "}
                  <span className="text-white">
                    $
                    {priceWithComma(
                      getJobAndPrice(talentData?.talent.jobTitle, "fixPrice") ||
                        ""
                    )}
                  </span>
                </p>
              ) : (
                <p className="text-base font-normal">
                  <span className="text-gray-400">Rate Per Hour: </span>{" "}
                  <span className="text-white">
                    $
                    {priceWithComma(
                      getJobAndPrice(
                        talentData?.talent.jobTitle,
                        "ratePerHour"
                      ) || ""
                    )}
                  </span>
                </p>
              )}

              <p className="text-base leading-relaxed text-gray-500 font-normal">
                {talentData.talent.talentIntroduction}
              </p>

              <div className="flex justify-start space-x-2">
                {talentData?.talent.socialMedia?.map(
                  (socialData, socialIndex) => (
                    <SocialIcon
                      key={`social-link-${index}-${socialIndex}`}
                      socialData={socialData}
                    />
                  )
                )}
              </div>

              <SolutionistFavoriteAddAndRemove
                id={id}
                jobId={jobId}
                isFavoriteValid={isFavoriteValid ?? false}
                talentData={talentData}
              />
            </div>
          </div>
        ))}
    </>
  );
};
