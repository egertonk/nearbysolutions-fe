import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { talentProfile } from "../../lib";
import { SortBy } from "../common-sections/SortBy";

type Props = {
  handleSubmit: () => void;
  setSortType: React.Dispatch<React.SetStateAction<string>>;
  setTalentName: React.Dispatch<React.SetStateAction<string>>;
};

export const ReviewHeader: React.FC<Props> = ({
  handleSubmit,
  setSortType,
  setTalentName,
}) => {
  const userPastContractors = [
    "Jessa During",
    "Egerton DUring",
    "Brighton During",
    "Brightina During",
    "E DUring",
    "J During",
  ]; // use customer id to get contractors and reviews

  return (
    <div className="transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
      <div className="mb-12 space-y-5 md:mb-16 md:text-center">
        <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
          Words from Others
        </div>
        <h1 className="mb-5 text-3xl font-semibold text-purple-800 md:text-center md:text-5xl">
          It's not just us.
        </h1>
        <p className="text-xl text-gray-400 md:text-center md:text-2xl">
          Here's what others have to say about{" "}
          <span className="text-purple-800">{talentProfile.fullName}</span>.
        </p>

        <label
          htmlFor="country"
          className="block text-md font-medium leading-6 text-red-900"
        >
          Select a Solutionist to see Reviews
        </label>

        <form className="flex flex-col md:flex-row gap-3 justify-center">
          <div>
            <select
              id="talent-name"
              name="talent-nam"
              autoComplete="talent-name"
              onChange={(e) => setTalentName(e.target.value)}
              className="w-50 md:w-80 px-3 h-10 rounded-l border-2 border-purple-500 focus:outline-none focus:border-purple-800"
            >
              {userPastContractors.map((name, index) => (
                <option key={`contractor-${index}`}>{name}</option>
              ))}
            </select>
          </div>

          <SortBy setSortType={setSortType} isReviewValid={true} />

          <button
            className="ml-1.5 relative align-middle select-none bg-purple-400 font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
            type="button"
            onClick={handleSubmit}
          >
            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <MagnifyingGlassIcon className="h-5 w-5 flex-none text-white-400 btn" />
            </span>
          </button>
        </form>
      </div>
    </div>
  );
};
