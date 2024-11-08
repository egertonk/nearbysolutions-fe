import { useState } from "react";
import { sortUpDownSVG } from "../../assets/svg/svgs";

type Props = {
  sortList: string[];
  handleSort: (sortType: string) => void;
};

export const SortData: React.FC<Props> = ({ handleSort, sortList }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortName, setSortName] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="relative flex justify-end mb-2 -mt-4" id="sorted-data">
        <div className="relative w-35 text-end">
          <button
            className="text-black-300 px-6 py-1 flex items-center justify-between space-x-4"
            onClick={toggleDropdown}
          >
            {sortName.length > 0 ? sortName : "Sort by"}
            {sortUpDownSVG}
          </button>
          <ul
            className={`absolute bg-[#371f1f] shadow-lg rounded-xl mt-1 transition-all duration-300 w-full ${
              isDropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
            style={{ zIndex: 1000 }}
          >
            {sortList.map((name, index) => (
              <li
                key={index}
                className="flex justify-center items-center text-sm text-gray-300 hover:text-yellow-300 py-3 px-6 cursor-pointer"
                onClick={() => {
                  handleSort(name);
                  setIsDropdownOpen(false);
                  setSortName(name);
                }}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
