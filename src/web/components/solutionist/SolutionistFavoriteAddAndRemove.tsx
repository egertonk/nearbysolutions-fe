import { Link } from "react-router-dom";
import { addTalentSVG, removeTalentSVG } from "../../assets/svg/svgs";
import { SolutionistResponseTypes } from "../../lib/types/solutionistTypes";

type Props = {
  id: Number;
  skillId: Number;
  isFavoriteValid: boolean;
  talentData: SolutionistResponseTypes;
};

export const SolutionistFavoriteAddAndRemove: React.FC<Props> = ({
  id,
  skillId,
  isFavoriteValid,
  talentData,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4 mb-0">
      <div className="col-span-3">
        {(id === talentData.solutionistInformation.id || id === -1) && (
          <Link
            className="px-4 py-2 text-sm text-white bg-purple-600"
            to={`/talent-detail-page?solutionistId=${talentData?.solutionistInformation?.id}&skillId=${skillId}`}
          >
            Hire
          </Link>
        )}

        <p className="text-xl text-white font-bold"></p>
      </div>

      <button className="w-full text-end group flex justify-center text-white font-semibold hover:translate-y-0 transition-all duration-500 hover:from-[#331029] hover:to-[#310413]">
        {isFavoriteValid ? removeTalentSVG : addTalentSVG}
        <span className="absolute opacity-0 group-hover:opacity-100 group-hover:text-whitw group-hover:text-sm group-hover:-translate-y-4 duration-700">
          {isFavoriteValid ? "Remove" : "Add to Favorite"}
        </span>
      </button>
    </div>
  );
};
