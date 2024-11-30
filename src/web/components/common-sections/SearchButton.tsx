import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

type Props = {
  handleSubmit: () => void;
};

export const SearchButton: React.FC<Props> = ({ handleSubmit }) => {
  return (
    <button
      className="mb-1 ml-1.5 relative align-middle select-none bg-purple-400 font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-blue-500 text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-purple-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button"
      onClick={handleSubmit}
    >
      <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <MagnifyingGlassIcon className="h-5 w-5 flex-none text-white-400 btn" />
      </span>
    </button>
  );
};
