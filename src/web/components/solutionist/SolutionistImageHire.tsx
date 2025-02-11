import { Link } from "react-router-dom";

import nearbySolutionsIcon from "../../assets/company-logos-icons/icononly_transparent_nobuffer.png";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";

type Props = {
  index: Number;
  skillId: Number;
  disabled: boolean;
  isFavoriteValid?: boolean;
  talentData: SolutionistResponseTypes;
};

export const SolutionistImageHire: React.FC<Props> = ({
  index,
  skillId,
  disabled,
  isFavoriteValid,
  talentData,
}) => {
  const solutionistJobStatus = (
    <>
      <div className="transition-all transform z-40 translate-y-8 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 text-center absolute justify-center">
        <button
          className="px-4 py-2 text-sm text-white bg-purple-600"
          disabled={disabled}
        >
          {isFavoriteValid ? "Re-Hire" : "Hire"}
        </button>
      </div>
      <img
        className="object-center object-cover w-full h-full group-hover:opacity-50 object-cover inset-0"
        src={
          talentData.solutionistInformation.profilePicture ||
          nearbySolutionsIcon
        }
        alt={`user-${index}`}
      />
    </>
  );

  const clickToHireSolutionist = (
    <div className="w-full md:w-2/5 h-100 group">
      <Link
        className="object-center object-cover w-full h-full group relative"
        to={`/talent-detail-page?solutionistId=${talentData?.solutionistInformation?.id}&skillId=${skillId}`}
      >
        {solutionistJobStatus}
      </Link>
    </div>
  );

  const disableClickToHireSolutionist = (
    <div className="w-full md:w-2/5 h-100 group">
      <>{solutionistJobStatus}</>
    </div>
  );

  return (
    <>{disabled ? disableClickToHireSolutionist : clickToHireSolutionist}</>
  );
};
