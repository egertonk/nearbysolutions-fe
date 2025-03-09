import { useState } from "react";
import { sortUpDownSVG } from "../../assets/svg/svgs";

type Props = {
  sortList: string[];
  handleSort: (sortType: string) => void;
};

export const SortData: React.FC<Props> = ({ handleSort, sortList }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortName, setSortName] = useState("Sort by");

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const selectSortOption = (name: string) => {
    handleSort(name);
    setSortName(name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative flex justify-end mb-2 -mt-4">
      <div className="relative w-48 m-1 text-end m-4">
        {/* Dropdown Button */}
        <button
          className="text-black px-6 py-1 flex items-center justify-between w-full bg-white border border-gray-300 rounded-lg shadow-md hover:bg-gray-100"
          onClick={toggleDropdown}
        >
          {sortName}
          {sortUpDownSVG}
        </button>

        {/* Dropdown List */}
        {isDropdownOpen && (
          <ul className="absolute w-full bg-white shadow-lg rounded-xl mt-1 transition-all duration-300 z-50 border border-gray-300">
            {sortList.map((name, index) => (
              <li
                key={index}
                className="flex justify-center items-center text-sm text-gray-700 hover:bg-gray-100 py-3 px-0 cursor-pointer"
                onClick={() => selectSortOption(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
